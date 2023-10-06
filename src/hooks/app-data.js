import axiosInstance from "./axios";
import { useContext } from "react";
import { AppContext } from "../context/AppData";
import { AuthContext } from "../context/Auth";
import * as SecureStore from 'expo-secure-store';

export const useAppData = () => {
  const { expoPushToken, setPrayers, setTestimonies, setNews } = useContext(AppContext);
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

  const getTestimonies = async () => {
    try {
      const response = await axiosInstance.get("/testimonies/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status } = response.data;
      if (status) {
        await SecureStore.setItemAsync("testimonies", JSON.stringify(response.data.payload));
        setTestimonies(response.data.payload)
      } else {
        setTestimonies([])
      }
    } catch (error) {

    }
  }

  const getNews = async () => {
    try {
      const response = await axiosInstance.get("/news", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status } = response.data;
      if (status) {
        await SecureStore.setItemAsync("news", JSON.stringify(response.data.payload));
        setNews(response.data.payload)
      } else {
        setNews([])
      }
    }
    catch (error) {

    }
  }


  return {
    getPrayers,
    getTestimonies,
    getNews,
  }
}