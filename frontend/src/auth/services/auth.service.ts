import {client} from "../../conf/axios";
import type { Login } from "../../types/login";

//this function is in a develop state (is missing the data-types and testing)
export const loginUser = async(data:Login)=>{
    try{
        const response = await client.post("/auth/login", data);
        if (response.status!==200) {
            //TODO: implement toast service
            return null;
        }
        return response.data;
    }catch(error){
        console.log(error);
        //TODO: implement toast service
        return null;
    }
}