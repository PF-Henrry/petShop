import logo from "@/public/assets/logoNav.png";
import { jomhuria } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="absolute bg-[#DABEB6] w-full top-0 flex px-20 items-center justify-between flex-wrap">
      <div className="flex justify-center items-center gap-2">
        <Image src={logo} alt="logo" width={100} height={100} />
        <p className={`${jomhuria.className} text-[5rem] text-[#143146]`}>
          KIMEI
        </p>
      </div>
      <div className="flex flex-wrap gap-20 items-center text-[#143146] relative">
        <ul className="nav-links flex items-center gap-20">
          <li>
            <Link href="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/" className="link">
              Tienda
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="text-[#143146] font-semibold text-sm bg-[#E3D4D0] p-4 rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.15)] duration-300 hover:bg-[#f1dad3] hover:text-[#224e6e]"
            >
              Entrar/Registrar
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
