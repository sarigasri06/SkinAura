import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiDroplet, FiMoon, FiSun, FiEdit2, FiTrash2, FiPlus, FiCalendar, FiCoffee } from 'react-icons/fi';

const initialEntries = [
  { id: 1, date: '2026-07-16', morning: 'Vitamin C Wash → Rose Toner → HA Serum → Sunscreen SPF 50', night: 'Oil Balm Cleanse → Foam Wash → Retinol Serum → Ceramide Cream', water: 8, sleep: 7.5, notes: 'Skin feeling great! Noticed less redness today.' },
  { id: 2, date: '2026-07-15', morning: 'Gentle Wash → Centella Toner → Snail Mucin → Moisturizer', night: 'Double Cleanse → Niacinamide → Moisturizer', water: 6, sleep: 6, notes: 'Skipped retinol tonight — skin felt a bit sensitive.' },
  { id: 3, date: '2026-07-14', morning: 'Micellar Water → Green Tea Toner → Vitamin C → SPF', night: 'Cleansing Balm → Foam Wash → Peptide Serum → Night Cream', water: 7, sleep: 8, notes: 'New peptide serum is lovely! Skin feels plump.' },
];

const SkinJournalPage = () => {
  const [entries, setEntries] = useState(initialEntries);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: '', morning: '', night: '', water: '', sleep: '', notes: '' });
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <FiMoon size={64} className="mx-auto text-rose-300 mb-4" />
        <h2 className="text-2xl font-semibold text-rose-800 mb-2">Please Login</h2>
        <p className="text-rose-500 mb-6">Login to track your skincare journey.</p>
        <Link to="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  const handleAdd = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      date: form.date || new Date().toISOString().split('T')[0],
      morning: form.morning,
      night: form.night,
      water: Number(form.water) || 0,
      sleep: Number(form.sleep) || 0,
      notes: form.notes,
    };
    setEntries([newEntry, ...entries]);
    setForm({ date: '', morning: '', night: '', water: '', sleep: '', notes: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => setEntries(entries.filter((e) => e.id !== id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-rose-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-rose-800">Skin Journal</h1>
          <p className="text-rose-500 mt-1">Track your daily skincare routine & habits</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <FiPlus size={18} /> New Entry
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-rose-600 mb-1">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-rose-600 mb-1">💧 Water (glasses)</label>
              <input type="number" value={form.water} onChange={(e) => setForm({ ...form, water: e.target.value })} placeholder="8" className="input-field text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-rose-600 mb-1">😴 Sleep (hours)</label>
              <input type="number" step="0.5" value={form.sleep} onChange={(e) => setForm({ ...form, sleep: e.target.value })} placeholder="7.5" className="input-field text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-rose-600 mb-1">☀️ Morning Routine</label>
            <input type="text" value={form.morning} onChange={(e) => setForm({ ...form, morning: e.target.value })} placeholder="Cleanser → Toner → Serum → SPF" className="input-field text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-rose-600 mb-1">🌙 Night Routine</label>
            <input type="text" value={form.night} onChange={(e) => setForm({ ...form, night: e.target.value })} placeholder="Double Cleanse → Retinol → Moisturizer" className="input-field text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-rose-600 mb-1">📝 Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows="2" placeholder="How is your skin feeling today?" className="input-field text-sm" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary text-sm">Save Entry</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
          </div>
        </form>
      )}

      {/* Entries */}
      {entries.length === 0 ? (
        <div className="text-center py-20">
          <FiMoon size={48} className="mx-auto text-rose-300 mb-4" />
          <p className="text-rose-500">No journal entries yet. Start tracking today!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-xl p-5 shadow-sm border border-rose-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FiCalendar size={16} className="text-rose-400" />
                  <span className="text-sm font-semibold text-rose-800">{entry.date}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-rose-500">
                  <span className="flex items-center gap-1"><FiDroplet size={12} /> {entry.water} 💧</span>
                  <span className="flex items-center gap-1"><FiMoon size={12} /> {entry.sleep}h</span>
                  <button onClick={() => handleDelete(entry.id)} className="text-rose-400 hover:text-rose-600 transition-colors"><FiTrash2 size={14} /></button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-rose-50 rounded-lg p-3">
                  <span className="text-rose-500 font-medium flex items-center gap-1 mb-1"><FiSun size={14} /> Morning</span>
                  <p className="text-rose-700">{entry.morning || 'Not recorded'}</p>
                </div>
                <div className="bg-rose-50 rounded-lg p-3">
                  <span className="text-rose-500 font-medium flex items-center gap-1 mb-1"><FiMoon size={14} /> Night</span>
                  <p className="text-rose-700">{entry.night || 'Not recorded'}</p>
                </div>
              </div>
              {entry.notes && (
                <div className="mt-3 text-sm text-rose-600 bg-rose-50 rounded-lg p-3 italic">
                  💭 "{entry.notes}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkinJournalPage;
