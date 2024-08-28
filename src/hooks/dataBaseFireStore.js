import { collection, getDocs, getFirestore, query, where } from "firebase/firestore/lite";
import  {initializeApp} from "firebase/app";
import {db} from "../FireBase"

import { useEffect, useState } from "react"

export const dataBaseFireStore = () => {
    
    const [data, setData] = useState([]) 
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        console.log("getData")
        getData()
    }, [])
    
    const getData = async() =>{
        try {
          setLoading(true)
          const dataRef = collection(db, "urls")
          const q = query(
            dataRef,
            where("uId", "==", "f77GqqL9PLSfkUGBC6Yzx3JDKwY2")
        )
          const  querySnapshot = await getDocs(q) 
          const dataDb = querySnapshot.docs.map(doc => doc.data())
          setData(dataDb) 
        } catch (error) {
         console.log(error)
         setError(error.message) 
        } finally {
            setLoading(false)
        }    
   }   
    
        return{
      data,
      error,
      loading,
    }
  
}
