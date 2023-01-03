import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

export const saveItems = async (data) => {
  await setDoc(doc(firestore, "fooditems", `${Date.now()}`), data, {
    merge: true,
  });
};
