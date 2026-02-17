import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, User, CheckSquare, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname, location.hash]);

    // If not logged in, show simple public navbar
    if (!user) {
        return (
            <nav className="navbar navbar--public">
                <div className="nav-inner">
                    <div className="nav-brand">
                        <Link to="/" className="nav-brand-link">
                            <CheckSquare size={22} color="var(--primary-glow)" />
                            <span className="nav-brand-text">Task<span className="nav-brand-accent">Flow</span></span>
                        </Link>
                    </div>

                    <div className="nav-links nav-links--public">
                        <Link to="/login" className="nav-item nav-item--muted">Sign in</Link>
                    </div>

                    <button
                        className="nav-burger"
                        type="button"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {mobileOpen && (
                    <div className="nav-drawer-overlay" role="dialog" aria-modal="true">
                        <div className="nav-drawer glass-panel">
                            <div className="nav-drawer-head">
                                <div className="nav-drawer-title">Menu</div>
                                <button className="nav-drawer-close" type="button" onClick={() => setMobileOpen(false)} aria-label="Close">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="nav-drawer-links">
                                <Link to="/login" className="btn-secondary" onClick={() => setMobileOpen(false)}>Sign in</Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        );
    }

    // Logged in navbar
    return (
        <motion.nav
            className="navbar"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="nav-inner">
                <div className="nav-brand">
                    <Link to="/" className="nav-brand-link">
                        <CheckSquare size={22} color="var(--primary-glow)" />
                        <span className="nav-brand-text">Task<span className="nav-brand-accent">Flow</span></span>
                    </Link>
                </div>

                <div className="nav-links">
                    <Link to="/dashboard" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>

                    <div className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8 }}>
                        <User size={18} />
                        <span style={{ fontSize: '0.9rem' }}>{user.email}</span>
                    </div>

                    <button
                        onClick={logout}
                        className="btn-danger"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
