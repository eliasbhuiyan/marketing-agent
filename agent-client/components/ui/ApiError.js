import { RotateCcw } from 'lucide-react'
import React from 'react'

const ApiError = ({ children }) => {
    return (
        <div className="my-4 mx-2 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-100">
            <p className="font-medium flex items-center text-sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Error: {children}
            </p>
        </div>
    )
}

export default ApiError