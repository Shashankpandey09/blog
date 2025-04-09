const BasicLoader:React.FC<{loading:boolean,label:string}> = ({loading,label}) => {
  return (
   <>
                  {loading ? (
                    <div className="flex items-center">
                      <span
                        className="h-6 w-6 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin"
                        aria-label="Loading"
                      ></span>
                    </div>
                  ) : (
                    `${label}`
                  )}
             </>
  )
}
export default BasicLoader