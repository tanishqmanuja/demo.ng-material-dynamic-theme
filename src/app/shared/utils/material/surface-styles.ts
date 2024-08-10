import { hexFromArgb, Theme } from "@material/material-color-utilities";

export function applySurfaceStyles(
  theme: Theme,
  { dark }: { dark: boolean } = { dark: false }
): void {
  if (dark) {
    const elevationProps = {
      "--md-sys-color-surface-dim": theme.palettes.neutral.tone(6),
      "--md-sys-color-surface-bright": theme.palettes.neutral.tone(24),
      "--md-sys-color-surface-container-lowest": theme.palettes.neutral.tone(4),
      "--md-sys-color-surface-container-low": theme.palettes.neutral.tone(10),
      "--md-sys-color-surface-container": theme.palettes.neutral.tone(12),
      "--md-sys-color-surface-container-high": theme.palettes.neutral.tone(17),
      "--md-sys-color-surface-container-highest":
        theme.palettes.neutral.tone(22),
    };

    for (const [property, argbColor] of Object.entries(elevationProps)) {
      document.body.style.setProperty(property, hexFromArgb(argbColor));
    }
  } else {
    const elevationProps = {
      "--md-sys-color-surface-dim": theme.palettes.neutral.tone(87),
      "--md-sys-color-surface-bright": theme.palettes.neutral.tone(98),
      "--md-sys-color-surface-container-lowest":
        theme.palettes.neutral.tone(100),
      "--md-sys-color-surface-container-low": theme.palettes.neutral.tone(96),
      "--md-sys-color-surface-container": theme.palettes.neutral.tone(94),
      "--md-sys-color-surface-container-high": theme.palettes.neutral.tone(92),
      "--md-sys-color-surface-container-highest":
        theme.palettes.neutral.tone(90),
    };

    for (const [property, argbColor] of Object.entries(elevationProps)) {
      document.body.style.setProperty(property, hexFromArgb(argbColor));
    }
  }
}
