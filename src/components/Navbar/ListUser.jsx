import {
  CaretUp,
  UserCircle,
  ShoppingBag,
  ShoppingCartSimple,
  Heart,
  SignOut,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import Link from "next/link";
export default function ListUser({ userImg }) {
  return (
    <ol>
      <div className="user-navBar-menu">
        <CaretUp
          size={32}
          className="caret-up-user"
          color="#fff0ec"
          weight="fill"
        />
        <li>
          <Link href="/profile">
            <Image
              src={userImg}
              alt="user"
              width={20}
              height={20}
              className="rounded-full"
            />
            <p>Mi cuenta</p>
          </Link>
        </li>
        <li>
          <Link href="/orders">
            <ShoppingBag size={20} weight="fill" />
            <p>Mis pedidos</p>
          </Link>
        </li>
        <li>
          <Link href="/cart">
            <ShoppingCartSimple size={20} weight="fill" />
            <p>Mi carrito</p>
          </Link>
        </li>
        <li>
          <Link href="/wishlist">
            <Heart size={20} weight="fill" />
            <p>Lista de favoritos</p>
          </Link>
        </li>
        <li>
          <Link href="/logout">
            <SignOut size={20} weight="bold" />
            <p>Cerrar sesion</p>
          </Link>
        </li>
      </div>
    </ol>
  );
}
