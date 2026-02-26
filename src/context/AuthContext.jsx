import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

function readStorage() {
    try {
        return {
            isLoggedIn: localStorage.getItem('campusai_loggedIn') === 'true',
            role: localStorage.getItem('campusai_role') || null,
            userName: localStorage.getItem('campusai_name') || '',
        };
    } catch {
        return { isLoggedIn: false, role: null, userName: '' };
    }
}

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(readStorage);

    const login = useCallback(({ role, name }) => {
        localStorage.setItem('campusai_loggedIn', 'true');
        localStorage.setItem('campusai_role', role);
        localStorage.setItem('campusai_name', name || (role === 'admin' ? 'Admin User' : 'Student User'));
        setAuth({
            isLoggedIn: true,
            role,
            userName: name || (role === 'admin' ? 'Admin User' : 'Student User'),
        });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('campusai_loggedIn');
        localStorage.removeItem('campusai_role');
        localStorage.removeItem('campusai_name');
        setAuth({ isLoggedIn: false, role: null, userName: '' });
    }, []);

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
