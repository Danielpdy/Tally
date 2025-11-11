import React, { useState } from 'react'

const MenuDropdown = ({ trigger, menu}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleToogle = () => {
        setIsOpen(!isOpen)
    }
  return (
    <div>
      
    </div>
  )
}

export default MenuDropdown
