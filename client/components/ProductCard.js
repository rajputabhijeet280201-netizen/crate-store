import Link from 'next/link';
import { rupees } from '@/lib/api';

export default function ProductCard({ p }) {
  const preview = p.images?.[0] || p.image || p.previewUrl || p.imageUrl || p.previews?.[0];
  const initial = (p.title || '?').trim().charAt(0).toUpperCase();

  return (
    <Link href={`/products/${p._id}`} className="card" aria-label={`${p.title} - ${p.category}`}>
      <div
        className="cover"
        style={{ background: !preview ? (p.color || 'var(--yellow)') : '#000' }}
      >
        {preview ? (
          <img
            src={preview}
            alt={p.title}
            className="cover-img"
            loading="lazy"
          />
        ) : (
          <span className="cover-initial" aria-hidden="true">
            {initial}
          </span>
        )}
      </div>

      <div className="body">
        <div className="tag-wrap">
          <span className="tag" title={p.category}>
            {p.category}
          </span>
        </div>
        <h3 className="card-title" title={p.title}>
          {p.title}
        </h3>
        <p className="card-desc">
          {p.description}
        </p>
        <div className="card-footer">
          <span className="price">{rupees(p.price)}</span>
        </div>
      </div>
    </Link>
  );
}
