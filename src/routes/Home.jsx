import { useEffect, useState } from "react";
import Title from "../components/Title";
import { dataBaseFireStore } from "../hooks/dataBaseFireStore";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoanding";
import { nanoid } from "nanoid";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    dataBaseFireStore();
  const [text, setText] = useState("");

  const [newOriginId, SetNewOriginId] = useState();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Cargando los datos....</p>;
  if (error) return <p>{error.message}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newOriginId) {
      await updateData(newOriginId, text);
      SetNewOriginId("");
      setText("");
      return;
    }
    await addData(text);
    setText("");
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickUpdate = async (item) => {
    setText(item.origin);
    SetNewOriginId(item.nanoId);
  };

  return (
    <>
      <Title text="Home" />
      <div className="flex md:order-2 space-x-2">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="ex: http//bluuweb.org"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {newOriginId ? (
            <Button
              type="submit"
              text="EDIT URL"
              color="yellow"
              loading={loading.updateData}
            />
          ) : (
            <Button
              type="submit"
              text="ADD URL"
              loading={loading.addData}
              color="blue"
            />
          )}
        </form>
      </div>
      {data.map((item) => (
        <div key={item.nanoId}>
          <p>{item.nanoId}</p>
          <p>{item.origin}</p>
          <p>{item.uId}</p>
          <Button
            type="button"
            text="Delete"
            color="red"
            colorLoading="red"
            loading={loading[item.nanoId]}
            onClick={() => handleClickDelete(item.nanoId)}
          />
          <Button
            type="button"
            text="Edit"
            color="yellow"
            onClick={() => handleClickUpdate(item)}
          />
        </div>
      ))}
    </>
  );
};

export default Home;
