import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loading = () => {
  return (
    <div className="flex relative min-h-screen">
        <div className="flex gap-2 mx-auto items-center">
          <h1 className="bg-white flex gap-3 items-center px-4 py-2 rounded-md">
            Loading
            <AiOutlineLoading3Quarters className="text-xl text-slate-500 animate-spin duration-200" />
          </h1>
        </div>
      </div>
  )
}

export default Loading