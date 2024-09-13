import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dataBaseFireStore } from "../hooks/dataBaseFireStore";

const RedirectLayout = () => {
  // Renombrado a RedirectLayout
  const { nanoId } = useParams();
  const { searchData } = dataBaseFireStore();
  const [seconds, setSeconds] = useState(5); // Temporizador
  const navigate = useNavigate();

  useEffect(() => {
    // Agregar el script de Adsterra al montar el componente
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//pl24358772.cpmrevenuegate.com/26/bf/4f/26bf4fd3ce9b69a5b31a51ac38820295.js";
    script.async = true;
    document.body.appendChild(script);

    // Temporizador para redirigir después de que cuente hasta 0
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

    // Limpiar el script y el temporizador al desmontar el componente
    return () => {
      clearInterval(timer);
      document.body.removeChild(script);
    };
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

export default RedirectLayout; // Cambiar el nombre exportado también
