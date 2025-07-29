"use server"

import { cookies } from "next/headers"

export  async function setCookies(email:string){
    const userCookies = await cookies()
    userCookies.set("user",email)

}
export async function getDataFromCookies(){
    const userCookies = await cookies()
    const userEmail =userCookies.get("user")
    return userEmail
}

export async function deleteCookies(){
    const userCookies = await cookies()
    userCookies.delete("user")
}