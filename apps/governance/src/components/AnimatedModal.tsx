import { forwardRef, useEffect, useState } from 'react';

import { Modal } from '@mui/base/Modal';
import { animated, useSpring } from '@react-spring/web';

import { Close } from './Icons';

import type { ReactNode } from 'react';

interface AnimatedModalProps {
  children: React.ReactNode;
  open: boolean;
  shouldClose?: boolean;
  onClose: () => void;
  maxWidth?: number;
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
      className="fixed inset-0 w-screen overflow-y-auto"
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          className: 'fixed inset-0 bg-off-black/80 z-10 pointer-events-none',
          style: opacityProps as object,
        },
      }}
    >
      <div
        className="flex min-h-full justify-center items-center py-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) setShouldClose(true);
        }}
      >
        <animated.div
          style={{ ...panelProps, maxWidth: props.maxWidth || 550 }}
          className="bg-gray-900 z-20 w-full rounded-lg relative"
        >
          {children}
        </animated.div>
      </div>
    </Modal>
  );
};

interface BackdropProps {
  className: string;
  onClick?: () => void;
  style: object;
}

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
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

interface HeaderProps {
  children: ReactNode;
  onClose?: () => void;
}

export const ModalHeader = ({ children, onClose }: HeaderProps) => {
  return (
    <div className="py-4 px-6 font-bold flex items-center justify-between border-b border-off-black leading-none">
      {children}
      {!onClose ? null : (
        <button
          className="p-1.5 rounded-full bg-gray-800 hover:bg-gray-700"
          onClick={() => onClose()}
        >
          <Close />
        </button>
      )}
    </div>
  );
};