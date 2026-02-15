import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Link } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/search'); // Redirect to search page after login
        } catch (err) {
            console.error("Login failed", err);
            setError('Failed to log in. Please check your credentials.');
        }
    };

    return (
        <MainLayout>
            <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <div className="text-center mb-4">
                            <span className="text-2xl font-display font-bold text-blue-900">
                                Christian<span className="text-gold-600">Matrimony</span>
                            </span>
                        </div>
                        <CardTitle className="text-center text-xl text-gray-800">
                            Welcome Back
                        </CardTitle>
                        <p className="text-center text-sm text-gray-500 mt-2">
                            Sign in to manage your profile and find matches.
                        </p>
                    </CardHeader>

                    <CardContent>
                        {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm text-center">{error}</div>}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <Link to="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 mt-2">
                                Sign In
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="justify-center border-t border-gray-100 mt-4 pt-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account? <Link to="/register" className="text-gold-600 font-semibold hover:text-gold-700">Register Free</Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </MainLayout>
    );
};

export default Login;
