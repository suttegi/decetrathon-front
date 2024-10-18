import { useCallback, useState } from 'react';
import { PlayerSchema } from '@/types/api';
import { playerApi } from '@/utils/api';
import { getTelegramUser } from '@/utils/telegram';

export const usePlayer = () => {
  const [player, setPlayer] = useState<PlayerSchema | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializePlayer = useCallback(async () => {
    const telegramUser = getTelegramUser();
    if (!telegramUser) {
      setError('Telegram user not found');
      return;
    }

    try {
      setLoading(true);
      const response = await playerApi.createOrGet(telegramUser);
      setPlayer(response.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize player');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    player,
    loading,
    error,
    initializePlayer,
  };
};