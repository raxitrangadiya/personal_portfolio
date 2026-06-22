import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [requireOTP, setRequireOTP] = useState(false);
    const [otp, setOtp] = useState('');
    const [tempId, setTempId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if already logged in
        if (localStorage.getItem('adminToken')) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            if (data.requireOTP) {
                setRequireOTP(true);
                setTempId(data.tempId);
                return;
            }

            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUser', data.username);
            navigate('/admin');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/admin/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tempId, otp })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'OTP verification failed');
            }

            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUser', data.username);
            navigate('/admin');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative z-10">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[#02020a]/80 -z-10 backdrop-blur-md"></div>
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md p-8 rounded-2xl glass-panel relative shadow-glass"
            >
                {/* Back button */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-6 left-6 flex items-center gap-1 text-sm text-textDark hover:text-cosmic-cyan transition-colors font-mono"
                >
                    <ArrowLeft className="w-4 h-4" /> Home
                </button>

                {!requireOTP ? (
                    <>
                        <div className="text-center mt-6 mb-8">
                            <h2 className="text-3xl font-extrabold text-textLight">
                                Admin <span className="text-gradient-cosmic">Portal</span>
                            </h2>
                            <p className="text-textDark mt-2 font-mono text-sm">Enter your credentials to continue</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-red-950/40 border border-red-500/30 text-red-200 text-sm"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-textLight text-sm mb-2 font-mono" htmlFor="username">
                                    Username
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textDark">
                                        <User className="w-5 h-5" />
                                    </span>
                                    <input
                                        id="username"
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-[#0a0f1d]/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all font-mono"
                                        placeholder="Admin Username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-textLight text-sm mb-2 font-mono" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textDark">
                                        <Lock className="w-5 h-5" />
                                    </span>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#0a0f1d]/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all font-mono"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-transparent border border-cosmic-cyan text-cosmic-cyan hover:text-white hover:bg-gradient-to-r hover:from-cosmic-cyan hover:to-cosmic-purple hover:border-transparent rounded-xl font-mono transition-all text-sm font-bold mt-8 shadow-glow-cyan flex justify-center items-center hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                            >
                                {loading ? 'Authenticating...' : 'Sign In'}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="text-center mt-6 mb-8">
                            <h2 className="text-3xl font-extrabold text-textLight">
                                Security <span className="text-gradient-cosmic">Verification</span>
                            </h2>
                            <p className="text-textDark mt-2 font-mono text-sm">Enter the 6-digit OTP code sent to your email</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-red-950/40 border border-red-500/30 text-red-200 text-sm"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleVerifyOTP} className="space-y-6">
                            <div>
                                <label className="block text-textLight text-sm mb-2 font-mono" htmlFor="otp">
                                    OTP Code
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textDark">
                                        <Lock className="w-5 h-5" />
                                    </span>
                                    <input
                                        id="otp"
                                        type="text"
                                        required
                                        maxLength={6}
                                        pattern="\d{6}"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full bg-[#0a0f1d]/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all font-mono text-center tracking-[0.3em] text-lg"
                                        placeholder="000000"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-transparent border border-cosmic-cyan text-cosmic-cyan hover:text-white hover:bg-gradient-to-r hover:from-cosmic-cyan hover:to-cosmic-purple hover:border-transparent rounded-xl font-mono transition-all text-sm font-bold mt-8 shadow-glow-cyan flex justify-center items-center hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                            >
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setRequireOTP(false);
                                    setOtp('');
                                    setError('');
                                }}
                                className="w-full py-2 text-textDark hover:text-textLight font-mono transition-all text-xs text-center"
                            >
                                Back to login
                            </button>
                        </form>
                    </>
                )}
            </motion.div>
        </div>
    );
}
