import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../FireBase"

export const UserContext = createContext()

const UserProvider = (props) =>{

    const [user, setUser] = useState(false)
   

    useEffect(() =>{
      const onSubscribe = onAuthStateChanged(auth, user =>{
        /* console.log(user) */
        if(user){
          const {email, photoURL, displayName, uid} = user
          setUser({email, photoURL, displayName, uid})
        }else{
          setUser(null);
        }
      })

      return () => onSubscribe
    }, [])

    const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    const loginuser = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const signOutUser = () => signOut(auth)
  

    return(
      <UserContext.Provider value={{user, setUser, registerUser, loginuser, signOutUser}}> 
         {props.children}
      </UserContext.Provider>
    )
}

export default UserProvider