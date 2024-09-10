import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import LayoutRequireAuth from "./layout/LayoutRequireAuth";
import LayoutComponentForm from "./layout/LayoutComponentForm";
import LayoutRedirect from "./layout/layoutRedirect";
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
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>

        <Route path="/" element={<LayoutComponentForm />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>

        <Route path="/:nanoId" element={<LayoutRedirect />}>
          <Route index element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
