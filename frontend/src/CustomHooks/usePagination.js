//Custom hook for pagination
import { useState, useMemo} from 'react'


const usePagination=(items,itemsPerPage=10) =>{
    const [ currentPage,setCurrentPage] =useState(1)

    const paginationData=useMemo(()=>{
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem =indexOfLastItem - itemsPerPage 
        const currentItems =items.slice(indexOfFirstItem,indexOfLastItem)
        const totalPages =Math.ceil(items.length /itemsPerPage)


        return{
            currentItems,
            totalPages,
            currentPage,
            totalItems:items.length,
            indexOfFirstItem,
            indexOfLastItem,
            hasNextPage:currentPage < totalPages,
            hasPrevPage:currentPage > 1
        }

        
    },[items,currentPage,itemsPerPage])


    const goToPage=(page)=>{
        setCurrentPage(Math.max(1,Math.min(page,paginationData.totalPages)))
    }

    const nextPage=()=>{
        if(paginationData.hasNextPage){
            setCurrentPage(prev =>prev +1 )
        }
    }

    const prevPage=()=>{
        if(paginationData.hasPrevPage){
            setCurrentPage(prev => prev -1)
        }
    }

    const resetPage=()=>{
        setCurrentPage(1)
    }

    return{
        ...paginationData,
        setCurrentPage:goToPage,
        nextPage,
        prevPage,
        resetPage
    }
}

export default usePagination