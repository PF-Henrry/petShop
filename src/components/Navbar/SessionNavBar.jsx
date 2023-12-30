"use client";

import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import NavbarIn from "./NavBarIn";

export default function SessionNavBar() {
  return (
    <>{useSession().status === "authenticated" ? <NavbarIn /> : <Navbar />}</>
  );
}
