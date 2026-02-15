import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import MainLayout from '../components/layout/MainLayout';
import FeaturedProfiles from '../components/features/FeaturedProfiles';
import { motion } from 'framer-motion';
import { Heart, Search, Shield, UserPlus, Users, MessageCircle } from 'lucide-react';
import { seedDatabase } from '../utils/seedData';

const LandingPage = () => {
    const navigate = useNavigate();
    const [seeding, setSeeding] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/search');
    };

    const handleSeed = async () => {
        setSeeding(true);
        try {
            const result = await seedDatabase();
            if (result.credentials) {
                const creds = result.credentials.map(c => `${c.email} / ${c.password}`).join('\n');
                alert(`Seeding Success!\n\nCreated Users:\n${creds}\n\nPage will reload.`);
            } else {
                alert(result.message);
            }
            window.location.reload();
        } catch (error) {
            console.error("Seeding failed:", error);
            alert("Seeding failed. See console.");
        } finally {
            setSeeding(false);
        }
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <MainLayout>
            <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-100"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial="initial"
                                animate="animate"
                                variants={fadeIn}
                                className="space-y-8"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-800/50 border border-blue-700 backdrop-blur-sm">
                                    <Heart className="w-4 h-4 text-gold-500 fill-gold-500 animate-pulse" />
                                    <span className="text-sm font-medium text-blue-100">#1 Christian Matrimony Platform</span>
                                </div>

                                <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight">
                                    Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">God-Ordained</span> Partner
                                </h1>

                                <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                                    Join diverse denominations in a community built on shared faith and values. Your journey to a blessed union starts here.
                                </p>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <Button onClick={() => navigate('/register')} variant="primary" size="lg" className="bg-gold-500 hover:bg-gold-600 text-blue-900 font-bold border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all rounded-full px-8 py-4">
                                        Begin Your Journey
                                    </Button>
                                    <Button variant="outline" size="lg" className="border-2 border-white/20 text-white hover:bg-white/10 rounded-full px-8">
                                        Learn More
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative"
                            >
                                {/* Quick Search Widget */}
                                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative z-20">
                                    <div className="flex items-center gap-3 mb-6 border-l-4 border-gold-500 pl-4">
                                        <h3 className="font-display text-2xl font-bold text-blue-900">Quick Match</h3>
                                    </div>
                                    <form className="space-y-6" onSubmit={handleSearch}>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Looking for</label>
                                                <select className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 py-3 transition-shadow hover:shadow-sm">
                                                    <option>Bride</option>
                                                    <option>Groom</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Denomination</label>
                                                <select className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 py-3 transition-shadow hover:shadow-sm">
                                                    <option>All</option>
                                                    <option>Catholic</option>
                                                    <option>Pentecostal</option>
                                                    <option>Orthodox</option>
                                                    <option>CSI</option>
                                                    <option>Marthoma</option>
                                                    <option>Jacobite</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Age From</label>
                                                <input type="number" className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 py-3" placeholder="22" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Age To</label>
                                                <input type="number" className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 py-3" placeholder="28" />
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full py-4 text-lg font-bold bg-blue-900 hover:bg-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                                            <Search className="w-5 h-5" /> Search Profiles
                                        </Button>
                                    </form>
                                </div>

                                {/* Decorative elements behind card */}
                                <div className="absolute -top-4 -right-4 w-full h-full bg-gold-400/20 rounded-3xl -z-10 blur-xl"></div>
                                <div className="absolute -bottom-4 -left-4 w-full h-full bg-blue-500/20 rounded-3xl -z-10 blur-xl"></div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-gold-600 font-semibold tracking-wider uppercase text-sm">Simple Steps</span>
                            <h2 className="mt-3 text-4xl font-display font-bold text-blue-900">How It Works</h2>
                            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Finding your soulmate shouldn't be complicated. We've simplified the journey into three easy steps.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10"></div>

                            {[
                                { icon: UserPlus, title: "Create Profile", desc: "Register for free and set up your profile with your details and partner preferences." },
                                { icon: Search, title: "Connect", desc: "Search through thousands of verified profiles filtered by your specific criteria." },
                                { icon: MessageCircle, title: "Interact", desc: "Start a conversation with matches that catch your interest and move forward." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="relative bg-white p-8 rounded-2xl text-center group hover:-translate-y-2 transition-transform duration-300"
                                >
                                    <div className="w-24 h-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors shadow-lg shadow-blue-900/5">
                                        <item.icon className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Profiles Section */}
                <FeaturedProfiles />

                {/* Feature Highlights */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-gold-600 font-semibold tracking-wider uppercase text-sm">Why Choose Us</span>
                            <h2 className="mt-3 text-4xl font-display font-bold text-blue-900">Faith-Centered Features</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Denomination Specific", desc: "Filters for Catholic, Pentecostal, Orthodox, CSI, and more." },
                                { title: "Verified Profiles", desc: "100% human verified profiles for a safe and trusted experience." },
                                { title: "Privacy Control", desc: "Complete control over who sees your photos and contact information." }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white p-10 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100"
                                >
                                    <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-6">
                                        <Shield className="w-6 h-6 text-gold-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-500">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Temporary Seeding Button (Visible for Production Testing) */}
                <div className="fixed bottom-4 right-4 z-50">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleSeed}
                        disabled={seeding}
                        className="text-xs bg-gray-800 text-white"
                    >
                        {seeding ? 'Seeding...' : 'Seed Data'}
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
};

export default LandingPage;
