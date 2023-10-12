import axiosInstance from "./axios";
import { useContext } from "react";
import { AppContext } from "../context/AppData";
import { AuthContext } from "../context/Auth";
import * as SecureStore from 'expo-secure-store';

export const useAppData = () => {
  const { expoPushToken, setPrayers, setTestimonies, setNews, setMeetings, setUsers, setChatUsers, setNotes } = useContext(AppContext);
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

  const getMeetings = async () => {
    try {

      const respose = await axiosInstance.get("/meetings/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { status } = respose.data;

      if (status) {
        await SecureStore.setItemAsync("meetings", JSON.stringify(respose.data.payload));
        setMeetings(respose.data.payload)
      } else {
        setMeetings([])
      }

    } catch (error) {

    }
  }

  const getUsers = async () => {
    try {
      const respose = await axiosInstance.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { status } = respose.data;

      if (status) {
        await SecureStore.setItemAsync("users", JSON.stringify(respose.data.payload));
        setUsers(respose.data.payload)
      } else {
        setUsers([])
      }
    } catch (error) {

    }
  }

  const getChatUsers = async () => {
    try {
      const respose = await axiosInstance.get("/users/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { status } = respose.data;

      if (status) {
        await SecureStore.setItemAsync("chatusers", JSON.stringify(respose.data.payload));
        setChatUsers(respose.data.payload)
      } else {
        setChatUsers([])
      }
    } catch (error) {

    }
  }

  const getNotes = async () => {
    try {
      const respose = await axiosInstance.get("/notes/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { status } = respose.data;

      if (status) {
        await SecureStore.setItemAsync("notes", JSON.stringify(respose.data.payload));
        setNotes(respose.data.payload)
      } else {
        setNotes([])
      }
    } catch (error) {

    }
  }


  return {
    getPrayers,
    getTestimonies,
    getNews,
    getMeetings,
    getUsers,
    getChatUsers,
    getNotes
  }
}