import { useContext } from "react"
import {  NavLink, Link } from "react-router-dom"
import { UserContext } from "../context/UserProvider"


const NavBar = () =>{
const {user, signOutUser} = useContext(UserContext)

const handleClickLogOut = async() =>{
   try {
    await signOutUser()
   } catch (error) {
    console.log(error.code)
   }
}

const classButtomBlue = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
const classButtomRed = "text-white bg-red-800 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-800 dark:hover:bg-red-600 dark:focus:ring-red-800"
    return(
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
              <Link to="/" className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">URLShort APP</span>
              </Link>
                <div className="flex md:order-2 space-x-2">
                { user ?  ( 
                    <>
                       <NavLink to="/" className={classButtomBlue}>Inicio</NavLink>
                        <button onClick={handleClickLogOut} className={classButtomRed}>Cerrar sesion</button>
                    </>
                  
                 ):(
                    <>
                    <NavLink to="/login" className={classButtomBlue}>Iniciar sesion</NavLink>
                    <NavLink to="/register" className={classButtomBlue}>Registrate</NavLink>
                    </>
                 )}
                    

                </div>
            </div>

         
        </nav>
    )
}

export default NavBar