import { NextResponse } from "next/server";

const userRates = [
  {
    id: 1,
    rate: 5,
    opinion:
      "Excelente servicio en la petshop y la veterinaria. Los veterinarios son muy amables y atentos.",
  },
  {
    id: 2,
    rate: 4,
    opinion:
      "Buena atención en la petshop. En la veterinaria, el diagnóstico fue rápido y preciso.",
  },
  {
    id: 3,
    rate: 3,
    opinion:
      "Regular servicio en la petshop, pero la veterinaria es eficiente en el tratamiento de enfermedades comunes.",
  },
  {
    id: 4,
    rate: 5,
    opinion:
      "La petshop tiene productos de alta calidad y la veterinaria ofrece un servicio excepcional.",
  },
  {
    id: 5,
    rate: 2,
    opinion:
      "La petshop tiene poca variedad de productos y en la veterinaria el personal no fue muy amable.",
  },
  {
    id: 6,
    rate: 4,
    opinion:
      "Servicio rápido y eficiente en la petshop. La veterinaria cuenta con profesionales experimentados.",
  },
  {
    id: 7,
    rate: 5,
    opinion:
      "Recomiendo la petshop y la veterinaria. Excelente atención al cliente y cuidado de mascotas.",
  },
  {
    id: 8,
    rate: 3,
    opinion:
      "La petshop tiene precios elevados, pero la veterinaria ofrece buenos servicios médicos.",
  },
  {
    id: 9,
    rate: 4,
    opinion:
      "Productos de calidad en la petshop. La veterinaria brinda atención personalizada a cada mascota.",
  },
  {
    id: 10,
    rate: 2,
    opinion:
      "No quedé satisfecho con la atención en la petshop. La veterinaria fue aceptable.",
  },
  {
    id: 11,
    rate: 5,
    opinion:
      "Increíble servicio en la petshop y la veterinaria. Siempre encuentro lo que necesito para mi mascota.",
  },
  {
    id: 12,
    rate: 4,
    opinion:
      "Buena variedad de productos en la petshop. La veterinaria es confiable y cuida bien de los animales.",
  },
  {
    id: 13,
    rate: 3,
    opinion:
      "La petshop tiene precios justos, pero la veterinaria puede mejorar en la atención al cliente.",
  },
  {
    id: 14,
    rate: 5,
    opinion:
      "Servicio excepcional en la petshop y la veterinaria. Los empleados son amigables y conocedores.",
  },
  {
    id: 15,
    rate: 2,
    opinion:
      "La petshop carece de productos especializados. La veterinaria es promedio en sus servicios.",
  },
  {
    id: 16,
    rate: 4,
    opinion:
      "Buena atención en la petshop y la veterinaria. Siempre encuentro lo que necesito para mi mascota.",
  },
  {
    id: 17,
    rate: 5,
    opinion:
      "La petshop tiene un ambiente acogedor. La veterinaria es de confianza y ofrece servicios completos.",
  },
  {
    id: 18,
    rate: 3,
    opinion:
      "La petshop tiene precios competitivos, pero en la veterinaria hubo cierta demora en la atención.",
  },
  {
    id: 19,
    rate: 4,
    opinion:
      "Productos de calidad en la petshop. La veterinaria cuenta con un equipo profesional y dedicado.",
  },
  {
    id: 20,
    rate: 2,
    opinion:
      "La petshop no tiene una amplia selección. La veterinaria es aceptable, pero esperaba más.",
  },
  {
    id: 21,
    rate: 5,
    opinion:
      "Servicio impecable en la petshop y la veterinaria. Siempre recomendaré este lugar a otros dueños de mascotas.",
  },
  {
    id: 22,
    rate: 4,
    opinion:
      "Buena atención en la petshop. La veterinaria es confiable y ofrece soluciones efectivas.",
  },
  {
    id: 23,
    rate: 3,
    opinion:
      "La petshop podría mejorar en la variedad de productos. La veterinaria es competente en sus servicios médicos.",
  },
  {
    id: 24,
    rate: 5,
    opinion:
      "La petshop tiene un personal amigable. La veterinaria brinda un servicio integral para el cuidado de mascotas.",
  },
  {
    id: 25,
    rate: 2,
    opinion:
      "La petshop no cumplió con mis expectativas. La veterinaria fue aceptable, pero no excepcional.",
  },
  {
    id: 26,
    rate: 4,
    opinion:
      "Productos de alta calidad en la petshop. La veterinaria cuenta con profesionales capacitados y atentos.",
  },
  {
    id: 27,
    rate: 5,
    opinion:
      "La petshop tiene una amplia variedad de productos. La veterinaria es excelente en el cuidado de animales enfermos.",
  },
  {
    id: 28,
    rate: 3,
    opinion:
      "Precios justos en la petshop, pero la veterinaria podría mejorar en la puntualidad.",
  },
  {
    id: 29,
    rate: 4,
    opinion:
      "Buena atención al cliente en la petshop. La veterinaria ofrece servicios médicos competentes.",
  },
  {
    id: 30,
    rate: 2,
    opinion:
      "La petshop no cumplió con mis expectativas. La veterinaria fue aceptable, pero esperaba más.",
  },
];
export async function GET() {
  return NextResponse.json(userRates);
}


