import axiosInstance from "./axios";
import { useContext } from "react";
import { AppContext } from "../context/AppData";
import { AuthContext } from "../context/Auth";
import * as SecureStore from 'expo-secure-store';

export const useAppData = () => {
  const { expoPushToken, prayers, setPrayers } = useContext(AppContext);
  const { token, user } = useContext(AuthContext)

  const getPrayers = async () => {
    try {
      const response = await axiosInstance.get("/prayer-requets/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status } = response.data;
      if (status) {
        await SecureStore.setItemAsync("prayers", JSON.stringify(response.data.payload));
        setPrayers(response.data.payload)
      } else {
        setPrayers([])
      }
    } catch (error) {

    }
  }

  return {
    getPrayers
  }
}