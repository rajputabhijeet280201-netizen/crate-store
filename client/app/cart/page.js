'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, rupees } from '@/lib/api';
import { useStore } from '@/lib/store';

export default function Cart() {
  const { cart, user, removeFromCart, clearCart } = useStore();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const total = cart.reduce((s, i) => s + i.price, 0);

  async function checkout() {
    setBusy(true); setError('');
    try { await api('/orders', { method: 'POST', body: { items: cart.map((i) => i._id) } }); clearCart(); router.push('/library'); }
    catch (e) { setError(e.message); setBusy(false); }
  }
  return (
    <div className="wrap page">
      <h1>Your cart</h1>
      {cart.length === 0 ? <div className="box">Your cart is empty. <Link href="/">Browse products</Link></div> : (
        <div className="stackv">
          {cart.map((i) => (
            <div key={i._id} className="box row" style={{ borderLeft: `14px solid ${i.color}` }}>
              <b>{i.title}</b>
              <span className="row"><span className="price">{rupees(i.price)}</span>
                <button className="btn small pink" onClick={() => removeFromCart(i._id)}>Remove</button></span>
            </div>
          ))}
          <div className="row"><h2 style={{ margin: 0 }}>Total {rupees(total)}</h2>
            {user ? <button className="btn blue" disabled={busy} onClick={checkout}>{busy ? 'Processing…' : 'Pay now'}</button>
                  : <Link className="btn" href="/login">Log in to pay</Link>}
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      )}
    </div>
  );
}
