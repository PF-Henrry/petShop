'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { EMAIL_CHECKED, PASSWORD_CHECKED } from '@/utils/regex';
import {  useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';


const validationSchema = Yup.object({
  username: Yup.string().required('El nombre de usuario es requerido'),
  email: Yup.string()
    .required("El e-mail es requerido")
    .matches(
      EMAIL_CHECKED,
      "Formato de e-mail no válido"
    ),
  // confirmEmail: Yup.string().required('Campo requerido')
  //   .oneOf([Yup.ref('email'), null], 'El email debe coincidir'),
  password: Yup.string()
    .required("La contraseña es requerida")
    .matches(
      PASSWORD_CHECKED,
      "La contraseña debe contener al menos una mayuscula, un numero, un caracter especial y tiene que tener un min de 8 y un maximo de 15. No admite espacios"
    ),
  // confirmPassword: Yup.string().required('Campo requerido')
  //   .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
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
    console.log(values)
    try {
      // Realizar la solicitud HTTP al backend
      const response = await fetch('/api/auth/signup', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        console.log('Datos enviados correctamente al backend');
        
        await signIn("credentials",
        {email:values.email,password:values.password}, {
          redirect:false
        })
         router.push("/profile")
      } else {
        console.error('Error al enviar datos ');
        console.log(response)
      }
    } catch (error) {
      console.error('Error de red al enviar datos al backend', error);
    }
  };


  return (
    <Formik
    initialValues={{
      name:"Unknown",
      lastname:"Unknown",
      username:'',
      adress:'Unknown',
      city:'Unknown',
      province:'Unknown', 
      role:1,
      img:"http://res.cloudinary.com/kimeipetshop/image/upload/v1703619038/rzhvjkorlhzd8nkp8h6n.png",
      email:"",
      password:"",
      codeP:1234

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
              required
            />
            <ErrorMessage name="username" component="div" style={{ color: 'red' }} />

            <Field
              name="email"
              label="Email"
              as={TextField}
              fullWidth
              required
            />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />

            {/* <Field
              name="confirmEmail"
              type="text"
              label="Confirmar E-mail"
              as={TextField}
              fullWidth
              required
            />
            <ErrorMessage name="confirmEmail" component="div" style={{ color: 'red' }} /> */}

            <Field
              name="password"
              type="text"
              label="Contraseña"
              as={TextField}
              fullWidth
              required
            />
            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />

            {/* <Field
              name="confirmPassword"
              type="password"
              label="Confirmar Contraseña"
              as={TextField}
              fullWidth
              required
            />
            <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} /> */}
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
            disabled={isSubmitting }
            style={{ borderColor: 'grey' }}
            className={`text-black
              py-2 px-4 rounded focus:outline-none focus:shadow-outline
              active:shadow-md active:translate-y-1 block mx-auto w-1/4 mt-8 hover:bg-customSecondary`}
          >
            Registrarse
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
