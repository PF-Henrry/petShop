const validationUsers = (form) => {

    let  errors = {};

//   console.log(`Name: ${errors.name}`)
//   console.log(`Lastname: ${errors.lastname}`)
//   console.log(`Username: ${errors.username}`)
//   console.log(`Adress: ${errors.adress}`)
//   console.log(`Email: ${errors.email}`)
//   console.log(`CodeP: ${errors.codeP}`)
//   console.log(`Token: ${errors.token}`)



    if (!form.name) {
      errors.name = "Nombre es requerido";
    } else if (!/^[A-Z][a-zA-Z\s]*$/.test(form.name)) {
      errors.name = "Use mayúsculas y evite números o caracteres especiales";
    } else if (form.name.length < 2) {
      errors.name = "Debe tener mínimo 2 caracteres"
    } else if (form.name.length > 11) {
      errors.name = "No debe tener más de 11 caracteres";
    }

    if (!form.lastname) {
        errors.lastname = "Apellido es requerido";
      } else if (!/^[A-Z][a-zA-Z\s]*$/.test(form.lastname)) {
        errors.lastname = "Use mayúsculas y evite números o caracteres especiales";
      } else if (form.lastname.length < 2) {
        errors.lastname = "Debe tener mínimo 2 caracteres"
      } else if (form.lastname.length > 11) {
        errors.lastname = "No debe tener más de 11 caracteres";
      }
  
    if (!form.username) {
      errors.username = "Usuario es requerido";
    } else if (form.username.length < 3){
      errors.username = "Debe tener mínimo 3 caracteres"
    } else if (form.username.length > 20){
      errors.username = "Debe tener máximo 20 caracteres"
    }

    if (!form.adress) {
        errors.adress = "Dirección es requerida";
      } else if (form.adress.length < 5){
        errors.adress = "Debe tener mínimo 5 caracteres"
      } else if (form.adress.length > 100){
        errors.adress = "Debe tener máximo 100 caracteres"
      }

      if (!form.email) {
        errors.email = "Email es requerido";
      } else if (!/^[a-zA-Z0-9._%+-]+@(?:hotmail|gmail|yahoo)\.(?:com|com\.mx|es|net)$/.test(form.email)) {
        errors.email = "Debe tener la forma de un email";
      }

      if (!form.codeP) {
        errors.codeP = "Código postal es requerido";
      }

    //   if(!form.token){
    //     errors.token = "Token es requerido"
    //   }

    return errors;
  };


  export default validationUsers;