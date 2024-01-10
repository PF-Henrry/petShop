import fs from "fs";


export function guardarEnJSON(datos, nombreArchivo) {
    try {
        if (!fs.existsSync(nombreArchivo)) {
            fs.writeFileSync(nombreArchivo, '');
        }
        fs.writeFileSync(nombreArchivo, JSON.stringify(datos, null, 4));
        console.log(`Datos guardados en '${nombreArchivo}' correctamente.`);
    } catch (error) {
        console.error(`Error al guardar los datos en '${nombreArchivo}': ${error}`);
    }
}

export function leerDesdeJSON(nombreArchivo) {
    try {
        if (!fs.existsSync(nombreArchivo)) {
            console.log(`El archivo '${nombreArchivo}' no existe.`);
            return null;
        }
        const data = fs.readFileSync(nombreArchivo, 'utf8');
        const datos = JSON.parse(data);
        console.log(`Datos leídos desde '${nombreArchivo}':`);
        return datos;
    } catch (error) {
        console.error(`Error al leer los datos desde '${nombreArchivo}': ${error}`);
        return null;
    }
}



// Ejemplo de uso:

// Guardar datos en un archivo JSON
