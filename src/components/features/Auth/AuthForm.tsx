import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login, signup, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        const success = await login(username, password);
        if (!success) {
          setError('Invalid credentials');
        }
      } else {
        const success = await signup(username, email, password);
        if (!success) {
          setError('Signup failed');
        }
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Card className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h1>
        
        <Input
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="Enter your username"
        />

        {mode === 'signup' && (
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
          />
        )}

        <Input
          type="password"
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </Button>
      </form>
    </Card>
  );
};