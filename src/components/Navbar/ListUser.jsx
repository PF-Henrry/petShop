import {
  CaretUp,
  ShoppingBag,
  ShoppingCartSimple,
  Heart,
  SignOut,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
const defaultImage =
  "http://res.cloudinary.com/kimeipetshop/image/upload/v1703619038/rzhvjkorlhzd8nkp8h6n.png";

export default function ListUser({ handleCloseMenu, userImg }) {
  const { data: session } = useSession();

  //const userImg = session?.user?.image;

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
          <Link href="/profile" onClick={handleCloseMenu}>
            <Image
              src={userImg || defaultImage}
              alt="user"
              width={20}
              height={20}
              className="rounded-full"
            />
            <p>Mi cuenta</p>
          </Link>
        </li>
        <li>
          <Link href="/orders" onClick={handleCloseMenu}>
            <ShoppingBag size={20} weight="fill" />
            <p>Mis pedidos</p>
          </Link>
        </li>
        <li>
          <Link href="/cart" onClick={handleCloseMenu}>
            <ShoppingCartSimple size={20} weight="fill" />
            <p>Mi carrito</p>
          </Link>
        </li>
        <li>
          <Link href="/favorites" onClick={handleCloseMenu}>
            <Heart size={20} weight="fill" />
            <p>Lista de favoritos</p>
          </Link>
        </li>
        <li>
          <Link href="/logout" onClick={handleCloseMenu}>
            <SignOut size={20} weight="bold" />
            <p>Cerrar sesion</p>
          </Link>
        </li>
      </div>
    </ol>
  );
}
