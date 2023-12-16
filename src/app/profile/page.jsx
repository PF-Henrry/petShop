'use client'
import React, { useState, useEffect } from 'react';
import EditProfileForm from '../../components/EditProfile/EditProfileForm';

const Profile = () => {
    const [editable, setEditable] = useState(false);
    

    const initialValues = {
      name: '',
      lastname: '',
      password:'',
      confirmPassword:'',
      ID: '',
      areaCode:'',
      phoneNumber: '',
      email: '',
      street: '',
      numStreet: '',
      neighborhood: '',
      floor: '',
      apartment: '',
      ZIP: '',
      province: '',
    };
  
    const handleSubmit = (values, { setSubmitting }) => {
      // Lógica para manejar la subida de datos
      console.log('Valores enviados:', values);
      setSubmitting(false);
      setEditable(false); // Desactiva la edición después de guardar
    };
  
    const handleEditClick = () => {
      setEditable(!editable); // Cambia el estado de editable al hacer clic
    };
  
    return (
      <div>
        <h1 class="text-3xl font-bold mb-6 flex items-center justify-center">Datos del Perfil</h1>
        <button
    className={`block mx-auto py-2 px-4 rounded ${
      editable ? 'bg-red-500' : 'bg-green-500'
    } text-white`}
    onClick={handleEditClick}
  >
    {editable ? 'Cancelar' : 'Editar'}
  </button>
        <EditProfileForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          editable={editable}
        />
      </div>
    );
  };
  
  export default Profile
