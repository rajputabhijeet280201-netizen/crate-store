'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useStore } from '@/lib/store';

export default function Library() {
  const { user } = useStore();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { if (user) api('/orders/mine').then(setOrders).catch((e) => setError(e.message)); }, [user]);

  async function download(orderId, productId) {
    try { const { url } = await api(`/orders/${orderId}/download/${productId}`); window.open(url, '_blank'); }
    catch (e) { setError(e.message); }
  }
  if (!user) return <div className="wrap page"><div className="box">Log in to see your purchases. <Link href="/login">Log in</Link></div></div>;
  const items = (orders || []).flatMap((o) => o.items.map((i) => ({ ...i, orderId: o._id })));
  return (
    <div className="wrap page">
      <h1>My library</h1>
      {error && <div className="error">{error}</div>}
      {orders && items.length === 0 && <div className="box">Nothing here yet. <Link href="/">Browse products</Link></div>}
      <div className="stackv">
        {items.map((i) => (
          <div key={i.orderId + i.product} className="box row">
            <b>{i.title}</b>
            <button className="btn small blue" onClick={() => download(i.orderId, i.product)}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
