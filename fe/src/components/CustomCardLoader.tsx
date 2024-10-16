import React, { FC } from 'react'
import ContentLoader from 'react-content-loader'
 
interface CustomCardLoaderProps{
  viewBox:string;
  className:string;
  rectW:string;
  rectH:string;
}
const CustomCardLoader:FC<CustomCardLoaderProps>= ({viewBox, className, rectW, rectH}) => (
  <ContentLoader viewBox={`${viewBox}`} className={`${className}`}>
  <rect x="0" y="0" width={`${rectW}`} height={`${rectH}`} />
</ContentLoader>
)
 
export default CustomCardLoader