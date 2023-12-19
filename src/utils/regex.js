// regex para validar que sea una url.

export const URL_CHECKED = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

// regex para validar que sea una url de imagen.

export const URLIMG_CHECKED = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp|svg|webp)$/;

// regex para validar que sea una contraseña segura.


// debe cumplir con al menos 1 mayuscula, un numero, un caracter especial, no admite espacios. y tiene que tener un min de 8 y un maximo de 15
export const PASSWORD_CHECKED = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/


// regex que valida los nombres o apellidos pueden usar solo letras, y letras con acentos, y pueden tener un min de 2 y un maximo de 11 letras.

export const INPUT_NAME_CHECKED= /^(?=.{2,11}$)[a-zA-ZÀ-ÿ]+$/


// regex para validar correos bajo los estanderes de hotmail. gmail, y yahoo.

export const EMAIL_CHECKED = /^[a-zA-Z0-9._%+-]+@(?:hotmail|gmail|yahoo)\.(?:com|com\.mx|es|net)$/

//Regex para que el nombre del producto empieze en mayuscula, contenga solo letras, números y algunos caracteres especiales como &\',.()-'

export const PRODUCT_NAME_CHECKED = /^[A-Z][a-zA-Z0-9&',.()\-]*$/

//Regex para que el nombre ingresado empieze en mayúscula, solo tenga letras y espacios, evitando caracteres especiales.

export const GOOD_GRAMMAR_CHECKED = /^[A-Z][a-zA-Z\s]*$/

//Regex que permite el uso de letras, números, espacios y algunos caracteres especiales comunes en direcciones como comas, apóstrofos, puntos y guiones.

export const ADDRESS_CHECKED = /^[a-zA-Z0-9\s,'.-]+$/

//Regex que permite letras, números, espacios y guiones, que son comunes en códigos postales.

export const POSTAL_CHECKED = /^[a-zA-Z0-9\s-]+$/






//Valida que haya solo números
export const ONLYNUMBERS_CHECKED = /^\d{3}-\d{3}-\d{4}$/

//Valida que el codigo de area tenga de 1 a 4 digitos para validar todos los codigo de area de sudamerica, en caso inmigrantes
export const AREA_CODE_CHECKED = /^\d{1,4}$/

//valida que el código de área tenga 5 digitos
export const ZIP_CHECKED = /^\d{5}$/


