import axios from "axios";
import { rootBackendServer } from "../rootBackendServer";

export interface authResponse {
    status: string,
    data: {
        message: string,
        status: string,
        data: Object
    }
}

export default async function handleSignUp(formData: FormData) {
    // Make a request to the backend
    const response = await axios.post(`${rootBackendServer}/auth/signup`, { email: formData.get("email"), username: formData.get("username") });

    console.log(response.data.status)

   if(response.data.status === 200) {
       return {
        status: "success",
        data: response.data
       }
   }

   // Return an error message
   return {
    status: "error",
    data: response.data,
   }
}