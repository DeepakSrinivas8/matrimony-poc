import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-blue-50 p-2 rounded-full group-hover:bg-blue-100 transition-colors">
                                <Heart className="w-6 h-6 text-gold-500 fill-gold-500" />
                            </div>
                            <span className="text-2xl font-display font-bold text-blue-900 tracking-tight">
                                Covenant<span className="text-gold-600">Hearts</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/search" className="text-gray-600 hover:text-blue-900 font-medium transition-colors">Find Matches</Link>
                        <Link to="/success-stories" className="text-gray-600 hover:text-blue-900 font-medium transition-colors">Success Stories</Link>
                        <Link to="/plans" className="text-gray-600 hover:text-blue-900 font-medium transition-colors">Plans</Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login">
                            <Button variant="ghost" size="sm" className="font-semibold text-blue-900 hover:text-gold-600 hover:bg-blue-50 transition-all duration-300">Log In</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="primary" size="sm" className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-blue-900 font-bold border-none shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-full px-6">
                                Join Free
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-blue-900 p-2">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-20 shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link
                            to="/search"
                            className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Find Matches
                        </Link>
                        <Link
                            to="/success-stories"
                            className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Success Stories
                        </Link>
                        <Link
                            to="/plans"
                            className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Plans
                        </Link>
                        <div className="pt-4 space-y-3">
                            <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full">
                                <Button variant="outline" className="w-full justify-center text-blue-900 border-blue-200 hover:bg-blue-50 hover:text-gold-600 transition-colors">Log In</Button>
                            </Link>
                            <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full">
                                <Button variant="primary" className="w-full justify-center bg-gradient-to-r from-gold-400 to-gold-600 text-blue-900 font-bold border-none shadow-md">
                                    Join Free
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
