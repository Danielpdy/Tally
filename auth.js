import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from  "next-auth/providers/github";
import Twitter from "next-auth/providers/twitter"
import CredentialsProvider from "next-auth/providers/credentials";
import { createSession, refreshAcessToken } from "@services/userService";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
    }),
    Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "text"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        try{

        const res = await createSession({
          email: credentials.email,
          password: credentials.password,
        });

        const user = res?.user;
        if (!user) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            accessToken: user.token,
            refreshToken: res.refreshToken,
            expiresIn: res.expiresIn,
          }

        } catch (err) {
          console.error("Authorize error:", err);
          console.error("Error details:", err.response?.data);
          return null;
        }

      },
    }),

  ],
  pages: {
    signIn: "/LoginSignup",
    error: "/LoginSignup",
  },
  session: {
    strategy: "jwt" ,
    maxAge: 60 * 60,
  },

  callbacks: {
    async redirect({ url, baseUrl}) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      try {
        const u = new URL(url);
        if (u.origin === baseUrl) return url;
      } catch {}
        return baseUrl;
    },

    async jwt({ token, user, account, trigger, session }) {
      console.log("[JWT] called — account:", account?.provider, "| user:", !!user, "| hasAccessToken:", !!token.accessToken, "| trigger:", trigger);

      // Handle session.update() calls (from accept-terms page after terms agreement)
      if (trigger === "update" && session) {
        return {
          ...token,
          id: session.id ?? token.id,
          email: session.email ?? token.email,
          name: session.name ?? token.name,
          accessToken: session.accessToken ?? token.accessToken,
          refreshToken: session.refreshToken ?? token.refreshToken,
          accessTokenExpires: session.accessTokenExpires ?? token.accessTokenExpires,
          pendingOAuth: session.pendingOAuth, // null clears the pending flag
        };
      }

      if (account && account.provider !== "credentials") {
        const apiBase = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
        console.log("[OAuth] API base:", apiBase);

        // Check if this is a new or returning user before touching the DB
        try {
          const checkRes = await fetch(
            `${apiBase}/users/oauth/check?email=${encodeURIComponent(user.email)}`
          );
          const { exists } = await checkRes.json();

          if (!exists) {
            // New user — store pending data in JWT, do NOT create in DB yet
            console.log("[OAuth] New user detected, awaiting terms agreement:", user.email);
            return {
              ...token,
              email: user.email,
              name: user.name || user.email.split("@")[0],
              pendingOAuth: {
                email: user.email,
                name: user.name || user.email.split("@")[0],
                provider: account.provider,
              },
            };
          }
        } catch (error) {
          console.error("[OAuth] Existence check failed:", error.message);
        }

        // Returning user — proceed with normal OAuth login
        try {
          console.log("[OAuth] Returning user, signing in:", user.email);
          const res = await fetch(`${apiBase}/users/oauth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name || user.email.split("@")[0],
              provider: account.provider,
            }),
          });

          console.log("[OAuth] Backend response status:", res.status);

          if (!res.ok) {
            const text = await res.text();
            console.error("[OAuth] Backend error body:", text);
            if (res.status === 401) {
              return { ...token, error: "AccountDeactivated" };
            }
            return { ...token, error: "OAuthBackendError" };
          }

          const data = await res.json();
          console.log("[OAuth] Success — userId:", data.user.id, "hasToken:", !!data.user.token);

          return {
            ...token,
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            accessToken: data.user.token,
            refreshToken: data.refreshToken,
            accessTokenExpires: Date.now() + (data.expiresIn * 1000),
            pendingOAuth: null,
          };
        } catch (error) {
          console.error("[OAuth] Fetch failed:", error.message);
          return { ...token, error: "OAuthBackendError" };
        }
      }

      if (user) {
        console.log("[JWT] Credentials sign-in for:", user.email);
        return{
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + (user.expiresIn * 1000),
          pendingOAuth: null,
        }
      }

      if (token.error === "AccountDeactivated" || token.error === "OAuthBackendError") {
        return token
      }

      // Don't try to refresh if still in pending state
      if (token.pendingOAuth) {
        return token;
      }

      if(Date.now() < token.accessTokenExpires){
        return token
      }

      console.log("[JWT] Token expired, refreshing...");
      try{
        const res = await refreshAcessToken(token.refreshToken)

        return {
          ...token,
          accessToken: res.token,
          refreshToken: res.refreshToken ?? token.refreshToken,
          accessTokenExpires: Date.now() + (res.expiresIn * 1000),
        }
      } catch(error){
        console.error("[JWT] Refresh failed:", error.message);
        return {...token, error: "RefreshTokenError"}
      }
    },

    async session({ session, token }) {
      console.log("[Session] id:", token.id, "| error:", token.error, "| hasAccessToken:", !!token.accessToken, "| pendingOAuth:", !!token.pendingOAuth);
      session.user.id = token.id
      session.user.email = token.email
      session.user.name = token.name
      session.accessToken = token.accessToken
      session.error = token.error
      session.pendingOAuth = token.pendingOAuth || null
      return session
    },
  },
});
