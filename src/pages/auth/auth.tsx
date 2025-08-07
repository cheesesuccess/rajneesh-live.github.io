
import { createSignal, Show } from 'solid-js';
import { login, signup, resetPassword } from '~/utils/auth';
import * as styles from '../settings/settings.css'; // Reuse existing styling

const Auth = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [mode, setMode] = createSignal<'login' | 'signup' | 'reset'>('login');

  const handleAction = async () => {
    try {
      if (mode() === 'signup') {
        await signup(email(), password());
        setMessage('Signup successful!');
      } else if (mode() === 'login') {
        await login(email(), password());
        setMessage('Login successful!');
      } else if (mode() === 'reset') {
        await resetPassword(email());
        setMessage('Reset email sent!');
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'var(--background-color)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        borderRadius: '12px',
        background: 'white',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 'margin-bottom': '1rem', 'text-align': 'center' }}>
          {mode() === 'signup' ? 'Sign Up' : mode() === 'reset' ? 'Reset Password' : 'Login'}
        </h2>
        <input
          placeholder="Email"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
          style={{ width: '100%', margin: '0.5rem 0', padding: '0.5rem' }}
        />
        <Show when={mode() !== 'reset'}>
          <input
            type="password"
            placeholder="Password"
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
            style={{ width: '100%', margin: '0.5rem 0', padding: '0.5rem' }}
          />
        </Show>
        <button
          onClick={handleAction}
          style={{
            width: '100%',
            padding: '0.75rem',
            margin: '1rem 0',
            background: 'deeppink',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {mode() === 'signup' ? 'Sign Up' : mode() === 'reset' ? 'Send Reset Email' : 'Login'}
        </button>
        <p style={{ 'text-align': 'center' }}>{message()}</p>
        <div style={{ 'text-align': 'center' }}>
          <Show when={mode() !== 'login'}>
            <a href="#" onClick={() => setMode('login')}>Back to Login</a>
          </Show>
          <Show when={mode() === 'login'}>
            <a href="#" onClick={() => setMode('signup')}>Need an account? Sign Up</a><br />
            <a href="#" onClick={() => setMode('reset')}>Forgot Password?</a>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default Auth;
