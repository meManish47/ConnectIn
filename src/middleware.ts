"use server"

import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export default function middleware(req:any){
    let user = req.cookies.get("user")?.value
    const pathname = req.nextUrl.pathname
    const protectedPaths = ["/"]
    // console.log(user)
    if(protectedPaths.includes(pathname)){
        if(!user){
            return NextResponse.redirect("http://localhost:3000/login")
        }
    }
    return NextResponse.next()
}