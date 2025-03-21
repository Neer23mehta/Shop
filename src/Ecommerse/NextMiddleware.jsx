// import { NextResponse } from "next/server";

// export function middleware(request: Request) {
//   // If the request is not for /login and is not already on the login page, redirect to /login
//   if (request.nextUrl.pathname !== "/login") {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
  
//   // Otherwise, continue processing the request
//   return NextResponse.next();
// }

// export const config = {
//   // The matcher can be adjusted to apply to any protected route
//   matcher: ['/protected/*', '/dashboard/*'], // Example: Add more paths if needed
// };
