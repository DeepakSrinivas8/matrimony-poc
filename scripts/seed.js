import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, writeBatch, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB_qXpvywPcOvuql-479RagopcEgYbs2dU",
    authDomain: "matrimony-poc-demo-ganap.firebaseapp.com",
    projectId: "matrimony-poc-demo-ganap",
    storageBucket: "matrimony-poc-demo-ganap.firebasestorage.app",
    messagingSenderId: "456405786419",
    appId: "1:456405786419:web:07a15aa774689cf7bf6846"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const MOCK_PROFILES = [
    // Grooms
    {
        name: "David Thomas",
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

const seed = async () => {
    try {
        console.log("Starting seed process...");

        // Attempting unauthenticated write (assuming rules allow it)
        const batch = writeBatch(db);
        const profilesRef = collection(db, "profiles");

        console.log("Checking existing profiles...");

        // Check if data already exists to avoid duplicates
        const snapshot = await getDocs(profilesRef);
        if (!snapshot.empty) {
            console.log("Database already seeded!");
            process.exit(0);
        }

        MOCK_PROFILES.forEach((profile) => {
            const docRef = doc(profilesRef); // Auto-generate ID
            batch.set(docRef, {
                ...profile,
                createdAt: new Date().toISOString()
            });
        });

        console.log("Committing batch...");
        await batch.commit();
        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seed();
