import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google";
import { conn,connectDB } from "@/libs/mongodb";
import Users from "@/models/users";
import { addUser } from "@/libs/createUserWithRelation";

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

                    console.log(findUser?.img)
                    if(!findUser) throw new Error("Credenciales incorrectas")
                    if(findUser?.auth3rd) throw new Error('Account requires access through 3rd party');

                    const matchPassword = await findUser.comparePassword(credentials.password);
                    if(!matchPassword)  throw new Error("Credenciales incorrectas")
                    return {
                        id: findUser._id,
                        name: findUser.username,
                        email: findUser.email,
                        image: findUser.img,
                    }
                }
            }),
            FacebookProvider({
                clientId: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET
              }),

            GoogleProvider({
                  clientId: process.env.GOOGLE_CLIENT_ID,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET
                })

        ],
        callbacks: {
            async signIn({ user, account, profile, email, credentials }) {
                if(!conn.isConnected) connectDB()
                const findUser = await Users.findOne({email: user.email});

            if (account?.provider === 'credentials') {
                // Realizas tu lógica de redirección aquí
                if(findUser){
                    findUser.token = account.access_token
                    await findUser.save();
                }

                return true // Redirigir al home después del inicio de sesión
              }

            if(account?.provider === 'facebook'){
               
                if(findUser){
                    findUser.img = user.image
                    findUser.token =  account.access_token
                    await findUser.save();
                    return true
                } else {
                    const splitName = user.name.split(" ");
                    const name = splitName[0];
                    const lastname = splitName[1];
                    const username = user.email.split("@")[0];
                    const img = user.image
                   await addUser({
                        "name":name,
                        "lastname":lastname,
                        "img":img,
                        username,
                        password:'Predeter123!',
                        email: user.email,
                        city:'Unknown',
                        codeP:0,
                        province:'Unknown',
                        adress:'Unknown',
                        role:1,
                        auth3rd:true,
                        token:account.access_token,
                    });
                }

                return true
            }

            if(account?.provider === 'google'){
                if(findUser){
                    findUser.token =  account.access_token
                    findUser.img = user.image
                    await findUser.save();
                    return true
                } else {
                    const splitName = user.name.split(" ");
                    const name = splitName[0];
                    const lastname = splitName[1];
                    const username = user.email.split("@")[0];
                    const img = user.image
                   await addUser({
                        "name":name,
                        "lastname":lastname,
                        "img":img,
                        username,
                        password:'Primkimei123!',
                        email: user.email,
                        city:'Unknown',
                        codeP:0,
                        province:'Unknown',
                        adress:'Unknown',
                        role:1,
                        auth3rd:true,
                        token:account.access_token,
                    });
                }
                
                return true
            }

            },
            async jwt({ token, account }) {
                if (account) { 
                   
                  token.accessToken = account.access_token
                }
                return token
              },
              async session({ session, user, token }) {
               
                session.accessToken = token.accessToken
                session.user_id = token.sub
                return session
              }
        },

        pages: {
            signIn: '/login',
            signOut: '/auth/signout',
            error: '/auth/custom-error-page', // Error code passed in query string as ?error=
            verifyRequest: '/auth/verify-request', // (used for check email message)
            newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
          }
}


const handler = NextAuth(authOptions);


export { handler as GET, handler as POST};
