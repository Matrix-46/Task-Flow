import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import '../App.css';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        const result = await register(formData.email, formData.password, formData.confirmPassword);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
            if (result.errors) {
                const errors = {};
                result.errors.forEach(err => {
                    errors[err.field || err.path] = err.message || err.msg;
                });
                setFieldErrors(errors);
            }
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <div className="auth-container">
                <motion.div
                    className="auth-card glass-panel"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join us to organize your tasks efficiently</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="name@company.com"
                                className={fieldErrors.email ? 'input-error' : ''}
                            />
                            {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Minimum 6 characters"
                                className={fieldErrors.password ? 'input-error' : ''}
                            />
                            {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Re-enter password"
                            />
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="auth-link">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Register;
