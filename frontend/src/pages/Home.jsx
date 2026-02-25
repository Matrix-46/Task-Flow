import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Shield, ArrowRight } from 'lucide-react';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="landing">
            <Navbar />

            <main className="landing-main">
                <section className="landing-hero" aria-label="Hero">
                    <div className="container">
                        <div className="hero-grid">
                            <motion.div
                                className="hero-copy"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
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
                                            <ArrowRight size={18} />
                                        </Link>
                                        <Link to="/login" className="btn-secondary">
                                            Sign in
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="landing-actions">
                                        <Link to="/dashboard" className="btn-primary">
                                            Go to dashboard
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                )}


                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="landing-section" id="features">
                    <div className="container">
                        <div className="section-head">
                            <p className="section-kicker">Features</p>
                            <h2 className="section-title">Everything you need to ship.</h2>
                        </div>
                        <div className="cards-3">
                            <motion.div
                                className="feature-card glass-panel"
                                whileHover={{ y: -5 }}
                            >
                                <Zap className="nav-brand-accent" style={{ marginBottom: '1rem' }} />
                                <p className="feature-kicker">Speed</p>
                                <h3 className="feature-title">Lightning Fast</h3>
                                <p className="feature-desc">Experience a zero-lag interface built with modern performance in mind.</p>
                            </motion.div>
                            <motion.div
                                className="feature-card glass-panel"
                                whileHover={{ y: -5 }}
                            >
                                <Shield className="nav-brand-accent" style={{ marginBottom: '1rem' }} />
                                <p className="feature-kicker">Security</p>
                                <h3 className="feature-title">Bank-grade Safety</h3>
                                <p className="feature-desc">Your data is encrypted and protected with industry-standard protocols.</p>
                            </motion.div>
                            <motion.div
                                className="feature-card glass-panel"
                                whileHover={{ y: -5 }}
                            >
                                <CheckCircle className="nav-brand-accent" style={{ marginBottom: '1rem' }} />
                                <p className="feature-kicker">Flow</p>
                                <h3 className="feature-title">Seamless Workflow</h3>
                                <p className="feature-desc">Move from 'To Do' to 'Done' with intuitive, distraction-free tools.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="landing-section" id="process">
                    <div className="container">
                        <div className="section-head">
                            <p className="section-kicker">Process</p>
                            <h2 className="section-title">How we help you win.</h2>
                        </div>
                        <ul className="process-list glass-panel">
                            <li className="process-item">
                                <span className="hero-visual-pill">Step 01</span>
                                <div>
                                    <h4 className="process-title">Capture Everything</h4>
                                    <p className="process-desc">Quickly add tasks and ideas before they slip away from your focus.</p>
                                </div>
                            </li>
                            <li className="process-item">
                                <span className="hero-visual-pill">Step 02</span>
                                <div>
                                    <h4 className="process-title">Prioritize & Track</h4>
                                    <p className="process-desc">Categorize tasks by status and track progress in real-time.</p>
                                </div>
                            </li>
                            <li className="process-item">
                                <span className="hero-visual-pill">Step 03</span>
                                <div>
                                    <h4 className="process-title">Celebrate Success</h4>
                                    <p className="process-desc">Mark tasks as complete and keep your momentum building daily.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="landing-section" id="about">
                    <div className="container">
                        <div className="about-grid glass-panel">
                            <div className="about-copy">
                                <p className="section-kicker">About Us</p>
                                <h2 className="section-title">Built for the modern builder.</h2>
                                <p className="landing-subtitle" style={{ marginLeft: 0, textAlign: 'left' }}>
                                    We believe productivity shouldn't be complicated. TaskFlow was born out of the need for a simple, yet high-performance tool that respects your focus and time.
                                </p>
                            </div>
                            <div className="about-points">
                                <div className="about-point">
                                    <p className="about-point-title">Minimalist Philosophy</p>
                                    <p className="about-point-desc">Only the tools you need, none of the noise you don't.</p>
                                </div>
                                <div className="about-point">
                                    <p className="about-point-title">Performance First</p>
                                    <p className="about-point-desc">Optimized for speed so your tools never slow you down.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="landing-footer">
                    <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="footer-left">© {new Date().getFullYear()} TaskFlow</div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Home;

