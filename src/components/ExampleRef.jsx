import { forwardRef, useRef } from "react"

const InputText = forwardRef((props, ref) =>{
  return(
    <>
    <input type="text" id="inputFocus" ref={ref}/>
    </>
  )
})


const ExampleRef = () => {
  
  const inputFocus = useRef(null)

  const handleButtomClick = () =>{
    console.log("me diste click")
    inputFocus.current.focus()
  }
  
    return(
    <>
    <InputText ref={inputFocus}/>
    <button onClick={handleButtomClick}>Clikeame</button>
    </>
  )
}

export default ExampleRef
