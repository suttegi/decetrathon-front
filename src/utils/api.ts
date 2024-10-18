import { PlayerCreate, PlayerSchema, ResultResponse, ResultsResponse } from '@/types/api';

const API_URL = 'http://localhost:8000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(response.status, error.message || 'Something went wrong');
  }

  return response.json();
};

export const playerApi = {
  createOrGet: async (player: PlayerCreate): Promise<ResultResponse<PlayerSchema>> => {
    return fetchApi('/players', {
      method: 'POST',
      body: JSON.stringify(player),
    });
  },

  getPlayers: async (
    playerIds: number[],
    page = 1,
    limit = 20
  ): Promise<ResultsResponse<PlayerSchema>> => {
    return fetchApi(
      `/players/${playerIds.join(',')}?page=${page}&limit=${limit}`
    );
  },

  getPlayer: async (playerId: number): Promise<ResultResponse<PlayerSchema>> => {
    return fetchApi(`/players/${playerId}`);
  },

  searchByUsername: async (
    username: string,
    page = 1,
    limit = 20
  ): Promise<ResultsResponse<PlayerSchema>> => {
    return fetchApi(
      `/players/username/${username}?page=${page}&limit=${limit}`
    );
  },
};