import favorite from '@/models/favorite';

const tiempoLimiteInactivo = 30 * 1000; 
let intervalId;


export async function eliminarDatosInactivos() {
  
  try {
    console.log("Buscando datos inactivos del modelo Favorites...")
    const limiteTiempo = new Date(Date.now() - tiempoLimiteInactivo);
    const borrarDatosInactivos = await favorite.find({ active: false, updatedAt: { $lte: limiteTiempo } });

    const datosInactivos = await products.find({ active: false })

    if (datosInactivos.length === 0) {
        console.log("No hay más favoritos inactivos. Deteniendo el intervalo.");
        detenerIntervalo();
        return;
      }

    borrarDatosInactivos.forEach(async (fav) => {
      await favorite.findByIdAndDelete(fav._id);
      console.log(`Dato eliminado permanentemente: ${fav._id}`);
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
    intervalId = setInterval(eliminarDatosInactivos, 30 * 1000);
    console.log("Intervalo iniciado del modelo Favorites.");
  }

