import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";
import { db, auth } from "../FireBase";
import { nanoid } from "nanoid";

import { useEffect, useState } from "react";

export const dataBaseFireStore = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});

  const getData = async () => {
    console.log(auth.currentUser);
    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const dataRef = collection(db, "urls");
      const q = query(dataRef, where("uId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const dataDb = querySnapshot.docs.map((doc) => doc.data());
      setData(dataDb);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  const addData = async (url) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const newDoc = {
        enabled: true,
        nanoId: nanoid(6),
        origin: url,
        uId: auth.currentUser.uid,
      };
      const docRef = doc(db, "urls", newDoc.nanoId);
      await setDoc(docRef, newDoc);
      setData([...data, newDoc]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  const deleteData = async (nanoId) => {
    try {
      setLoading((prev) => ({ ...prev, [nanoId]: true }));
      const docRef = doc(db, "urls", nanoId);
      await deleteDoc(docRef);
      setData(data.filter((item) => item.nanoId !== nanoId));
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [nanoId]: false }));
    }
  };

  const updateData = async (nanoId, newUrl) => {
    try {
      setLoading((prev) => ({ ...prev, updateData: true }));
      const docRef = doc(db, "urls", nanoId);
      await updateDoc(docRef, { origin: newUrl });
      setData(
        data.map((item) =>
          item.nanoId === nanoId ? { ...item, origin: newUrl } : item
        )
      );
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, updateData: false }));
    }
  };

  return {
    data,
    error,
    loading,
    getData,
    addData,
    deleteData,
    updateData,
  };
};
