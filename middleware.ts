import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth(async (req) => {
  const session = req.auth
  const { pathname } = req.nextUrl

  if (session?.user && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  if (!session?.user && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard", "/"]
}