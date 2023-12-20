import logo from "@/public/assets/logoNav.png";
import { jomhuria } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import { List } from "@phosphor-icons/react/dist/ssr";
import "./Navbar.css";
  
export default function Navbar() {
  return (
    <nav className="absolute bg-[#DABEB6] w-full top-0 flex px-20 items-center justify-between flex-wrap">
      <span>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <List size={32} />
        </label>
      </span>
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
            <Link href="/login" className="link">
              Entrar/Registrar
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
