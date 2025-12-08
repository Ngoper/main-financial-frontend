import React from 'react';
import { useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';

interface AppHeaderProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onBack, showBackButton = false }) => {
  const history = useHistory();

  return (
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {showBackButton ? (
          <button onClick={onBack} className="text-gray-400 hover:text-white transition flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        ) : (
          <a href="/home">
            <img src="/modcus-logo.png" alt="Modcus" className="h-8" />
          </a>
        )}
        <div className="flex items-center space-x-4">
          <button onClick={() => history.push('/login')} className="text-gray-400 hover:text-white font-medium transition">Login</button>
          <button onClick={() => history.push('/register')} className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg">Sign Up</button>
        </div>
      </div>
    </header>
  );
};