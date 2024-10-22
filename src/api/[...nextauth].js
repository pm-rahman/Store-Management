import verifyUser from "@/lib/authUtil";
import NextAuth from "next-auth";
import CredentialsProviders from 'next-auth/providers/credentials';
const handler = NextAuth({
    providers:[
        CredentialsProviders({
            name:'Credentials',
            credentials:{
                email:{label:'Email',type:'email',placeholder:'you@example.com'},
                password:{label:'Password',type:'password'}
            },
            async authorize(credentials,req){
                const {email,password} = credentials;
                // TODO: implement this function.
                const user = await verifyUser(email,password)
                if(user){
                    return user
                }
                else{
                    return null
                }
            }
        })
    ],
    pages:{
        signIn:"/signin" // Redirect to a custom sign-in page
    },
    session:{
        strategy:'jwt'
    },
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id=user.id
            }
            return token
        },
        async session({session,token}){
            session.user.id=token.id
            return session;
        }
    }
})

export {handler as GET,handler as POST}