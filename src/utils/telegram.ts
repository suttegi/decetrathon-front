import { PlayerCreate } from '../types/api';

export const telegram = typeof window !== 'undefined' ? window.Telegram?.WebApp : null;

export const getTelegramUser = (): PlayerCreate | null => {
  const user = telegram?.initDataUnsafe?.user;
  
  if (!user) return null;
  
  return {
    telegram_id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    language_code: user.language_code,
  };
};