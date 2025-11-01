import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from  "next-auth/providers/github";

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
    })
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async redirect({ url, baseUrl}) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      try {
        const u = new URL(url)
      }
    }
  }
});
