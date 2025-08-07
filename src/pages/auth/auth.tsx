// src/pages/auth.tsx

import { createSignal } from 'solid-js'
import { useNavigate } from 'solid-app-router'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from '~/firebase/config'
import '~/styles/auth.css' // Optional: custom styles

export default function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = createSignal<'login' | 'signup' | 'forgot'>('login')
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal('')
  const [message, setMessage] = createSignal('')

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email(), password())
      navigate('/')
    } catch (err) {
      setError('Invalid email or password.')
    }
  }

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email(), password())
      setMessage('Account created! Please log in.')
      setMode('login')
    } catch (err) {
      setError('Failed to create account.')
    }
  }

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email())
      setMessage('Reset email sent! Check your inbox.')
    } catch (err) {
      setError('Failed to send reset email.')
    }
  }

  return (
    <div class="auth-container">
      <h2>{mode() === 'login' ? 'Login' : mode() === 'signup' ? 'Sign Up' : 'Forgot Password'}</h2>

      <input type="email" placeholder="Email" onInput={(e) => setEmail(e.currentTarget.value)} />
      {mode() !== 'forgot' && (
        <input type="password" placeholder="Password" onInput={(e) => setPassword(e.currentTarget.value)} />
      )}

      {error() && <p class="error">{error()}</p>}
      {message() && <p class="message">{message()}</p>}

      {mode() === 'login' && (
        <button onClick={handleLogin}>Login</button>
      )}
      {mode() === 'signup' && (
        <button onClick={handleSignUp}>Sign Up</button>
      )}
      {mode() === 'forgot' && (
        <button onClick={handleForgotPassword}>Reset Password</button>
      )}

      <div class="auth-links">
        {mode() === 'login' && (
          <>
            <a onClick={() => setMode('signup')}>Need an account? Sign Up</a>
            <a onClick={() => setMode('forgot')}>Forgot Password?</a>
          </>
        )}
        {mode() !== 'login' && (
          <a onClick={() => setMode('login')}>Back to Login</a>
        )}
      </div>
    </div>
  )
}
