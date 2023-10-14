export const logWelcomeMessage = (message: string) => {
  const styles = [
    'font-size: 40px',
    `color: #FFFFFF`,
    `background-color: #0074F0`,
    'border-radius: 4px',
    'padding: 20px',
  ].join(';');

  console.log(`%c0rigin ${message}`, styles);
};
