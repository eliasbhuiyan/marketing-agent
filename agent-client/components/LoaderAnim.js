import React from 'react'

const LoaderAnim = ({children}) => {
  return (
    <div class="transition-container w-fit absolute top-50 left-50">
			<ul className=''>
				{children}
			</ul>
		</div>
  )
}

export default LoaderAnim