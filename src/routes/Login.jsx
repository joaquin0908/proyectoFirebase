import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { loginuser } = useContext(UserContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  if (user) {
    return <Navigate to="/" />;
  }

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await loginuser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: erroresFirebase(error.code),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title text={"Login"} />
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese su email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingresa tu correo"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese Password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label="Ingresa tu constraseña"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>
        <div className="flex justify-end">
          <Button text={"Ingresar"} type={"submit"} loading={loading} />
        </div>
      </form>
    </>
  );
};

export default Login;
