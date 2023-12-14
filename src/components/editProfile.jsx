import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { CARD_CHECKED, EMAIL_FILLED_CHEKED, ID_CHECKED, SIMPLE_PASSWORD_CHECKED, INPUT_NAME_CHECKED,STREET_CHECKED,
     ZIP_CHECKED,AREA_CODE_CHECKED,CEL_CHECKED} from '@/utils/regex'

const validationSchema = Yup.object({
    name: Yup.string().matches(
        INPUT_NAME_CHECKED,
        'Ingresar solo letras'
    ),
    lastname: Yup.string().matches(
        INPUT_NAME_CHECKED,
        'Ingresar solo letras'
    ),
    password: Yup.string()
    .matches(
      SIMPLE_PASSWORD_CHECKED,
      'La contraseña debe contener al menos una letra, un número y tener una longitud mínima de 8 caracteres'
    ),
    confirmPassword: Yup.string()
    .required('Campo requerido')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),

    
  
    areaCode: Yup.string().matches(AREA_CODE_CHECKED, 'Ingrese un código de área válido'),
    phoneNumber: Yup.string().matches(CEL_CHECKED, 'Ingrese un número de teléfono válido'),
    email: Yup.string().matches(
        EMAIL_FILLED_CHEKED,
        'El e-mail ingresado no es válido'),  

    street: Yup.string().matches(STREET_CHECKED),
    numStreet: Yup.string().matches(ID_CHECKED),
    neighborhood: Yup.string(),
    floor: Yup.string().length(2),
    apartment: Yup.string(),
    ZIP: Yup.string().matches(
        ZIP_CHECKED,
        'Ingrese un código postal válido'
    ),
  
    cardName: Yup.string().required('Campo requerido'),
    ID: Yup.string().matches(ID_CHECKED),
    cardNumber: Yup.string().required('Campo requerido').matches(
      CARD_CHECKED
    ),
    date: Yup.string().required('Campo requerido'),
    CVV: Yup.string().required('Campo requerido').length(3, 'CVV debe tener 3 dígitos'),
  });
  

const EditProfileForm = ({ initialValues, onSubmit, editable }) => {

    // const handleCreditCardSubmit = (creditCardData) => {
    //     console.log('Información de la tarjeta de crédito:', creditCardData);
      
    //   };
      
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize // Permite reinicializar los valores cuando cambia la propiedad initialValues
    >
      {({ isSubmitting, isValid }) => (
       <Form class="max-w-5xl mx-auto my-8 p-8 rounded shadow border border-gray-300 bg-primary">

            <div class="mb-4"  >
          <p class="text-xl font-bold mb-4">Datos Personales:</p>
          <div class="grid grid-cols-2 gap-4" >
          <Field
            name="name"
            label="Nombre"
            as={TextField}
            fullWidth
            disabled={!editable}
          />

          <Field
            name="lastname"
            label="Apellido"
            as={TextField}
            fullWidth
            disabled={!editable}
          />

        <Field
    name="password"
    type="password"
    label="Contraseña"
    as={TextField}
    fullWidth
    disabled={!editable}
  />
  
  <Field
    name="confirmPassword"
    type="password"
    label="Confirmar Contraseña"
    as={TextField}
    fullWidth
    disabled={!editable}
  />
 </div>
          
       </div>

       <div class="mb-4" >
          <p class="text-xl font-bold mb-4" >Datos de Contacto:</p>
          <div class="grid grid-cols-2 gap-4">
          <Field
              name="areaCode"
              label="Código de Área"
              as={TextField}
              fullWidth
              disabled={!editable}
            />

            <Field
              name="phoneNumber"
              label="Número de Teléfono"
              as={TextField}
              fullWidth
              disabled={!editable}
            />

          <Field
            name="email"
            label="Email"
            as={TextField}
            fullWidth
            disabled={!editable}
          />
          </div>
          </div>

          <div class="mb-4" >
          <p class="text-xl font-bold mb-4">Dirección de Envíos:</p>
          <div class="grid grid-cols-2 gap-4">
          <Field
            name="street"
            label="Calle"
            as={TextField}
            fullWidth
            disabled={!editable}
          />

          <Field
            name="numStreet"
            label="Número"
            as={TextField}
            fullWidth
            disabled={!editable}
          />

          <Field
            name="neighborhood"
            label="Barrio"
            as={TextField}
            fullWidth
            disabled={!editable}
          />

          <Field
            name="floor"
            label="Piso"
            as={TextField}
            fullWidth
            disabled={!editable}
          />

          <Field
            name="apartment"
            label="Dpto"
            as={TextField}
            fullWidth
            disabled={!editable}
          />
          <Field
            name="ZIP"
            label="Código Postal"
            as={TextField}
            fullWidth
            disabled={!editable}
          />
          </div>
          </div>

          <div class="mb-4" >
          <p class="text-xl font-bold mb-4">Añadir Tarjeta:</p>

        <div class="grid grid-cols-2 gap-4" >
          <Field
            name="cardName"
            label="Nombre del titular como figura en la tarjeta"
            as={TextField}
            fullWidth
            disabled={!editable}
          />

          <Field
            name="ID"
            label="Documento del titular sin puntos"
            as={TextField}
            fullWidth
            disabled={!editable}
          />

          <Field
            name="cardNumber"
            label="Número de la Tarjeta"
            as={TextField}
            fullWidth
            disabled={!editable}
          />

          <Field
            name="date"
            type="date"
            label="Fecha de Expiración"
            InputLabelProps={{ shrink: true }}  // Esto es para que la etiqueta no cubra el texto seleccionado
            as={TextField}
            fullWidth
            disabled={!editable}
          />

           <Field
            name="CVV"
            label="CVV"
            as={TextField}
            fullWidth
            disabled={!editable}
          />
         </div>
         </div>

         <Button
            type="submit"
            variant="outlined"
            disabled={!editable}
            style={{ borderColor: 'grey' }} 
            className={`text-black
              py-2 px-4 rounded focus:outline-none focus:shadow-outline
              active:shadow-md active:translate-y-1 block mx-auto w-1/4 mt-8 hover:bg-secondary`}
          >
            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileForm;
