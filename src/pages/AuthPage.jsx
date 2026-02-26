import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Brain, Eye, EyeOff, ShieldCheck, GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';

const roleConfig = {
    admin: {
        label: 'Administrator',
        Icon: ShieldCheck,
        color: '#7c3aed',
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
        glow: 'rgba(124,58,237,0.5)',
        placeholder: 'admin@campus.edu',
        namePlaceholder: 'Dr. John Smith',
    },
    student: {
        label: 'Student',
        Icon: GraduationCap,
        color: '#f97316',
        gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
        glow: 'rgba(249,115,22,0.5)',
        placeholder: 'student@campus.edu',
        namePlaceholder: 'Arjun Kumar',
    },
};

export default function AuthPage() {
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const roleParam = params.get('role') || 'student';
    const config = roleConfig[roleParam] || roleConfig.student;

    const [mode, setMode] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (mode === 'signup' && !name.trim()) { setError('Please enter your full name.'); return; }
        if (!email.trim()) { setError('Please enter your email.'); return; }
        if (password.length < 4) { setError('Password must be at least 4 characters.'); return; }

        setLoading(true);
        await new Promise(r => setTimeout(r, 600));
        const displayName = mode === 'signup' ? name.trim() : config.label;
        login({ role: roleParam, name: displayName });
        navigate(roleParam === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse at top left, rgba(124,58,237,0.2) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(249,115,22,0.15) 0%, transparent 50%), linear-gradient(160deg, #07051a 0%, #110a2e 40%, #0d0820 100%)',
            }}>

            {/* Floating orbs */}
            <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 right-1/4 w-56 h-56 rounded-full blur-3xl opacity-15"
                style={{ background: `radial-gradient(circle, ${config.color}, transparent)` }} />
            <motion.div animate={{ y: [20, -20, 20] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-10"
                style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />

            {/* Left Panel – branding */}
            <div className="hidden lg:flex lg:w-[45%] flex-col items-center justify-center p-12 relative">
                {/* Decorative background lines */}
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }} />

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center"
                >
                    {/* Brand logo */}
                    <motion.div
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                        style={{ background: config.gradient, boxShadow: `0 20px 60px ${config.glow}` }}
                    >
                        <Brain size={40} className="text-white" />
                    </motion.div>

                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                        Campus<span style={{
                            background: 'linear-gradient(135deg, #a78bfa, #fb923c)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>AI</span> Hub
                    </h1>
                    <p className="text-gray-400 mb-10 text-sm">AI-Powered Campus Management</p>

                    {/* Role pill */}
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10 text-white text-sm font-semibold"
                        style={{ background: config.gradient, boxShadow: `0 8px 30px ${config.glow}` }}>
                        <config.Icon size={16} />
                        {config.label} Portal
                    </div>

                    {/* Feature bullets */}
                    <div className="space-y-3 text-left max-w-xs mx-auto">
                        {(roleParam === 'admin'
                            ? ['Full institutional dashboard', 'Student & faculty management', 'Attendance & fee analytics', 'Reports & resource management']
                            : ['Personal academic overview', 'Course & attendance tracking', 'Fee payment status', 'Lab & library resources']
                        ).map((f, i) => (
                            <motion.div key={f}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-center gap-3 text-sm text-gray-300"
                            >
                                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                    style={{ background: config.gradient }}>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                {f}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px self-stretch my-12"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)' }} />

            {/* Right Panel – Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full max-w-md"
                >
                    {/* Back to role select */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mb-6">
                        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Choose different role
                        </Link>
                    </motion.div>

                    {/* Mode tabs */}
                    <div className="flex rounded-2xl overflow-hidden p-1 mb-8"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        {['login', 'signup'].map(m => (
                            <button key={m} onClick={() => { setMode(m); setError(''); }}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250"
                                style={mode === m
                                    ? { background: config.gradient, color: '#fff', boxShadow: `0 4px 15px ${config.glow}` }
                                    : { color: 'rgba(255,255,255,0.4)' }}>
                                {m === 'login' ? 'Sign In' : 'Sign Up'}
                            </button>
                        ))}
                    </div>

                    {/* Role badge (mobile only) */}
                    <div className="lg:hidden flex items-center gap-2 mb-6 px-3 py-2 rounded-xl w-fit"
                        style={{ background: `${config.color}20`, border: `1px solid ${config.color}40` }}>
                        <config.Icon size={15} style={{ color: config.color }} />
                        <span className="text-sm font-semibold" style={{ color: config.color }}>{config.label} Portal</span>
                    </div>

                    {/* Heading */}
                    <AnimatePresence mode="wait">
                        <motion.div key={mode}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="mb-7"
                        >
                            <h2 className="text-2xl font-bold text-white">
                                {mode === 'login' ? 'Welcome back 👋' : 'Create account'}
                            </h2>
                            <p className="text-sm text-gray-400 mt-1">
                                {mode === 'login'
                                    ? `Sign in to your ${config.label.toLowerCase()} account`
                                    : `Register as a ${config.label.toLowerCase()}`}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <AnimatePresence>
                            {mode === 'signup' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <label className="block text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Full Name</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                                        placeholder={config.namePlaceholder}
                                        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                                        style={{
                                            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                                            caretColor: config.color,
                                        }}
                                        onFocus={e => { e.target.style.border = `1px solid ${config.color}60`; e.target.style.boxShadow = `0 0 0 3px ${config.color}15`; }}
                                        onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email */}
                        <div>
                            <label className="block text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                placeholder={config.placeholder}
                                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                                style={{
                                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                                    caretColor: config.color,
                                }}
                                onFocus={e => { e.target.style.border = `1px solid ${config.color}60`; e.target.style.boxShadow = `0 0 0 3px ${config.color}15`; }}
                                onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-white outline-none transition-all duration-200"
                                    style={{
                                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                                        caretColor: config.color,
                                    }}
                                    onFocus={e => { e.target.style.border = `1px solid ${config.color}60`; e.target.style.boxShadow = `0 0 0 3px ${config.color}15`; }}
                                    onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                                />
                                <button type="button" onClick={() => setShowPass(s => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5"
                                >
                                    ⚠ {error}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Submit */}
                        <motion.button
                            type="submit" disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.97 }}
                            className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 mt-2 transition-all"
                            style={{
                                background: loading ? `${config.color}60` : config.gradient,
                                boxShadow: loading ? 'none' : `0 8px 30px ${config.glow}`,
                            }}
                        >
                            {loading ? (
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            ) : (
                                <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={17} /></>
                            )}
                        </motion.button>
                    </form>

                    {/* Switch mode */}
                    <p className="text-center text-xs text-gray-500 mt-5">
                        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
                            className="font-semibold transition-colors hover:opacity-80"
                            style={{ color: config.color }}>
                            {mode === 'login' ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>

                    {/* Demo hint */}
                    <div className="mt-6 p-3 rounded-xl text-center"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="text-[11px] text-gray-500">
                            💡 Enter any email & password (4+ chars) to demo
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
