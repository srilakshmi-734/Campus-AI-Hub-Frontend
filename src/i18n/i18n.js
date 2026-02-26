import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            // Sidebar
            dashboard: 'Dashboard',
            students: 'Students',
            faculty: 'Faculty',
            courses: 'Courses',
            attendance: 'Attendance',
            fees: 'Fees',
            reports: 'Reports',
            resources: 'Resources',
            settings: 'Settings',

            // Auth
            login: 'Login',
            signup: 'Sign Up',
            email: 'Email',
            password: 'Password',
            name: 'Full Name',
            role: 'Role',
            admin: 'Admin',
            student: 'Student',
            loginTitle: 'Welcome Back',
            loginSubtitle: 'Sign in to CampusAI Hub',
            signupTitle: 'Create Account',
            signupSubtitle: 'Join CampusAI Hub',
            noAccount: "Don't have an account?",
            haveAccount: 'Already have an account?',
            logout: 'Logout',

            // Dashboard
            totalStudents: 'Total Students',
            totalFaculty: 'Total Faculty',
            activeCourses: 'Active Courses',
            avgAttendance: 'Avg Attendance',
            feesCollected: 'Fees Collected',
            pendingFees: 'Pending Fees',
            myAttendance: 'My Attendance',
            myCourses: 'My Courses',
            myFees: 'My Fees',
            welcomeAdmin: 'Welcome, Admin',
            welcomeStudent: 'Welcome, Student',
            overview: 'Overview',

            // Common
            search: 'Search...',
            filter: 'Filter',
            export: 'Export',
            add: 'Add',
            edit: 'Edit',
            delete: 'Delete',
            view: 'View',
            approve: 'Approve',
            reject: 'Reject',
            status: 'Status',
            actions: 'Actions',
            name_col: 'Name',
            dept: 'Department',
            semester: 'Semester',
            id: 'ID',
            date: 'Date',
            amount: 'Amount',
            percent: '%',
            active: 'Active',
            inactive: 'Inactive',
        },
    },
    ta: {
        translation: {
            // Sidebar
            dashboard: 'டாஷ்போர்டு',
            students: 'மாணவர்கள்',
            faculty: 'ஆசிரியர்கள்',
            courses: 'படிப்புகள்',
            attendance: 'வருகை',
            fees: 'கட்டணம்',
            reports: 'அறிக்கைகள்',
            resources: 'வளங்கள்',
            settings: 'அமைப்புகள்',

            // Auth
            login: 'உள்நுழை',
            signup: 'பதிவு செய்',
            email: 'மின்னஞ்சல்',
            password: 'கடவுச்சொல்',
            name: 'முழு பெயர்',
            role: 'பாத்திரம்',
            admin: 'நிர்வாகி',
            student: 'மாணவர்',
            loginTitle: 'மீண்டும் வரவேற்கிறோம்',
            loginSubtitle: 'CampusAI Hub உள்நுழையவும்',
            signupTitle: 'கணக்கு உருவாக்கு',
            signupSubtitle: 'CampusAI Hub இல் சேரவும்',
            noAccount: 'கணக்கு இல்லையா?',
            haveAccount: 'கணக்கு உள்ளதா?',
            logout: 'வெளியேறு',

            // Dashboard
            totalStudents: 'மொத்த மாணவர்கள்',
            totalFaculty: 'மொத்த ஆசிரியர்கள்',
            activeCourses: 'செயல் படிப்புகள்',
            avgAttendance: 'சராசரி வருகை',
            feesCollected: 'வசூலிக்கப்பட்ட கட்டணம்',
            pendingFees: 'நிலுவை கட்டணம்',
            myAttendance: 'என் வருகை',
            myCourses: 'என் படிப்புகள்',
            myFees: 'என் கட்டணம்',
            welcomeAdmin: 'வரவேற்கிறோம், நிர்வாகி',
            welcomeStudent: 'வரவேற்கிறோம், மாணவர்',
            overview: 'சுருக்கம்',

            // Common
            search: 'தேடு...',
            filter: 'வடிகட்டு',
            export: 'ஏற்றுமதி',
            add: 'சேர்',
            edit: 'திருத்து',
            delete: 'நீக்கு',
            view: 'பார்',
            approve: 'ஒப்புக்கொள்',
            reject: 'நிராகரி',
            status: 'நிலை',
            actions: 'செயல்கள்',
            name_col: 'பெயர்',
            dept: 'துறை',
            semester: 'செமஸ்டர்',
            id: 'அடையாளம்',
            date: 'தேதி',
            amount: 'தொகை',
            percent: '%',
            active: 'செயலில்',
            inactive: 'செயலற்ற',
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('campusai_lang') || 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });

export default i18n;
