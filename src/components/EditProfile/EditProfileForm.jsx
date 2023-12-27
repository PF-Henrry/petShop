/* eslint-disable @next/next/no-img-element */
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {useState} from 'react'
import * as Yup from 'yup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
//import MenuItem from '@mui/material/MenuItem'
//import FormControl from '@mui/material/FormControl'
import {  EMAIL_CHECKED, PASSWORD_CHECKED, INPUT_NAME_CHECKED,
     ZIP_CHECKED,AREA_CODE_CHECKED,ONLYNUMBERS_CHECKED} from '@/utils/regex'
import { useSession } from 'next-auth/react'

const defaultImageUrl = 'http://res.cloudinary.com/kimeipetshop/image/upload/v1703619038/rzhvjkorlhzd8nkp8h6n.png'


 const validationSchema = Yup.object({
//     name: Yup.string().required('Campo requerido').matches(
//         INPUT_NAME_CHECKED,
//         'Ingresar solo letras'
//     ),
//     lastname: Yup.string().required('Campo requerido').matches(
//         INPUT_NAME_CHECKED,
//         'Ingresar solo letras'
//     ),
//     password: Yup.string().required('Campo requerido')
//     .matches(
//     PASSWORD_CHECKED,
//       'La contraseña debe contener al menos una letra, un número y tener una longitud mínima de 8 caracteres'
//     ),
//     confirmPassword: Yup.string().required('Campo requerido')
//     .required('Campo requerido')
//     .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),

    
  
//     areaCode: Yup.string().matches(AREA_CODE_CHECKED, 'Ingrese un código de área válido').required('Campo requerido'),
//     phoneNumber: Yup.string().matches(ONLYNUMBERS_CHECKED, 'Ingrese un número de teléfono válido').required('Campo requerido'),
//     email: Yup.string().required('Campo requerido').matches(
//         EMAIL_CHECKED,
//         'El e-mail ingresado no es válido'),  

//     street: Yup.string().required('Campo requerido'),
//     numStreet: Yup.string().required('Campo requerido').matches(ONLYNUMBERS_CHECKED, 'Ingrese un número válido'),
//     neighborhood: Yup.string().required('Campo requerido'),
//     floor: Yup.string().length(2),
//     apartment: Yup.string(),
//     ZIP: Yup.string().required('Campo requerido').matches(
//         ZIP_CHECKED,
//         'Ingrese un código postal válido'
//     ),
     province: Yup.string()
  
   });
  

