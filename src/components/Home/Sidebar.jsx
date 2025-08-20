import React  from 'react'
import { useState } from 'react';
import { FiChevronRight, FiX } from 'react-icons/fi'


export default function Sidebar( {isOpen, setIsOpen} ) {

    const slideSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            {/* Sidebar */}

            {
              <>
                 <aside className={` fixed  h-[100vh]   w-74 bg-white dark:bg-gray-800 shadow-md hidden md:flex flex-col z-50 top-0  border-r border-gray-200 dark:border-gray-700 l transition-transform duration-1000 ${isOpen ? '' : '-translate-x-full'}`}> 
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-indigo-500">📝 Sticky Notes</h2>
                        <FiX onClick={slideSidebar} className=' hover:bg-cyan-900  bg-cyan-700 text-2xl rounded cursor-pointer w-6 h-6 text-white' />

                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                        <button className="w-full text-left px-4 py-2 rounded-md hover:bg-indigo-100 dark:hover:bg-gray-700">
                            All Notes
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-md hover:bg-indigo-100 dark:hover:bg-gray-700">
                            Pinned
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-md hover:bg-indigo-100 dark:hover:bg-gray-700">
                            Trash
                        </button>
                    </nav>
                </aside>
                
                     <div className='bg-transparent h-[100vh] flex justify-center items-center '>
                        <FiChevronRight  onClick={slideSidebar} 
                        className='hover:bg-cyan-900 w-4 bg-cyan-700 transition-colors cursor-pointer h-18 rounded fixed left-0 rounded-l-none ' />
                    </div>
              </>

            }
        </>
    )
}
