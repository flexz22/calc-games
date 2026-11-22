export const eDPI = (dpi, sens) => dpi * sens;

// sensibilidade nova que mantém o mesmo cm/360 ao trocar de DPI
export const sensForNewDpi = (sens, oldDpi, newDpi) =>
  sens * oldDpi / newDpi;