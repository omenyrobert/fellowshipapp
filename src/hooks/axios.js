import axios from "axios";
import { HOST_URL } from "../shared/constants";


export const UPLOADS_URL = HOST_URL + "/useruploads/";


const axiosInstance = axios.create({
	baseURL: HOST_URL + "/api",
});
/* 
const requestHandler = (request) => {
	request.headers.Authorization = `Bearer ${localStorage.getItem('mothersToken')}`;

	return request;
}
const errorHandler = (error) => Promise.reject(error);

axiosInstance.interceptors.request.use(
	(request) => requestHandler(request),

	(error) => errorHandler(error),
);

axiosInstance.interceptors.response.use(
	(response) => response,

	(error) => {
		if (error?.response?.status === 401) {
			localStorage.clear();
			window.location.href = '/';
		}
	},
); */

export default axiosInstance;
