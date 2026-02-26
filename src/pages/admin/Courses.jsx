import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Plus, Search } from 'lucide-react';

const courses = [
    { code: 'CS301', name: 'Data Structures & Algorithms', dept: 'CSE', credits: 4, enrolled: 90, syllabus: 72, faculty: 'Dr. Sunita Rao' },
    { code: 'CS401', name: 'Operating Systems', dept: 'CSE', credits: 3, enrolled: 88, syllabus: 60, faculty: 'Dr. K. Murugavel' },
    { code: 'EC301', name: 'Digital Signal Processing', dept: 'ECE', credits: 4, enrolled: 76, syllabus: 85, faculty: 'Dr. Priya Nair' },
    { code: 'ME201', name: 'Thermodynamics', dept: 'Mech', credits: 3, enrolled: 65, syllabus: 50, faculty: 'Dr. Meena Rajan' },
    { code: 'CS501', name: 'Machine Learning', dept: 'CSE', credits: 4, enrolled: 110, syllabus: 40, faculty: 'Dr. Sunita Rao' },
    { code: 'IT301', name: 'Web Technologies', dept: 'IT', credits: 3, enrolled: 82, syllabus: 90, faculty: 'Mr. Arun Durai' },
    { code: 'EC401', name: 'VLSI Design', dept: 'ECE', credits: 4, enrolled: 70, syllabus: 65, faculty: 'Dr. Kavitha Selvi' },
    { code: 'ME401', name: 'Fluid Mechanics', dept: 'Mech', credits: 3, enrolled: 60, syllabus: 78, faculty: 'Mr. Rahul Mehta' },
];

export default function AdminCourses() {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');

    const filtered = courses.filter(c => {
        const s = search.toLowerCase();
        return (filter_dept => deptFilter === 'All' || c.dept === deptFilter)(deptFilter) &&
            (c.name.toLowerCase().includes(s) || c.code.toLowerCase().includes(s));
    });

    return (
        <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold gradient-text">{t('courses')}</h1>
                    <p className="text-xs text-[var(--text-muted)]">{filtered.length} active courses</p>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="btn-gradient flex items-center gap-2 text-sm px-4 py-2">
                    <Plus size={16} /> Add Course
                </motion.button>
            </motion.div>

            {/* Filters */}
            <div className="glass-card p-4 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[180px]">
                    <Search size={15} className="text-[var(--text-muted)]" />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search courses..." className="glass-input text-sm" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {['All', 'CSE', 'ECE', 'Mech', 'IT'].map(d => (
                        <button key={d} onClick={() => setDeptFilter(d)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${deptFilter === d ? 'text-white' : 'glass-card text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                }`}
                            style={deptFilter === d ? { background: 'var(--gradient)' } : {}}>
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((c, i) => (
                    <motion.div key={c.code}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        whileHover={{ y: -3 }}
                        className="glass-card p-5 space-y-3"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ background: 'rgba(124,58,237,0.15)' }}>
                                    <BookOpen size={18} className="text-violet-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{c.name}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{c.code} · {c.credits} Credits</p>
                                </div>
                            </div>
                            <span className="badge badge-violet">{c.dept}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                            <span>👨‍💼 {c.faculty}</span>
                            <span>👥 {c.enrolled} enrolled</span>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-[var(--text-muted)]">Syllabus Coverage</span>
                                <span className="font-semibold" style={{
                                    color: c.syllabus >= 80 ? '#10b981' : c.syllabus >= 60 ? '#fbbf24' : '#ef4444'
                                }}>{c.syllabus}%</span>
                            </div>
                            <div className="progress-bar">
                                <motion.div className="progress-fill"
                                    style={{ background: c.syllabus >= 80 ? '#10b981' : c.syllabus >= 60 ? '#fbbf24' : '#ef4444' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${c.syllabus}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.07 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
