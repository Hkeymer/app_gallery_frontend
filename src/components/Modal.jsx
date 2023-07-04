import React from 'react'

const Modal = ({children,open}) => {
  return (
    <div className={open==true?'modal_container':'noDisplay'} >
    {children}
    </div>
  )
}

export default Modal