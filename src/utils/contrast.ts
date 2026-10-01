export interface ContrastResult {
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  label: string;
}

/**
 * Calculates standard WCAG 2.1 relative luminance for a given hex color.
 */
export function getRelativeLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const rgb =
    cleanHex.length === 3
      ? cleanHex.split('').map((c) => parseInt(c + c, 16))
      : [
          parseInt(cleanHex.slice(0, 2), 16),
          parseInt(cleanHex.slice(2, 4), 16),
          parseInt(cleanHex.slice(4, 6), 16),
        ];

  const sRGB = rgb.map((val) => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Calculates WCAG contrast ratio between text and background.
 */
export function getContrastRatio(foregroundHex: string, backgroundHex: string): ContrastResult {
  const l1 = getRelativeLuminance(foregroundHex);
  const l2 = getRelativeLuminance(backgroundHex);

  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  const roundedRatio = parseFloat(ratio.toFixed(2));

  const passesAA = roundedRatio >= 4.5;
  const passesAAA = roundedRatio >= 7.0;

  let label = 'Fails Contrast ⚠️';
  if (passesAAA) {
    label = 'WCAG AAA Pass ✓';
  } else if (passesAA) {
    label = 'WCAG AA Pass ✓';
  }

  return {
    ratio: roundedRatio,
    passesAA,
    passesAAA,
    label,
  };
}

/**
 * Backward compatibility alias for calculateContrast.
 */
export function calculateContrast(foregroundHex: string, backgroundHex: string): ContrastResult {
  return getContrastRatio(foregroundHex, backgroundHex);
}

/**
 * Quick boolean check whether two colors pass a desired WCAG compliance target.
 */
export function isAccessible(
  foregroundHex: string,
  backgroundHex: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  const res = getContrastRatio(foregroundHex, backgroundHex);
  return level === 'AAA' ? res.passesAAA : res.passesAA;
}
