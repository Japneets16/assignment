import { authHeader } from '../utils/auth';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

export async function addCar(data) {
  const res = await fetch(`${API_BASE}/api/inventory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to add car');
  return res.json();
}

export async function listCars(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/api/inventory?${query}`);
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to load cars');
  return res.json();
}

export async function updateCar(id, data) {
  const res = await fetch(`${API_BASE}/api/inventory/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to update car');
  return res.json();
}

export async function deleteCars(ids) {
  const res = await fetch(`${API_BASE}/api/inventory`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ ids })
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to delete cars');
  return res.json();
}
