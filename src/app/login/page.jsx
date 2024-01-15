"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { EMAIL_CHECKED, PASSWORD_CHECKED } from "@/utils/regex";
import toastNotify from "@/libs/toast";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import "./Login.css";
import { SignIn } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email requerido*")
    .matches(EMAIL_CHECKED, "Email no válido"),

  password: Yup.string()
    .required("Contraseña requerida*")
    .matches(
      PASSWORD_CHECKED,
      "Contraseña de 8 a 15 caracteres con al menos una mayúscula, un número, y un carácter especial, sin espacios."
    ),
});

const Login = ({ initialValues, onSubmit }) => {
  const { showNotify, ToastContainer } = toastNotify();
  const router = useRouter();
  const { status } = useSession();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (status === "authenticated" || status === "loading")
      router.push("/logout");
  }, [status, router]);

  const handleClick = async (e, provider) => {
    e.preventDefault();
    await loginAuth(provider);
  };

  const loginAuth = async (provider) => {
    let res;
    if (provider === "google") {
      res = await signIn("google", { callbackUrl: "http://localhost:3000/" });
      localStorage.setItem(
        "ToasNotify",
        JSON.stringify({ type: "success", message: "login success" })
      );
    } else if (provider === "facebook") {
      res = await signIn("facebook", { callbackUrl: "http://localhost:3000/" });
      localStorage.setItem(
        "ToasNotify",
        JSON.stringify({ type: "success", message: "login success" })
      );
    }
  };
  const handleOnSubmit = async (values) => {
    try {
      const res = await signIn("credentials", { ...values, redirect: false });
      if (res?.ok) {
        localStorage.setItem(
          "ToasNotify",
          JSON.stringify({ type: "success", message: "login success" })
        );
        router.push("/");
      } else showNotify("error", res.error);
    } catch (error) {
      showNotify("error", error.message);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleOnSubmit();
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-title">
          <p>Iniciar Sesión</p>
          <SignIn size={32} />
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit || handleOnSubmit}
          onKeyDown={handleKeyDown}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="login-form">
              <div className="login-form-inputs">
                <span>
                  <Field
                    name="email"
                    label="Email"
                    as={TextField}
                    fullWidth
                    required
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="form-error"
                  />
                </span>

                <span>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Contraseña"
                    as={TextField}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <div
                          onClick={handleTogglePassword}
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </div>
                      ),
                    }}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="form-error"
                  />
                </span>
              </div>
              <Button
                type="submit"
                variant="outlined"
                disabled={isSubmitting || !isValid}
                className="login-button"
              >
                Iniciar Sesión
              </Button>

              <span className="separator-form-container">
                <figure className="separator-form"></figure>
                <p>Ó</p>
                <figure className="separator-form"></figure>
              </span>
              <div className="grid gap-2 ">
                <div className="flex flex-col items-center justify-center gap-1 space-y-6">
                  <button
                    onClick={(e) => handleClick(e, "google")}
                    type="button"
                    className="login-google-button"
                  >
                    <span className="google-text-container">
                      <Image
                        src="https://res.cloudinary.com/kimeipetshop/image/upload/v1705109377/LoginIcons/google-color-svgrepo-com_kesm6d.svg"
                        alt="google logo"
                        width={20}
                        height={20}
                        className="logo-form-signup"
                      />
                      <p>Continuar con Google</p>
                    </span>

                    <span className="google-text-container-hover">
                      <Image
                        src="https://res.cloudinary.com/kimeipetshop/image/upload/v1705109377/LoginIcons/google-color-svgrepo-com_kesm6d.svg"
                        alt="google logo"
                        width={20}
                        height={20}
                        className="logo-form-signup"
                      />
                    </span>
                  </button>

                  <button
                    onClick={(e) => handleClick(e, "facebook")}
                    type="button"
                    className="login-facebook-button"
                  >
                    <span className="facebook-text-container">
                      <Image
                        src="https://res.cloudinary.com/kimeipetshop/image/upload/v1705109377/LoginIcons/facebook-network-communication-internet-interaction-svgrepo-com_az25pj.svg"
                        alt="facebook logo"
                        width={20}
                        height={20}
                        className="logo-form-signup"
                      />
                      <p>Continuar con Facebook</p>
                    </span>

                    <span className="facebook-text-container-hover">
                      <Image
                        src="https://res.cloudinary.com/kimeipetshop/image/upload/v1705109377/LoginIcons/facebook-network-communication-internet-interaction-svgrepo-com_az25pj.svg"
                        alt="facebook logo"
                        width={20}
                        height={20}
                        className="logo-form-signup"
                      />
                    </span>
                  </button>
                </div>
              </div>
              <div className="login-signup-container">
                <p>¿Nuevo en Kimey?</p>
                <Link href="/signup">Registrate</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
