import axios from "axios"

export default async function axiosRequest(url,method,data) {
    try {
    const axiosConfig = {
      baseURL: "http://localhost:7777",
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


