export const ExternalLink = ({ size = 14 }: { size?: number }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 -960 960 960"
    className="fill-current"
  >
    <path d="M676.413-613.239 247.348-184.174Q234.674-171.5 215.522-171.5t-31.826-12.674Q171.022-196.848 171.022-216t12.674-31.826l429.065-429.065H401.913q-19.152 0-32.326-13.174t-13.174-32.326q0-19.153 13.174-32.327 13.174-13.173 32.326-13.173h320q19.152 0 32.326 13.173 13.174 13.174 13.174 32.327v320q0 19.152-13.174 32.326t-32.326 13.174q-19.152 0-32.326-13.174t-13.174-32.326v-210.848Z" />
  </svg>
);

export const Sync = ({ size = 28 }: { size?: number }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 -960 960 960"
    className="fill-current -rotate-45"
  >
    <path d="M292.308-147.692 120-320l172.308-172.308L320.846-464l-124 124H800v40H196.846l124 124-28.538 28.308Zm375.384-320L639.154-496l124-124H160v-40h603.154l-124-124 28.538-28.308L840-640 667.692-467.692Z" />
  </svg>
);

export const CaretDown = ({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    height={size}
    width={size}
    viewBox="0 -960 960 960"
    className={`fill-current${className ? ` ${className}` : ''}`}
  >
    <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" />
  </svg>
);

export const Profile = ({ size = 28 }: { size?: number }) => (
  <svg height={size} width={size}>
    <rect
      x="0"
      y="0"
      rx="0"
      ry="0"
      height={size}
      width={size}
      transform="translate(5.027366025864346 -4.293411811107908) rotate(396.9 12 12)"
      fill="#248ce1"
    />
    <rect
      x="0"
      y="0"
      rx="0"
      ry="0"
      height={size}
      width={size}
      transform="translate(-13.073541172731897 -6.82856616407962) rotate(302.7 12 12)"
      fill="#018c75"
    />
    <rect
      x="0"
      y="0"
      rx="0"
      ry="0"
      height={size}
      width={size}
      transform="translate(16.050690924033145 -8.460815358743934) rotate(340.3 12 12)"
      fill="#f70e01"
    />
    <rect
      x="0"
      y="0"
      rx="0"
      ry="0"
      height={size}
      width={size}
      transform="translate(16.17389640914339 -18.128396581385015) rotate(370.3 12 12)"
      fill="#15c6f2"
    />
  </svg>
);
