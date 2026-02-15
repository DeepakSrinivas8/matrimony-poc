import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Search, Filter, MapPin, Heart } from 'lucide-react';

const SearchPage = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                // Determine if we are on the search page, we might want to show all profiles initially
                // For a real app, you'd probably paginate or limit this
                const q = collection(db, 'profiles');
                const querySnapshot = await getDocs(q);

                const profilesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setProfiles(profilesData);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    const filteredProfiles = profiles.filter(profile => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            profile.fullName?.toLowerCase().includes(searchLower) ||
            profile.denomination?.toLowerCase().includes(searchLower)
        );
    });

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search Header */}
                    <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h1 className="text-3xl font-display font-bold text-blue-900 mb-6">Find Your Partner</h1>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name, denomination, or location..."
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6">
                                <Filter className="w-4 h-4" /> Filters
                            </Button>
                            <Button className="bg-gold-500 hover:bg-gold-600 text-white px-8 font-semibold">
                                Search
                            </Button>
                        </div>
                    </div>

                    {/* Results Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold-500 border-t-transparent"></div>
                        </div>
                    ) : filteredProfiles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProfiles.map((profile) => (
                                <Card key={profile.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                                    <div className="relative h-64 overflow-hidden bg-gray-200">
                                        <img
                                            src={profile.photoUrl || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop"}
                                            alt={profile.fullName}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-gray-500 hover:text-red-500 transition-colors">
                                                <Heart className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                                            <h3 className="text-xl font-bold truncate">{profile.fullName}</h3>
                                            <p className="text-white/90 text-sm">
                                                {profile.age} yrs • {profile.denomination}
                                            </p>
                                        </div>
                                    </div>
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex items-center text-gray-600 text-sm">
                                            <MapPin className="w-4 h-4 mr-2 text-gold-500" />
                                            {profile.location || "Location not specified"}
                                        </div>
                                        <div className="flex items-center text-gray-600 text-sm">
                                            <span className="w-4 h-4 mr-2 flex items-center justify-center font-bold text-gold-500 text-xs border border-gold-500 rounded-full">i</span>
                                            {profile.subSect || "Sub-sect not specified"}
                                        </div>

                                        <Button variant="outline" className="w-full mt-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                                            View Full Profile
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h3 className="text-xl font-medium text-gray-900">No profiles found</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default SearchPage;
