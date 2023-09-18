import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { animated, useSpring } from '@react-spring/web';

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
  const { id, num, message, onHide, type = 'success' } = props;
  const [show, setShow] = useState(false);

  const modalProps = useSpring({
    config: { mass: 0.75, tension: 300, friction: 20 },
    opacity: show ? 1 : 0,
    top: show ? num * 50 + 20 : -50,
    zIndex: num + 50,
    left: '50%',
    transform: 'translateX(-50%)',
  });

  useEffect(() => {
    setShow(true);
    const showTimeout = setTimeout(() => setShow(false), 4000);
    const hideTimeout = setTimeout(() => onHide(id), 4200);
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [id]);

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
      className={`bg-gray-900 text-white fixed rounded text-sm font-medium flex items-center px-8 py-2 ${type} text-center sm:whitespace-nowrap`}
      style={modalProps}
    >
      {message}
    </animated.div>
  );

  return createPortal(cmp, el.current);
};
