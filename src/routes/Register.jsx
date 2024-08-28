import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";


import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button"
import ButtonLoading from "../components/ButtonLoanding";

const Register = () =>{

    const [loading, setLoading] = useState(false)

    const {registerUser} = useContext(UserContext) 
   
   const navigate = useNavigate()
   
   const {required, patternEmail, minLength, validateTrim, validateEquals} = formValidate()
   
   const {
    register, 
    handleSubmit, 
    formState: {errors},
     getValues,
    setError,
    } = useForm()

   const onSubmit = async({email, password}) => {
    try {
        setLoading(true)
        await registerUser(email, password)
        navigate("/")
       } catch (error) {
        console.log(error.code)
        setError("email", {
            message: erroresFirebase(error.code),
        });
      }finally{
        setLoading(false)
      }  
     };  
   

    return(
        <>
        <Title text={"Register"}/>
       <FormError error={errors.firebase}/>
        <form onSubmit={handleSubmit(onSubmit)}>
           <FormInput
            type="email" 
            placeholder="Ingrese su email"
            {...register("email", {
                required,
                pattern: patternEmail,
            })}
            label= "Ingresa tu correo"
            error= {errors.email}
            >
            <FormError error={errors.email}/>
            </FormInput> 
    
            
            <FormInput
            type="password"
            placeholder="Ingrese Password"
            {...register("password", {
                minLength,
                validate: validateTrim,
            })}
            label= "Ingresa tu contraseña"
            error= {errors.password}
            >
                <FormError error={errors.password}/>
            </FormInput>
     

            <FormInput
            type="password"
            placeholder="Ingrese Password"
            {...register("repassword", {
                validate:  validateEquals(getValues("password")),
              })}
            label= "Reingresa tu contraseña"
            error= {errors.repassword}
            >
                <FormError error={errors.repassword}/>
            </FormInput>
            {
              loading ?
              <ButtonLoading/>
              :
              <Button text={"Ingresar"} type={"submit"}/>
            }
            </form>
        </>
    );
};
   
export default Register