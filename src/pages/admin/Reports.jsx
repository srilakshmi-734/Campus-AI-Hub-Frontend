import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Download, BarChart3, Users, CreditCard, BookOpen } from 'lucide-react';

const reportTypes = [
    { title: 'Attendance Report', desc: 'Department & student-wise attendance analytics', icon: Users, color: '#7c3aed' },
    { title: 'Fee Collection Report', desc: 'Monthly fee collection and defaulter summary', icon: CreditCard, color: '#f97316' },
    { title: 'Academic Performance', desc: 'GPA distribution and course completion stats', icon: BookOpen, color: '#10b981' },
    { title: 'Faculty Report', desc: 'Teaching hours, ratings and workload analysis', icon: BarChart3, color: '#3b82f6' },
    { title: 'Resource Utilisation', desc: 'Lab bookings and hostel occupancy report', icon: FileText, color: '#ec4899' },
    { title: 'Annual Summary', desc: 'Full year comprehensive institutional report', icon: FileText, color: '#fbbf24' },
];

export default function AdminReports() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl font-bold gradient-text">{t('reports')}</h1>
                <p className="text-xs text-[var(--text-muted)]">Generate and export institutional reports</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportTypes.map(({ title, desc, icon: Icon, color }, i) => (
                    <motion.div key={title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="glass-card p-5 space-y-4 cursor-pointer group"
                    >
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                            style={{ background: `${color}20` }}>
                            <Icon size={22} style={{ color }} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">{title}</h3>
                            <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">{desc}</p>
                        </div>
                        <div className="flex gap-2 pt-1">
                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className="flex-1 flex items-center justify-center gap-2 text-xs py-2 rounded-lg font-medium transition-all"
                                style={{ background: `${color}15`, color }}>
                                <Download size={13} /> PDF
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className="flex-1 flex items-center justify-center gap-2 text-xs py-2 rounded-lg font-medium transition-all border"
                                style={{ borderColor: `${color}30`, color }}>
                                <Download size={13} /> Excel
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
