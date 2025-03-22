const Toaster:React.FC<{message:string}> = ({message}) => {
  return (
    <div className={`h-12 w-16 bg-`}>
       <span>
        {message}
        </span> 
    </div>
  )
}
export default Toaster