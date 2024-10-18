import { useEffect, useCallback } from 'react';
import { telegram } from '@/utils/telegram';

export const useTelegram = () => {
  useEffect(() => {
    telegram?.ready();
  }, []);

  const onClose = useCallback(() => {
    telegram?.close();
  }, []);

  const onToggleMainButton = useCallback((text: string, callback: () => void) => {
    if (telegram) {
      telegram.MainButton.text = text;
      telegram.MainButton.onClick(callback);
      telegram.MainButton.show();
    }
  }, []);

  const hideMainButton = useCallback(() => {
    telegram?.MainButton.hide();
  }, []);

  const sendData = useCallback((data: any) => {
    telegram?.sendData(JSON.stringify(data));
  }, []);

  return {
    telegram,
    user: telegram?.initDataUnsafe?.user,
    onClose,
    onToggleMainButton,
    hideMainButton,
    sendData,
  };
};