// route handler for authenetication
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({

    providers:[ 
        CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },

        async authorize(credentials, req) {
          // Call the login api here to look up the user from the credentials supplied
          const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          })
    
          const user = await res.json();

          if (user) {
            console.log(user)
            // returns all user info stored in the JWT
            return user
          } 
          else {
            // when null is returned an error will be displayed telling the user to check their details.
            return null
          }
        }
      }),
    ],
    pages: {
      signIn: "/signin"
    },
    callbacks: {
      async jwt({ token, user }) {
        return {...token, ...user};
    },
    async session({session, token}) {
      session.user = token

      return session;
    }
  }
});

export { handler as GET, handler as POST };