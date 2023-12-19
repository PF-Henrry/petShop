// regex para validar que sea una url.

export const URL_CHECKED = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
// regex para validar que sea una contraseña segura.


// debe cumplir con al menos 1 mayuscula, un numero, un caracter especial, no admite espacios. y tiene que tener un min de 8 y un maximo de 15
export const PASSWORD_CHECKED = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/


// regex que valida los nombres, y apellidos pueden usar solo letras, y letras con acentos, y pueden tener un min de 2 y un maximo de 11 letras.

export const INPUT_NAME_CHECKED= /^(?=.{2,11}$)[a-zA-ZÀ-ÿ]+$/


// regex para validar correos bajo los estanderes de hotmail. gmail, y yahoo.

export const EMAIL_CHEKED = /^[a-zA-Z0-9._%+-]+@(?:hotmail|gmail|yahoo)\.(?:com|com\.mx|es|net)$/


//Valida que haya solo números
export const ONLYNUMBERS_CHECKED = /^\d{3}-\d{3}-\d{4}$/

//Valida que el codigo de area tenga de 1 a 4 digitos para validar todos los codigo de area de sudamerica, en caso inmigrantes
export const AREA_CODE_CHECKED = /^\d{1,4}$/

//valida que el código de área tenga 5 digitos
export const ZIP_CHECKED = /^\d{5}$/


