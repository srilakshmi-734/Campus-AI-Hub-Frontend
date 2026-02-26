import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react';

const deptData = [
    { dept: 'CSE', present: 87, absent: 13 },
    { dept: 'ECE', present: 79, absent: 21 },
    { dept: 'Mech', present: 74, absent: 26 },
    { dept: 'Civil', present: 83, absent: 17 },
    { dept: 'IT', present: 88, absent: 12 },
];

const lowStudents = [
    { id: 'CS002', name: 'Priya Rajan', dept: 'CSE', att: 65, risk: 'Critical' },
    { id: 'EC002', name: 'Divya Mohan', dept: 'ECE', att: 58, risk: 'Critical' },
    { id: 'ME001', name: 'Sneha Vijay', dept: 'Mech', att: 72, risk: 'High' },
    { id: 'IT002', name: 'Ravi Subash', dept: 'IT', att: 74, risk: 'High' },
    { id: 'CS005', name: 'Mani Kannan', dept: 'CSE', att: 70, risk: 'High' },
];

const riskColors = { Critical: 'badge-red', High: 'badge-yellow', Medium: 'badge-blue', Low: 'badge-green' };

export default function AdminAttendance() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl font-bold gradient-text">{t('attendance')}</h1>
                <p className="text-xs text-[var(--text-muted)]">Current semester overview</p>
            </motion.div>

            {/* Dept Bars */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                className="glass-card p-6">
                <h2 className="font-semibold text-sm mb-5">Department-wise Attendance</h2>
                <div className="space-y-5">
                    {deptData.map(({ dept, present, absent }, i) => (
                        <div key={dept}>
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="font-medium">{dept}</span>
                                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                                    <span className="text-green-400 font-semibold">{present}% present</span>
                                    <span className="text-red-400">{absent}% absent</span>
                                </div>
                            </div>
                            <div className="h-5 rounded-full overflow-hidden flex" style={{ background: 'rgba(255,255,255,0.08)' }}>
                                <motion.div
                                    style={{ background: present >= 80 ? '#10b981' : present >= 75 ? '#fbbf24' : '#ef4444' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${present}%` }}
                                    transition={{ duration: 0.7, delay: i * 0.1 }}
                                    className="h-full rounded-full flex items-center justify-end pr-2"
                                >
                                    <span className="text-[10px] text-white font-bold">{present}%</span>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Average Attendance', value: '82.2%', icon: CheckCircle, color: '#10b981' },
                    { label: 'Students Below 75%', value: '47', icon: AlertTriangle, color: '#ef4444' },
                    { label: 'Departments at Risk', value: '2', icon: TrendingDown, color: '#f97316' },
                ].map(({ label, value, icon: Icon, color }, i) => (
                    <motion.div key={label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.08 }}
                        whileHover={{ y: -3 }}
                        className="glass-card p-5">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                            style={{ background: `${color}20` }}>
                            <Icon size={20} style={{ color }} />
                        </div>
                        <p className="text-2xl font-bold">{value}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Low Attendance Table */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                className="glass-card overflow-hidden">
                <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-400" />
                    <h2 className="font-semibold text-sm">Low Attendance Alerts</h2>
                </div>
                <table className="campus-table">
                    <thead>
                        <tr>
                            <th>ID</th><th>Name</th><th>Dept</th><th>Attendance %</th><th>Risk Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lowStudents.map((s, i) => (
                            <motion.tr key={s.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 + i * 0.06 }}>
                                <td className="font-mono text-xs text-violet-400">{s.id}</td>
                                <td className="font-medium">{s.name}</td>
                                <td><span className="badge badge-blue">{s.dept}</span></td>
                                <td className="text-red-400 font-bold">{s.att}%</td>
                                <td><span className={`badge ${riskColors[s.risk]}`}>{s.risk}</span></td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}
