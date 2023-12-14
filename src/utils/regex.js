// regex para validar que sea una url.

export const URL_CHECKED = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
// regex para validar que sea una contraseña segura.


// debe cumplir con al menos 1 mayuscula, un numero, un caracter especial, no admite espacios. y tiene que tener un min de 8 y un maximo de 15
export const PASSWORD_CHECKED = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/

//debe contener numeros y letras y un minimo de 8 caracteres
export const SIMPLE_PASSWORD_CHECKED =  /^(?=.*[A-Za-z])(?=.*\d).{8,}$/




// regex que valida los nombres, y apellidos pueden usar solo letras, y letras con acentos, y pueden tener un min de 2 y un maximo de 11 letras.

export const INPUT_NAME_CHECKED= /^(?=.{2,11}$)[a-zA-ZÀ-ÿ]+$/


// regex para validar correos bajo los estanderes de hotmail. gmail, y yahoo.

export const EMAIL_CHEKED = /^[a-zA-Z0-9._%+-]+@(?:hotmail|gmail|yahoo)\.(?:com|com\.mx|es|net)$/
//valida los estandares anteriores y valida que no esté vacio
export const EMAIL_FILLED_CHECKED = /^(?!\s*$)[a-zA-Z0-9._%+-]+@(?:hotmail|gmail|yahoo)\.(?:com|com\.mx|es|net)$/

//verifica que el numero de tarjeta coincida con alguno de los patrones: mastercard, visa o amex
export const CARD_CHECKED = /^(3[47][0-9]{13}|5[1-5][0-9]{14}|4[0-9]{12}(?:[0-9]{3})?)$/

//verifico que el documento contenga solo números
export const ID_CHECKED = /^[0-9]+$/

//valida el codigo de area
export const AREA_CODE_CHECKED = /^\d{2,4}$/

//valida el numero de celular
export const CEL_CHECKED = /^\d{8,9}$/


//validacion para nombres de calles
export const STREET_CHECKED = /^[a-zA-Z0-9\s.'_-]*$/

//validacion cod postal arg
export const ZIP_CHECKED = /^\d{4}$/





