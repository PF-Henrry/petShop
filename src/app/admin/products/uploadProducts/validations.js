const validations = (form) => {

    let  errors = {};
    if (!form.name) {
      errors.name = "Nombre es requerido";
    } else if (!/^[A-Z][a-zA-Z\s]*$/.test(form.name)) {
      errors.name = "Use mayúsculas y evite números o caracteres especiales";
    } else if (form.name.length < 3) {
      errors.name = "Debe tener mínimo 3 caracteres"
    } else if (form.name.length > 30) {
      errors.name = "No debe tener más de 30 caracteres";
    }
  
    if (!form.price) {
      errors.price = "Precio es requerido";
    } else if (parseInt(form.price) <= 0.01) {
      errors.price = "El precio debe ser mayor";
    } else if (parseInt(form.price) >= 1000000 ) {
      errors.price = "El precio no debe ser tan alto";
    }
  
    if (!form.detail) {
      errors.detail = "Detalle es requerido";
    } else if (!/^[A-Z].*/.test(form.detail)){
      errors.detail = "Use mayúsculas";
    }else if (form.detail.length < 10) {
      errors.detail = "Debe tener mínimo 10 caracteres";
    } else if (form.detail.length > 160) {
      errors.detail = "No debe tener más de 160 caracteres";
    }
  
    // if (!form.brand) {
    //   errors.brand = "Marca es requerida";
    // } else if (!/^[A-Z][a-zA-Z\s]*$/.test(form.brand)) {
    //   errors.brand = "Use mayúsculas y evite números o caracteres especiales";
    // } else if (form.brand.length < 3){
    //   errors.brand = "Debe tener minimo 3 caracteres"
    // } else if (form.brand.length > 30) {
    //   errors.brand = "No debe tener más de 30 caracteres";
    // }

    return errors;
  };


  export default validations;