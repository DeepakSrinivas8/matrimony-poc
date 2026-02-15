import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        profileFor: 'Self',
        email: '',
        password: '',
        fullName: '',
        gender: '',
        dob: '',
        denomination: '',
        subSect: '',
        phone: ''
    });

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleRegister = async () => {
        setLoading(true);
        setError('');
        try {
            // 1. Create User in Auth
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // 2. Create Profile in Firestore
            await setDoc(doc(db, 'profiles', user.uid), {
                userId: user.uid,
                email: formData.email,
                profileFor: formData.profileFor,
                fullName: formData.fullName,
                gender: formData.gender,
                dob: formData.dob,
                denomination: formData.denomination,
                subSect: formData.subSect,
                phone: formData.phone,
                isVerified: false,
                createdAt: new Date().toISOString(),
                // Add default fields for search
                age: new Date().getFullYear() - new Date(formData.dob).getFullYear(),
                photoUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop" // Default placeholder
            });

            console.log("User registered successfully");
            navigate('/search'); // Redirect to search page

        } catch (err) {
            console.error("Registration error:", err);
            setError(err.message || "Failed to register. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-blue-900 border-b pb-2 mb-4">Step 1: Account Setup</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile For</label>
                <div className="flex gap-4">
                    {['Self', 'Son', 'Daughter', 'Sibling', 'Friend'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="profileFor"
                                value={opt}
                                checked={formData.profileFor === opt}
                                onChange={(e) => setFormData({ ...formData, profileFor: e.target.value })}
                                className="text-gold-500 focus:ring-gold-500"
                            />
                            <span className="text-sm text-gray-700">{opt}</span>
                        </label>
                    ))}
                </div>
            </div>
            <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
                label="Password"
                type="password"
                placeholder="Min 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-blue-900 border-b pb-2 mb-4">Step 2: Personal Details</h3>
            <Input
                label="Full Name"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="flex gap-4">
                    {['Male', 'Female'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value={opt}
                                checked={formData.gender === opt}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="text-gold-500 focus:ring-gold-500"
                            />
                            <span className="text-sm text-gray-700">{opt}</span>
                        </label>
                    ))}
                </div>
            </div>
            <Input
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-blue-900 border-b pb-2 mb-4">Step 3: Religious Background</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Denomination</label>
                <select
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.denomination}
                    onChange={(e) => setFormData({ ...formData, denomination: e.target.value })}
                >
                    <option value="">Select Denomination</option>
                    {['Catholic', 'Pentecostal', 'Protestant', 'Orthodox', 'Baptist', 'CSI', 'Syrian Catholic'].map(d => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </div>
            <Input
                label="Sub Sect (Optional)"
                placeholder="e.g. Latin Catholic, Mar Thoma"
                value={formData.subSect}
                onChange={(e) => setFormData({ ...formData, subSect: e.target.value })}
            />
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6 text-center">
            <h3 className="text-lg font-medium text-blue-900 border-b pb-2 mb-4">Step 4: Contact Details</h3>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800 mb-4">Please provide your mobile number so matches can contact you.</p>
                <Input
                    label="Mobile Number"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="text-center text-lg tracking-wider"
                />
            </div>
        </div>
    );

    return (
        <MainLayout>
            <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-display text-blue-900">
                            Create Your Profile
                        </CardTitle>
                        <div className="mt-4 flex justify-between items-center">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`flex items-center ${i < 4 ? 'flex-1' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 
                    ${step >= i ? 'bg-gold-500 border-gold-500 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                                        {i}
                                    </div>
                                    {i < 4 && (
                                        <div className={`h-1 flex-1 mx-2 ${step > i ? 'bg-gold-500' : 'bg-gray-200'}`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardHeader>

                    <CardContent>
                        {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm text-center">{error}</div>}
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        {step === 4 && renderStep4()}
                    </CardContent>

                    <CardFooter className="justify-between">
                        {step > 1 ? (
                            <Button variant="outline" onClick={handleBack} disabled={loading}>Back</Button>
                        ) : (
                            <div className="text-sm">Already a member? <Link to="/login" className="text-blue-700 font-semibold hover:underline">Log In</Link></div>
                        )}

                        {step < 4 ? (
                            <Button className="bg-gold-500 hover:bg-gold-600 text-white" onClick={handleNext}>Next</Button>
                        ) : (
                            <Button
                                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                                onClick={handleRegister}
                                disabled={loading}
                            >
                                {loading ? 'Creating Profile...' : 'Complete Registration'}
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </MainLayout>
    );
};

export default Register;
