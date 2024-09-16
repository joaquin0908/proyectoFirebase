import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dataBaseFireStore } from "../hooks/dataBaseFireStore";
import macads from "../assets/macads.jfif";

const AdPage = () => {
  const { nanoId } = useParams();
  const { searchData } = dataBaseFireStore();
  const [seconds, setSeconds] = useState(5); // Temporizador
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(timer);
      searchData(nanoId).then((docSnap) => {
        if (docSnap && docSnap.exists()) {
          window.location.href = docSnap.data().origin; // Redirigir al enlace original
        } else {
          navigate("/404"); // Si no se encuentra el enlace
        }
      });
    }

    return () => clearInterval(timer);
  }, [seconds, nanoId, searchData, navigate]);

  const handleSkip = () => {
    searchData(nanoId).then((docSnap) => {
      if (docSnap && docSnap.exists()) {
        window.location.href = docSnap.data().origin; // Redirigir si hace clic en "Skip"
      } else {
        navigate("/404");
      }
    });
  };

  return (
    <div className="ad-container flex flex-col justify-center items-center h-screen">
      <h1>Ads</h1>
      <p className="text-2xl font-bold">
        Redirigiendo en {seconds} segundos...
      </p>
      <img src={macads} alt="Anuncio" className="mb-4" />
      <button onClick={handleSkip}>Saltear Ad</button>
    </div>
  );
};

export default AdPage;
