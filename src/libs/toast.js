import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast } from 'react-toastify';


export default function toastNotify(){
  const showNotify = (type,message) =>{
    const showToast = () => {
        toast[type](message, {
          position: toast.POSITION.TOP_RIGHT, // Cambia la posición si lo necesitas
          autoClose: 5000, // Duración en milisegundos, 5000ms = 5 segundos
          hideProgressBar: false, // Puedes ocultar la barra de progreso si lo prefieres
          closeOnClick: true, // Cerrar al hacer clic
          pauseOnHover: true, // Pausar al pasar el ratón sobre la notificación
          draggable: true, // Permitir arrastrar la notificación
        }); 
      };
      showToast()
  }
  return {
    showNotify,
    ToastContainer
    }
}