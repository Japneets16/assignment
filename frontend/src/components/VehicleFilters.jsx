import { useState } from 'react';

export default function VehicleFilters({ onApply }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [colors, setColors] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  const apply = () => {
    const params = {};
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (colors) params.colors = colors; // comma separated
    if (maxMileage) params.maxMileage = maxMileage;
    onApply(params);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-3">
      <input placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="border rounded-md p-2 flex-1" />
      <input placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="border rounded-md p-2 flex-1" />
      <input placeholder="Colors (e.g., Red,White)" value={colors} onChange={(e) => setColors(e.target.value)} className="border rounded-md p-2 flex-1" />
      <input placeholder="Max Mileage" value={maxMileage} onChange={(e) => setMaxMileage(e.target.value)} className="border rounded-md p-2 flex-1" />
      <button onClick={apply} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">Apply</button>
    </div>
  );
}
