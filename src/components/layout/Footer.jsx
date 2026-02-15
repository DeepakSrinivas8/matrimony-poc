import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-blue-950 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-display text-xl font-bold text-gold-500 mb-4 flex items-center gap-2">
                            <span>Covenant Hearts</span>
                        </h3>
                        <p className="text-blue-200 text-sm leading-relaxed">
                            Where faith meets forever. Join the most trusted community for Christian singles seeking God-ordained marriage.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-gold-100">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-blue-200">
                            <li><Link to="/search" className="hover:text-white">Search Profiles</Link></li>
                            <li><Link to="/success-stories" className="hover:text-white">Success Stories</Link></li>
                            <li><Link to="/plans" className="hover:text-white">Membership Plans</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-gold-100">Legal</h4>
                        <ul className="space-y-2 text-sm text-blue-200">
                            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-white">Terms of Use</Link></li>
                            <li><Link to="/trust" className="hover:text-white">Trust & Safety</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-gold-100">Connect</h4>
                        <div className="text-sm text-blue-200">
                            <p>support@christianmatrimony.poc</p>
                            <p className="mt-2">+1 (800) 123-4567</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-blue-900 text-center text-xs text-blue-400">
                    <p>&copy; {new Date().getFullYear()} Christian Matrimony POC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