const EditProfileForm = ({ initialValues,editable, setFieldValue, }) => {

  const { data: session } = useSession();
  const userSessionImage = session?.user?.image;
  const [selectedImage, setSelectedImage] = useState(null);
 

  //const imageUrl = userSessionImage || initialValues.image;
  const handleImageChange = (event) => {
    const file = event.target.files[0];
  
    if (file && setFieldValue) { // Verifica que setFieldValue esté definido
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          console.log('entro al try de handle');
          console.log(typeof setFieldValue); // Debería imprimir "function"
          const newImage = reader.result || userSessionImage || defaultImageUrl;
          setSelectedImage(newImage);
          setFieldValue('image', newImage);
        } catch (error) {
          console.error('Error al procesar la imagen:', error);
        }
      };
  
      reader.readAsDataURL(file);
    }
  };
  
    
  

  // const handleImageChange = (event) => {
  //   console.log('entro a handleImage')
  //   const file = event.target.files[0];
  //   console.log(file)
  //   if (file && typeof setFieldValue === 'function') {
  //     console.log('entro al if de handle')
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       try {
  //         console.log('entro al try de handle')
  //         const selectedImage = reader.result || userSessionImage || initialValues.image;
  //         setFieldValue('image', selectedImage);
  //       } catch (error) {
  //         console.error('Error al procesar la imagen:', error);
  //       }
  //     };
      
    //   reader.readAsDataURL(file);
    // }
  //};
  
  

    //const [selectedProvince, setSelectedProvince] = useState('')

    // const provinces= ['Buenos Aires',
    //     'Ciudad Autónoma de Buenos Aires',
    //     'Catamarca',
    //     'Chaco',
    //     'Chubut',
    //    'Córdoba',
    //     'Corrientes',
    //     'Entre Ríos',
    //     'Formosa',
    //     'Jujuy',
    //     'La Pampa',
    //     'La Rioja',
    //     'Mendoza',
    //     'Misiones',
    //     'Neuquén',
    //     'Río Negro',
    //     'Salta',
    //     'San Juan',
    //     'San Luis',
    //     'Santa Cruz',
    //     'Santa Fe',
    //     'Santiago del Estero',
    //     'Tierra del Fuego, Antártida e Islas del Atlántico Sur',
    //     'Tucumán']


        // const handleChange = (event) => {
        //   console.log('setValues:', setValues); 
        //   console.log('Selected Province:', event.target.value);
        //   const selectedProvinceTrimmed = event.target.value.trim();
          
        //   setValues((prevValues) => ({
        //     ...prevValues,
        //     province: selectedProvinceTrimmed,
        //   }));
        // };
        
        
        

        const onSubmit = async (values, { setSubmitting}) => {
        
          try {
            console.log('values', values)
            const response = await fetch('/api/users', {
              method: 'PUT', 
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values), 
            });
        
            if (response.ok) {              
              console.log('Datos enviados correctamente al backend');
            } else {
              console.error('Error al enviar datos al backend');
            }
          } catch (error) {
            
            console.error('Error de red al enviar datos al backend', error);
          }
        
          
          setSubmitting(false);
        };
        
       
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize // Permite reinicializar los valores cuando cambia la propiedad initialValues
    >
      {({ isSubmitting, isValid}) => (
        
       <Form className="max-w-5xl mx-auto my-8 p-8 rounded shadow border border-gray-300 bg-customPrimary">

            <div className="mb-4"  >
            <div className="flex flex-col items-center justify-center">
  
    <label htmlFor="upload-image-input">
        <img 
           name="image"
           src={userSessionImage || selectedImage || defaultImageUrl}
            alt="Imagen de perfil"
            width={250}
            height={250}
            className="rounded-full cursor-pointer"
        />
    </label>
    <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        disabled={!editable}
        id="upload-image-input"
        className="mb-2" 
    />
</div>


            
          <p className="text-xl font-bold mb-4">Datos Personales:</p>
          <div className="grid grid-cols-2 gap-4" >

          <Field
            name="name"
            label="Nombre"
            as={TextField}
            fullWidth
            disabled={!editable}
            required
         
          />
       <ErrorMessage name="name" component="div" style={{ color: 'red' }} />

          <Field
            name="lastname"
            label="Apellido"
            as={TextField}
            fullWidth
            disabled={!editable}
            required
          />
<ErrorMessage name="lastname" component="div" style={{ color: 'red' }} />

        <Field
    name="password"
    type="password"
    label="Contraseña"
    as={TextField}
    fullWidth
    disabled={!editable}
    required
  />
  <ErrorMessage name="password" component="div" style={{ color: 'red' }} />

  <Field
    name="confirmPassword"
    type="password"
    label="Confirmar Contraseña"
    as={TextField}
    fullWidth
    disabled={!editable}
    required
  />
  <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
 </div>
          
       </div>

       <div className="mb-4" >
          <p className="text-xl font-bold mb-4" >Datos de Contacto:</p>
          <div className="grid grid-cols-2 gap-4">
          <Field
              name="areaCode"
              label="Código de Área"
              as={TextField}
              fullWidth
              disabled={!editable}
              required
            />
            <ErrorMessage name="areaCode" component="div" style={{ color: 'red' }} />

            <Field
              name="phoneNumber"
              label="Número de Teléfono"
              as={TextField}
              fullWidth
              disabled={!editable}
              required
            />
        <ErrorMessage name="phoneNumber" component="div" style={{ color: 'red' }} />

          <Field
            name="email"
            label="Email"
            as={TextField}
            fullWidth
            disabled={!editable}
            required
          />
        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />  
          </div>
          </div>

          <div className="mb-4" >
          <p className="text-xl font-bold mb-1">Dirección de Envío:</p>
          <p className="text-sm text-gray-500 mt-1 mb-3">Para envíos fuera de CABA, contactar al vendedor</p>
          <div className="grid grid-cols-2 gap-4">

          <Field
            name="street"
            label="Calle"
            as={TextField}
            fullWidth
            disabled={!editable}
            required
          />

          <Field
            name="numStreet"
            label="Número"
            as={TextField}
            fullWidth
            disabled={!editable}
            required
          />
        <ErrorMessage name="numStreet" component="div" style={{ color: 'red' }} />

          <Field
            name="neighborhood"
            label="Barrio"
            as={TextField}
            fullWidth
            disabled={!editable}
            required
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
            required
          />

       <ErrorMessage name="ZIP" component="div" style={{ color: 'red' }} />

          </div>
          </div>

          <div className="mb-4" >
         
         </div>
         <div>
      {/* <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Provincia*</InputLabel>
        <Select
          name="province"
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedProvince}
          onChange={handleChange}
          autoWidth
          label="Provincia"
          disabled={!editable}
          
          
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {provinces.map((province, index) => (
            <MenuItem key={index} value={province}>
              {province}
            </MenuItem>
          ))}
          
        </Select>
        
      </FormControl> */}
       <Field
            name="province"
            label="Provincia"
            as={TextField}
            fullWidth
            disabled={!editable}
            required
          />
      <ErrorMessage name="province" component="div" style={{ color: 'red' }} />
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