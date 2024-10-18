import type { NextPage } from 'next';
import { Layout } from '@/components/layout/Layout';
import { usePlayer } from '@/hooks/usePlayer';
import { useTelegram } from '@/hooks/useTelegram';

const Home: NextPage = () => {
  const { player, loading, error } = usePlayer();
  const { onClose, onToggleMainButton } = useTelegram();

  const handleMainButtonClick = () => {
    // Handle main button click
    console.log('Main button clicked');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* User Profile Section */}
        <div className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">
                  {player?.first_name?.charAt(0)}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {player?.first_name} {player?.last_name}
              </h2>
              {player?.username && (
                <p className="text-sm text-gray-500">
                  @{player.username}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* User Details Section */}
        <div className="border-t border-gray-200 px-6 py-4">
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Telegram ID
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {player?.telegram_id}
              </dd>
            </div>
            {player?.language_code && (
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Language
                </dt>
                <dd className="mt-1 text-sm text-gray-900 uppercase">
                  {player.language_code}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Account Created
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(player?.created_at || '').toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>

        {/* Actions Section */}
        <div className="border-t border-gray-200 px-6 py-4 space-y-3">
          <button
            onClick={() => onToggleMainButton('Hello from Mini App!', handleMainButtonClick)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Show Main Button
          </button>
          <button
            onClick={onClose}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close App
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;