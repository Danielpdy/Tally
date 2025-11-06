import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from  "next-auth/providers/github";
import Twitter from "next-auth/providers/twitter"
import CredentialsProvider from "next-auth/providers/credentials";
import { createSession } from "@services/userService";

export const {
  handlers: { GET, POST },
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
        
        console.log("Attempting login with:", credentials.email);
        const res = await createSession({
          email: credentials.email,
          password: credentials.password,
        });

        const user = res.user;
        if (!user) {
          console.log("No user found in response");
          return null
        }

        return user;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }

      },
    }),

  ],
  session: { strategy: "jwt" },

  callbacks: {
    async redirect({ url, baseUrl}) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      try {
        const u = new URL(url);
        if (u.origin === baseUrl) return url;
      } catch {}
        return baseUrl;
    },
  },
});
