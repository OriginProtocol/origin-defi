export const getTokenLogoUrl = (
  tokenAddress: string | undefined,
  chainId: number,
  format: 'svg' | 'png32' | 'png128' = 'svg',
  alt = false,
) => {
  const filename = {
    svg: alt ? 'logo-alt.svg' : 'logo.svg',
    png32: alt ? 'logo-alt-32.png' : 'logo-32.png',
    png128: alt ? 'logo-alt-128.png' : 'logo-128.png',
  }[format];

  return `https://raw.githubusercontent.com/SmolDapp/tokenAssets/refs/heads/main/tokens/${chainId.toString()}/${tokenAddress ?? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'}/${filename}`;
};
