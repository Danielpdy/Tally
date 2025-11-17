import { useState } from "react";
import { useClickOutside } from './useClickOutside';

import React from 'react'

const useDropdown = (on) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggle = () => setIsOpen(prev => !prev);
    const open = () => setIsOpen(true);
    const close = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };

    useClickOutside(dropdownRef, close);

    return {
        isOpen,
        dropdownRef,
        toggle,
        open,
        close
    }
}

export default useDropdown
