import axiosInstance from "./axios";
import { useContext } from "react";
import { AppContext } from "../context/AppData";
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from "../context/Auth";


export const useAuth = () => {
  const { expoPushToken } = useContext(AppContext);
  const { setUser } = useContext(AuthContext)


  const register = async (
    full_name,
    phone_number,
    email,
    ref,
    is_mother,
    children,
    password
  ) => {
    try {
      const response = await axiosInstance.post("/reg/create", {
        full_name,
        phone_number,
        email,
        ref,
        is_mother,
        children,
        device_id: expoPushToken,
        password
      });
      const { status } = response.data;
      if (status) {
        return {
          status: true,
          data: response.data,
        };
      } else {
        return {
          status: false,
          data: response.data.payload,
        };
      }
    } catch (error) {

      return {
        status: false,
        data: "Network Error",
      };
    }
  }


  const login = async (
    email,
    password
  ) => {
    try {
      const response = await axiosInstance.post("/users/login", {
        email, password
      })

      const { status, payload } = response.data

      if (status) {
        await SecureStore.setItemAsync("mothersToken", payload.token)
        await SecureStore.setItemAsync("mothersUser", JSON.stringify(payload.user))
        setUser(payload.user)
        return {
          status: true,
          data: "Successful login",
        };
      } else {
        return {
          status: false,
          data: payload,
        };
      }
    } catch (error) {
      return {
        status: false,
        data: error.message
      }
    }

  }

  return {
    register,
    login
  }

}
