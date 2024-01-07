import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RelatedProducts({
  product,
  relatedProducts,
  priceFormatter,
  filter,
}) {
  function NextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        size={32}
        className={`${className} nextArrow`}
        onClick={onClick}
      ></div>
    );
  }

  function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        size={32}
        className={`${className} prevArrow`}
        onClick={onClick}
      ></div>
    );
  }

  var confiSlider = {
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  //   console.log(filter);
  return (
    <>
      {filter === product?.species[0]?.name && (
        <Slider {...confiSlider} className="slider-related">
          {relatedProducts
            .filter(
              (relatedProducts) =>
                relatedProducts?.species[0]?.name === product?.species[0]?.name
            )
            .sort(
              (a, b) => relatedProducts.indexOf(b) - relatedProducts.indexOf(a)
            )
            .map((relatedProduct, index) => (
              <div key={index} className="related-product-card">
                <Link
                  href={`/shop/${relatedProduct?._id}?rating=${relatedProduct?.rating}`}
                >
                  <span className="related-product-img">
                    <Image
                      src={relatedProduct?.image}
                      alt={relatedProduct?.name}
                      width={200}
                      height={200}
                    />
                  </span>
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
      )}

      {filter === product?.category[0]?.name && (
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
                  <span className="related-product-img">
                    <Image
                      src={relatedProduct?.image}
                      alt={relatedProduct?.name}
                      width={200}
                      height={200}
                    />
                  </span>
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
      )}
    </>
  );
}
