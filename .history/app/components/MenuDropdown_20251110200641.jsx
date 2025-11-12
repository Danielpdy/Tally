import React, { useState } from 'react'

const MenuDropdown = ({ trigger, menu}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleToogle = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
    }
  return (
    <div>
      <div>
        
      </div>
    </div>
  )
}

export default MenuDropdown
