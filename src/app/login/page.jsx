'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import {  useRouter } from 'next/navigation';
import { EMAIL_CHECKED, PASSWORD_CHECKED } from '@/utils/regex'
import {signIn} from 'next-auth/react';
import toastNotify from '@/libs/toast';
 

const validationSchema = Yup.object({
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

const Login = ({ initialValues, onSubmit }) => {
  const router = useRouter();
  const {showNotify,ToastContainer} = toastNotify();

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    }
   


  const handleOnSubmit = async (values) => {
    try {
      const res = await signIn("credentials",{...values,redirect: false});
      
     if(res.ok){
      localStorage.setItem('ToasNotify',JSON.stringify({type:"success",message:"login success"}))
      router.push("/");}
     else showNotify("error",res.error)
    } catch (error) {
      showNotify("error",error.message)
    }
  };
  const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleOnSubmit(); 
         }
       }

return (
<div className="max-w-2xl mx-auto my-8 p-8 rounded shadow border border-gray-300 bg-customPrimary sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3" >
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">Iniciá Sesión para Comenzar:</h1>
      </div>

      <div className="grid gap-2 ">


        <div className="flex flex-col items-center justify-center space-y-6 mt-14 gap-1">
        <button type="button" className="max-w-md flex items-center mb-2 justify-center transition ease-in-out delay-50 px-3 py-2.5 space-x-2
 bg-white border border-slate-600 rounded-md hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:ring-opacity-50 ">

         <svg viewBox="0 0 48 48" width="35" height="24" version="1.1" xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" 
        strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs>
         <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" 
         transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> 
         <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </g></svg>
        <span className="text-gray-700 font-medium">Continuar con Google</span>
        </button>

        <button type="button" className="max-w-md flex items-center mb-2 justify-center transition ease-in-out delay-50 px-3 py-2.5 space-x-2
         bg-white border border-slate-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-gray-600 focus:ring-opacity-50">
        <svg width="24" height="26" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#3b5998" >
<path d="M480,257.35c0-123.7-100.3-224-224-224s-224,100.3-224,224c0,111.8,81.9,204.47,189,221.29V322.12H164.11V257.35H221V208c0-56.13,33.45-87.16,84.61-87.16,24.51,0,50.15,4.38,50.15,4.38v55.13H327.5c-27.81,0-36.51,17.26-36.51,35v42h62.12l-9.92,64.77H291V478.66C398.1,461.85,480,369.18,480,257.35Z" fillRule="evenodd"></path>
</svg>
        <span className="text-gray-700 font-medium">Continuar con Facebook</span>
        </button>

        </div>
      </div>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit || handleOnSubmit}
        onKeyDown={handleKeyDown}
      >
        {({ isSubmitting, isValid }) => (
          <Form >
            <h2 className="text-xl font-bold text-center mt-8">O ingresá con tu e-mail:</h2>
            <div className="grid gap-2">
              <div className="flex flex-col items-center justify-center space-y-6 mt-14 gap-1">
                <Field
                  name="email"
                  label="Email"
                  as={TextField}
                  fullWidth
                  required
                />
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
                  }}
                />
                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
              </div>
            </div>

            <div className="flex justify-center gap-4 font-semibold mt-2">
              <p>¿No tienes cuenta?</p>
              <Link className="hover:text-customSecondary transition-colors duration-300" href="/signup">
                Iniciá Sesión
              </Link>
            </div>

            <Button
              type="submit"
              variant="outlined"
              disabled={isSubmitting || !isValid}
              style={{ borderColor: 'grey' }}
              className={`text-black
                py-2 px-4 rounded focus:outline-none focus:shadow-outline
                active:shadow-md active:translate-y-1 block mx-auto w-full mt-8 hover:bg-customSecondary max-w-md`}
            >
              Iniciar Sesión
            </Button>
          </Form>
        )}
      </Formik>
      <ToastContainer/>
    </div>
  );
};


export default Login