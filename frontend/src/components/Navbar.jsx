import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, User, CheckSquare, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const ThemeToggle = ({ onClick }) => (
        <button
            onClick={() => { toggleTheme(); onClick?.(); }}
            className="btn-icon"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );

    return (
        <motion.nav
            className={`navbar ${!user ? 'navbar--public' : ''}`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="nav-inner">
                <div className="nav-brand">
                    <Link to="/" className="nav-brand-link" onClick={closeMenu}>
                        <CheckSquare size={22} color="var(--primary-glow)" />
                        <span className="nav-brand-text">Task<span className="nav-brand-accent">Flow</span></span>
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <div className="nav-links nav-links--desktop">
                    {!user ? (
                        <>
                            <Link to="/#features" className="nav-item">Features</Link>
                            <Link to="/#process" className="nav-item">Process</Link>
                            <Link to="/#about" className="nav-item">About Us</Link>
                            <ThemeToggle />
                            <Link to="/login" className="nav-item nav-item--muted" style={{ marginLeft: '0.5rem' }}>Sign in</Link>
                        </>
                    ) : (
                        <>
                            <ThemeToggle />
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
                        </>
                    )}
                </div>

                {/* Hamburger button - mobile only */}
                <div className="nav-hamburger">
                    <ThemeToggle />
                    <button
                        className="btn-icon hamburger-btn"
                        onClick={() => setMenuOpen(prev => !prev)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="nav-mobile-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {!user ? (
                            <>
                                <Link to="/#features" className="nav-mobile-item" onClick={closeMenu}>Features</Link>
                                <Link to="/#process" className="nav-mobile-item" onClick={closeMenu}>Process</Link>
                                <Link to="/#about" className="nav-mobile-item" onClick={closeMenu}>About Us</Link>
                                <div className="nav-mobile-divider" />
                                <Link to="/login" className="nav-mobile-item nav-mobile-accent" onClick={closeMenu}>Sign in</Link>
                                <Link to="/register" className="nav-mobile-item" onClick={closeMenu}>
                                    <span className="btn-primary" style={{ display: 'inline-block', textAlign: 'center', width: '100%' }}>Get Started</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="nav-mobile-item nav-mobile-user">
                                    <User size={16} />
                                    <span>{user.email}</span>
                                </div>
                                <div className="nav-mobile-divider" />
                                <Link to="/dashboard" className="nav-mobile-item" onClick={closeMenu}>
                                    <LayoutDashboard size={16} />
                                    Dashboard
                                </Link>
                                <div className="nav-mobile-divider" />
                                <button
                                    onClick={() => { logout(); closeMenu(); }}
                                    className="nav-mobile-item nav-mobile-logout"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
