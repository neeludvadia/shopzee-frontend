import { ReactNode } from "react"

interface Props{
    children:ReactNode;
    className?:String
}

const Title = ({children,className}:Props) => {
  return (
    <h2>{children}</h2>
  )
}

export default Title