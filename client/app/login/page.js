'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useStore } from '@/lib/store';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { signIn } = useStore();
  const router = useRouter();
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault(); setError('');
    try { signIn(await api(`/auth/${mode}`, { method: 'POST', body: f })); router.push('/'); }
    catch (err) { setError(err.message); }
  }
  return (
    <div className="wrap page">
      <form className="box" onSubmit={submit}>
        <h1>{mode === 'login' ? 'Log in' : 'Create account'}</h1>
        {mode === 'register' && <><label htmlFor="n">Name</label><input id="n" value={f.name} onChange={set('name')} required /></>}
        <label htmlFor="e">Email</label><input id="e" type="email" value={f.email} onChange={set('email')} required />
        <label htmlFor="p">Password</label><input id="p" type="password" value={f.password} onChange={set('password')} required />
        {error && <div className="error">{error}</div>}
        <div className="row" style={{ marginTop: 20 }}>
          <button className="btn" type="submit">{mode === 'login' ? 'Log in' : 'Create account'}</button>
          <button type="button" className="btn white small" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Need an account?' : 'Have an account?'}
          </button>
        </div>
      </form>
    </div>
  );
}
