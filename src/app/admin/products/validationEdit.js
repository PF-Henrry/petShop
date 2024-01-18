const validationEdit = (form) => {

    let  errors = {};

    console.log(form)
  
    if(!form.price){
      errors.price = "Se requiere precio"
    } else if (parseInt(form.price) === 0) {
      errors.price = "Precio debe ser mayor"
    } else if (parseInt(form.price) < 0) {
      errors.price = "Precio no debe ser negativo";
    } else if (parseInt(form.price) >= 1000000 ) {
      errors.price = "Precio no debe ser tan alto";
    }
  
    // if (!/^[A-Z].*/.test(form.detail)){
    //   errors.detail = "Use mayúsculas"
    // } else if (form.detail.length < 10) {
    //   errors.detail = "Debe tener mínimo 10 caracteres"
    // } else if (form.detail.length > 160) {
    //   errors.detail = "No debe tener más de 160 caracteres"
    // }

    if(!form.detail){
        errors.detail = "Se requiere detalle"
    }

    if (!form.stock){
      errors.stock = "Se requiere stock"
    } else if (parseInt(form.stock) < 0) {
      errors.stock = "Stock no puede ser negativo"
    }
    
    return errors;
  };


  export default validationEdit;