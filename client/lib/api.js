function getUrl(path) {
  let base = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').trim();
  base = base.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (!base.endsWith('/api') && !cleanPath.startsWith('/api')) {
    return `${base}/api${cleanPath}`;
  }
  return `${base}${cleanPath}`;
}

export async function api(path, { method = 'GET', body } = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const url = getUrl(path);
  const res = await fetch(url, {
    method, cache: 'no-store',
    headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
    body: body && JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}
export const rupees = (n) => '₹' + Number(n).toLocaleString('en-IN');
