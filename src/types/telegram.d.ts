interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
  }
  
  interface TelegramWebAppInitData {
    query_id?: string;
    user?: TelegramUser;
    receiver?: TelegramUser;
    start_param?: string;
    auth_date?: string;
    hash?: string;
  }
  
  interface MainButton {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive: boolean) => void;
    hideProgress: () => void;
  }
  
  interface BackButton {
    isVisible: boolean;
    onClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  }
  
  declare global {
    interface Window {
      Telegram?: {
        WebApp: {
          ready: () => void;
          close: () => void;
          expand: () => void;
          MainButton: MainButton;
          BackButton: BackButton;
          onEvent: (eventType: string, eventHandler: () => void) => void;
          offEvent: (eventType: string, eventHandler: () => void) => void;
          sendData: (data: any) => void;
          initData: string;
          initDataUnsafe: TelegramWebAppInitData;
          colorScheme: 'light' | 'dark';
          themeParams: {
            bg_color?: string;
            text_color?: string;
            hint_color?: string;
            link_color?: string;
            button_color?: string;
            button_text_color?: string;
          };
        };
      };
    }
  }
  
  export {};