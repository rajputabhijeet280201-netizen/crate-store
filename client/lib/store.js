'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from './api';
const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setCart(JSON.parse(localStorage.getItem('cart') || '[]')); } catch {}
    if (localStorage.getItem('token')) api('/auth/me').then(setUser).catch(() => localStorage.removeItem('token'));
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem('cart', JSON.stringify(cart)); }, [cart, ready]);

  const value = {
    cart, user,
    addToCart: (p) => setCart((c) => (c.some((x) => x._id === p._id) ? c : [...c, { _id: p._id, title: p.title, price: p.price, color: p.color }])),
    removeFromCart: (id) => setCart((c) => c.filter((x) => x._id !== id)),
    clearCart: () => setCart([]),
    signIn: ({ token, user }) => { localStorage.setItem('token', token); setUser(user); },
    signOut: () => { localStorage.removeItem('token'); setUser(null); },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
