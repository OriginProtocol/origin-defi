import { useEffect, useState } from 'react';

import { animated, useSpring } from '@react-spring/web';

export const NumberSpinner = ({
  num,
  slow,
  down,
  leftPad,
  spinAtStart,
}: {
  num: number;
  slow?: boolean;
  down?: boolean;
  leftPad?: boolean;
  spinAtStart?: boolean;
}) => {
  let numWithCommas = num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (leftPad && num < 10) {
    numWithCommas = '0' + numWithCommas;
  }

  const splitFormattedNum = numWithCommas.replace('.00', '').split('');

  return (
    <div className="flex">
      {splitFormattedNum.map((char, idx) =>
        char.match(/[0-9]/) ? (
          <CharSpinner
            key={idx}
            idx={idx}
            num={num}
            slow={slow}
            char={Number(char)}
            down={down}
            spinAtStart={spinAtStart}
          />
        ) : (
          char
        ),
      )}
    </div>
  );
};

const CharSpinner = ({
  num,
  char,
  down,
  slow,
  spinAtStart,
  idx,
}: {
  num: number;
  char: number;
  down?: boolean;
  slow?: boolean;
  spinAtStart?: boolean;
  idx: number;
}) => {
  const [y, setY] = useState(spinAtStart ? 0 : down ? 1000000000 + char : char);
  const [last, setLast] = useState(spinAtStart ? 0 : char);
  const springProps = useSpring({
    from: { y: spinAtStart ? 0 : down ? 1000000000 + char : char },
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
  }, [num, char, y, last, down]);

  return (
    <div className="relative overflow-hidden">
      <animated.div
        className="absolute"
        style={{
          transform: springProps.y.to(
            (val: number) => `translateY(${(-val * 10) % 100}%)`,
          ),
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 9].map((num, idx) => (
          <div
            key={idx}
            className={
              idx === 10 ? 'absolute' : idx === 11 ? 'absolute -top-9' : ''
            }
          >
            {num}
          </div>
        ))}
      </animated.div>
      <div className="invisible">{char}</div>
    </div>
  );
};
