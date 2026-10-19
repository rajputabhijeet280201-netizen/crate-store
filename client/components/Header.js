'use client';
import Link from 'next/link';
import { useStore } from '@/lib/store';

export default function Header() {
  const { cart, user, signOut } = useStore();
  return (
    <header className="nav">
      <div className="wrap">
        <Link href="/" className="logo">Crate</Link>
        <span className="spacer" />
        {user?.role === 'admin' && <Link className="link" href="/admin">Admin</Link>}
        {user && <Link className="link" href="/library">My library</Link>}
        <Link className="link" href="/cart">Cart ({cart.length})</Link>
        {user
          ? <button className="btn small white" onClick={signOut}>Log out</button>
          : <Link className="btn small" href="/login">Log in</Link>}
      </div>
    </header>
  );
}
