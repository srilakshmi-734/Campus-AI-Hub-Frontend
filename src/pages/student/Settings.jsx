import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Save, User, Bell, ShieldCheck } from 'lucide-react';

export default function StudentSettings() {
    const { t } = useTranslation();
    const { userName } = useAuth();

    const [form, setForm] = useState({
        name: userName,
        email: 'student@campus.edu',
        phone: '+91 98765 43210',
        rollNo: 'CS20B001',
        dept: 'CSE',
        sem: '5',
        notifyEmail: true,
        notifySMS: false,
        notifyAttendance: true,
        notifyFees: true,
    });
    const [saved, setSaved] = useState(false);

    const toggle = (key) => setForm(f => ({ ...f, [key]: !f[key] }));

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-xl font-bold gradient-text">{t('settings')}</h1>
                <p className="text-xs text-[var(--text-muted)]">Profile & notification preferences</p>
            </motion.div>

            <form onSubmit={handleSave} className="space-y-5">
                {/* Profile */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                    className="glass-card p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <User size={18} className="text-violet-400" />
                        <h2 className="font-semibold text-sm">Profile Information</h2>
                    </div>

                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0"
                            style={{ background: 'var(--gradient)' }}>
                            {form.name.charAt(0)}
                        </div>
                        <button type="button" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                            Change Photo
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: 'Full Name', key: 'name' },
                            { label: 'Email', key: 'email' },
                            { label: 'Phone', key: 'phone' },
                            { label: 'Roll Number', key: 'rollNo', readOnly: true },
                        ].map(({ label, key, readOnly }) => (
                            <div key={key}>
                                <label className="block text-xs text-[var(--text-muted)] mb-1 font-medium uppercase tracking-wider">{label}</label>
                                <input
                                    value={form[key]}
                                    onChange={e => !readOnly && setForm(f => ({ ...f, [key]: e.target.value }))}
                                    readOnly={readOnly}
                                    className="glass-input text-sm"
                                    style={readOnly ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Notifications */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                    className="glass-card p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Bell size={18} className="text-orange-400" />
                        <h2 className="font-semibold text-sm">Notification Preferences</h2>
                    </div>
                    {[
                        { key: 'notifyEmail', label: 'Email Notifications' },
                        { key: 'notifySMS', label: 'SMS Notifications' },
                        { key: 'notifyAttendance', label: 'Attendance Alerts' },
                        { key: 'notifyFees', label: 'Fee Reminders' },
                    ].map(({ key, label }) => (
                        <div key={key} className="flex items-center justify-between py-1">
                            <span className="text-sm">{label}</span>
                            <button type="button" onClick={() => toggle(key)}
                                className={`w-11 h-6 rounded-full transition-all duration-200 relative ${form[key] ? 'bg-violet-500' : 'bg-white/15'
                                    }`}>
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${form[key] ? 'left-6' : 'left-1'
                                    }`} />
                            </button>
                        </div>
                    ))}
                </motion.div>

                {/* Security */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                    className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck size={18} className="text-green-400" />
                        <h2 className="font-semibold text-sm">Security</h2>
                    </div>
                    <button type="button"
                        className="text-sm text-violet-400 hover:text-violet-300 transition-colors border border-[var(--border-color)] px-4 py-2 rounded-lg hover:border-violet-500/50">
                        Change Password
                    </button>
                </motion.div>

                <motion.button type="submit"
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    className="btn-gradient flex items-center gap-2 px-6 py-3 text-sm"
                    style={saved ? { background: '#10b981', boxShadow: '0 8px 24px rgba(16,185,129,0.4)' } : {}}>
                    <Save size={16} />
                    {saved ? '✓ Saved!' : 'Save Changes'}
                </motion.button>
            </form>
        </div>
    );
}
