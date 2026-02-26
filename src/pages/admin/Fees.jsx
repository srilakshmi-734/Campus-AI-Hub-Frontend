import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CreditCard, AlertTriangle, CheckCircle, Send } from 'lucide-react';

const defaulters = [
    { id: 'CS002', name: 'Priya Rajan', dept: 'CSE', amount: 18500, due: '2026-01-15', status: 'overdue' },
    { id: 'EC002', name: 'Divya Mohan', dept: 'ECE', amount: 22000, due: '2026-01-15', status: 'overdue' },
    { id: 'ME001', name: 'Sneha Vijay', dept: 'Mech', amount: 9200, due: '2026-02-20', status: 'due_soon' },
    { id: 'IT002', name: 'Ravi Subash', dept: 'IT', amount: 15000, due: '2026-01-28', status: 'overdue' },
    { id: 'CS006', name: 'Kavya Prakash', dept: 'CSE', amount: 8500, due: '2026-03-01', status: 'due_soon' },
];

const categories = [
    { name: 'Tuition Fee', pct: 60, color: '#7c3aed' },
    { name: 'Hostel Fee', pct: 20, color: '#f97316' },
    { name: 'Lab Fee', pct: 12, color: '#10b981' },
    { name: 'Exam Fee', pct: 8, color: '#3b82f6' },
];

export default function AdminFees() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl font-bold gradient-text">{t('fees')}</h1>
                <p className="text-xs text-[var(--text-muted)]">Fee collection & defaulter management</p>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Collected', value: '₹48.2L', icon: CheckCircle, color: '#10b981', sub: '82% of target' },
                    { label: 'Pending', value: '₹12.5L', icon: AlertTriangle, color: '#f97316', sub: '18% remaining' },
                    { label: 'Defaulters', value: '47', icon: CreditCard, color: '#ef4444', sub: 'students pending' },
                ].map(({ label, value, icon: Icon, color, sub }, i) => (
                    <motion.div key={label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -3 }}
                        className="glass-card p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: `${color}20` }}>
                                <Icon size={20} style={{ color }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{value}</p>
                                <p className="text-xs text-[var(--text-muted)]">{sub}</p>
                            </div>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">{label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Defaulters Table */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                    className="glass-card overflow-hidden lg:col-span-2">
                    <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between">
                        <h2 className="font-semibold text-sm">Fee Defaulters</h2>
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-1.5 text-xs btn-gradient px-3 py-1.5">
                            <Send size={12} /> Bulk Reminder
                        </motion.button>
                    </div>
                    <table className="campus-table">
                        <thead>
                            <tr><th>ID</th><th>Name</th><th>Dept</th><th>Amount</th><th>Due Date</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                            {defaulters.map((d, i) => (
                                <motion.tr key={d.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.25 + i * 0.06 }}>
                                    <td className="font-mono text-xs text-violet-400">{d.id}</td>
                                    <td className="font-medium text-sm">{d.name}</td>
                                    <td><span className="badge badge-blue">{d.dept}</span></td>
                                    <td className="text-red-400 font-bold font-mono">₹{d.amount.toLocaleString()}</td>
                                    <td className="text-xs text-[var(--text-muted)]">{d.due}</td>
                                    <td><span className={`badge ${d.status === 'overdue' ? 'badge-red' : 'badge-yellow'}`}>
                                        {d.status === 'overdue' ? 'Overdue' : 'Due Soon'}
                                    </span></td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Category Breakdown */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
                    className="glass-card p-5">
                    <h2 className="font-semibold text-sm mb-5">Fee Breakdown</h2>
                    <div className="space-y-4">
                        {categories.map(({ name, pct, color }, i) => (
                            <div key={name}>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-[var(--text-muted)]">{name}</span>
                                    <span className="font-semibold" style={{ color }}>{pct}%</span>
                                </div>
                                <div className="progress-bar">
                                    <motion.div className="progress-fill"
                                        style={{ background: color }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pct}%` }}
                                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Visual pie representation */}
                    <div className="mt-6 flex flex-col gap-2">
                        {categories.map(({ name, pct, color }) => (
                            <div key={name} className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
                                <span className="text-[var(--text-muted)] flex-1">{name}</span>
                                <span className="font-semibold">{pct}%</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
