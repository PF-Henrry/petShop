/* eslint-disable @next/next/no-img-element */
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import {
  ADDRESS_CHECKED,
  EMAIL_CHECKED,
  INPUT_NAME_CHECKED,
  ZIP_CHECKED,
} from "@/utils/regex";
import { useSession } from "next-auth/react";


const defaultImage =
  "http://res.cloudinary.com/kimeipetshop/image/upload/v1703619038/rzhvjkorlhzd8nkp8h6n.png";

const validationSchema = Yup.object({
  name: Yup.string().matches(INPUT_NAME_CHECKED, "Ingresar solo letras"),
  lastname: Yup.string().matches(INPUT_NAME_CHECKED, "Ingresar solo letras"),
  username: Yup.string().matches(/^.+$/, "No puede estar vacío"),
 

  email: Yup.string().matches(
    EMAIL_CHECKED,
    "El e-mail ingresado no es válido"
  ),

  adress: Yup.string().matches(ADDRESS_CHECKED, 'Ingrese una dirección válida'),
  codeP: Yup.string().matches(ZIP_CHECKED, "Ingrese un código postal válido"),
  province: Yup.string().matches(/^.+$/, "No puede estar vacío"),
  city: Yup.string().matches(/^.+$/, "No puede estar vacío"),
});

const EditProfileForm = ({ initialValues, editable,setShowSuccessMessage}) => {
  const { data: session } = useSession();

  const userSessionId = session?.user?.id;

  const [selectedImage, setSelectedImage] = useState(null);
  const userImageToShow = selectedImage || defaultImage;

  const handleImageChange = (event) => {
    try {
      if (event.target.files.length) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
          setSelectedImage(event.target.result);
        };

        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
    }
  };

  const [userData, setUserData] = useState({
    img: "",
    name: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    adress: "",
    codeP: "",
    province: "",
    city: "",
  })

  

  const handleRemoveImage = () => {
    setSelectedImage(defaultImage);
    setUserData((prevUserData) => ({
      ...prevUserData,
      img: defaultImage,
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userSessionId) {
          const response = await fetch("/api/users/" + userSessionId);

          if (response.ok) {
            const userData = await response.json();
            console.log("Datos del usuario obtenidos:", userData);
            userData.province = userData?.province?.name;
            userData.city = userData?.city?.name;

            localStorage.setItem("userData", JSON.stringify(userData));

            setUserData(userData);
            setSelectedImage(userData.img);
          } else {
            console.error("Error al obtener los datos del usuario");
          }
        }
      } catch (error) {
        console.error("Error de red al obtener los datos del usuario", error);
      }
    };
    fetchUserData();

    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      setSelectedImage(parsedUserData.img);
    }
  }, [userSessionId]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      // Hacer una pequeña pausa para permitir que 'values' se actualice
      await new Promise((resolve) => requestAnimationFrame(resolve));

      // Comparar los valores cambiados con los valores iniciales
      const changedValues = Object.keys(values).reduce((acc, key) => {
        if (values[key] !== initialValues[key]) {
          acc[key] = values[key];
        }
        return acc;
      }, {});

      // Construir el objeto final que se enviará al backend
      const dataUser = {
        password: values.password,
        dataSinPass: {
          ...values,
          img: selectedImage,
          codeP: parseInt(values.codeP),
          changedValues,
        },
      };

      console.log("Datos que se enviarán al backend:", dataUser);

      const response = await fetch("api/users/" + userSessionId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser),
      });
      console.log(response.status);
      if (response.ok) {
        const res = await response.json();
        console.log("Datos enviados correctamente al backend", res);

        setShowSuccessMessage(true);

      
        
      } else {
        const errorResponse = await response.json();
        console.error(
          "Error al enviar datos al backend",
          response.status,
          errorResponse
        );
        }
      
    } catch (error) {
      console.error("Error de red al enviar datos al backend", error.message);
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={userData}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize // Permite reinicializar los valores cuando cambia la propiedad initialValues
    >
      {({ isSubmitting, isValid }) => (
        <Form className="max-w-5xl mx-auto my-8 p-8 rounded shadow border border-gray-300 bg-customPrimary">
          <div className="mb-4">
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="upload-image-input">
                <img
                  name="img"
                  src={userImageToShow}
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
              {selectedImage && (
                <button
                type="button"
                onClick={handleRemoveImage}
                className={`text-${editable ? 'red-500' : 'gray-500'} no-underline cursor-pointer`}
                disabled={!editable}
              >
                Eliminar Imagen
              </button>
              )}
            </div>

            <Button
            type="submit"
            variant="outlined"
            disabled={!editable || isSubmitting || !isValid}
            style={{ borderColor: "grey" }}
            className={`text-black
              py-2 px-4 rounded focus:outline-none focus:shadow-outline
              active:shadow-md active:translate-y-1 block mx-auto w-1/4 mt-8 hover:bg-customSecondary`}
          >
            Guardar
          </Button>

            <p className="text-xl font-bold mb-4">Datos Personales:</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <InputLabel htmlFor="name" className="text-sm font-bold mb-1">
                  Nombre:
                </InputLabel>
                <Field
                  name="name"
                  as={TextField}
                  fullWidth
                  disabled={!editable}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className="flex flex-col">
                <InputLabel
                  htmlFor="lastname"
                  className="text-sm font-bold mb-1"
                >
                  Apellido:
                </InputLabel>
                <Field
                  name="lastname"
                  as={TextField}
                  fullWidth
                  disabled={!editable}
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className="flex flex-col">
                <InputLabel
                  htmlFor="username"
                  className="text-sm font-bold mb-1"
                >
                  Nombre de Usuario:
                </InputLabel>
                <Field
                  name="username"
                  as={TextField}
                  fullWidth
                  disabled={!editable}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xl font-bold mb-1">Dirección de Envío:</p>
            <p className="text-sm text-gray-500 mt-1 mb-3">
              Para envíos fuera de CABA, contactar al vendedor
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <InputLabel htmlFor="adress" className="text-sm font-bold mb-1">
                  Dirección (calle y n°):
                </InputLabel>
                <Field
                  name="adress"
                  as={TextField}
                  fullWidth
                  disabled={!editable}
                />
                <ErrorMessage
                  name="adress"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className="flex flex-col">
                <InputLabel htmlFor="codeP" className="text-sm font-bold mb-1">
                  Código Postal:
                </InputLabel>
                <Field
                  name="codeP"
                  as={TextField}
                  fullWidth
                  disabled={!editable}
                />
                <ErrorMessage
                  name="codeP"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-col">
              <InputLabel htmlFor="city" className="text-sm font-bold mb-1">
                Localidad:
              </InputLabel>
              <Field
                name="city"
                as={TextField}
                fullWidth
                disabled={!editable}
              />
              <ErrorMessage
                name="city"
                component="div"
                style={{ color: "red" }}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <InputLabel htmlFor="province" className="text-sm font-bold mb-1">
                Provincia:
              </InputLabel>
              <Field
                name="province"
                as={TextField}
                fullWidth
                disabled={!editable}
              />
              <ErrorMessage
                name="province"
                component="div"
                style={{ color: "red" }}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="outlined"
            disabled={!editable || isSubmitting || !isValid}
            style={{ borderColor: "grey" }}
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

export default EditProfileForm;
