import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: { label: "UserName", type: "text", placeholder: "UserName" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const user = { id: 1, name: "John Deo", email: "john@example.com" };
        if (credentials?.userName && credentials?.password) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages:{
    signIn:'/auth/signin',
  },
  callbacks:{
    async jwt({token,user}){
        if(user){
            token.email=user.email
        }
        return token
    },
    async session({session,token}){
        if(token){
            session.email=user.id
        }
        return session;
    }
  },
  secret:process.env.NEXTAUTH_SECRET
});
