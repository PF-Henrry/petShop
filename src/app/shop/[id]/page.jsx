// pages/shop/[id].js
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useProductStore } from "@/hooks/usePages";
import Image from "next/image";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";
import Slider from "react-slick";
import { useSession } from "next-auth/react";
import { Breadcrumbs, Rating, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import {
  Cardholder,
  CaretRight,
  Package,
  ShoppingCartSimple,
} from "@phosphor-icons/react/dist/ssr";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-medium-image-zoom/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./Details.css";

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
      const product = {
        id,
        rating,
        name,
        price,
        detail,
        image,
        brand,
        category,
        species,
      };

      addToCart(product);
      toast.success("Producto agregado al carrito con éxito");
    } else {
      router.push("/login");
    }
  };

  if (!product) {
    // Puedes mostrar un indicador de carga o un mensaje mientras se obtienen los detalles del producto
    return <p>Cargando...</p>;
  }

  const priceFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const formattedPrice = priceFormatter.format(product.price);

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        size={32}
        className={`${className} nextArrow`}
        onClick={onClick}
      ></div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        size={32}
        className={`${className} prevArrow`}
        onClick={onClick}
      ></div>
    );
  }

  const confiSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Renderiza los detalles del producto
  return (
    <div className="detail-product-container">
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
          <div className="flex gap-1 flex-col">
            <p className="category-detail">
              {product.category && product.category[0]?.name}
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
            <span>
              <Cardholder size={32} />
              Metodos de pago
            </span>
            <span>
              <Package size={32} />
              Opciones de entrega
            </span>
          </div>

          <span className="description-detail">
            <p>Sobre el producto:</p>
            <ul>
              <li>Marca: {product?.brand?.name}</li>
              <li>Descripción: {product?.detail}</li>
              <li>Especie: {product.species && product.species[0]?.name}</li>
              <li>
                Categoría: {product.category && product.category[0]?.name}
              </li>
            </ul>
          </span>
          <button className="card-product-cart" onClick={handleAddToCart}>
            <ShoppingCartSimple size={32} className="card-product-cart-icon" />
            Añadir al carrito
          </button>
        </span>
      </section>

      <span className="related-products">
        <p className="title-related">Más de {product?.species[0]?.name}:</p>
        <Slider {...confiSlider} className="slider-related">
          {relatedProducts
            .filter(
              (relatedProduct) =>
                relatedProduct.species[0]?.name === product?.species[0]?.name
            )
            .sort(
              (a, b) => relatedProducts.indexOf(b) - relatedProducts.indexOf(a)
            )
            .map((relatedProduct, index) => (
              <div key={index} className="related-product-card">
                <Link
                  href={`/shop/${relatedProduct?._id}?rating=${relatedProduct?.rating}`}
                >
                  <Image
                    src={relatedProduct?.image}
                    alt={relatedProduct?.name}
                    width={200}
                    height={200}
                  />
                  <section className="related-product-info">
                    <p className="category-related">
                      {relatedProduct?.category[0]?.name} para{" "}
                      {relatedProduct?.species[0]?.name}
                    </p>
                    <span className="related-product-info-name">
                      <p className="name-related">{relatedProduct?.name}</p>
                      <p className="brand-related">
                        {relatedProduct?.brand?.name}
                      </p>
                    </span>

                    <p className="price-detail">
                      {priceFormatter.format(relatedProduct?.price)} ARS
                    </p>
                  </section>
                </Link>
              </div>
            ))}
        </Slider>
      </span>
      <span className="related-products mt-8">
        <p className="title-related">Más de {product?.category[0]?.name}:</p>

        <Slider {...confiSlider} className="slider-related">
          {relatedProducts
            .filter(
              (relatedProduct) =>
                relatedProduct.category[0]?.name === product?.category[0]?.name
            )
            .map((relatedProduct, index) => (
              <div key={index} className="related-product-card">
                <Link
                  href={`/shop/${relatedProduct?._id}?rating=${relatedProduct?.rating}`}
                >
                  <Image
                    src={relatedProduct?.image}
                    alt={relatedProduct?.name}
                    width={200}
                    height={200}
                  />
                  <section className="related-product-info">
                    <p className="category-related">
                      {relatedProduct?.category[0]?.name} para{" "}
                      {relatedProduct?.species[0]?.name}
                    </p>
                    <span className="related-product-info-name">
                      <p className="name-related">{relatedProduct?.name}</p>
                      <p className="brand-related">
                        {relatedProduct?.brand?.name}
                      </p>
                    </span>

                    <p className="price-detail">
                      {priceFormatter.format(relatedProduct?.price)} ARS
                    </p>
                  </section>
                </Link>
              </div>
            ))}
        </Slider>
      </span>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default DetailProduct;
