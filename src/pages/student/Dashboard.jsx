import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, CalendarCheck, CreditCard, TrendingUp, Award, Bell } from 'lucide-react';

const myStats = [
    { label: 'myAttendance', value: '87%', icon: CalendarCheck, color: '#10b981' },
    { label: 'myCourses', value: '6', icon: BookOpen, color: '#7c3aed' },
    { label: 'myFees', value: '₹0 Due', icon: CreditCard, color: '#3b82f6' },
    { label: 'CGPA', value: '8.4', icon: Award, color: '#f97316' },
];

const upcomingClasses = [
    { subject: 'Data Structures', time: '09:00–10:00', room: 'CS-Lab 2', faculty: 'Dr. Sunita Rao' },
    { subject: 'Mathematics III', time: '10:30–11:30', room: 'S-103', faculty: 'Dr. G. Rajan' },
    { subject: 'OS Lab', time: '14:00–16:00', room: 'CS-Lab 1', faculty: 'Dr. K. Murugavel' },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function StudentDashboard() {
    const { t } = useTranslation();
    const { userName } = useAuth();

    return (
        <div className="space-y-6">
            <motion.div variants={item} initial="hidden" animate="show">
                <h1 className="text-2xl font-bold gradient-text">{t('welcomeStudent')} 👋</h1>
                <p className="text-sm text-[var(--text-muted)] mt-1">{userName} · CSE – 5th Semester</p>
            </motion.div>

            {/* Stat Cards */}
            <motion.div variants={container} initial="hidden" animate="show"
                className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {myStats.map(({ label, value, icon: Icon, color }) => (
                    <motion.div key={label} variants={item}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="glass-card p-5 cursor-default">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                            style={{ background: `${color}20` }}>
                            <Icon size={20} style={{ color }} />
                        </div>
                        <p className="text-2xl font-bold">{value}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{t(label)}</p>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Today's Schedule */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                    className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <CalendarCheck size={18} className="text-violet-400" />
                        <h2 className="font-semibold text-sm">Today's Schedule</h2>
                        <span className="badge badge-violet text-[10px] ml-auto">Thu, Feb 26</span>
                    </div>
                    <div className="space-y-3">
                        {upcomingClasses.map((c, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 + i * 0.08 }}
                                className="flex items-center gap-3 p-3 rounded-xl"
                                style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.12)' }}>
                                <div className="text-center min-w-[52px]">
                                    <p className="text-xs font-bold text-violet-400">{c.time.split('–')[0]}</p>
                                    <p className="text-[9px] text-[var(--text-muted)]">{c.time.split('–')[1]}</p>
                                </div>
                                <div className="w-px h-8 bg-violet-500/30" />
                                <div className="flex-1">
                                    <p className="font-semibold text-xs">{c.subject}</p>
                                    <p className="text-[10px] text-[var(--text-muted)]">{c.faculty} · {c.room}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Notices */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                    className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Bell size={18} className="text-orange-400" />
                        <h2 className="font-semibold text-sm">Notices</h2>
                    </div>
                    <div className="space-y-3">
                        {[
                            { text: 'Semester exam schedule released', time: 'Today', type: 'info' },
                            { text: 'Lab records submission deadline: Mar 5', time: 'Yesterday', type: 'warn' },
                            { text: 'Congratulations! Attendance above 85%', time: '2 days ago', type: 'success' },
                        ].map((n, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                                <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${n.type === 'success' ? 'bg-green-400' : n.type === 'warn' ? 'bg-yellow-400' : 'bg-blue-400'
                                    }`} />
                                <div>
                                    <p className="text-xs text-[var(--text-primary)]">{n.text}</p>
                                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{n.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
