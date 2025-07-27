"use server"
import validateForm from "./action";
export default async function createUser(formData:FormData){
    const errors:string[] = validateForm(formData)
    if(errors.length>0){
        return {success:false,
            errors:errors
        }}
    else{
        return {success:true}
    }
    }
