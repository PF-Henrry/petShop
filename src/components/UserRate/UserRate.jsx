import Image from "next/image";
import userProf from "@/public/assets/userProf.png";
import StarIcon from "@mui/icons-material/Star";
import "./UserRate.css";

export default function UserRate() {
  return (
    <div className="userRate-container">
      <p className="userRate-title">Comentarios de nuestros usuarios</p>
      <div className="userRate-info-container">
        <figure>
          <Image
            src={userProf}
            alt="Foto del usuario"
            width={100}
            height={100}
            className="user-photo"
          />
        </figure>

        <div className="ml-4">
          <p className="user-name">Nombre del Usuario</p>

          <p className="user-rate">
            Opinión del usuario sobre el servicio de la página
          </p>
          <span className="text-[#FFD700] space-x-2">
            {[...Array(5)].map((_, index) => (
              <StarIcon key={index} className="star-icon" />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
