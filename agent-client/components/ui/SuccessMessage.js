import { CheckCircle } from 'lucide-react'
import React from 'react'

const SuccessMessage = ({ children }) => {
  return (
    <div className="my-4 mx-2 p-3 bg-green-500/20 border border-green-500 rounded-md text-green-100">
      <p className="font-medium flex items-center text-sm">
        <CheckCircle className="h-4 w-4 mr-2" />
        {children}
      </p>
    </div>
  )
}

export default SuccessMessage