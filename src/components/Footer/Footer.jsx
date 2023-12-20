import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logoNav.png";
import { jomhuria } from "@/app/layout";
import ToTopBtnFooter from "./ToTopBtn";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  LinkedinLogo,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr";
import "./footer.css";
 
export default function Footer() {
  return (
    <footer className="bottom-0 w-full text-black flex flex-col items-center justify-center mt-4">
      <div className="backToTop">
        <ToTopBtnFooter />
      </div>

      <section className="info flex flex-wrap flex-row gap-y-8 gap-x-32 p-8 justify-start">
        <div>
          <p>Con&oacute;cenos</p>
          <ul>
            <li>
              <Link href="/about">Quienes somos</Link>
            </li>
            <li>
              <Link href="/contact">Trabaja con nosotros</Link>
            </li>
            <li>
              <details className="detail">
                <summary>
                  Redes sociales
                  <CaretDown size={12} className="detail-caret inline" />
                </summary>
                <ol>
                  <li>
                    <Link href="https://www.facebook.com/">
                      <FacebookLogo size={20} className="inline" />
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.instagram.com/">
                      <InstagramLogo size={20} className="inline" />
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.twitter.com/">
                      <TwitterLogo size={20} className="inline" />
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.linkedin.com/">
                      <LinkedinLogo size={20} className="inline" />
                      Linkedin
                    </Link>
                  </li>
                </ol>
              </details>
            </li>
            <li>
              <Link href="/contact">Contactanos</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>Te ayudamos</p>
          <ul>
            <li>
              <Link href="/faq">Como comprar</Link>
            </li>
            <li>
              <Link href="/adopt">Como adoptar</Link>
            </li>
            <li>
              <Link href="/donate">Donar</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>M&eacute;todos de pago</p>
          <ul>
            <li>
              <Link href="/payment">Tarjetas de credito</Link>
            </li>
            <li>
              <Link href="/payment">Tarjetas de debito</Link>
            </li>
            <li>
              <Link href="/payment">Efectivo</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="credits">
        <div className="footer-logo-container">
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
            className="object-contain img"
          />
          <p className={`${jomhuria.className} text-4xl text-[#143146]`}>
            KIMEY
          </p>
        </div>
        <div>© 2023. Todos los derechos reservados.</div>
      </section>
    </footer>
  );
}
