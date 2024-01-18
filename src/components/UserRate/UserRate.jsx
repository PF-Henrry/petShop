// UserRate.js
import Image from "next/image";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./UserRate.css";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";

export default function UserRate() {
  const { data: session, status: sessionStatus } = useSession();
  const [allUsers, setAllUsers] = useState([]);
  const [allRates, setAllRates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("api/users");
        const usersData = await usersResponse.json();
        usersResponse.ok && usersResponse.status === 200;
        setAllUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const ratesResponse = await fetch("api/userRates");
        const ratesData = await ratesResponse.json();
        ratesResponse.ok && ratesResponse.status === 200;
        setAllRates(ratesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  function NextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        size={32}
        className={`${className} nextArrow`}
        onClick={onClick}
      ></div>
    );
  }

  function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        size={32}
        className={`${className} prevArrow`}
        onClick={onClick}
      ></div>
    );
  }

  const confiSlider = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const defaultImage =
    "http://res.cloudinary.com/kimeipetshop/image/upload/v1703619038/rzhvjkorlhzd8nkp8h6n.png";

  return (
    <>
      {sessionStatus === "loading" || !allRates?.length || !allUsers?.length ? (
        <Loading />
      ) : (
        <div className="userRate-container">
          <p className="userRate-title">Comentarios de nuestros usuarios</p>
          <div className="userRate-slider-container">
            <Slider {...confiSlider} className="userRate-slider">
              {allUsers?.map((user, index) => {
                const userRate = allRates[index];

                return (
                  <div className="userRate-info-container" key={user?._id}>
                    <div className="userRate-info-card">
                      <figure>
                        <Image
                          src={user.img || defaultImage}
                          alt="User profile"
                          width={100}
                          height={100}
                          className="user-image"
                        />
                      </figure>
                      <section className="userRate-info">
                        <p className="userRate-name">{user?.name}</p>
                        {userRate && (
                          <div
                            className="userRate-rate-container"
                            key={userRate?.id}
                          >
                            <p className="userRate-rate">{userRate?.opinion}</p>
                            <p className="user-rate">
                              <Rating
                                name="read-only"
                                value={userRate?.rate}
                                readOnly
                              />
                            </p>
                          </div>
                        )}
                      </section>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
}
