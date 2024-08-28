
import Title from "../components/Title"
import { dataBaseFireStore } from "../hooks/dataBaseFireStore"


const Home = () => {
  

  const {data, error, loading} = dataBaseFireStore()

  if(loading) return <p>Cargando los datos....</p>
  if(error) return <p>{error.message}</p>
  
  return (
    <>
      <Title text="Home"/>
      {
        data.map(item => (
          <div key={item.nanoId}>
            <p>{item.nanoId}</p>
            <p>{item.origin}</p>
            <p>{item.uId}</p>
          </div>
        ))
      }
    </>
  )
}

export default Home
