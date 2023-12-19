
import React, {useState} from 'react';
import Button from '@mui/material/Button'
//import toastNotify from '@/libs/toast';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; 
  box-shadow:  rgba(100,100,111,0.2) 0px 7px 29px 0px;
`;


const Logout = () => {
 
  //const {showNotify,ToastContainer} = toastNotify();
  const [isModalOpen, setModalOpen] = useState(false);



   const handleLogout = async () => {
//     try {
    
//       const res = await logOut({ redirect: false });
  
//       if (res.ok) {
       
//         localStorage.removeItem('ToasNotify',JSON.stringify({type:"success",message:"Gracias por visitarnos!"}));
        
//         router.push('/login');
//       } else {
       
//         showNotify('error', 'Error al cerrar la sesión');
//       }
setModalOpen(false)
//     } catch (error) {
      
//       showNotify('error', error.message);
//     }
  }

  const handleConfirm = () => {
    handleLogout();
  };

  const handleCancel = () => {
    setModalOpen(false)
    
  };

  return (
    <div className="flex items-center justify-center h-screen ">     

      {isModalOpen && (
        <ModalBackdrop>
          <div className="text-center flex flex-col items-center p-8 rounded shadow border border-gray-300 bg-customPrimary relative">
            <button onClick={handleCancel} className="absolute top-2 right-2  cursor-pointer">❌</button>
            <p className="mb-4 text-3xl  font-bold p-2">¿Ya te vas?</p>
            <div className="flex gap-4">
              <Button
                type="submit"
                variant="outlined"
                onClick={handleConfirm}
                style={{ borderColor: 'grey' }}
                className={`text-black
                  py-2 px-4 rounded focus:outline-none focus:shadow-outline
                  active:shadow-md active:translate-y-1 block mx-auto  mt-8 hover:bg-customSecondary w-40 text-lg`}
              >
                Sí, Salir
              </Button>
              <Button
                type="button"  
                variant="outlined"
                onClick={handleCancel}
                style={{ borderColor: 'grey' }}
                className={`text-black
                  py-2 px-4 rounded focus:outline-none focus:shadow-outline
                  active:shadow-md active:translate-y-1 block mx-auto  mt-8 hover:bg-customSecondary w-40 text-lg`}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </ModalBackdrop>
      )}
     {/* <ToastContainer /> */}
    </div>
  );
}

export default Logout;
