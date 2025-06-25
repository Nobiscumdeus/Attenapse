import React from 'react'


class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)
        this.state={ hasError:false}

    }

    static getDerivedStateFromError(error){
        console.log(error)
        return { hasError:true}
    }

    componentDidCatch(error,errorInfo){
        console.error(`Error caught :`,error,errorInfo)

    }

    render(){
        if(this.state.hasError){
            return(
                <div className='min-h-screen flex items-center bg-gray-100 '>
                <div className='mx-auto p-6 text-center bg-red-50 border border-red-20 rounded-lg w-lg'>
                    <h2 className='text-lg font-semibold text-red-800 mb-2'> 
                        Something went wrong 
                    </h2>
                    <p className='text-red-600 mb-4'>
                        <button onClick={()=>window.location.reload} className='px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700'>
                            Refresh Page 

                        </button>
                        </p>

                </div>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary