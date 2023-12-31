import favorite from '@/models/favorite';

const tiempoLimiteInactivo = 30 * 1000; 
let intervalId;


export async function eliminarDatosInactivos() {
  console.log("Estoy en eliminar datos inactivos")
  try {
    console.log("Buscando datos inactivos del modelo Favorites...")
    const limiteTiempo = new Date(Date.now() - tiempoLimiteInactivo);
    const datosInactivos = await favorite.find({ active: false, updatedAt: { $lte: limiteTiempo } });

    if (datosInactivos.length === 0) {
        console.log("No hay más favoritos inactivos. Deteniendo el intervalo.");
        detenerIntervalo();
        return;
      }

    datosInactivos.forEach(async (fav) => {
      await favorite.findByIdAndDelete(fav._id);
      console.log(`Dato eliminado permanentemente: ${fav._id}`);
  
    //   const masDatos = await userDB.find({ active: false })

    //   if (masDatos.length === 0) {
    //     console.log("No hay más usuarios inactivos. Deteniendo el intervalo.");
    //     detenerIntervalo();
    //     return;
    //   }
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
    console.log("Intervalo iniciado.");
  }



  
  // Iniciar el intervalo por primera vez