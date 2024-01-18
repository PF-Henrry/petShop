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
import Image from "next/image";
import "./EditProfile.css";
import {
  CameraPlus,
  Trash,
  TrashSimple,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import { FloppyDisk } from "@phosphor-icons/react";

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

  adress: Yup.string().matches(ADDRESS_CHECKED, "Ingrese una dirección válida"),
  codeP: Yup.string().matches(ZIP_CHECKED, "Ingrese un código postal válido"),
  province: Yup.string().matches(/^.+$/, "No puede estar vacío"),
  city: Yup.string().matches(/^.+$/, "No puede estar vacío"),
});

const EditProfileForm = ({
  initialValues,
  editable,
  setShowSuccessMessage,
}) => {
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
  });

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
          const response = await fetch(`/api/users/${userSessionId}`);

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

      const response = await fetch(`/api/users/${userSessionId}`, {
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
        <Form className="edit-profile-form-container">
          <div className="edit-profile-form-section1">
            <div className="edit-personal-data-container">
              <p className="edit-personal-data-title">Datos Personales</p>

              <section className="edit-personal-data-section">
                <span className="edit-personal-data-input">
                  <InputLabel htmlFor="name" className="">
                    Nombre
                  </InputLabel>
                  <Field
                    name="name"
                    as={TextField}
                    fullWidth
                    disabled={!editable}
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="edit-personal-data-error"
                  />
                </span>

                <span className="edit-personal-data-input">
                  <InputLabel htmlFor="lastname" className="">
                    Apellido
                  </InputLabel>
                  <Field
                    name="lastname"
                    as={TextField}
                    fullWidth
                    disabled={!editable}
                  />
                  <ErrorMessage
                    name="lastname"
                    component="p"
                    className="edit-personal-data-error"
                  />
                </span>

                <span className="edit-personal-data-input">
                  <InputLabel htmlFor="username" className="">
                    Nombre de Usuario
                  </InputLabel>
                  <Field
                    name="username"
                    as={TextField}
                    fullWidth
                    disabled={!editable}
                  />
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="edit-personal-data-error"
                  />
                </span>
              </section>
            </div>

            <div className="upload-image-container">
              <p className="upload-image-title">Foto de Perfil</p>
              <label
                htmlFor="upload-image-input"
                className="upload-image-input"
              >
                <figure>
                  <Image
                    name="img"
                    src={userImageToShow}
                    alt="Imagen de perfil"
                    width={250}
                    height={250}
                    className="rounded-full cursor-pointer"
                  />
                </figure>

                <CameraPlus size={32} className="upload-image-icon" />
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={!editable}
                id="upload-image-input"
                className="hidden"
              />
              {selectedImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="remove-image-btn"
                  disabled={!editable}
                >
                  Eliminar Imagen{" "}
                  <TrashSimple
                    size={20}
                    className="remove-image-icon"
                    weight="fill"
                  />
                </button>
              )}
            </div>
          </div>

          <div className="edit-profile-form-section2">
            <span>
              <p className="edit-address-title">Dirección de Envío</p>
              <p className="edit-address-subtitle">
                Para envíos fuera de CABA, contactar al vendedor
                <WarningCircle size={15} />
              </p>
            </span>

            <section className="edit-address-section1">
              <span className="edit-address-input">
                <InputLabel htmlFor="adress">Dirección (calle y n°)</InputLabel>
                <Field
                  name="adress"
                  as={TextField}
                  fullWidth
                  disabled={!editable}
                />
                <ErrorMessage
                  name="adress"
                  component="p"
                  className="edit-address-error"
                />
              </span>

              <span className="edit-address-input">
                <InputLabel htmlFor="codeP">Código Postal</InputLabel>
                <Field
                  name="codeP"
                  as={TextField}
                  fullWidth
                  disabled={!editable}
                />
                <ErrorMessage
                  name="codeP"
                  component="p"
                  className="edit-address-error"
                />
              </span>
            </section>

            <section className="edit-address-section2">
              <span className="edit-address-input">
                <InputLabel htmlFor="city">Localidad</InputLabel>
                <Field
                  name="city"
                  as={TextField}
                  fullWidth
                  disabled={!editable}
                />
                <ErrorMessage
                  name="city"
                  component="p"
                  className="edit-address-error"
                />
              </span>

              <span className="edit-address-input">
                <InputLabel htmlFor="province">Provincia</InputLabel>
                <Field
                  name="province"
                  as={TextField}
                  fullWidth
                  disabled={!editable}
                />
                <ErrorMessage
                  name="province"
                  component="p"
                  className="edit-address-error"
                />
              </span>
            </section>
          </div>

          <span className="edit-profile-form-button-container">
            <Button
              type="submit"
              variant="outlined"
              disabled={!editable || isSubmitting || !isValid}
              style={{ borderColor: "grey" }}
              className={`edit-profile-form-button ${
                !editable || isSubmitting || !isValid ? "disabled" : ""
              }`}
            >
              Guardar
              <FloppyDisk size={32} className="edit-profile-btn-icon" />
            </Button>
          </span>
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileForm;
