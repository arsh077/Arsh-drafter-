import React from 'react';

interface EmblemProps {
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}

/**
 * Engraved line-art rendering of the Lion Capital of Ashoka (National Emblem of India)
 * styled after official Indian Non-Judicial e-Stamp copperplate engraving,
 * complete with three visible lions, Dharma Chakra abacus, bull & horse, lotus base,
 * and "सत्यमेव जयते".
 */
export const AshokaEmblemSvg: React.FC<EmblemProps> = ({
  className = 'w-[86px] h-[126px]',
  strokeColor = '#111827',
  fillColor = '#ffffff',
}) => (
  <svg
    viewBox="0 0 140 205"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Lion Capital of Ashoka"
    role="img"
  >
    {/* Left Lion Profile */}
    <path
      d="M52 26C42 21 31 24 25 32C22 36 22 42 27 45C24 47 24 52 29 53C27 56 29 60 33 60L30 88H53V42C49 38 49 31 52 26Z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Left lion face & mane engraving */}
    <circle cx="33.5" cy="34.5" r="1.6" fill={strokeColor} />
    <path
      d="M25 38.5H32M27 45C32 45 36 43 39 40M36 48C40 46 45 47 48 51M35 55C40 53 45 55 48 58M34 63C39 61 44 63 48 66M33 71C38 69 44 71 48 74M32 79C37 78 43 79 48 82"
      stroke={strokeColor}
      strokeWidth="1.3"
      strokeLinecap="round"
    />

    {/* Right Lion Profile */}
    <path
      d="M88 26C98 21 109 24 115 32C118 36 118 42 113 45C116 47 116 52 111 53C113 56 111 60 107 60L110 88H87V42C91 38 91 31 88 26Z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Right lion face & mane engraving */}
    <circle cx="106.5" cy="34.5" r="1.6" fill={strokeColor} />
    <path
      d="M115 38.5H108M113 45C108 45 104 43 101 40M104 48C100 46 95 47 92 51M105 55C100 53 95 55 92 58M106 63C101 61 96 63 92 66M107 71C102 69 96 71 92 74M108 79C103 78 97 79 92 82"
      stroke={strokeColor}
      strokeWidth="1.3"
      strokeLinecap="round"
    />

    {/* Center Lion Crown, Shaggy Mane & Chest */}
    <path
      d="M58 14C56 10 61 7 64 11C67 8 73 8 76 11C79 7 84 10 82 14C89 19 91 29 88 38C85 45 84 53 86 88H54C56 53 55 45 52 38C49 29 51 19 58 14Z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.9"
      strokeLinejoin="round"
    />
    {/* Center Lion Face */}
    <ellipse
      cx="70"
      cy="28"
      rx="10.5"
      ry="11"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.5"
    />
    {/* Brow, Eyes, Nose, Roaring Mouth */}
    <path
      d="M63 23.5C65 22 67 22 68.5 23.5M71.5 23.5C73 22 75 22 77 23.5"
      stroke={strokeColor}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <circle cx="66" cy="25.5" r="1.4" fill={strokeColor} />
    <circle cx="74" cy="25.5" r="1.4" fill={strokeColor} />
    <path
      d="M68 29.5L70 32.5L72 29.5M65 34.5C68 36.5 72 36.5 75 34.5"
      stroke={strokeColor}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Center Lion Mane Curls */}
    <path
      d="M57 43C62 40 78 40 83 43M56 50C62 47 78 47 84 50M56 57C62 54 78 54 84 57M56 64C62 61 78 61 84 64M55 71C62 69 78 69 85 71"
      stroke={strokeColor}
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Forelegs & Paws Resting on Plinth */}
    <rect
      x="28"
      y="86"
      width="84"
      height="11"
      rx="2"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.7"
    />
    <path
      d="M42 86V97M54 76V97M65 76V97M75 76V97M86 76V97M98 86V97"
      stroke={strokeColor}
      strokeWidth="1.3"
    />

    {/* Abacus Band */}
    <rect
      x="24"
      y="99"
      width="92"
      height="26"
      rx="2"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.8"
    />
    <line x1="24" y1="103" x2="116" y2="103" stroke={strokeColor} strokeWidth="1.1" />
    <line x1="24" y1="121" x2="116" y2="121" stroke={strokeColor} strokeWidth="1.1" />

    {/* Central Ashoka Dharma Chakra on Abacus */}
    <circle cx="70" cy="112" r="8" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
    <circle cx="70" cy="112" r="1.7" fill={strokeColor} />
    {Array.from({ length: 12 }).map((_, idx) => {
      const a = (idx * 30 * Math.PI) / 180;
      return (
        <line
          key={idx}
          x1="70"
          y1="112"
          x2={70 + Math.cos(a) * 7.5}
          y2={112 + Math.sin(a) * 7.5}
          stroke={strokeColor}
          strokeWidth="0.9"
        />
      );
    })}

    {/* Bull Relief (Left) & Horse Relief (Right) on Abacus */}
    <path
      d="M32 118V112C32 109 36 107 41 107C45 107 49 109 51 112V118M35 118V114M47 118V114"
      stroke={strokeColor}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M89 118V112C91 109 95 107 99 107C104 107 108 109 108 112V118M93 118V114M105 118V114"
      stroke={strokeColor}
      strokeWidth="1.4"
      strokeLinecap="round"
    />

    {/* Bell-shaped Inverted Lotus Base */}
    <path
      d="M30 127H110C114 140 118 150 123 158H17C22 150 26 140 30 127Z"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Lotus Petal Ribs */}
    <path
      d="M38 128C35 140 31 149 26 157M48 128C46 140 43 149 40 157M59 128C58 140 57 149 56 157M70 128V157M81 128C82 140 83 149 84 157M92 128C94 140 97 149 100 157M102 128C105 140 109 149 114 157"
      stroke={strokeColor}
      strokeWidth="1.3"
      strokeLinecap="round"
    />

    {/* Plinth Molding */}
    <rect
      x="15"
      y="160"
      width="110"
      height="5"
      rx="1.5"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1.6"
    />

    {/* Devanagari Motto: Satyameva Jayate */}
    <text
      x="70"
      y="189"
      textAnchor="middle"
      fill={strokeColor}
      fontSize="19"
      fontWeight="700"
      fontFamily="serif"
    >
      सत्यमेव जयते
    </text>
  </svg>
);

