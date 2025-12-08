import React, { useState } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useIonRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/chat');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="landing-content">
        <div className="min-h-screen flex items-center justify-center py-12 px-6">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <a href="/home">
                <img src="/modcus-logo.png" alt="Modcus" className="h-10 mx-auto" />
              </a>
              <h2 className="mt-6 text-3xl font-bold text-white">Welcome Back</h2>
              <p className="mt-2 text-gray-400">Sign in to your account</p>
            </div>

            <div className="feature-card p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                    autoComplete="off"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-900"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <p className="text-center text-sm text-gray-400">
                  Don't have an account?{' '}
                  <a href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
