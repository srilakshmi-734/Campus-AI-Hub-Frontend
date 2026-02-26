import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CalendarCheck, AlertTriangle } from 'lucide-react';

const myAttendance = [
    { subject: 'Data Structures', total: 48, attended: 42, pct: 87 },
    { subject: 'Operating Systems', total: 36, attended: 29, pct: 80 },
    { subject: 'Mathematics III', total: 48, attended: 44, pct: 91 },
    { subject: 'Computer Networks', total: 36, attended: 25, pct: 69 },
    { subject: 'Machine Learning', total: 48, attended: 40, pct: 83 },
    { subject: 'OS Lab', total: 24, attended: 23, pct: 95 },
];

export default function StudentAttendance() {
    const { t } = useTranslation();
    const overall = Math.round(myAttendance.reduce((s, a) => s + a.pct, 0) / myAttendance.length);

    return (
        <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl font-bold gradient-text">{t('myAttendance')}</h1>
                <p className="text-xs text-[var(--text-muted)]">Semester 5 attendance overview</p>
            </motion.div>

            {/* Overall */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
                className="glass-card p-6 flex items-center gap-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0"
                    style={{
                        background: `conic-gradient(${overall >= 75 ? '#10b981' : '#ef4444'} ${overall * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
                    }}>
                    {overall}%
                </div>
                <div>
                    <p className="text-lg font-bold">Overall Attendance</p>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                        {overall >= 75 ? '✅ You are eligible for exams' : '⚠️ Below 75% — Risk of shortage'}
                    </p>
                </div>
            </motion.div>

            {/* Subject Breakdown */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                className="glass-card p-5">
                <h2 className="font-semibold text-sm mb-5">Subject-wise Attendance</h2>
                <div className="space-y-4">
                    {myAttendance.map(({ subject, total, attended, pct }, i) => (
                        <motion.div key={subject}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + i * 0.07 }}>
                            <div className="flex items-center justify-between text-sm mb-1.5">
                                <div className="flex items-center gap-2">
                                    {pct < 75 && <AlertTriangle size={12} className="text-red-400" />}
                                    <span className={pct < 75 ? 'text-red-400 font-medium' : ''}>{subject}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs">
                                    <span className="text-[var(--text-muted)]">{attended}/{total}</span>
                                    <span className="font-bold" style={{ color: pct >= 75 ? '#10b981' : '#ef4444' }}>{pct}%</span>
                                </div>
                            </div>
                            <div className="progress-bar">
                                <motion.div
                                    style={{ background: pct >= 85 ? '#10b981' : pct >= 75 ? '#fbbf24' : '#ef4444' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.7, delay: 0.3 + i * 0.07 }}
                                    className="progress-fill"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
