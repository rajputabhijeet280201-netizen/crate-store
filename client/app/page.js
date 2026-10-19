import { api } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
export const dynamic = 'force-dynamic';

export default async function Home() {
  let products = [];
  try { products = await api('/products'); } catch {}
  return (
    <>
      <section className="wrap hero">
        <div>
          <h1>Digital stuff you actually own.</h1>
          <p>Templates, UI kits, starter code and sound packs. Pay once, download any time from your library.</p>
          <a className="btn" href="#products">Browse products</a>
        </div>
        <div className="stack" aria-hidden="true">
          <div className="box a">Templates</div><div className="box b">Code</div><div className="box c">Audio</div>
          <span className="sticker">Instant download</span>
        </div>
      </section>
      <section className="wrap" id="products">
        <h2>All products</h2>
        {products.length === 0
          ? <div className="box">No products yet. Run <b>npm run seed</b> in the server folder, or add one from the Admin page.</div>
          : <div className="grid">{products.map((p) => <ProductCard key={p._id} p={p} />)}</div>}
      </section>
    </>
  );
}
