import products from "@/models/products";

//Esta constante sirve para definir el limite de tiempo del dacto inactivo, antes de ser borrado permanentemente.
//Su valor se representa en milisegundos
const tiempoLimiteInactivo = 60 * 1000; // 1 minuto en milisegundos
// const tiempoLimiteInactivo = 30 * 24 * 60 * 60 * 1000; // 30 dias en milisegundos

let intervalId;


export async function eliminarDatosInactivos() {
  
  try {
    console.log("Buscando datos inactivos del modelo Products...")
    const limiteTiempo = new Date(Date.now() - tiempoLimiteInactivo);
    const borrarDatosInactivos = await products.find({ active: false, updatedAt: { $lte: limiteTiempo } });

    const datosInactivos = await products.find({ active: false })

    if (datosInactivos.length === 0) {
        console.log("No hay más productos inactivos. Deteniendo el intervalo.");
        detenerIntervalo();
        return;
      }

    borrarDatosInactivos.forEach(async (product) => {
      await products.findByIdAndDelete(product._id);
      console.log(`Dato eliminado permanentemente: ${product._id}`);

    });
  } catch (error) {
    console.error('Error al eliminar datos inactivos:', error);
  }
}

function detenerIntervalo() {
    clearInterval(intervalId);
  }
  
  // Función para iniciar el intervalo
  export function iniciarIntervalo() {
    //intervaildId representa el intervalo de tiempo en el que la función volverá a ejecutarse para buscar datos inactivos
    //y verificar si ya cumplieron con su límite de tiempo, su valor se representa en milisegundos
    intervalId = setInterval(eliminarDatosInactivos, 30 * 1000); //30 en milisegundos
    // intervalId = setInterval(eliminarDatosInactivos, 24 * 60 * 60 * 1000); // 1 dia en milisegundos
    console.log("Intervalo iniciado del modelo Products.");
  }



