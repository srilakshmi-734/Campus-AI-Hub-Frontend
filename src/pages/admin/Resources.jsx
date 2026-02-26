import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Package, Users, CheckCircle, XCircle } from 'lucide-react';

const labs = [
    { name: 'Advanced Computing Lab', capacity: 60, booked: 48, dept: 'CSE' },
    { name: 'Electronics Lab', capacity: 40, booked: 35, dept: 'ECE' },
    { name: 'CAD/CAM Lab', capacity: 30, booked: 22, dept: 'Mech' },
    { name: 'Networks Lab', capacity: 50, booked: 40, dept: 'IT' },
    { name: 'Physics Lab', capacity: 45, booked: 28, dept: 'Science' },
];

const bookings = [
    { faculty: 'Dr. Sunita Rao', lab: 'Advanced Computing Lab', date: '2026-02-28', time: '10:00–12:00', status: 'pending' },
    { faculty: 'Mr. Arun Durai', lab: 'Networks Lab', date: '2026-02-28', time: '14:00–16:00', status: 'pending' },
    { faculty: 'Dr. Kavitha Selvi', lab: 'Electronics Lab', date: '2026-03-01', time: '09:00–11:00', status: 'pending' },
];

const hostels = [
    { name: "Men's Hostel A", total: 240, occupied: 218 },
    { name: "Men's Hostel B", total: 180, occupied: 163 },
    { name: "Women's Hostel", total: 200, occupied: 187 },
];

export default function AdminResources() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl font-bold gradient-text">{t('resources')}</h1>
                <p className="text-xs text-[var(--text-muted)]">Labs, hostels and booking management</p>
            </motion.div>

            {/* Labs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                className="glass-card p-5">
                <div className="flex items-center gap-2 mb-5">
                    <Package size={18} className="text-violet-400" />
                    <h2 className="font-semibold text-sm">Lab Utilisation</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {labs.map(({ name, capacity, booked, dept }, i) => {
                        const pct = Math.round((booked / capacity) * 100);
                        return (
                            <motion.div key={name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 + i * 0.07 }}
                                whileHover={{ y: -3 }}
                                className="p-4 rounded-xl border border-[var(--border-color)]"
                                style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="font-semibold text-xs leading-tight">{name}</p>
                                        <span className="badge badge-violet text-[10px] mt-1">{dept}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm">{pct}%</p>
                                        <p className="text-[10px] text-[var(--text-muted)]">{booked}/{capacity}</p>
                                    </div>
                                </div>
                                <div className="progress-bar mt-3">
                                    <motion.div className="progress-fill"
                                        style={{ background: pct >= 90 ? '#ef4444' : pct >= 75 ? '#fbbf24' : '#10b981' }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pct}%` }}
                                        transition={{ duration: 0.7, delay: 0.15 + i * 0.07 }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Pending Bookings */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                className="glass-card overflow-hidden">
                <div className="px-5 py-3 border-b border-[var(--border-color)]">
                    <h2 className="font-semibold text-sm">Pending Lab Bookings</h2>
                </div>
                <table className="campus-table">
                    <thead>
                        <tr><th>Faculty</th><th>Lab</th><th>Date</th><th>Time</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {bookings.map((b, i) => (
                            <motion.tr key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 + i * 0.07 }}>
                                <td className="font-medium text-sm">{b.faculty}</td>
                                <td className="text-xs text-[var(--text-muted)]">{b.lab}</td>
                                <td className="text-xs">{b.date}</td>
                                <td className="text-xs font-mono">{b.time}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg font-medium
                      bg-green-500/15 text-green-400 hover:bg-green-500/25 transition-colors">
                                            <CheckCircle size={12} /> Approve
                                        </button>
                                        <button className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg font-medium
                      bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors">
                                            <XCircle size={12} /> Reject
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {/* Hostels */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                className="glass-card p-5">
                <div className="flex items-center gap-2 mb-5">
                    <Users size={18} className="text-orange-400" />
                    <h2 className="font-semibold text-sm">Hostel Occupancy</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {hostels.map(({ name, total, occupied }, i) => {
                        const pct = Math.round((occupied / total) * 100);
                        return (
                            <motion.div key={name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.35 + i * 0.08 }}
                                className="p-4 rounded-xl text-center"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)' }}>
                                <p className="font-semibold text-sm mb-2">{name}</p>
                                <p className="text-3xl font-bold gradient-text">{pct}%</p>
                                <p className="text-xs text-[var(--text-muted)] mt-1">{occupied} / {total} beds</p>
                                <div className="progress-bar mt-3">
                                    <motion.div className="progress-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pct}%` }}
                                        transition={{ duration: 0.7, delay: 0.4 + i * 0.08 }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
