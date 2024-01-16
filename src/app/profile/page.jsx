'use client'
import React, { useState, useEffect } from 'react';
import EditProfileForm from '../../components/EditProfile/EditProfileForm';


const Profile = () => {
    const [editable, setEditable] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

 
    const initialValues = {
      img:'',
      name: '',
      lastname: '',
      username: '',
      password:'',
      email: '',
      adress: '',
      codeP: '',
      province: '',
      city:''
    };

   

    useEffect(() => {
      setShowSuccessMessage(false); 
    }, [editable]);
   
    const handleSubmit = async (values, { setSubmitting }) => {
      try {
       
        setShowSuccessMessage(true);
  

      } catch (error) {
        console.error('Error submitting changes:', error);
      } finally {
        setSubmitting(false);
        setEditable(false); 
      }
    };
  
  
    const handleEditClick = () => {
      setEditable(!editable); // Cambia el estado de editable al hacer clic
    };
  
    return (
      <><div>
        <h1 className="text-3xl font-bold mb-6 flex items-center justify-center">Datos del Perfil</h1>
        <button
          className={`block mx-auto py-2 px-4 rounded ${editable ? 'bg-red-500' : 'bg-green-500'} text-white`}
          onClick={handleEditClick}
        >
          {editable ? 'Cancelar' : 'Editar'}
        </button>


        {showSuccessMessage && (
          <div className="bg-green-500 text-white py-2 px-4 mt-4 rounded text-center">
            Cambios guardados exitosamente.
            Haga click en cancelar para salir del modo de edición.
          </div>
        )}

        <EditProfileForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          editable={editable}
          setShowSuccessMessage={setShowSuccessMessage} 
         
          />
      </div><button
        className={`block mx-auto py-2 px-4 rounded ${editable ? 'bg-red-500' : 'bg-green-500'} text-white`}
        onClick={handleEditClick}
      >
          {editable ? 'Cancelar' : 'Editar'}
        </button></>
    );
  };
  
  export default Profile