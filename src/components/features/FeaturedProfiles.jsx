import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import Card, { CardContent } from '../ui/Card';
import Button from '../ui/Button';

const FeaturedProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const q = query(collection(db, "profiles"), limit(3));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProfiles(data);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    if (loading) {
        return <div className="text-center py-12 text-gray-500">Loading verified profiles...</div>;
    }

    if (profiles.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Featured Matches</h2>
                    <div className="w-20 h-1 bg-gold-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600">Discover recent profiles from our premium members.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {profiles.map((profile) => (
                        <Card key={profile.id} className="border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                            <div className="relative h-64 overflow-hidden bg-gray-200">
                                <img
                                    src={profile.image}
                                    alt={profile.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-900 shadow-sm flex items-center gap-1">
                                    {profile.verified && <span>✅ Verified</span>}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                                    <h3 className="text-xl font-bold">{profile.name}, {profile.age}</h3>
                                    <p className="text-sm opacity-90">{profile.denomination}</p>
                                </div>
                            </div>
                            <CardContent className="pt-6">
                                <div className="bg-blue-50/50 p-3 rounded-lg mb-4 text-sm text-gray-700 space-y-1">
                                    <div className="flex justify-between">
                                        <span>📍 Location:</span>
                                        <span className="font-medium text-blue-900">{profile.location}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>🎓 Education:</span>
                                        <span className="font-medium text-blue-900">{profile.education}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>💼 Job:</span>
                                        <span className="font-medium text-blue-900">{profile.occupation}</span>
                                    </div>
                                </div>
                                <Button className="w-full bg-blue-800 hover:bg-blue-900 text-white" variant="primary">
                                    View Full Profile
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProfiles;
