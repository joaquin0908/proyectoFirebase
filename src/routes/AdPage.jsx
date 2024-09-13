import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dataBaseFireStore } from "../hooks/dataBaseFireStore";

const AdPage = () => {
  // Dejar este como AdPage si este componente maneja la visualización del anuncio
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
    <div className="ad-container">
      <h1>Anuncio</h1>
      <p>Redirigiendo en {seconds} segundos...</p>
      <button onClick={handleSkip}>Saltear Ad</button>
    </div>
  );
};

export default AdPage; // Este nombre se mantiene si quieres que siga manejando los anuncios
