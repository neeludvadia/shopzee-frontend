import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export const requireUser = async ()=>{
  const user = await currentUser();
  if(!user){
    return redirect("/")
  }
}