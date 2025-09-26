export default function CarCard({ car, selectable = false, selected = false, onSelect = () => {}, onEdit = () => {} }) {
  const oem = car.oem || {};
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-3">
      <div className="flex items-start gap-3">
        {selectable && (
          <input type="checkbox" checked={selected} onChange={(e) => onSelect(e.target.checked)} className="mt-1" />
        )}
        <img src={car.image_url} alt={car.model_name} className="w-36 h-24 object-cover rounded-md" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{car.model_name}</h3>
          <p className="text-sm text-gray-600">Kms Driven: {car.kms_driven} • Reg: {car.registration_place}</p>
          {oem.list_price !== undefined && (
            <p className="text-sm text-gray-700">OEM Price: ₹{oem.list_price}</p>
          )}
          {oem.mileage !== undefined && (
            <p className="text-sm text-gray-700">Mileage: {oem.mileage} km/l</p>
          )}
        </div>
      </div>
      <ul className="list-disc pl-6 text-sm text-gray-700">
        {(car.description || []).map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
      <div className="flex justify-between items-center text-sm text-gray-700">
        <span>Scratches: {car.major_scratches ? 'Yes' : 'No'}</span>
        <span>Original Paint: {car.original_paint ? 'Yes' : 'No'}</span>
        <span>Accidents: {car.number_of_accidents}</span>
        <span>Prev Buyers: {car.number_of_previous_buyers}</span>
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={onEdit} className="px-3 py-1 bg-yellow-500 text-white rounded-md">Edit</button>
      </div>
    </div>
  );
}
