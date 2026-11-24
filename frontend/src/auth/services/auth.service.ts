import {client} from "../../conf/axios";

//this function is in a develop state (is missing the data-types and testing)
export const loginUser = async()=>{
    try{
        const response = await client.post("/login");
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