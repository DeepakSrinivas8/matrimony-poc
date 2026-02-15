import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";

const MOCK_PROFILES = [
    // Grooms
    {
        name: "David Thomas",
        email: "david.thomas@example.com",
        age: 28,
        gender: "Male",
        denomination: "Syrian Catholic",
        location: "Kochi, Kerala",
        occupation: "Software Engineer",
        education: "B.Tech, Computer Science",
        height: "5'10\"",
        bio: "Believer, family-oriented, and ambitious. passionate about technology and music. Looking for a partner who shares similar values.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        verified: true
    },
    {
        name: "Joshua Philip",
        email: "joshua.philip@example.com",
        age: 30,
        gender: "Male",
        denomination: "Pentecostal",
        location: "Bangalore, Karnataka",
        occupation: "Doctor (MD)",
        education: "MBBS, MD",
        height: "5'11\"",
        bio: "Dedicated to serving God and people through medicine. Active in church youth ministry.",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        verified: true
    },
    {
        name: "Mathew George",
        email: "mathew.george@example.com",
        age: 29,
        gender: "Male",
        denomination: "Orthodox",
        location: "Dubai, UAE",
        occupation: "Civil Engineer",
        education: "M.Tech",
        height: "6'0\"",
        bio: "Hardworking and God-fearing. Enjoy traveling and spending time with family.",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        verified: false
    },
    {
        name: "Samuel John",
        email: "samuel.john@example.com",
        age: 31,
        gender: "Male",
        denomination: "CSI",
        location: "Chennai, Tamil Nadu",
        occupation: "Bank Manager",
        education: "MBA",
        height: "5'9\"",
        bio: "Financially stable and spiritually grounded. Looking for a simple, loving partner.",
        image: "https://randomuser.me/api/portraits/men/54.jpg",
        verified: true
    },

    // Brides
    {
        name: "Sarah Varghese",
        email: "sarah.varghese@example.com",
        age: 25,
        gender: "Female",
        denomination: "Syrian Catholic",
        location: "Kochi, Kerala",
        occupation: "Architect",
        education: "B.Arch",
        height: "5'5\"",
        bio: "Creative and compassionate. I value faith and family above all.",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        verified: true
    },
    {
        name: "Esther Mary",
        email: "esther.mary@example.com",
        age: 26,
        gender: "Female",
        denomination: "Pentecostal",
        location: "Mumbai, Maharashtra",
        occupation: "Teacher",
        education: "B.Ed, MA English",
        height: "5'3\"",
        bio: "Passionate about teaching and Sunday school ministry. Looking for a God-fearing partner.",
        image: "https://randomuser.me/api/portraits/women/63.jpg",
        verified: true
    },
    {
        name: "Rebecca Abraham",
        email: "rebecca.abraham@example.com",
        age: 24,
        gender: "Female",
        denomination: "Marthoma",
        location: "Trivandrum, Kerala",
        occupation: "Nurse",
        education: "B.Sc Nursing",
        height: "5'4\"",
        bio: "Caring and dedicated. I love serving others and am deeply rooted in my faith.",
        image: "https://randomuser.me/api/portraits/women/28.jpg",
        verified: false
    },
    {
        name: "Hannah Joseph",
        email: "hannah.joseph@example.com",
        age: 27,
        gender: "Female",
        denomination: "Catholic",
        location: "Bangalore, Karnataka",
        occupation: "Data Analyst",
        education: "M.Sc Statistics",
        height: "5'6\"",
        bio: "Analytical mind with a faithful heart. Enjoy reading and choir singing.",
        image: "https://randomuser.me/api/portraits/women/90.jpg",
        verified: true
    }
];

export const seedDatabase = async () => {
    const results = [];
    const password = "password123";

    try {
        console.log("Starting database seeding...");

        for (const profile of MOCK_PROFILES) {
            try {
                // 1. Create Auth User
                let user;
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, profile.email, password);
                    user = userCredential.user;
                    console.log(`Created auth user for ${profile.email}`);
                } catch (authError) {
                    if (authError.code === 'auth/email-already-in-use') {
                        console.log(`User ${profile.email} already exists in Auth. Logging in to update Firestore...`);
                        try {
                            const userCredential = await signInWithEmailAndPassword(auth, profile.email, password);
                            user = userCredential.user;
                        } catch (loginError) {
                            console.error(`Could not log in as existing user ${profile.email}:`, loginError);
                            continue;
                        }
                    } else {
                        throw authError;
                    }
                }

                if (!user) {
                    console.warn(`Could not verify Auth user for ${profile.email}. creating Firestore profile anyway with dummy ID.`);
                    // Fallback: Use email as ID if Auth fails, so they still show up in search
                    user = { uid: profile.email.replace(/[@.]/g, '_') };
                }

                // 2. Create Profile in Firestore (using real UID or fallback)
                await setDoc(doc(db, "profiles", user.uid), {
                    userId: user.uid,
                    fullName: profile.name,
                    email: profile.email,
                    ...profile,
                    createdAt: new Date().toISOString()
                });

                results.push({ email: profile.email, password, name: profile.name });

            } catch (innerError) {
                console.error(`Failed to process ${profile.name}:`, innerError);
            }
        }

        if (results.length === 0) {
            return {
                success: true,
                message: "No new users created (emails might already exist). Check Firebase Console to delete users if you want to re-seed."
            };
        }

        console.log("Database seeded successfully!");
        return {
            success: true,
            message: `Successfully created ${results.length} users!`,
            credentials: results
        };

    } catch (error) {
        console.error("Error seeding database:", error);
        return { success: false, message: error.message };
    }
};
