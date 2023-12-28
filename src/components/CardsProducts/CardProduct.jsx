"use client";

import Image from "next/image";

export default function CardProduct({
  name,
  price,
  detail,
  image,
  brand,
  category,
}) {
  const imageUrl = image ? image : "https://via.placeholder.com/150";

  return (
    <div className="card">
      <h1>{name}</h1>
      <p>{price}</p>
      <p>{detail}</p>
      <p>{brand}</p>
      <p>{category}</p>
      <Image src={imageUrl} alt={name} width={150} height={150} />
    </div>
  );
}
