import React from 'react'

const Cell: React.FC<JSX.IntrinsicElements["div"]> = ({ children, className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>{children}</div>
  )
}

export default Cell