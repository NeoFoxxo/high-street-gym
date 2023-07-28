export { default } from "next-auth/middleware"
// if the user is not authenticated on one of the routes below the next auth middleware will redirect them to the sign in page
export const config = { 
  matcher: ["/create-blog", "/admin"], 
};