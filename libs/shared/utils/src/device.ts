export const isTouchScreen = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
