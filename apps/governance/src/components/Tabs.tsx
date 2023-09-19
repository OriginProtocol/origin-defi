import { useRef, useState } from 'react';

import { animated, useSpring } from '@react-spring/web';
import { Link, useLocation } from 'react-router-dom';

const underlineClass = `absolute left-0 right-0 h-[2px] bg-blue-gradient -bottom-px rounded-full`;

export const Tabs = (props: {
  tabs: {
    label: string;
    href: string;
  }[];
  className?: string;
}) => {
  const location = useLocation();
  const activeTab = props.tabs.findIndex(
    (tab) => tab.href === location.pathname,
  );

  const ref = useRef<HTMLDivElement>(null);
  const [springProps, setSpringProps] = useState({
    from: { left: 0, width: 0 },
    to: { left: 0, width: 0 },
  });
  const [interacted, setInteracted] = useState(false);

  const style = useSpring(springProps);

  function setActive(idx: number) {
    if (!ref.current) {
      return;
    }
    setInteracted(true);
    const parentRect = ref.current.getBoundingClientRect();
    const childEl = ref.current.childNodes[idx] as HTMLElement;
    const rect = childEl.getBoundingClientRect();
    const activeEl = ref.current.childNodes[activeTab] as HTMLElement;
    const activeRect = activeEl.getBoundingClientRect();
    setSpringProps({
      from: { left: activeRect.x - parentRect.x, width: activeRect.width },
      to: { left: rect.x - parentRect.x, width: rect.width },
    });
  }

  return (
    <div
      ref={ref}
      className={`${props.className || 'flex'} items-center gap-10 relative`}
    >
      {props.tabs.map((tab, idx) => (
        <Link
          key={idx}
          to={tab.href}
          className={`py-6 relative${
            activeTab === idx ? '' : ' text-gray-500 hover:text-off-white'
          }`}
          onClick={() => setActive(idx)}
        >
          {tab.label}
          {interacted || activeTab !== idx ? null : (
            <div className={underlineClass} />
          )}
        </Link>
      ))}
      {!interacted ? null : (
        <animated.div style={style} className={underlineClass} />
      )}
    </div>
  );
};
