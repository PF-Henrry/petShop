import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import { conn,connectDB } from "@/libs/mongodb";
import Users from "@/models/users";

const authOptions = {
        providers: [
            CredentialsProvider({
                name:"Credentials",
                credentials:{
                    email:{ label:"Email", type: "text", placeholder:"jsmith"},
                    password: {label:"Password", type:"password"}
                },
               async authorize(credentials,req){
                    if(!conn.isConnected) connectDB();

                    const findUser = await Users.findOne({email:credentials.email});
                    if(!findUser) return null
                    const matchPassword = await findUser.comparePassword(credentials.password);
                    if(!matchPassword) return null
                    return {
                        id: findUser._id,
                        name: findUser.username,
                        email: findUser.email
                    }
                }
            })
        ],
        callbacks: {
            async signIn({ user, account, profile, email, credentials }) {
                console.log(account)
                console.log(user)
                
              if (account?.provider === 'credentials') {
                // Realizas tu lógica de redirección aquí
                return "/"; // Redirigir al home después del inicio de sesión
              }
            }
        },

        pages: {
            signIn: '/login',
            signOut: '/auth/signout',
            error: '/auth/error', // Error code passed in query string as ?error=
            verifyRequest: '/auth/verify-request', // (used for check email message)
            newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
          }
}


const handler = NextAuth(authOptions);


export { handler as GET, handler as POST};