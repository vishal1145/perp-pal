import React from 'react'
import ContentLoader from 'react-content-loader'
 
const CustomCardLoader = () => (
  <ContentLoader viewBox="0 0 380 80" className='mt-2'>
  {/* <ContentLoader viewBox="0 0 380 61" className=' '> */}
  <rect x="0" y="0" width="100%" height="70" />
</ContentLoader>
)

export default CustomCardLoader