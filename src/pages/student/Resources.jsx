import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Package, Monitor, FlaskConical } from 'lucide-react';

const labs = [
    { name: 'Advanced Computing Lab', available: true, nextSlot: '14:00', capacity: 60, booked: 48 },
    { name: 'Networks Lab', available: false, nextSlot: '16:00', capacity: 50, booked: 50 },
    { name: 'Electronics Lab', available: true, nextSlot: '11:00', capacity: 40, booked: 22 },
];

const library = [
    { title: 'Introduction to Algorithms – Cormen', available: 3 },
    { title: 'Operating Systems – Silberschatz', available: 1 },
    { title: 'Computer Networks – Tanenbaum', available: 0 },
    { title: 'Machine Learning – Mitchell', available: 5 },
];

export default function StudentResources() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl font-bold gradient-text">{t('resources')}</h1>
                <p className="text-xs text-[var(--text-muted)]">Lab availability and library resources</p>
            </motion.div>

            {/* Labs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                className="glass-card p-5">
                <div className="flex items-center gap-2 mb-5">
                    <Monitor size={18} className="text-violet-400" />
                    <h2 className="font-semibold text-sm">Lab Availability</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {labs.map(({ name, available, nextSlot, capacity, booked }, i) => (
                        <motion.div key={name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            whileHover={{ y: -3 }}
                            className="p-4 rounded-xl"
                            style={{
                                border: `1px solid ${available ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.2)'}`,
                                background: available ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)',
                            }}>
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold text-xs">{name}</p>
                                <span className={`badge ${available ? 'badge-green' : 'badge-red'}`}>
                                    {available ? 'Available' : 'Full'}
                                </span>
                            </div>
                            <p className="text-xs text-[var(--text-muted)] mb-3">
                                {available ? `Next slot: ${nextSlot}` : `Opens: ${nextSlot}`}
                            </p>
                            <div className="progress-bar mb-1">
                                <div className="progress-fill"
                                    style={{ width: `${(booked / capacity) * 100}%`, background: available ? '#10b981' : '#ef4444' }} />
                            </div>
                            <p className="text-[10px] text-[var(--text-muted)]">{booked}/{capacity} seats</p>
                            {available && (
                                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    className="w-full mt-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all"
                                    style={{ background: 'var(--gradient)' }}>
                                    Book Slot
                                </motion.button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Library */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
                className="glass-card p-5">
                <div className="flex items-center gap-2 mb-5">
                    <Package size={18} className="text-orange-400" />
                    <h2 className="font-semibold text-sm">Library Resources</h2>
                </div>
                <div className="space-y-3">
                    {library.map(({ title, available }, i) => (
                        <motion.div key={title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.07 }}
                            className="flex items-center justify-between p-3 rounded-xl"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                            <p className="text-sm font-medium">{title}</p>
                            <div className="flex items-center gap-2">
                                <span className={`badge ${available > 0 ? 'badge-green' : 'badge-red'}`}>
                                    {available > 0 ? `${available} copies` : 'Unavailable'}
                                </span>
                                {available > 0 && (
                                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                        className="text-xs px-2.5 py-1 rounded-lg font-medium text-white"
                                        style={{ background: 'var(--gradient)' }}>
                                        Borrow
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
