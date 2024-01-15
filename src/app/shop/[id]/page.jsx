// pages/shop/[id].js
"use client";

import RelatedProducts from "@/components/CarouselProducts/RelatedProducts";
import { useProductStore } from "@/hooks/usePages";
import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";
import { useSession } from "next-auth/react";
import { Breadcrumbs, Rating, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import {
  Cardholder,
  CaretRight,
  Package,
  ShoppingCartSimple,
} from "@phosphor-icons/react/dist/ssr";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/svg-arrow.css";
import "react-medium-image-zoom/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./Details.css";
import {
  TippyDetailsPayment,
  TippyDetailsPickup,
} from "@/components/Tooltips/TippyDetails";
import Loading from "./loading";

const DetailProduct = () => {
  const paramsQuery = useSearchParams();
  const params = useParams();
  const id = params.id;
  const ratingQuery = paramsQuery.get("rating");

  const rating = ratingQuery ? parseInt(ratingQuery) : null;

  // Define un estado para almacenar los detalles del producto
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Función para obtener los detalles del producto desde la API
    const obtenerDetallesDelProducto = () => {
      try {
        // Realiza la llamada a la API para obtener los detalles del producto
        fetch(`/api/products/${id}`)
          .then((data) => data.json())
          .then((data) => {
            setProduct({ ...data });
          });
      } catch (error) {
        console.error("Error al obtener detalles del producto:", error);
      }
    };

    // Llama a la función para obtener los detalles del producto al montar el componente
    obtenerDetallesDelProducto();
  }, [id]); // Dependencia para que se vuelva a llamar si el ID cambia

  useEffect(() => {
    const obtenerProductosRelacionados = async () => {
      try {
        const response = await fetch("/api/products");
        const allProducts = await response.json();

        // Filtra los productos relacionados por especie y categoría
        const productosRelacionadosSpecies = allProducts.filter(
          (p) =>
            p.species[0]?.name === product?.species[0]?.name &&
            p._id !== product._id
        );

        const productosRelacionadosCategory = allProducts.filter(
          (p) =>
            p.category[0]?.name === product?.category[0]?.name &&
            p._id !== product._id
        );

        // Combina las listas de productos relacionados
        const productosRelacionados = [
          ...new Set([
            ...productosRelacionadosSpecies,
            ...productosRelacionadosCategory,
          ]),
        ];

        // Imprime en la consola los productos relacionados (para propósitos de depuración)
        // console.log("Productos relacionados:", productosRelacionados);

        setRelatedProducts(productosRelacionados);
      } catch (error) {
        console.error("Error al obtener productos relacionados:", error);
      }
    };

    // Llama a la función para obtener productos relacionados al montar el componente
    obtenerProductosRelacionados();
  }, [product]);

  const { name, price, detail, image, brand, category, species } =
    product || {};

  const addToCart = useProductStore((state) => state.addToCart);

  const { data: session, status: sessionStatus } = useSession();

  const router = useRouter();

  const handleAddToCart = () => {
    if (session && sessionStatus === "authenticated") {
      const cartProduct = {
        id,
        rating,
        name,
        price,
        detail,
        image,
        brand: product.brand?.name || "", // Extraer la marca
        category: product.category[0]?.name || "", // Extraer la primera categoría
        species: product.species[0]?.name || "", //  Extraer la primera especie
      };

      addToCart(cartProduct);
      toast.success("Producto agregado al carrito con éxito");
    } else {
      router.push("/login");
    }
  };

  const priceFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const formattedPrice = priceFormatter.format(product?.price);

  const detailSpecies = product?.species && product?.species[0]?.name;

  const detailCategory = product?.category && product?.category[0]?.name;

  // Renderiza los detalles del producto
  return (
    <div className="detail-product-container">
      <Suspense fallback={<Loading />}>
        {/* {console.log("esto es product", product)} */}
        <div className="nav-breadcrumbs">
          <Breadcrumbs
            separator={<CaretRight size={15} />}
            aria-label="breadcrumb"
          >
            <Link underline="hover" color="inherit" href="/">
              Inicio
            </Link>
            <Link underline="hover" color="inherit" href="/shop">
              Tienda
            </Link>
            <Typography color="text.primary">{product?.name}</Typography>
          </Breadcrumbs>
        </div>
        <section className="detail-product">
          <div className="detail-product-img-container">
            <Zoom>
              <Image
                src={product?.image}
                alt={product?.name}
                width={700}
                height={700}
                className="detail-product-img"
              />
            </Zoom>
          </div>
          <span className="detail-product-info">
            <div className="flex flex-col gap-1">
              <p className="category-detail">
                {product?.category && product.category[0]?.name}
              </p>
              <h1 className="title-detail">{product?.name}</h1>
              <p className="brand-detail">Marca: {product?.brand?.name}</p>
              <p className="rating-detail">
                {rating && rating}
                <Rating
                  name="read-only"
                  value={rating}
                  readOnly
                  size="small"
                  precision={0.1}
                  className="stars-detail"
                />
              </p>
            </div>
            <p className="price-detail">{formattedPrice} ARS</p>
            <div className="payment-pickup">
              <Tippy
                content={<TippyDetailsPayment />}
                arrow={true}
                delay={0}
                allowHTML={true}
                interactive={true}
              >
                <span className="cursor-help">
                  <Cardholder size={32} />
                  <p>Metodos de pago</p>
                </span>
              </Tippy>
              <Tippy
                content={<TippyDetailsPickup />}
                arrow={true}
                delay={0}
                allowHTML={true}
                interactive={true}
              >
                <span className="cursor-help">
                  <Package size={32} />
                  <p>Opciones de entrega</p>
                </span>
              </Tippy>
            </div>

            <span className="description-detail">
              <p>Sobre el producto:</p>
              <ul>
                <li>Marca: {product?.brand?.name}</li>
                <li>Descripción: {product?.detail}</li>
                <li>Especie: {product?.species && product.species[0]?.name}</li>
                <li>
                  Categoría: {product?.category && product.category[0]?.name}
                </li>
              </ul>
            </span>
            <button className="card-product-cart" onClick={handleAddToCart}>
              <ShoppingCartSimple
                size={32}
                className="card-product-cart-icon"
              />
              Añadir al carrito
            </button>
          </span>
        </section>

        <span className="related-products">
          <span className="title-related">
            Productos similares a <p>{product?.species[0]?.name}</p>
          </span>
          <RelatedProducts
            product={product}
            relatedProducts={relatedProducts}
            priceFormatter={priceFormatter}
            filter={detailSpecies}
          />
        </span>
        <span className="related-products">
          <span className="title-related">
            Productos similares a <p>{product?.category[0]?.name}</p>
          </span>
          <RelatedProducts
            product={product}
            relatedProducts={relatedProducts}
            priceFormatter={priceFormatter}
            filter={detailCategory}
          />
        </span>
        <ToastContainer position="top-center" />
      </Suspense>
    </div>
  );
};

export default DetailProduct;
