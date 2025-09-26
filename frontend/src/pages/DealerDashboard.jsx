import { useEffect, useMemo, useState } from 'react';
import { listCars, addCar, updateCar, deleteCars } from '../api/inventory';
import CarCard from '../components/CarCard';
import CarForm from '../components/CarForm';
import VehicleFilters from '../components/VehicleFilters';
import { clearToken, getToken } from '../utils/auth';

export default function DealerDashboard() {
  const [myCars, setMyCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [selectedIds, setSelectedIds] = useState({});
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const loggedIn = useMemo(() => !!getToken(), []);

  const fetchMine = async () => {
    const res = await listCars({ mine: 'true' });
    setMyCars(res);
  };

  const fetchAll = async (params = {}) => {
    const res = await listCars(params);
    setAllCars(res);
  };

  useEffect(() => {
    fetchMine();
    fetchAll();
  }, []);

  const handleAdd = async (data) => {
    try {
      setLoading(true);
      if (editing) {
        await updateCar(editing._id, data);
        setEditing(null);
      } else {
        await addCar(data);
      }
      await fetchMine();
      await fetchAll();
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id, val) => setSelectedIds((prev) => ({ ...prev, [id]: val }));

  const deleteSelected = async () => {
    const ids = Object.keys(selectedIds).filter((id) => selectedIds[id]);
    if (!ids.length) return;
    if (!confirm('Delete selected cars?')) return;
    try {
      await deleteCars(ids);
      setSelectedIds({});
      await fetchMine();
      await fetchAll();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">BUYC Corp Dealer Dashboard</h1>
        <div className="flex gap-3 items-center">
          {loggedIn ? (
            <button className="px-3 py-1 bg-red-600 text-white rounded-md" onClick={() => { clearToken(); window.location.href = '/login'; }}>Logout</button>
          ) : (
            <a className="px-3 py-1 bg-blue-600 text-white rounded-md" href="/login">Login</a>
          )}
        </div>
      </header>

      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">{editing ? 'Edit Car' : 'Add New Car'}</h2>
        <CarForm initial={editing} onSubmit={handleAdd} submitText={editing ? 'Save Changes' : 'Add Car'} />
        {loading && <p className="text-sm text-gray-600 mt-2">Saving...</p>}
      </section>

      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Cars</h2>
          <button onClick={deleteSelected} className="px-3 py-1 bg-red-600 text-white rounded-md">Delete Selected</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myCars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
              selectable
              selected={!!selectedIds[car._id]}
              onSelect={(v) => toggleSelect(car._id, v)}
              onEdit={() => setEditing(car)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Browse All Cars</h2>
        <VehicleFilters onApply={fetchAll} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
}
