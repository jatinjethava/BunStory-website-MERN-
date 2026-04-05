import React from 'react'

const NotFound = () => {
    return (
        <>
            <div className='h-100 flex justify-center items-center'>
                <div className='border-2 border-red-200 rounded-lg shadow-lg shadow-red-400'>
                    <h1 className='px-5 py-3 text-2xl'>
                        404 ! Not Found
                    </h1>
                </div>
            </div>
        </>
    )
}

export default NotFound