export const telegram = typeof window !== 'undefined' ? window.Telegram?.WebApp : null;

export const getTelegramUser = () => {
  if (!telegram?.initDataUnsafe?.user) {
    console.warn('Telegram user data is not available');
    if (process.env.NODE_ENV === 'development') {
      return {
        telegram_id: 12345,
        first_name: 'Test',
        last_name: 'User',
        username: 'testuser',
        language_code: 'en',
      };
    }
    return null;
  }

  const user = telegram.initDataUnsafe.user;
  
  return {
    telegram_id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    language_code: user.language_code,
  };
};