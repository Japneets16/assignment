const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

export async function getOemCount() {
  const res = await fetch(`${API_BASE}/api/oem/models/count`);
  if (!res.ok) throw new Error((await res.json()).message || 'Failed');
  return res.json();
}

export async function searchOem(model, year) {
  const url = new URL(`${API_BASE}/api/oem/models/search`);
  url.searchParams.set('model', model);
  url.searchParams.set('year', year);
  const res = await fetch(url);
  if (!res.ok) throw new Error((await res.json()).message || 'Not found');
  return res.json();
}
