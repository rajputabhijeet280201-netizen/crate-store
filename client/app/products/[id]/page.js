'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, rupees } from '@/lib/api';
import { useStore } from '@/lib/store';

export default function ProductPage({ params }) {
  const [p, setP] = useState(null);
  const [error, setError] = useState('');
  const { addToCart, cart } = useStore();
  const router = useRouter();
  useEffect(() => { api(`/products/${params.id}`).then(setP).catch((e) => setError(e.message)); }, [params.id]);

  if (error) return <div className="wrap page"><div className="error">{error}</div></div>;
  if (!p) return <div className="wrap page">Loading…</div>;
  const inCart = cart.some((x) => x._id === p._id);
  return (
    <div className="wrap detail">
      <div className="box" style={{ background: p.color, minHeight: 320, display: 'grid', placeItems: 'center' }}>
        <h2 style={{ fontSize: '3rem', textAlign: 'center' }}>{p.category}</h2>
      </div>
      <div>
        <span className="tag">{p.category}</span>
        <h1 style={{ fontSize: '2.8rem', marginTop: 12 }}>{p.title}</h1>
        <p>{p.description}</p>
        <p className="price" style={{ fontSize: '2rem' }}>{rupees(p.price)}</p>
        {inCart
          ? <button className="btn blue" onClick={() => router.push('/cart')}>View cart</button>
          : <button className="btn" onClick={() => addToCart(p)}>Add to cart</button>}
      </div>
    </div>
  );
}
