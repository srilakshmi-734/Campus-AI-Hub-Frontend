import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
    Menu, Sun, Moon, Globe, LogOut, Bell, ChevronDown, Brain,
    LayoutDashboard, Users, GraduationCap, BookOpen,
    CalendarCheck, CreditCard, BarChart3, Package, Settings,
} from 'lucide-react';

const adminNav = [
    { key: 'dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { key: 'students', icon: Users, path: '/admin/students' },
    { key: 'faculty', icon: GraduationCap, path: '/admin/faculty' },
    { key: 'courses', icon: BookOpen, path: '/admin/courses' },
    { key: 'attendance', icon: CalendarCheck, path: '/admin/attendance' },
    { key: 'fees', icon: CreditCard, path: '/admin/fees' },
    { key: 'reports', icon: BarChart3, path: '/admin/reports' },
    { key: 'resources', icon: Package, path: '/admin/resources' },
    { key: 'settings', icon: Settings, path: '/admin/settings' },
];

const studentNav = [
    { key: 'dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { key: 'courses', icon: BookOpen, path: '/student/courses' },
    { key: 'attendance', icon: CalendarCheck, path: '/student/attendance' },
    { key: 'fees', icon: CreditCard, path: '/student/fees' },
    { key: 'resources', icon: Package, path: '/student/resources' },
    { key: 'settings', icon: Settings, path: '/student/settings' },
];

function NavItem({ item, t }) {
    const location = useLocation();
    const isActive = location.pathname === item.path;
    return (
        <NavLink to={item.path}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive
                    ? 'text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/8'
                }`}
            style={isActive ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(249,115,22,0.2))', boxShadow: '0 0 12px rgba(124,58,237,0.3)' } : {}}
        >
            <item.icon size={14} className={isActive ? 'text-violet-300' : ''} />
            <span>{t(item.key)}</span>
        </NavLink>
    );
}

export default function Navbar({ onMenuToggle, sidebarCollapsed, onSidebarToggle }) {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { role, userName, logout } = useAuth();
    const navigate = useNavigate();

    const [langOpen, setLangOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const navItems = role === 'admin' ? adminNav : studentNav;

    const switchLang = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('campusai_lang', lng);
        setLangOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const notifications = [
        { id: 1, text: '3 students below 75% attendance', type: 'warn', time: '2m ago' },
        { id: 2, text: 'Fee collection deadline tomorrow', type: 'danger', time: '1h ago' },
        { id: 3, text: 'Lab booking approved', type: 'success', time: '3h ago' },
    ];

    return (
        <motion.header
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="glass-nav fixed top-0 right-0 left-0 z-30 flex items-center justify-between px-4 gap-3"
            style={{ height: 64 }}
        >
            {/* Left: hamburger (mobile) + sidebar toggle + inline nav (when collapsed) */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Mobile hamburger */}
                <button onClick={onMenuToggle}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-[var(--text-muted)] md:hidden shrink-0">
                    <Menu size={20} />
                </button>

                {/* Desktop collapse toggle */}
                <button onClick={onSidebarToggle}
                    className="hidden md:flex p-2 rounded-lg hover:bg-white/10 transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)] shrink-0">
                    <Menu size={18} />
                </button>

                {/* Logo (mobile only) */}
                <div className="flex items-center gap-2 md:hidden">
                    <Brain size={17} className="text-violet-400" />
                    <span className="font-bold text-sm" style={{
                        background: 'linear-gradient(135deg, #a78bfa, #fb923c)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>CampusAI</span>
                </div>

                {/* Inline nav — shown ONLY on desktop when sidebar is collapsed */}
                <AnimatePresence>
                    {sidebarCollapsed && (
                        <motion.nav
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="hidden md:flex items-center gap-1 overflow-x-auto"
                        >
                            <div className="w-px h-5 bg-white/10 mx-1 shrink-0" />
                            {navItems.map(item => (
                                <NavItem key={item.key} item={item} t={t} />
                            ))}
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>

            {/* Right: controls */}
            <div className="flex items-center gap-1 shrink-0">
                {/* Language */}
                <div className="relative">
                    <button onClick={() => { setLangOpen(o => !o); setNotifOpen(false); }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs hover:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">
                        <Globe size={15} />
                        <span className="hidden sm:block">{i18n.language === 'ta' ? 'தமிழ்' : 'EN'}</span>
                        <ChevronDown size={11} />
                    </button>
                    <AnimatePresence>
                        {langOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-10 glass-card w-32 overflow-hidden z-50 shadow-xl py-1"
                            >
                                {[{ lng: 'en', label: '🇬🇧 English' }, { lng: 'ta', label: '🇮🇳 தமிழ்' }].map(({ lng, label }) => (
                                    <button key={lng} onClick={() => switchLang(lng)}
                                        className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-violet-500/10 ${i18n.language === lng ? 'text-violet-400 font-semibold' : 'text-[var(--text-primary)]'}`}>
                                        {label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Theme */}
                <motion.button whileTap={{ scale: 0.85, rotate: 180 }} onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-[var(--text-muted)] hover:text-amber-400">
                    {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                </motion.button>

                {/* Notifications (admin) */}
                {role === 'admin' && (
                    <div className="relative">
                        <button onClick={() => { setNotifOpen(o => !o); setLangOpen(false); }}
                            className="relative p-2 rounded-lg hover:bg-white/10 transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                            <Bell size={17} />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                        </button>
                        <AnimatePresence>
                            {notifOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-12 glass-card w-72 overflow-hidden z-50 shadow-xl"
                                >
                                    <div className="px-4 py-3 border-b border-white/10">
                                        <p className="font-semibold text-sm">Notifications</p>
                                    </div>
                                    {notifications.map(n => (
                                        <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer">
                                            <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${n.type === 'warn' ? 'bg-yellow-400' : n.type === 'danger' ? 'bg-red-500' : 'bg-green-500'}`} />
                                            <div>
                                                <p className="text-xs text-[var(--text-primary)]">{n.text}</p>
                                                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{n.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Divider */}
                <div className="w-px h-6 bg-white/10 mx-1" />

                {/* Avatar + logout */}
                <div className="flex items-center gap-2">
                    <div className="hidden sm:block text-right">
                        <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight">{userName}</p>
                        <p className="text-[10px] text-[var(--text-muted)] capitalize leading-tight">{role}</p>
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #f97316)' }}>
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <motion.button whileTap={{ scale: 0.88 }} onClick={handleLogout} title="Logout"
                        className="p-1.5 rounded-lg hover:bg-red-500/15 text-[var(--text-muted)] hover:text-red-400 transition-colors">
                        <LogOut size={15} />
                    </motion.button>
                </div>
            </div>
        </motion.header>
    );
}
