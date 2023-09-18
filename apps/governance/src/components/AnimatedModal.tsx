import React, { useEffect, useState } from 'react';

import { Modal } from '@mui/base/Modal';
import { animated, useSpring } from '@react-spring/web';

interface AnimatedModalProps {
  children: React.ReactNode;
  open: boolean;
  shouldClose?: boolean;
  onClose: () => void;
}

export const AnimatedModal = (props: AnimatedModalProps) => {
  const { open, children, onClose } = props;
  const [shouldClose, setShouldClose] = useState(false);

  const panelProps = useSpring({
    from: { opacity: 0, y: 0, transform: 'scale(0.95)' },
    to: {
      opacity: open && !shouldClose ? 1 : 0,
      transform: open && !shouldClose ? 'scale(1)' : 'scale(0.95)',
      y: shouldClose ? 50 : 0,
    },
    config: { mass: 0.2, tension: 170, friction: 24 },
    onChange(result) {
      if (result.value.opacity < 0.03 && shouldClose) {
        setShouldClose(false);
        onClose();
      }
    },
  });

  const opacityProps = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: open && !shouldClose ? 1 : 0,
    },
    config: { mass: 1, tension: 170, friction: 24 },
  });

  useEffect(() => {
    if (props.shouldClose) setShouldClose(true);
  }, [props.shouldClose]);

  return (
    <Modal
      open={open}
      onClose={() => setShouldClose(true)}
      className="fixed inset-0 flex justify-center items-center"
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          className: 'fixed inset-0 bg-off-black/80 z-0',
          style: opacityProps as object,
        },
      }}
    >
      <animated.div
        style={panelProps}
        className="bg-gray-900 z-50 w-full max-w-[550px] rounded-lg relative"
      >
        {children}
      </animated.div>
    </Modal>
  );
};

interface BackdropProps {
  className: string;
  onClick?: () => void;
  style: object;
}

const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  function Backdrop(props, ref) {
    const { className, onClick, style } = props;
    return (
      <animated.div
        style={style}
        className={className}
        ref={ref}
        onClick={onClick}
      />
    );
  },
);
