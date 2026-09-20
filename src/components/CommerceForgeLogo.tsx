import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

export const CommerceForgeLogo: React.FC<LogoProps> = ({ className = "w-full h-full", size }) => {
  return (
    <svg
      viewBox="0 0 600 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="CommerceForge Brand Logo"
    >
      <defs>
        {/* Dark Forge Metallic Green Gradient for "C" */}
        <linearGradient id="cfMetalDark" x1="140" y1="110" x2="340" y2="310" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E3A2B" />
          <stop offset="35%" stopColor="#2D5A40" />
          <stop offset="65%" stopColor="#3B7252" />
          <stop offset="85%" stopColor="#234633" />
          <stop offset="100%" stopColor="#172F22" />
        </linearGradient>

        {/* Brushed Metal Texture Overlay */}
        <linearGradient id="cfBrushedHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.30" />
          <stop offset="75%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
        </linearGradient>

        {/* Translucent Frosted Sage Glass Gradient for "F" */}
        <linearGradient id="cfSageGlass" x1="260" y1="300" x2="480" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8EA88C" stopOpacity="0.92" />
          <stop offset="30%" stopColor="#A5C6A2" stopOpacity="0.88" />
          <stop offset="70%" stopColor="#C2DCBD" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#D7EAD3" stopOpacity="0.95" />
        </linearGradient>

        {/* Glass Specular Rim for "F" */}
        <linearGradient id="cfGlassRim" x1="260" y1="110" x2="480" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#E2EFE0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8FA98F" stopOpacity="0.7" />
        </linearGradient>

        {/* Overlapping Disc Joint Gradient */}
        <radialGradient id="cfJointGrad" cx="38%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#4B6E57" />
          <stop offset="60%" stopColor="#2D4D3A" />
          <stop offset="100%" stopColor="#1B3325" />
        </radialGradient>

        {/* Left Wheel (Brushed Dark Metal) */}
        <radialGradient id="cfDarkWheel" cx="42%" cy="40%" r="58%">
          <stop offset="0%" stopColor="#3B7052" />
          <stop offset="45%" stopColor="#244A35" />
          <stop offset="85%" stopColor="#1A3727" />
          <stop offset="100%" stopColor="#12241A" />
        </radialGradient>

        {/* Right Wheel (Sage Glass with inner glow) */}
        <radialGradient id="cfSageWheel" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#EAF5E8" />
          <stop offset="35%" stopColor="#C5DEBF" />
          <stop offset="80%" stopColor="#93B090" />
          <stop offset="100%" stopColor="#738F70" />
        </radialGradient>

        {/* Subtle Drop Shadow */}
        <filter id="cfSoftDrop" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#1E3A2B" floodOpacity="0.12" />
        </filter>
      </defs>

      <g filter="url(#cfSoftDrop)">
        {/* ======================================================== */}
        {/* 1. LEFT "C" SHAPE (Brushed Deep Metallic Green Cart)    */}
        {/* ======================================================== */}
        <path
          d="M 175 115
             C 150 115, 138 135, 142 165
             L 178 268
             C 186 295, 212 315, 272 315
             L 340 315
             C 340 288, 320 252, 288 252
             L 260 252
             C 230 252, 222 238, 222 215
             C 222 192, 232 180, 260 180
             L 322 180
             C 342 180, 345 158, 345 147
             C 345 130, 335 115, 305 115
             Z"
          fill="url(#cfMetalDark)"
        />

        {/* Brushed Metal Horizontal Stripes across "C" */}
        <g opacity="0.15" stroke="url(#cfBrushedHighlight)" strokeWidth="1.2">
          <line x1="145" y1="130" x2="335" y2="130" />
          <line x1="147" y1="145" x2="340" y2="145" />
          <line x1="150" y1="160" x2="330" y2="160" />
          <line x1="155" y1="175" x2="230" y2="175" />
          <line x1="160" y1="200" x2="225" y2="200" />
          <line x1="165" y1="225" x2="235" y2="225" />
          <line x1="172" y1="255" x2="300" y2="255" />
          <line x1="180" y1="280" x2="320" y2="280" />
          <line x1="190" y1="300" x2="335" y2="300" />
        </g>

        {/* Inner Top Edge Highlight for "C" */}
        <path
          d="M 175 117
             C 152 117, 140 135, 144 165
             L 179 268"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeOpacity="0.35"
          fill="none"
          strokeLinecap="round"
        />

        {/* ======================================================== */}
        {/* 2. OVERLAPPING DISC JOINT (Connecting C and F)           */}
        {/* ======================================================== */}
        <circle cx="288" cy="275" r="28" fill="url(#cfJointGrad)" />
        <circle cx="288" cy="275" r="27" stroke="#1E3A2B" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

        {/* ======================================================== */}
        {/* 3. RIGHT "F" SHAPE (Frosted Translucent Sage Glass)      */}
        {/* ======================================================== */}
        <path
          d="M 288 247
             C 325 247, 350 262, 368 238
             L 405 178
             L 442 178
             C 455 178, 460 188, 460 198
             C 460 208, 455 218, 442 218
             L 415 218
             L 395 258
             C 375 298, 342 308, 288 303
             Z"
          fill="url(#cfSageGlass)"
        />

        {/* F Stem going to Upper Right Arm */}
        <path
          d="M 368 238
             L 415 150
             C 425 130, 445 115, 475 115
             L 485 115
             C 498 115, 505 125, 505 140
             C 505 155, 498 165, 485 165
             L 450 165
             L 405 245
             Z"
          fill="url(#cfSageGlass)"
        />

        {/* Glass Edge Highlights for "F" */}
        <path
          d="M 415 150
             C 425 130, 445 115, 475 115
             L 485 115
             C 498 115, 505 125, 505 140
             C 505 155, 498 165, 485 165
             L 450 165
             L 415 218
             L 442 218
             C 455 218, 460 208, 460 198"
          stroke="url(#cfGlassRim)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Translucent Frosted Inner Highlight on F Upper Curve */}
        <path
          d="M 470 125
             L 490 125
             C 498 125, 500 132, 500 138"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeOpacity="0.7"
          fill="none"
          strokeLinecap="round"
        />

        {/* ======================================================== */}
        {/* 4. DUAL WHEELS AT BOTTOM                                */}
        {/* ======================================================== */}
        {/* Left Wheel (Dark Metallic with circular lathe grooves) */}
        <g>
          <circle cx="235" cy="370" r="35" fill="url(#cfDarkWheel)" />
          <circle cx="235" cy="370" r="34" stroke="#2D5A40" strokeWidth="1.5" fill="none" strokeOpacity="0.6" />
          <circle cx="235" cy="370" r="22" stroke="#FFFFFF" strokeWidth="0.8" fill="none" strokeOpacity="0.25" />
          <circle cx="235" cy="370" r="10" stroke="#FFFFFF" strokeWidth="0.8" fill="none" strokeOpacity="0.3" />
          {/* Subtle metallic conical highlight */}
          <path
            d="M 235 336 A 34 34 0 0 1 268 370 L 235 370 Z"
            fill="#FFFFFF"
            fillOpacity="0.08"
          />
          <path
            d="M 235 404 A 34 34 0 0 1 202 370 L 235 370 Z"
            fill="#FFFFFF"
            fillOpacity="0.08"
          />
        </g>

        {/* Right Wheel (Frosted Sage Glass with glass crescent) */}
        <g>
          <circle cx="330" cy="370" r="35" fill="url(#cfSageWheel)" />
          <circle cx="330" cy="370" r="34" stroke="#8FA98F" strokeWidth="1.5" fill="none" strokeOpacity="0.7" />
          {/* Inner glass crescent reflection */}
          <path
            d="M 312 350
               C 318 340, 335 338, 348 344
               C 358 350, 362 362, 360 374
               C 356 362, 348 352, 336 348
               C 326 345, 316 346, 312 350
               Z"
            fill="#FFFFFF"
            fillOpacity="0.65"
          />
          <circle cx="330" cy="370" r="20" stroke="#FFFFFF" strokeWidth="0.8" fill="none" strokeOpacity="0.3" />
        </g>
      </g>
    </svg>
  );
};
