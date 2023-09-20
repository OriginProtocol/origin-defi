import { useEffect, useRef, useState } from 'react';

import { animated, useSpring } from '@react-spring/web';

interface NumberSpinnerProps {
  num: number;
  slow?: boolean;
  leftPad?: boolean;
}

export const NumberSpinner = (props: NumberSpinnerProps) => {
  const { num, slow, leftPad } = props;
  const [firstRender, setFirstRender] = useState(true);
  let numWithCommas = num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (leftPad && num < 10) {
    numWithCommas = '0' + numWithCommas;
  }

  const prevNumRef = useRef(num);
  const down = num < prevNumRef.current;

  useEffect(() => {
    prevNumRef.current = num;
    setFirstRender(false);
  }, [num]);

  const splitFormattedNum = numWithCommas
    .replace('.00', '')
    .split('')
    .reverse();

  return (
    <div className="flex flex-row-reverse justify-end">
      {splitFormattedNum.map((char, idx) =>
        char.match(/[0-9]/) ? (
          <CharSpinner
            key={idx}
            idx={idx}
            num={num}
            slow={slow}
            char={Number(char)}
            down={down}
            spinAtStart={!firstRender}
          />
        ) : (
          char
        ),
      )}
    </div>
  );
};

interface CharSpinnerProps {
  num: number;
  char: number;
  down?: boolean;
  slow?: boolean;
  idx: number;
  spinAtStart?: boolean;
}

const CharSpinner = (props: CharSpinnerProps) => {
  const { num, char, down, slow, idx, spinAtStart } = props;
  const [y, setY] = useState(1000000000 + char);
  const [yFrom] = useState(1000000000 + (spinAtStart ? char - 1 : char));
  const [last, setLast] = useState(char);
  const springProps = useSpring({
    from: { y: yFrom },
    to: { y },
    config: {
      mass: 1,
      tension: (slow ? 90 : 170) - idx * 5,
      friction: slow ? 40 : 26,
    },
  });

  useEffect(() => {
    if (char === last) return;
    setLast(char);
    if (down) {
      setY(y - (last - char) - (char > last ? 10 : 0));
    } else {
      setY(y + char - last + (char < last ? 10 : 0));
    }
  }, [num, char, last, down, y]);

  return (
    <div className="relative overflow-y-clip">
      <animated.div
        className="absolute"
        style={{
          transform: springProps.y.to(
            (val: number) => `translateY(${(-val * 10) % 100}%)`,
          ),
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 9].map((num, idx) => {
          const className =
            idx === 10 ? 'absolute' : idx === 11 ? 'absolute -top-9' : '';
          return (
            <div key={idx} className={className}>
              {num}
            </div>
          );
        })}
      </animated.div>
      <div className="invisible">{char}</div>
    </div>
  );
};
