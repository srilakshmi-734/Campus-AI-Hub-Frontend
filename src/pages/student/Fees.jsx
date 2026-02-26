import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

const feeItems = [
    { label: 'Tuition Fee', amount: 45000, paid: true, dueDate: '2025-12-01' },
    { label: 'Hostel Fee', amount: 18000, paid: true, dueDate: '2025-12-01' },
    { label: 'Lab Fee', amount: 5000, paid: true, dueDate: '2026-01-15' },
    { label: 'Exam Fee', amount: 1500, paid: false, dueDate: '2026-03-10' },
    { label: 'Sports Fee', amount: 500, paid: true, dueDate: '2025-12-01' },
];

export default function StudentFees() {
    const { t } = useTranslation();
    const paid = feeItems.filter(f => f.paid).reduce((s, f) => s + f.amount, 0);
    const due = feeItems.filter(f => !f.paid).reduce((s, f) => s + f.amount, 0);

    return (
        <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl font-bold gradient-text">{t('myFees')}</h1>
                <p className="text-xs text-[var(--text-muted)]">Academic Year 2025-26</p>
            </motion.div>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'Total Paid', value: `₹${paid.toLocaleString()}`, icon: CheckCircle, color: '#10b981' },
                    { label: 'Pending', value: due > 0 ? `₹${due.toLocaleString()}` : 'All Clear!', icon: AlertCircle, color: due > 0 ? '#ef4444' : '#10b981' },
                ].map(({ label, value, icon: Icon, color }) => (
                    <motion.div key={label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -3 }}
                        className="glass-card p-5">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                            style={{ background: `${color}20` }}>
                            <Icon size={20} style={{ color }} />
                        </div>
                        <p className="text-2xl font-bold" style={{ color }}>{value}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Fee Breakdown */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                className="glass-card overflow-hidden">
                <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center gap-2">
                    <CreditCard size={16} className="text-violet-400" />
                    <h2 className="font-semibold text-sm">Fee Breakdown</h2>
                </div>
                <table className="campus-table">
                    <thead>
                        <tr><th>Fee Type</th><th>Amount</th><th>Due Date</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        {feeItems.map((f, i) => (
                            <motion.tr key={f.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.06 }}>
                                <td className="font-medium text-sm">{f.label}</td>
                                <td className="font-mono font-semibold">₹{f.amount.toLocaleString()}</td>
                                <td className="text-xs text-[var(--text-muted)]">{f.dueDate}</td>
                                <td>
                                    {f.paid
                                        ? <span className="badge badge-green flex items-center gap-1 w-fit">
                                            <CheckCircle size={10} /> Paid
                                        </span>
                                        : <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="badge badge-red cursor-pointer hover:opacity-80 transition-opacity">
                                            Pay Now
                                        </motion.button>
                                    }
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}
