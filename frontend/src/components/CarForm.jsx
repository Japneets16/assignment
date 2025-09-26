import { useEffect, useState } from 'react';

export default function CarForm({ initial = null, onSubmit, submitText = 'Add Car' }) {
  const [form, setForm] = useState({
    model_name: '',
    kms_driven: '',
    major_scratches: false,
    original_paint: true,
    number_of_accidents: 0,
    number_of_previous_buyers: 0,
    registration_place: '',
    image_url: '',
    description: ['', '', '', '', '']
  });

  useEffect(() => {
    if (initial) {
      setForm({
        ...initial,
        description: Array.isArray(initial.description) && initial.description.length ? initial.description : ['', '', '', '', '']
      });
    }
  }, [initial]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onBulletChange = (idx, value) => {
    setForm((prev) => {
      const arr = [...prev.description];
      arr[idx] = value;
      return { ...prev, description: arr };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = { ...form, kms_driven: Number(form.kms_driven) };
    cleaned.description = cleaned.description.filter((d) => d && d.trim()).slice(0, 5);
    onSubmit(cleaned);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="model_name" value={form.model_name} onChange={onChange} placeholder="Model Name (e.g., Honda City)" className="border rounded-md p-2" />
        <input name="kms_driven" value={form.kms_driven} onChange={onChange} placeholder="Kms Driven" type="number" className="border rounded-md p-2" />
        <input name="registration_place" value={form.registration_place} onChange={onChange} placeholder="Registration Place" className="border rounded-md p-2" />
        <input name="image_url" value={form.image_url} onChange={onChange} placeholder="Image URL" className="border rounded-md p-2" />
      </div>
      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="major_scratches" checked={form.major_scratches} onChange={onChange} /> Major Scratches</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="original_paint" checked={form.original_paint} onChange={onChange} /> Original Paint</label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="number_of_accidents" value={form.number_of_accidents} onChange={onChange} placeholder="Number of Accidents" type="number" className="border rounded-md p-2" />
        <input name="number_of_previous_buyers" value={form.number_of_previous_buyers} onChange={onChange} placeholder="Previous Buyers" type="number" className="border rounded-md p-2" />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">Bullet Points (max 5)</p>
        {[0,1,2,3,4].map((i) => (
          <input key={i} value={form.description[i] || ''} onChange={(e) => onBulletChange(i, e.target.value)} placeholder={`Point ${i+1}`} className="w-full border rounded-md p-2" />
        ))}
      </div>

      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">{submitText}</button>
    </form>
  );
}
