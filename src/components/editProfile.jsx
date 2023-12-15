import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { CARD_CHECKED, EMAIL_CHEKED, ID_CHECKED, SIMPLE_PASSWORD_CHECKED, INPUT_NAME_CHECKED,STREET_CHECKED,
     ZIP_CHECKED,AREA_CODE_CHECKED,CEL_CHECKED} from '@/utils/regex'

const validationSchema = Yup.object({
    name: Yup.string().required('Campo requerido').matches(
        INPUT_NAME_CHECKED,
        'Ingresar solo letras'
    ),
    lastname: Yup.string().required('Campo requerido').matches(
        INPUT_NAME_CHECKED,
        'Ingresar solo letras'
    ),
    password: Yup.string().required('Campo requerido')
    .matches(
      SIMPLE_PASSWORD_CHECKED,
      'La contraseña debe contener al menos una letra, un número y tener una longitud mínima de 8 caracteres'
    ),
    confirmPassword: Yup.string().required('Campo requerido')
    .required('Campo requerido')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),

    
  
    areaCode: Yup.string().matches(AREA_CODE_CHECKED, 'Ingrese un código de área válido').required('Campo requerido'),
    phoneNumber: Yup.string().matches(CEL_CHECKED, 'Ingrese un número de teléfono válido').required('Campo requerido'),
    email: Yup.string().required('Campo requerido').matches(
        EMAIL_CHEKED,
        'El e-mail ingresado no es válido'),  

    street: Yup.string().required('Campo requerido'),
    numStreet: Yup.string().required('Campo requerido').matches(ID_CHECKED, 'Ingrese un número válido'),
    neighborhood: Yup.string().required('Campo requerido'),
    floor: Yup.string().length(2),
    apartment: Yup.string(),
    ZIP: Yup.string().required('Campo requerido').matches(
        ZIP_CHECKED,
        'Ingrese un código postal válido'
    ),
  
    cardName: Yup.string().required('Campo requerido').required('Campo requerido').matches(INPUT_NAME_CHECKED, 'Debe ingresar solo letras'),
    ID: Yup.string().required('Campo requerido').matches(ID_CHECKED, 'Ingresar solo números'),
    cardNumber: Yup.string().required('Campo requerido').matches(
      CARD_CHECKED, 'El número ingresado no coincide con el formato de una tarjeta Visa, Mastercard o AMEX'
    ),
    date: Yup.date()
    .required('Campo requerido')
    .min(new Date(), 'Fecha no válida'),
    CVV: Yup.string().required('Campo requerido').length(3, 'CVV debe tener 3 dígitos numéricos'),
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
       <Form class="max-w-5xl mx-auto my-8 p-8 rounded shadow border border-gray-300 bg-customPrimary">

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
       <ErrorMessage name="name" component="div" style={{ color: 'red' }} />

          <Field
            name="lastname"
            label="Apellido"
            as={TextField}
            fullWidth
            disabled={!editable}
          />
<ErrorMessage name="lastname" component="div" style={{ color: 'red' }} />

        <Field
    name="password"
    type="password"
    label="Contraseña"
    as={TextField}
    fullWidth
    disabled={!editable}
  />
  <ErrorMessage name="password" component="div" style={{ color: 'red' }} />

  <Field
    name="confirmPassword"
    type="password"
    label="Confirmar Contraseña"
    as={TextField}
    fullWidth
    disabled={!editable}
  />
  <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
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
            <ErrorMessage name="areaCode" component="div" style={{ color: 'red' }} />

            <Field
              name="phoneNumber"
              label="Número de Teléfono"
              as={TextField}
              fullWidth
              disabled={!editable}
            />
        <ErrorMessage name="phoneNumber" component="div" style={{ color: 'red' }} />

          <Field
            name="email"
            label="Email"
            as={TextField}
            fullWidth
            disabled={!editable}
          />
        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />  
          </div>
          </div>

          <div class="mb-4" >
          <p class="text-xl font-bold mb-1">Dirección de Envíos:</p>
          <p class="text-sm text-gray-500 mt-1 mb-3">Para envíos fuera de CABA, contactar al vendedor</p>
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
        <ErrorMessage name="numStreet" component="div" style={{ color: 'red' }} />

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
       <ErrorMessage name="ZIP" component="div" style={{ color: 'red' }} />

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
       <ErrorMessage name="cardName" component="div" style={{ color: 'red' }} />

          <Field
            name="ID"
            label="Documento del titular sin puntos"
            as={TextField}
            fullWidth
            disabled={!editable}
          />
        <ErrorMessage name="ID" component="div" style={{ color: 'red' }} />

          <Field
            name="cardNumber"
            label="Número de la Tarjeta"
            as={TextField}
            fullWidth
            disabled={!editable}
          />
       <ErrorMessage name="cardNumber" component="div" style={{ color: 'red' }} />

          <Field
            name="date"
            type="date"
            label="Fecha de Expiración"
            InputLabelProps={{ shrink: true }}  // Esto es para que la etiqueta no cubra el texto seleccionado
            as={TextField}
            fullWidth
            disabled={!editable}
          />
        <ErrorMessage name="date" component="div" style={{ color: 'red' }} />

           <Field
            name="CVV"
            label="CVV (los tres números ubicados al dorso"
            as={TextField}
            fullWidth
            disabled={!editable}
          />
       <ErrorMessage name="CVV" component="div" style={{ color: 'red' }} />

         </div>
         </div>

         <Button
            type="submit"
            variant="outlined"
            disabled={!editable || isSubmitting || !isValid}
            style={{ borderColor: 'grey' }} 
            className={`text-black
              py-2 px-4 rounded focus:outline-none focus:shadow-outline
              active:shadow-md active:translate-y-1 block mx-auto w-1/4 mt-8 hover:bg-customSecondary`}
          >
            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileForm
