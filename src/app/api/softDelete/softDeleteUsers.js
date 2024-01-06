import userDB from '@/models/users';

const tiempoLimiteInactivo = 60 * 1000; 
let intervalId;


export async function eliminarDatosInactivos() {
  
  try {
    console.log("Buscando datos inactivos del modelo Users...")
    const limiteTiempo = new Date(Date.now() - tiempoLimiteInactivo);
    const borrarDatosInactivos = await userDB.find({ active: false, updatedAt: { $lte: limiteTiempo } });
    
    const datosInactivos = await userDB.find({ active: false });

    if (datosInactivos.length === 0) {
        console.log("No hay más usuarios inactivos. Deteniendo el intervalo.");
        detenerIntervalo();
        return;
      }

    borrarDatosInactivos.forEach(async (user) => {
      await userDB.findByIdAndDelete(user._id);
      console.log(`Dato eliminado permanentemente: ${user._id}`);
  
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
    console.log("Intervalo iniciado del modelo Users.");
  }

