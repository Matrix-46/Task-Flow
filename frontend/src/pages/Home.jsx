import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="landing">
            <Navbar />

            <main className="landing-main">
                <section className="landing-hero" aria-label="Hero">
                    <div className="container">
                        <div className="hero-grid">
                            <div className="hero-copy">
                                <p className="landing-eyebrow">Task Manager</p>
                                <h1 className="landing-title">
                                    Organize your work
                                    <br />
                                    stay productive.
                                </h1>
                                <p className="landing-subtitle">
                                    Premium task tracking, team visibility, and simple workflows to help you ship consistently.
                                </p>

                                {!isAuthenticated ? (
                                    <div className="landing-actions">
                                        <Link to="/register" className="btn-primary">
                                            Get started
                                        </Link>
                                        <Link to="/login" className="btn-secondary">
                                            Sign in
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="landing-actions">
                                        <Link to="/dashboard" className="btn-primary">
                                            Go to dashboard
                                        </Link>
                                    </div>
                                )}

                                <div className="landing-metrics" aria-label="Highlights">
                                    <div className="metric">
                                        <div className="metric-value">Fast</div>
                                        <div className="metric-label">Vite + React UI</div>
                                    </div>
                                    <div className="metric">
                                        <div className="metric-value">Secure</div>
                                        <div className="metric-label">Auth + protected routes</div>
                                    </div>
                                    <div className="metric">
                                        <div className="metric-value">Simple</div>
                                        <div className="metric-label">Create, track, complete</div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </section>

                <footer className="landing-footer">
                    <div className="footer-left">© {new Date().getFullYear()} TaskFlow</div>
                </footer>
            </main>
        </div>
    );
};

export default Home;
