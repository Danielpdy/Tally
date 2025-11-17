import React from 'react';
import styles from './Skeleton.module.css';

const Skeleton = ({ variant = 'default', width, height, className = '' }) => {
    const style = {
        width: width || '100%',
        height: height || 'auto'
    };

    return (
        <div
            className={`${styles.skeleton} ${styles[variant]} ${className}`}
            style={style}
        />
    );
};

export default Skeleton;
