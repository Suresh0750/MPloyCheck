



export default function Layout({
    children
}:{children:React.ReactNode}){
    return(
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
            {children}
      </div>
    
    )
}