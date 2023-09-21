import { useEffect, useRef, useState } from 'react';

import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';
import { animated, useSpring } from '@react-spring/web';

import { Info } from './Icons';

import type { PopupChildrenProps } from '@mui/base/Unstable_Popup';
import type { ReactNode } from 'react';

export function Tooltip({
  children,
  title,
  placement,
}: {
  children?: React.ReactNode;
  title: React.ReactNode;
  placement?: string;
}) {
  const [open, setOpen] = useState(false);
  const anchor = useRef(null);

  return (
    <>
      <span
        className="inline-block"
        ref={anchor}
        onMouseOver={() => setOpen(true)}
        onMouseOut={() => setOpen(false)}
      >
        {children || <Info size={14} />}
      </span>
      <Popup
        open={open}
        anchor={anchor.current}
        withTransition
        offset={7}
        placement={placement}
      >
        {(props: PopupChildrenProps) => (
          <PopAnimation {...props}>{title}</PopAnimation>
        )}
      </Popup>
    </>
  );
}

const PopAnimation = (props: PopupChildrenProps & { children: ReactNode }) => {
  const { requestOpen, onEnter, onExited, placement, children } = props;

  useEffect(() => {
    if (requestOpen) {
      onEnter();
    }
  }, [onEnter, requestOpen]);

  const style = useSpring({
    from: { opacity: 0, y: -5, transform: 'scale(0.95)' },
    to: {
      opacity: requestOpen ? 1 : 0,
      transform: requestOpen ? 'scale(1)' : 'scale(0.95)',
      y: requestOpen ? 0 : -5,
    },
    onChange(result) {
      if (result.value.opacity < 0.03) {
        onExited();
      }
    },
  });

  let arrowClass = `top-0 left-1/2 -translate-x-1/2 -translate-y-1/2`;
  if (placement === 'top') {
    arrowClass = `bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2`;
  } else if (placement === 'left') {
    arrowClass = `top-1/2 right-0 translate-x-1/2 -translate-y-1/2`;
  } else if (placement === 'right') {
    arrowClass = `top-1/2 left-0 -translate-x-1/2 -translate-y-1/2`;
  }

  return (
    <animated.div
      style={style}
      className="bg-gray-700 rounded px-3 py-1 text-off-white text-sm font-medium relative"
    >
      <div
        className={`absolute transform w-2.5 h-2.5 bg-gray-700 rotate-45 ${arrowClass}`}
      />
      {children}
    </animated.div>
  );
};
