"use server"
import prismaClient from "@/services/prisma"
type formType={
    formdata:{
  name  :   string
  email  :  string
  dob     : Date
  password :string
  school   :string
  address  :string
}
}
export async function addUserToDB(formdata:formType){
    try{
        const user = prismaClient.user.create({
            //@ts-ignore
            data : formdata
        });
        return {
            success:true,
            userData :user
        }
    }
    catch(err){
        return {
            success :false,
            message : "Error :" +err
        }
    }
}

export async function getUserFromDBbyEmail(passedEmail:string){
    try{
        const user = await prismaClient.user.findFirst({
            where:{
                email:passedEmail
          }
        })
        if(user){
        return {
            success:true,
            user :user
        }}
        else{
            return
        }
    }
    catch(err){
        return {
            success:false,
            message :err
        }
    }
}

export async function getUserFromDbBySearchInput(searchInput : string) {
        try{
            const user =await prismaClient.user.findMany({
                where:{
                    name:{
                        contains:searchInput.toLowerCase(),
                        mode:"insensitive"
                    }
                }
            })
            if(user) return{success:true,user:user}
            else return{success:false}
        }
        catch(err){
            return{success:false,message:err}
        }
}

export async function updateUserValues(id:string,gender:string,about:string) {
    try{
        const user = prismaClient.user.update({
            where:{
                id:id,
            },
            data:{gender:gender,about:about}
        })
        return {
            success:true,
            user:user
        }
    }
    catch(err){
        return{success:false,message:err}
    }

}