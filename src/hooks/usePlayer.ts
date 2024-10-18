import { useCallback, useState, useEffect } from 'react';
import { PlayerSchema } from '@/types/api';
import { playerApi } from '@/utils/api';
import { getTelegramUser } from '@/utils/telegram';

export const usePlayer = () => {
  const [player, setPlayer] = useState<PlayerSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initializePlayer = useCallback(async () => {
    try {
      setLoading(true);
      // Ждем загрузки Telegram Web App
      if (typeof window !== 'undefined' && !window.Telegram?.WebApp) {
        throw new Error('Telegram WebApp is not initialized');
      }

      const telegramUser = getTelegramUser();
      if (!telegramUser) {
        throw new Error('Telegram user not found');
      }

      const response = await playerApi.createOrGet(telegramUser);
      setPlayer(response.result);
      setError(null);
    } catch (err) {
      console.error('Player initialization error:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize player');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const waitForTelegram = () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        if (mounted) {
          initializePlayer();
        }
      } else {
        setTimeout(waitForTelegram, 100);
      }
    };

    waitForTelegram();

    return () => {
      mounted = false;
    };
  }, [initializePlayer]);

  return {
    player,
    loading,
    error,
    initializePlayer,
  };
};