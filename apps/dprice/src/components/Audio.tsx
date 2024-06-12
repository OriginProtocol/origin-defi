import { useEffect } from 'react';

import { useAudio } from 'react-use';

import csv from '../data.csv';
import { useDPrice } from '../state';
import { getBoughtAmount, getIsWonTrade } from '../utils';

export const Audio = () => {
  const [{ index, muted }] = useDPrice();
  const [audio, , { play }] = useAudio({
    src: '/kaching.mp3',
    autoPlay: false,
  });

  useEffect(() => {
    const point = csv[index];
    const wonAmount = getIsWonTrade(point) ? getBoughtAmount(point) : 0;

    if (!muted && wonAmount > 100) {
      play();
    }
  }, [index, muted, play]);

  return audio;
};
