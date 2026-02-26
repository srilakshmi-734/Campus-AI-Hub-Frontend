import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Plus, Eye, MessageSquare, Trash2 } from 'lucide-react';

const students = [
    { id: 'CS001', name: 'Arjun Kumar', dept: 'CSE', sem: 3, attendance: 87, fees: 0, status: 'active' },
    { id: 'CS002', name: 'Priya Rajan', dept: 'CSE', sem: 5, attendance: 65, fees: 18500, status: 'danger' },
    { id: 'EC001', name: 'Rahul Sharma', dept: 'ECE', sem: 3, attendance: 79, fees: 0, status: 'active' },
    { id: 'ME001', name: 'Sneha Vijay', dept: 'Mech', sem: 1, attendance: 72, fees: 9200, status: 'warning' },
    { id: 'CS003', name: 'Vikram Anand', dept: 'CSE', sem: 7, attendance: 91, fees: 0, status: 'active' },
    { id: 'EC002', name: 'Divya Mohan', dept: 'ECE', sem: 5, attendance: 58, fees: 22000, status: 'danger' },
    { id: 'ME002', name: 'Karthik Raj', dept: 'Mech', sem: 3, attendance: 83, fees: 0, status: 'active' },
    { id: 'IT001', name: 'Ananya Subramanian', dept: 'IT', sem: 5, attendance: 76, fees: 5000, status: 'warning' },
    { id: 'CS004', name: 'Surya Prakash', dept: 'CSE', sem: 1, attendance: 95, fees: 0, status: 'active' },
    { id: 'EC003', name: 'Meenakshi S.', dept: 'ECE', sem: 7, attendance: 88, fees: 0, status: 'active' },
];

const statusBadge = (s) => {
    const map = { active: 'badge-green', warning: 'badge-yellow', danger: 'badge-red' };
    return map[s] || 'badge-blue';
};

export default function AdminStudents() {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const filtered = students.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.id.toLowerCase().includes(search.toLowerCase());
        const matchDept = deptFilter === 'All' || s.dept === deptFilter;
        const matchStatus = statusFilter === 'All' || s.status === statusFilter;
        return matchSearch && matchDept && matchStatus;
    });

    return (
        <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold gradient-text">{t('students')}</h1>
                    <p className="text-xs text-[var(--text-muted)]">{filtered.length} records found</p>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="btn-gradient flex items-center gap-2 text-sm px-4 py-2">
                    <Plus size={16} /> Add Student
                </motion.button>
            </motion.div>

            {/* Filters */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="glass-card p-4 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[180px]">
                    <Search size={16} className="text-[var(--text-muted)]" />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder={t('search')} className="glass-input text-sm" />
                </div>
                <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
                    className="glass-input text-sm w-auto min-w-[100px]"
                    style={{ background: 'var(--bg-card)' }}>
                    {['All', 'CSE', 'ECE', 'Mech', 'IT'].map(d => <option key={d}>{d}</option>)}
                </select>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                    className="glass-input text-sm w-auto min-w-[110px]"
                    style={{ background: 'var(--bg-card)' }}>
                    {['All', 'active', 'warning', 'danger'].map(s => <option key={s}>{s}</option>)}
                </select>
            </motion.div>

            {/* Table */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="campus-table">
                        <thead>
                            <tr>
                                <th>{t('id')}</th>
                                <th>{t('name_col')}</th>
                                <th>{t('dept')}</th>
                                <th>{t('semester')}</th>
                                <th>Attendance %</th>
                                <th>Fees Due (₹)</th>
                                <th>{t('status')}</th>
                                <th>{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((s, i) => (
                                <motion.tr key={s.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <td className="font-mono text-xs text-violet-400">{s.id}</td>
                                    <td className="font-medium">{s.name}</td>
                                    <td><span className="badge badge-blue">{s.dept}</span></td>
                                    <td className="text-center">{s.sem}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="progress-bar w-16">
                                                <div className="progress-fill" style={{
                                                    width: `${s.attendance}%`,
                                                    background: s.attendance < 75 ? '#ef4444' : s.attendance < 85 ? '#fbbf24' : '#10b981',
                                                }} />
                                            </div>
                                            <span className="text-xs">{s.attendance}%</span>
                                        </div>
                                    </td>
                                    <td className="font-mono text-sm">
                                        {s.fees > 0 ? <span className="text-red-400">₹{s.fees.toLocaleString()}</span> : <span className="text-green-400">Paid</span>}
                                    </td>
                                    <td><span className={`badge ${statusBadge(s.status)}`}>{s.status}</span></td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <button title="View" className="p-1.5 rounded-lg hover:bg-violet-500/10 text-violet-400 transition-colors"><Eye size={14} /></button>
                                            <button title="Message" className="p-1.5 rounded-lg hover:bg-blue-500/10 text-blue-400 transition-colors"><MessageSquare size={14} /></button>
                                            <button title="Remove" className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
