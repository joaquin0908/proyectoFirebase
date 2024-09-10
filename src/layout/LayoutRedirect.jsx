import { Outlet, useParams } from "react-router-dom";
import { dataBaseFireStore } from "../hooks/dataBaseFireStore";
import { useEffect, useState } from "react";
import Title from "../components/Title";

const LayoutRedirect = () => {
  const { nanoId } = useParams();
  const { searchData } = dataBaseFireStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchData(nanoId).then((docSnap) => {
      if (docSnap.exists()) {
        window.location.href = docSnap.data().origin;
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <Title text="Cargando redireccionamiento...." />;
  return (
    <div className="mx-auto container">
      <Outlet />
    </div>
  );
};
export default LayoutRedirect;
