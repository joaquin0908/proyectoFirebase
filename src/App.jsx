import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import LayoutRequireAuth from "./layout/LayoutRequireAuth";
import LayoutComponentForm from "./layout/LayoutComponentForm";
import LayoutRedirect from "./layout/LayoutRedirect";
import AdPage from "./routes/AdPage";
import { UserContext } from "./context/UserProvider";
import NavBar from "./components/NavBar";

import Register from "./routes/Register";
import Perfil from "./routes/Perfile";
import Login from "./routes/Login";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p className="flex text-lg  justify-center">Cargando...</p>;
  }

  return (
    <>
      <NavBar />
      <Routes>
        {/* Rutas autenticadas */}
        <Route path="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>

        {/* Rutas de autenticación */}
        <Route path="/" element={<LayoutComponentForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Ruta para el anuncio antes de redirigir */}
        <Route path="/ad/:nanoId" element={<AdPage />} />

        {/* Ruta de redirección */}
        <Route path="/redirect/:nanoId" element={<LayoutRedirect />} />

        {/* Ruta de página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
