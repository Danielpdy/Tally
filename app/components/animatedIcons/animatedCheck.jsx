import { motion, useAnimation } from 'framer-motion';
import { useCallback, useState, useEffect } from 'react';

const PATH_VARIANTS = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
};

const CONTAINER_VARIANTS = {
  normal: {
    scale: 1,
  },
  pop: {
    scale: [1, 1.3, 1],
    transition: {
      duration: 0.4,
      times: [0, 0.5, 1],
    },
  },
};

const CircleCheckIcon = ({ className, size = 28, onClick, isPaid = false, ...props }) => {
  const controls = useAnimation();
  const containerControls = useAnimation();
  const [isChecked, setIsChecked] = useState(isPaid);

  useEffect(() => {
    setIsChecked(isPaid);
  }, [isPaid]);

  const handleClick = useCallback(
    (e) => {
      const newCheckedState = !isChecked;
      setIsChecked(newCheckedState);

      if (newCheckedState) {
        containerControls.start('pop');
        controls.start('animate').then(() => {
          controls.start('normal');
        });
      }

      onClick?.(e);
    },
    [controls, containerControls, onClick, isChecked]
  );

  return (
    <div style={{ position: 'relative', display: 'inline-block', overflow: 'visible' }}>
      <motion.div
        className={className}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
        variants={CONTAINER_VARIANTS}
        animate={containerControls}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={isChecked ? size * 1.2 : size}
          height={isChecked ? size * 1.2 : size}
          viewBox="0 0 24 24"
          fill={isChecked ? '#10B981' : 'none'}
          stroke={isChecked ? 'white' : 'currentColor'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'stroke 0.3s ease, fill 0.3s ease, width 0.3s ease, height 0.3s ease' }}
        >
          <circle cx="12" cy="12" r="10" />
          <motion.path
            variants={PATH_VARIANTS}
            initial="normal"
            animate={controls}
            d="m9 12 2 2 4-4"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default CircleCheckIcon;
