import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, Plus, Mail } from 'lucide-react';

const faculty = [
    { id: 'F001', name: 'Dr. K. Murugavel', dept: 'CSE', designation: 'Professor & HOD', classes: 4, rating: 4.8, exp: 18 },
    { id: 'F002', name: 'Dr. Priya Nair', dept: 'ECE', designation: 'Associate Prof.', classes: 5, rating: 4.5, exp: 12 },
    { id: 'F003', name: 'Mr. Rahul Mehta', dept: 'Mech', designation: 'Assistant Prof.', classes: 6, rating: 4.2, exp: 6 },
    { id: 'F004', name: 'Dr. Sunita Rao', dept: 'CSE', designation: 'Professor', classes: 3, rating: 4.9, exp: 22 },
    { id: 'F005', name: 'Mr. Arun Durai', dept: 'IT', designation: 'Assistant Prof.', classes: 5, rating: 4.1, exp: 4 },
    { id: 'F006', name: 'Dr. Kavitha Selvi', dept: 'ECE', designation: 'Associate Prof.', classes: 4, rating: 4.7, exp: 15 },
    { id: 'F007', name: 'Mr. Vijay Kumar', dept: 'Civil', 'designation': 'Assistant Prof.', classes: 6, rating: 3.9, exp: 3 },
    { id: 'F008', name: 'Dr. Meena Rajan', dept: 'Mech', designation: 'Professor & HOD', classes: 3, rating: 4.6, exp: 20 },
];

export default function AdminFaculty() {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('All');

    const filtered = faculty.filter(f => filter === 'All' || f.dept === filter);

    return (
        <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold gradient-text">{t('faculty')}</h1>
                    <p className="text-xs text-[var(--text-muted)]">{filtered.length} faculty members</p>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="btn-gradient flex items-center gap-2 text-sm px-4 py-2">
                    <Plus size={16} /> Add Faculty
                </motion.button>
            </motion.div>

            {/* Dept filter chips */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-wrap gap-2">
                {['All', 'CSE', 'ECE', 'Mech', 'Civil', 'IT'].map(d => (
                    <button key={d} onClick={() => setFilter(d)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${filter === d ? 'text-white' : 'glass-card text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                            }`}
                        style={filter === d ? { background: 'var(--gradient)' } : {}}>
                        {d}
                    </button>
                ))}
            </motion.div>

            {/* Faculty Cards */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((f, i) => (
                    <motion.div key={f.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="glass-card p-5 space-y-3"
                    >
                        {/* Avatar */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                                style={{ background: 'var(--gradient)' }}>
                                {f.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-semibold text-sm leading-tight">{f.name}</p>
                                <p className="text-xs text-[var(--text-muted)]">{f.designation}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                            <span className="badge badge-violet">{f.dept}</span>
                            <span>{f.exp} yrs exp</span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <span className="text-[var(--text-muted)]">{f.classes} classes / week</span>
                            <div className="flex items-center gap-1">
                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                <span className="font-semibold">{f.rating}</span>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium
              border border-[var(--border-color)] hover:border-violet-500/50 hover:bg-violet-500/10
              text-[var(--text-muted)] hover:text-violet-400 transition-all">
                            <Mail size={12} /> Contact
                        </button>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
