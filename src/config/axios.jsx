/* eslint-disable no-undef */
import axios from "axios"
const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL);

export default async function axiosRequest(url,method,data) {
    try {
    const axiosConfig = {
      baseURL: baseURL,
      url: url,
      method: method || "post",
      headers:{
        "Content-Type": "application/json",
      },
      data: data,
      withCredentials: true // This line is optional, depending on your CORS setup
    };

    const response = await axios(axiosConfig);
    return handleResponse(response);
  } catch (error) {
    console.error("Error in axiosRequest:", error);
    return error.response?.data || "Something went wrong";
  }


}
const handleResponse=(response)=>{
    if(response.status == 200){
        return response;
    }else{
        return(response || "Something went wrong");
    }
}


