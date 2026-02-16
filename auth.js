import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from  "next-auth/providers/github";
import Twitter from "next-auth/providers/twitter"
import CredentialsProvider from "next-auth/providers/credentials";
import { createSession, refreshAcessToken } from "@services/userService";
import { refresh } from "@node_modules/next/cache";

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

    async jwt({ token, user }) {
      if (user) {
        return{
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + (user.expiresIn * 1000),
        }
      }

      if(Date.now() < token.accessTokenExpires){
        return token
      }

      try{
        const res = await refreshAcessToken(token.refreshToken)

        return {
          ...token,
          accessToken: res.token,
          refreshToken: res.refreshToken ?? token.refreshToken,
          accessTokenExpires: Date.now() + (res.expiresIn * 1000),
        }
      } catch(error){
        return {...token, error: "RefreshTokenError"}
      }
    },

    async session({ session, token }) {
      session.user.id = token.id
      session.user.email = token.email
      session.user.name = token.name
      session.accessToken = token.accessToken
      session.error = token.error
      return session
    },
  },
});
