
import cloudinary from 'cloudinary';

const {
    API_CLOUDINARY_KEY,
    API_CLOUDINARY_SECRET,
    API_CLOUDINARY_CLOUDNAME
     } = process.env


cloudinary.config({
    cloud_name: API_CLOUDINARY_CLOUDNAME,
    api_key: API_CLOUDINARY_KEY,
    api_secret: API_CLOUDINARY_SECRET
  });


export async function postImage(file,id){
    
    try {
       const result = await cloudinary.uploader.upload(file, { public_id: `public${id}` }, async function(error, result) {
            if (error) {
              return error
            } else {
              return result
              // Manejar la respuesta de Cloudinary después de la carga exitosa
            }
          });
           return result
    } catch (error) {
            return error.message;       
    }

}