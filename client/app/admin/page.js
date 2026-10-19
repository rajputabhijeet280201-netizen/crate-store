'use client';
import { useEffect, useState } from 'react';
import { api, rupees } from '@/lib/api';
import { useStore } from '@/lib/store';

const blank = { title: '', description: '', price: '', category: 'Templates', color: '#FFD60A', fileUrl: '' };
export default function Admin() {
  const { user } = useStore();
  const [products, setProducts] = useState([]);
  const [f, setF] = useState(blank);
  const [error, setError] = useState('');
  const load = () => api('/products').then(setProducts).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function add(e) {
    e.preventDefault(); setError('');
    try { await api('/products', { method: 'POST', body: { ...f, price: Number(f.price) } }); setF(blank); load(); }
    catch (err) { setError(err.message); }
  }
  async function remove(id) { await api(`/products/${id}`, { method: 'DELETE' }); load(); }

  if (user?.role !== 'admin') return <div className="wrap page"><div className="box">Admins only.</div></div>;
  return (
    <div className="wrap page">
      <h1>Admin</h1>
      <form className="box" onSubmit={add}>
        <h2>Add product</h2>
        <label htmlFor="t">Title</label><input id="t" value={f.title} onChange={set('title')} required />
        <label htmlFor="d">Description</label><textarea id="d" rows="3" value={f.description} onChange={set('description')} />
        <label htmlFor="pr">Price (₹)</label><input id="pr" type="number" min="0" value={f.price} onChange={set('price')} required />
        <label htmlFor="c">Category</label><input id="c" value={f.category} onChange={set('category')} />
        <label htmlFor="co">Cover colour</label><input id="co" type="color" value={f.color} onChange={set('color')} style={{ height: 48 }} />
        <label htmlFor="u">Download link</label><input id="u" type="url" value={f.fileUrl} onChange={set('fileUrl')} required />
        {error && <div className="error">{error}</div>}
        <button className="btn" style={{ marginTop: 20 }} type="submit">Add product</button>
      </form>
      <div className="stackv" style={{ marginTop: 36 }}>
        {products.map((p) => (
          <div key={p._id} className="box row"><b>{p.title} <span className="price">{rupees(p.price)}</span></b>
            <button className="btn small pink" onClick={() => remove(p._id)}>Delete</button></div>
        ))}
      </div>
    </div>
  );
}
