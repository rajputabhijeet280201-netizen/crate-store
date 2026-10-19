import Link from 'next/link';
import { rupees } from '@/lib/api';

export default function ProductCard({ p }) {
  return (
    <Link href={`/products/${p._id}`} className="card">
      <div className="cover" style={{ background: p.color }}>{p.category}</div>
      <div className="body">
        <h3>{p.title}</h3>
        <p style={{ margin: 0, flex: 1 }}>{p.description.slice(0, 80)}{p.description.length > 80 ? '…' : ''}</p>
        <span className="price">{rupees(p.price)}</span>
      </div>
    </Link>
  );
}
