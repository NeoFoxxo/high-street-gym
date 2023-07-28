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
            // Any object returned will be saved in `user` property of the JWT
            return user
          } 
          else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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