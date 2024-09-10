import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const NavBar = () => {
  const { user, signOutUser } = useContext(UserContext);

  const handleClickLogOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  const classButtomPurlpe =
    "text-white bg-purlpe-700 hover:bg-purlpe-800 focus:ring-4 focus:outline-none focus:ring-purlpe-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-purlpe-600 dark:hover:bg-purlpe-700 dark:focus:ring-purlpe-800";
  return (
    <nav className="bg-black border-gray-200 dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            URLShort APP
          </span>
        </Link>
        <div className="flex md:order-2 space-x-2">
          {user ? (
            <>
              <NavLink to="/" className={classButtomPurlpe}>
                Inicio
              </NavLink>
              <button onClick={handleClickLogOut} className={classButtomPurlpe}>
                Cerrar sesion
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={classButtomPurlpe}>
                Iniciar sesion
              </NavLink>
              <NavLink to="/register" className={classButtomPurlpe}>
                Registrate
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
