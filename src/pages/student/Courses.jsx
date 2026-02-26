import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen } from 'lucide-react';

const myCourses = [
    { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, faculty: 'Dr. Sunita Rao', syllabus: 72, grade: 'A' },
    { code: 'CS303', name: 'Operating Systems', credits: 3, faculty: 'Dr. K. Murugavel', syllabus: 60, grade: 'B+' },
    { code: 'MA301', name: 'Engineering Mathematics III', credits: 4, faculty: 'Dr. G. Rajan', syllabus: 80, grade: 'A+' },
    { code: 'CS305', name: 'Computer Networks', credits: 3, faculty: 'Mr. Arun Durai', syllabus: 55, grade: 'B' },
    { code: 'CS307', name: 'Machine Learning Basics', credits: 4, faculty: 'Dr. Sunita Rao', syllabus: 40, grade: 'A' },
    { code: 'CS309', name: 'OS Lab', credits: 2, faculty: 'Dr. K. Murugavel', syllabus: 90, grade: 'O' },
];

const gradeColors = { 'O': '#7c3aed', 'A+': '#10b981', 'A': '#3b82f6', 'B+': '#fbbf24', 'B': '#f97316' };

export default function StudentCourses() {
    const { t } = useTranslation();

    return (
        <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl font-bold gradient-text">{t('myCourses')}</h1>
                <p className="text-xs text-[var(--text-muted)]">{myCourses.length} enrolled courses · Semester 5</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myCourses.map((c, i) => (
                    <motion.div key={c.code}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        whileHover={{ y: -3 }}
                        className="glass-card p-5 space-y-3">
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
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                                style={{ background: `${gradeColors[c.grade]}30`, color: gradeColors[c.grade] }}>
                                {c.grade}
                            </div>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">👨‍🏫 {c.faculty}</p>
                        <div>
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-[var(--text-muted)]">Syllabus Progress</span>
                                <span className="font-semibold" style={{
                                    color: c.syllabus >= 70 ? '#10b981' : c.syllabus >= 50 ? '#fbbf24' : '#ef4444'
                                }}>{c.syllabus}%</span>
                            </div>
                            <div className="progress-bar">
                                <motion.div className="progress-fill"
                                    style={{ background: c.syllabus >= 70 ? '#10b981' : c.syllabus >= 50 ? '#fbbf24' : '#ef4444' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${c.syllabus}%` }}
                                    transition={{ duration: 0.7, delay: i * 0.07 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
