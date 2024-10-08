import { useEffect, useState } from "react";
import Title from "../components/Title";
import { dataBaseFireStore } from "../hooks/dataBaseFireStore";
import Button from "../components/Button";
import { formValidate } from "../utils/formValidate";
import FormInputHome from "../components/formInputHome";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import motog5 from "../assets/motog5.jpg";
import ButtonCard from "../components/ButtonCard";
import "../styles/styles.css";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    dataBaseFireStore();
  const [newOriginId, SetNewOriginId] = useState();
  const { required, patternUrl } = formValidate();
  const [copy, setCopy] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setError,
    setValue,
  } = useForm();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData)
    return (
      <p className="flex text-lg justify-center">Cargando los datos....</p>
    );
  if (error) return <p>{error.message}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginId) {
        await updateData(newOriginId, url);
        SetNewOriginId("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      setError("firebase", {
        message: erroresFirebase(error.code),
      });
    }
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickUpdate = async (item) => {
    SetNewOriginId(item.nanoId);
    setValue("url", item.origin);
  };

  const handleClickCopy = async (nanoId) => {
    const adUrl = "/ad/"; // Ruta a la página de anuncios/redirección
    await navigator.clipboard.writeText(
      window.location.origin + adUrl + nanoId
    );
    setCopy({ [nanoId]: true });
  };

  const pathUrl = window.location.href;

  return (
    <>
      <Title />
      <div className="flex flex-col items-center space-y-4 w-full px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center space-x-4 w-full"
        >
          <div className="flex-grow max-w-xs w-full">
            <FormInputHome
              type="text"
              placeholder="https://www.youtube.com"
              label="Ingresa tu url"
              {...register("url", {
                required,
                pattern: patternUrl,
              })}
              error={errors.url}
            />
          </div>
          <div className="flex-shrink-0">
            <Button
              type="submit"
              text={newOriginId ? "EDITAR URL" : "AGREGAR URL"}
              loading={newOriginId ? loading.updateData : loading.addData}
              color="purple"
            />
          </div>
        </form>
      </div>

      <div className="flex justify-center flex-col items-center place-items-center mt-3 space-y-4 w-full px-4">
        {data.map((item) => (
          <div
            key={item.nanoId}
            className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 mb-2 flex flex-col sm:flex-row gap-3 w-full sm:w-3/4 lg:w-1/2 relative"
          >
            <img
              src={motog5}
              alt=""
              className="rounded-lg w-24 h-24 sm:w-28 sm:h-28"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div className="tracking-[-.075em] mb-4">
                <p className="mb-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white w-full">
                  {pathUrl}
                  {item.nanoId}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 link w-full">
                  {item.origin}
                </p>
              </div>
              <div className="flex gap-2 sm:gap-3 justify-end">
                <ButtonCard
                  type="button"
                  text="Borrar"
                  loading={loading[item.nanoId]}
                  onClick={() => handleClickDelete(item.nanoId)}
                />
                <ButtonCard
                  type="button"
                  text="Editar"
                  onClick={() => handleClickUpdate(item)}
                />
                <ButtonCard
                  type="button"
                  text={copy[item.nanoId] ? "Copiado" : "Copiar"}
                  onClick={() => handleClickCopy(item.nanoId)}
                  color="purple"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
