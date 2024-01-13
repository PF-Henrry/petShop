"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { EMAIL_CHECKED, PASSWORD_CHECKED } from "@/utils/regex";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import { UserPlus } from "@phosphor-icons/react/dist/ssr";

const validationSchema = Yup.object({
  username: Yup.string().required("Nombre de usuario requerido*"),
  email: Yup.string()
    .required("Email requerido*")
    .matches(EMAIL_CHECKED, "Email no válido"),

  password: Yup.string()
    .required("Contraseña es requerida*")
    .matches(
      PASSWORD_CHECKED,
      "Contraseña de 8 a 15 caracteres con al menos una mayúscula, un número, y un carácter especial, sin espacios."
    ),
});

const Signup = ({ initialValues, onSubmit }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile");
    }
  }, [router, status]);

  const handleOnSubmit = async (values) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Datos enviados correctamente al backend");

        await signIn(
          "credentials",
          { email: values.email, password: values.password },
          { redirect: false }
        );
        router.push("/profile");
      } else {
        console.error("Error al enviar datos ", response);

        if (response.status === 404) {
          const responseBody = await response.json();
          console.log(responseBody);
          toast.error(
            "El nombre de usuario o el correo electrónico ya existen."
          );
        }
      }
    } catch (error) {
      console.error("Error de red al enviar datos al backend", error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <span className="signup-title">
          <p>Registro de Usuario </p>
          <UserPlus size={32} />
        </span>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            name: "Unknown",
            lastname: "Unknown",
            adress: "Unknown",
            city: "Unknown",
            province: "Unknown",
            role: 1,
            img: "http://res.cloudinary.com/kimeipetshop/image/upload/v1703619038/rzhvjkorlhzd8nkp8h6n.png",
            codeP: 1234,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit || handleOnSubmit}
          enableReinitialize
        >
          {({ isSubmitting, isValid }) => (
            <Form className="signup-form">
              <div className="signup-fields">
                <span>
                  <Field
                    name="username"
                    label="Nombre de Usuario"
                    as={TextField}
                    fullWidth
                    required
                  />
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="form-error"
                  />
                </span>

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
                className="signup-button"
              >
                Registrarse
              </Button>

              <div className="login-link-container">
                <p>¿Ya tienes cuenta?</p>
                <Link href="/login">Iniciar Sesión</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Signup;
