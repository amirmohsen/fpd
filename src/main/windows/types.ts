export interface WindowBoundaries {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface WindowConfig {
  boundaries: WindowBoundaries;
}

export interface WindowLocalStorage {
  [windowName: string]: WindowConfig;
}
