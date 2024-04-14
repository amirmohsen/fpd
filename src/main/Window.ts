import { BrowserWindow, ipcMain, app } from 'electron';
import { join } from 'path';
import deepExtend from 'deep-extend';
import { mainReduxBridge } from './mainReduxBridge';
import { store } from '../shared/store';
import { WindowBoundaries, WindowConfig } from './windows/types';
import { WindowStorage } from './WindowStorage';

export const INTERNAL_WINDOW_DEFAULT_PROPS = {
  resizable: true,
  webPreferences: {
    preload: join(__dirname, 'preload.js'),
    plugins: true,
    backgroundThrottling: false,
    webSecurity: false,
  },
};

export const windowList: string[] = [];

export interface WindowInputProps {
  name: string;
  page: string;
  boundaries?: Partial<WindowBoundaries>;
}

export interface WindowProps extends WindowInputProps {
  boundaries: WindowBoundaries;
}

export default class Window {
  props: WindowInputProps;
  config: WindowConfig;
  internalWindow: BrowserWindow;

  constructor(props: WindowInputProps) {
    this.props = props;
    this.#ensureUniqueness();
    this.internalWindow = new BrowserWindow(INTERNAL_WINDOW_DEFAULT_PROPS);
    this.config = this.#initConfig();
    console.log(this.props, this.config);
    this.#maintainBoundaries();
    this.#initPage();
    this.#initReduxBridge();
  }

  #ensureUniqueness() {
    if (windowList.includes(this.props.name)) {
      throw new Error(
        `A window with the name "${this.props.name}" already exists.`,
      );
    }
    windowList.push(this.props.name);
  }

  #initConfig() {
    return deepExtend(
      {},
      {
        boundaries: this.getCurrentBoundaries(),
      },
      {
        boundaries: this.props.boundaries ?? {},
      },
      WindowStorage.get(this.props.name) ?? {},
    );
  }

  #maintainBoundaries() {
    this.internalWindow.unmaximize();
    this.internalWindow.setSize(
      this.config.boundaries.width,
      this.config.boundaries.height,
      false,
    );
    // Turning resizable off and then on (with a timeout) seems to fix a bug on windows that doesn't allow size to be set
    this.internalWindow.setResizable(false);
    this.internalWindow.setPosition(
      this.config.boundaries.x,
      this.config.boundaries.y,
    );
    setTimeout(() => {
      this.internalWindow.setResizable(true);
    }, 0);
    const onResizeAndMove = () => {
      this.config.boundaries = this.getCurrentBoundaries();
      console.log('boundaries change', this.config.boundaries);
      WindowStorage.update(this.props.name, this.config);
    };
    this.internalWindow.on('resized', onResizeAndMove);
    this.internalWindow.on('moved', onResizeAndMove);
  }

  #initPage() {
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      this.internalWindow.loadURL(
        `${MAIN_WINDOW_VITE_DEV_SERVER_URL}/${this.props.page}`,
      );
    } else {
      this.internalWindow.loadFile(
        join(
          __dirname,
          `../renderer/${MAIN_WINDOW_VITE_NAME}/${this.props.page}`,
        ),
      );
    }

    if (process.env.NODE_ENV === 'development') {
      this.internalWindow.webContents.openDevTools();
    }
  }

  #initReduxBridge() {
    const { unsubscribe } = mainReduxBridge(
      ipcMain,
      store,
      this.internalWindow,
    );
    app.on('quit', unsubscribe);
  }

  getCurrentBoundaries() {
    const [width, height] = this.internalWindow.getSize();
    const [x, y] = this.internalWindow.getPosition();
    return {
      width,
      height,
      x,
      y,
    };
  }
}
