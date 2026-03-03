import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, User, CheckSquare, Menu, X, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    return (
        <motion.nav
            className={`navbar ${!user ? 'navbar--public' : ''}`}
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
                    {!user ? (
                        <>
                            <Link to="/#features" className="nav-item">Features</Link>
                            <Link to="/#process" className="nav-item">Process</Link>
                            <Link to="/#about" className="nav-item">About Us</Link>
                            <ThemeToggle />
                            <Link to="/login" className="nav-item nav-item--muted" style={{ marginLeft: '1rem' }}>Sign in</Link>
                        </>
                    ) : (
                        <>
                            <ThemeToggle />
                            <Link to="/dashboard" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>

                            <div className="nav-item nav-user-display" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8 }}>
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
            </div>
        </motion.nav>
    );
};

export default Navbar;
