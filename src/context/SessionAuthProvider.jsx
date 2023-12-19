"use client"

import { SessionProvider } from "next-auth/react";


function SessionAuthProvider({children}){

return(
<SessionProvider>
    {children}
</SessionProvider>
)
}

export default SessionAuthProvider

 