'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { EMAIL_CHECKED, PASSWORD_CHECKED } from '@/utils/regex';
import {  useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
  username: Yup.string().required('El nombre de usuario es requerido'),
  email: Yup.string()
    .required("El e-mail es requerido")
    .matches(
      EMAIL_CHECKED,
      "Formato de e-mail no válido"
    ),

  password: Yup.string()
    .required("La contraseña es requerida")
    .matches(
      PASSWORD_CHECKED,
      "La contraseña debe contener al menos una mayuscula, un numero, un caracter especial y tiene que tener un min de 8 y un maximo de 15. No admite espacios"
    ),
 
});

const Signup = ({ initialValues, onSubmit }) => {
 const router = useRouter()
 const { data: session, status } = useSession();

  useEffect(()=>{
    if (status === "authenticated"){
      router.push('/profile')
    } 
  },[router, status])
  

  const handleOnSubmit = async (values) => {
    console.log(values);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        console.log('Datos enviados correctamente al backend');
  
        await signIn("credentials", { email: values.email, password: values.password }, { redirect: false })
        router.push("/profile");
      } else {
        console.error('Error al enviar datos ', response);
  
        if (response.status === 404) {          
          const responseBody = await response.json();
      console.log(responseBody)
            toast.error('El nombre de usuario o el correo electrónico ya existen.');
        }
      }
    } catch (error) {
      console.error('Error de red al enviar datos al backend', error);
    }
  };
  
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <><Formik
      initialValues={{
        username: '',
        email: "",
        password: "",
        name: "Unknown",
        lastname: "Unknown",
        adress: 'Unknown',
        city: 'Unknown',
        province: 'Unknown',
        role: 1,
        img: "http://res.cloudinary.com/kimeipetshop/image/upload/v1703619038/rzhvjkorlhzd8nkp8h6n.png",
        codeP: 1234
      }}

      validationSchema={validationSchema}
      onSubmit={onSubmit || handleOnSubmit}
      enableReinitialize
    >
      {({ isSubmitting, isValid }) => (
        <Form className="max-w-2xl mx-auto my-8 p-8 rounded shadow border border-gray-300 bg-customPrimary">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold">Registro:</h1>
          </div>

          <div className="grid gap-2">
            <Field
              name="username"
              label="Nombre de Usuario"
              as={TextField}
              fullWidth
              required />
            <ErrorMessage name="username" component="div" style={{ color: 'red' }} />

            <Field
              name="email"
              label="Email"
              as={TextField}
              fullWidth
              required />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />

            <Field
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Contraseña"
              as={TextField}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <div
                    onClick={handleTogglePassword}
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </div>
                ),
              }} />
            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />


          </div>

          <div className="flex justify-center gap-4 font-semibold mt-2">
            <p>¿Ya tienes cuenta?</p>
            <Link className="hover:text-customSecondary transition-colors duration-300" href="/login">
              Iniciá Sesión
            </Link>
          </div>

          <Button
            type="submit"
            variant="outlined"
            disabled={isSubmitting}
            style={{ borderColor: 'grey' }}
            className={`text-black
              py-2 px-4 rounded focus:outline-none focus:shadow-outline
              active:shadow-md active:translate-y-1 block mx-auto w-1/4 mt-8 hover:bg-customSecondary`}
          >
            Registrarse
          </Button>
        </Form>
      )}
    </Formik><ToastContainer position="bottom-right" /></>
  );
};

export default Signup;