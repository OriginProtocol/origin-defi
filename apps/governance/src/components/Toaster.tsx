import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { animated, useSpring, useSpringValue } from '@react-spring/web';

import OGVIcon from '../assets/ogv.svg';
import { CheckCircle, ExternalLink } from '../components/Icons';
import { StateContext } from './AppState';

import type { Toast } from './AppState';

let savedState = {} as Record<string, boolean>;
const reducer = (state: object, newState: object) => {
  savedState = { ...state, ...newState };
  return savedState;
};

export const Toaster = () => {
  const { state } = useContext(StateContext);
  const toasts = state.toasts || [];
  const [hidden, setHidden] = useReducer(reducer, savedState);
  const visibleToasts = toasts.filter((t: { id: string }) => !hidden[t.id]);

  return (
    <>
      {visibleToasts.map((toast: Toast, num: number) => (
        <ToastCmp
          key={toast.id}
          num={num}
          onHide={(id) => {
            setHidden({ [id]: true });
            savedState[id] = true;
          }}
          {...toast}
        />
      ))}
    </>
  );
};

type ToastProps = Toast & {
  num: number;
  onHide: (id: string) => void;
};

const ToastCmp = (props: ToastProps) => {
  const { id, num, title, text, onHide } = props;
  const [show, setShow] = useState(false);
  const [startScroll] = useState(
    window.scrollY < 80 ? 90 - window.scrollY : 20,
  );

  const modalProps = useSpring({
    config: { mass: 0.75, tension: 300, friction: 20 },
    opacity: show ? 1 : 0,
    top: show ? num * 100 + startScroll : -120,
    zIndex: num + 100,
  });

  const width = useSpringValue('0%', {
    config: { duration: 4000 },
    onRest: (val) => {
      if (val.finished) {
        setShow(false);
        setTimeout(() => onHide(id), 150);
      }
    },
  });

  useEffect(() => {
    setShow(true);
    width.start('100%');
  }, [id, width]);

  const el = useRef(document.createElement('div'));

  useEffect(() => {
    const current = el.current;
    document.body.appendChild(el.current);
    el.current.classList.add('z-50');

    return () => {
      if (current.parentElement) {
        current.parentElement.removeChild(current);
      }
    };
  }, [el]);

  const cmp = (
    <animated.div
      className="fixed right-5 min-w-[300px]"
      style={modalProps}
      onMouseOver={() => width.pause()}
      onMouseOut={() => width.resume()}
    >
      <div className="p-4 flex justify-between items-center bg-gray-900">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <div className="text-green-400">
              <CheckCircle size={16} />
            </div>
            {title}
            <div className="text-blue-500 ml-1">
              <ExternalLink size={14} />
            </div>
          </div>
          <div className="text-xs text-gray-500">{text}</div>
        </div>
        <div className="ml-8 bg-[#18191C] p-2">
          <img src={OGVIcon} alt="OGV" />
        </div>
      </div>
      <animated.div className="h-[3px] bg-green-400" style={{ width }} />
    </animated.div>
  );

  return createPortal(cmp, el.current);
};