/**
 * Large circular security watermark centered behind the certificate table,
 * matching the double-ringed sawtooth guilloché seal and centered Ashoka emblem + Satyameva Jayate.
 */
export const AshokaWatermarkSvg: React.FC<{ className?: string }> = ({
  className = 'w-[390px] h-[390px]',
}) => (
  <svg
    viewBox="0 0 360 360"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer and inner circular guilloché rings */}
    <circle cx="180" cy="180" r="172" stroke="#d4d4d8" strokeWidth="4" />
    <circle cx="180" cy="180" r="165" stroke="#d4d4d8" strokeWidth="1.5" />
    <circle cx="180" cy="180" r="144" stroke="#d4d4d8" strokeWidth="1.8" />
    <circle cx="180" cy="180" r="138" stroke="#e4e4e7" strokeWidth="3" />

    {/* Radial sawtooth / cross-hatched guilloché band between r=144 and r=165 */}
    {Array.from({ length: 72 }).map((_, idx) => {
      const a1 = (idx * 5 * Math.PI) / 180;
      const a2 = ((idx + 0.5) * 5 * Math.PI) / 180;
      const x1 = 180 + Math.cos(a1) * 144;
      const y1 = 180 + Math.sin(a1) * 144;
      const x2 = 180 + Math.cos(a2) * 165;
      const y2 = 180 + Math.sin(a2) * 165;
      const x3 = 180 + Math.cos(a1 + (5 * Math.PI) / 180) * 144;
      const y3 = 180 + Math.sin(a1 + (5 * Math.PI) / 180) * 144;
      return (
        <path
          key={idx}
          d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3}`}
          stroke="#d4d4d8"
          strokeWidth="1.1"
          fill="none"
        />
      );
    })}

    {/* Subtle engraved Lion Capital inside the watermark circle */}
    <g transform="translate(88, 66) scale(1.32)" opacity="0.55">
      <path
        d="M52 26C42 21 31 24 25 32C22 36 22 42 27 45C24 47 24 52 29 53C27 56 29 60 33 60L30 88H53V42C49 38 49 31 52 26Z"
        fill="#e4e4e7"
        stroke="#a1a1aa"
        strokeWidth="1.5"
      />
      <path
        d="M88 26C98 21 109 24 115 32C118 36 118 42 113 45C116 47 116 52 111 53C113 56 111 60 107 60L110 88H87V42C91 38 91 31 88 26Z"
        fill="#e4e4e7"
        stroke="#a1a1aa"
        strokeWidth="1.5"
      />
      <path
        d="M58 14C56 10 61 7 64 11C67 8 73 8 76 11C79 7 84 10 82 14C89 19 91 29 88 38C85 45 84 53 86 88H54C56 53 55 45 52 38C49 29 51 19 58 14Z"
        fill="#e4e4e7"
        stroke="#a1a1aa"
        strokeWidth="1.5"
      />
      <rect x="28" y="86" width="84" height="11" rx="2" fill="#e4e4e7" stroke="#a1a1aa" strokeWidth="1.4" />
      <rect x="24" y="99" width="92" height="26" rx="2" fill="#e4e4e7" stroke="#a1a1aa" strokeWidth="1.4" />
      <circle cx="70" cy="112" r="8" fill="#ffffff" stroke="#a1a1aa" strokeWidth="1.4" />
      <circle cx="70" cy="112" r="2" fill="#a1a1aa" />
      <path
        d="M30 127H110C114 140 118 150 123 158H17C22 150 26 140 30 127Z"
        fill="#e4e4e7"
        stroke="#a1a1aa"
        strokeWidth="1.4"
      />
      <rect x="15" y="160" width="110" height="5" rx="1.5" fill="#e4e4e7" stroke="#a1a1aa" strokeWidth="1.4" />
      <text
        x="70"
        y="194"
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="20"
        fontWeight="700"
        fontFamily="serif"
      >
        सत्यमेव जयते
      </text>
    </g>
  </svg>
);

/**
 * Corner botanical/paisley ornamental plaque matching the 4 corners of the reference stamp.
 */
export const CornerOrnamentSvg: React.FC<{
  flipX?: boolean;
  flipY?: boolean;
  className?: string;
}> = ({ flipX = false, flipY = false, className = 'w-[44px] h-[84px] block' }) => {
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;
  return (
    <svg
      viewBox="0 0 56 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g transform={`translate(${flipX ? 56 : 0}, ${flipY ? 106 : 0}) scale(${sx}, ${sy})`}>
        {/* Outer dark frame */}
        <rect x="0" y="0" width="56" height="106" fill="#262626" />
        <rect x="3" y="3" width="50" height="100" fill="#ffffff" stroke="#171717" strokeWidth="1.5" />
        <rect x="6" y="6" width="44" height="94" fill="#262626" />

        {/* Stylized white floral/paisley carved foliage */}
        <path
          d="M10 12C22 10 34 16 38 28C41 38 35 48 26 52C17 56 11 49 12 39C13 30 22 25 30 29"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M28 15C38 14 47 22 47 34C47 46 37 56 26 60C15 64 10 73 14 84C17 92 27 96 37 92C45 89 49 79 44 71C40 65 31 65 28 71"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Leaf accents */}
        <path
          d="M13 24C18 19 26 21 27 28M34 38C40 36 45 41 43 48M16 66C12 72 15 80 22 81M34 78C38 82 37 88 31 90"
          stroke="#171717"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="23" cy="36" r="3" fill="#262626" />
        <circle cx="33" cy="79" r="3" fill="#262626" />
        <path d="M12 96C20 92 34 94 46 98" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
};

/**
 * Continuous vertical interlocking S-scroll guilloché chain connecting the corner plaques.
 */
export const VerticalScrollChainSvg: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  const patternId = `scroll-chain-${side}`;
  return (
    <svg
      className="w-[44px] h-full block"
      viewBox="0 0 56 880"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="56" height="44" patternUnits="userSpaceOnUse">
          {/* Outer vertical rails */}
          <rect x="0" y="0" width="56" height="44" fill="#ffffff" />
          <line x1="1.5" y1="0" x2="1.5" y2="44" stroke="#171717" strokeWidth="2" />
          <line x1="5.5" y1="0" x2="5.5" y2="44" stroke="#52525b" strokeWidth="1" />
          <line x1="50.5" y1="0" x2="50.5" y2="44" stroke="#52525b" strokeWidth="1" />
          <line x1="54.5" y1="0" x2="54.5" y2="44" stroke="#171717" strokeWidth="2" />

          {/* Interlocking Celtic S-spiral scroll */}
          <path
            d="M28 0 C14 4, 12 16, 28 22 C44 28, 42 40, 28 44"
            fill="none"
            stroke="#262626"
            strokeWidth="3.2"
          />
          <path
            d="M28 0 C42 4, 44 16, 28 22 C12 28, 14 40, 28 44"
            fill="none"
            stroke="#52525b"
            strokeWidth="2.2"
          />
          {/* Inner spiral curls */}
          <circle cx="20" cy="11" r="4.2" fill="none" stroke="#171717" strokeWidth="1.6" />
          <circle cx="36" cy="33" r="4.2" fill="none" stroke="#171717" strokeWidth="1.6" />
          <circle cx="28" cy="22" r="2.2" fill="#171717" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="56" height="880" fill={`url(#${patternId})`} />
    </svg>
  );
};

/**
 * Full-width dark micro-text strip repeating "SHCIL" across the certificate,
 * paired directly beneath with a light guilloché lace ribbon behind the "e-Stamp" title.
 */
export const ShcilHeaderRibbon: React.FC = () => {
  const [stripFailed, setStripFailed] = React.useState(false);
  const microText = Array.from({ length: 28 }).map(() => 'SHCIL').join(' ');

  if (stripFailed) {
    return (
      <div className="w-full">
        <div
          className="w-full overflow-hidden flex items-center justify-center px-1"
          style={{
            height: '11px',
            backgroundColor: '#52525b',
          }}
        >
          <span
            className="whitespace-nowrap font-bold tracking-[0.06em]"
            style={{
              fontSize: '7.4px',
              lineHeight: 1,
              color: '#ffffff',
            }}
          >
            {microText}
          </span>
        </div>

        <div className="relative w-full h-[28px] flex items-center justify-center overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 640 28"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <pattern id="estamp-ribbon-lace" width="32" height="28" patternUnits="userSpaceOnUse">
                <rect width="32" height="28" fill="#fafafa" />
                <circle cx="16" cy="14" r="11" fill="none" stroke="#e4e4e7" strokeWidth="1.1" />
                <circle cx="16" cy="14" r="6" fill="none" stroke="#e4e4e7" strokeWidth="0.9" />
                <path
                  d="M0 14 Q8 4 16 14 T32 14"
                  fill="none"
                  stroke="#d4d4d8"
                  strokeWidth="0.9"
                />
                <path
                  d="M0 14 Q8 24 16 14 T32 14"
                  fill="none"
                  stroke="#d4d4d8"
                  strokeWidth="0.9"
                />
              </pattern>
            </defs>
            <rect width="640" height="28" fill="url(#estamp-ribbon-lace)" />
            <line x1="0" y1="27.5" x2="640" y2="27.5" stroke="#e4e4e7" strokeWidth="1" />
          </svg>
          <span
            className="relative z-10 font-bold tracking-tight"
            style={{
              fontSize: '18px',
              lineHeight: 1,
              color: '#111827',
            }}
          >
            e-Stamp
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[34px] overflow-hidden select-none">
      <img
        src="/assets/aistudio/SHCIL_Security_Guilloche_Strip_befd23ea.png"
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setStripFailed(true)}
        className="w-full h-auto block pointer-events-none"
        style={{
          transform: 'translateY(-45.7%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-[1px] h-[22px] flex items-center justify-center pointer-events-none">
        <span
          className="font-bold tracking-tight px-2"
          style={{
            fontSize: '17px',
            lineHeight: 1,
            color: '#111827',
            textShadow: '0 0 4px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.75)',
          }}
        >
          e-Stamp
        </span>
      </div>
    </div>
  );
};

/**
 * Grey shaded security rectangle with crisp white sinusoidal wave lines,
 * positioned beside the QR code and matching its exact height.
 */
export const WavySecurityStrip: React.FC<{ className?: string }> = ({
  className = 'w-full h-[108px]',
}) => (
  <svg
    viewBox="0 0 520 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <rect x="0" y="0" width="520" height="110" fill="#d1d5db" />
    {Array.from({ length: 12 }).map((_, row) => {
      const yBase = 6 + row * 9;
      return (
        <path
          key={row}
          d={`M -10 ${yBase} Q 25 ${yBase - 6}, 60 ${yBase} T 130 ${yBase} T 200 ${yBase} T 270 ${yBase} T 340 ${yBase} T 410 ${yBase} T 480 ${yBase} T 550 ${yBase}`}
          stroke="#ffffff"
          strokeWidth="1.45"
          strokeOpacity="0.82"
          fill="none"
        />
      );
    })}
  </svg>
);
