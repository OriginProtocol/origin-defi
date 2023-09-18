import { useEffect, useRef, useState } from 'react';

import { animated, useSpring } from '@react-spring/web';

export const Disclosure = ({
  children,
  isOpen,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Measure the content height (runs after the first render and every time the content changes)
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [contentRef.current]);

  const animationProps = useSpring({
    height: isOpen ? contentHeight : 0,
    opacity: isOpen ? 1 : 0,
    from: { height: 0, opacity: 0 },
  });

  return (
    <animated.div style={animationProps} className={className}>
      <div ref={contentRef} className="pt-2 contents">
        {children}
      </div>
    </animated.div>
  );
};
