declare module "react-toastify";
declare module "redux-persist-cookie-storage";
declare module "react-render-html";

// declare module "formik";

/// <reference types="react-scripts" />

// eslint-disable-next-line no-unused-vars
interface Window {
    ethereum: any;
}

interface Response<T> {
    statusCode: number;
    message: string;
    errorCode: string;
    data: T;
}

interface IResponseDataAdmin<T> {
    items: Array<T>;
    meta: IMeta;
}

interface IMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

interface SchoolFilter {
    area: Array<string>;
    city: Array<string>;
    school_type: Array<string>;
    school_project: Array<string>;
    major: Array<string>;
    specialized: Array<string>;
    rank_from: number;
    rank_to: number;
}

interface FilterRank {
    rankFrom: number;
    rankTo: number;
}

interface SchoolDetailLang {
    lang: string;
    name: string;
    introduce: string;
}

interface SchoolDetailContact {
    email: string;
    phone: string;
    address: string;
    website: string;
}

interface SchoolDetailAttribute {
    id: string;
    name: string;
    value: string;
    pk: tru;
}

interface SchoolDetailImage {
    id: string;
    name: string;
    type: string;
    url: string;
}

interface SchoolDetailScholarship {
    id: string;
    scholarship: {
        id: string;
        language: Array<TextLangArea>;
        passScore: string;
        link: string;
    };
    scholarshipType: {
        id: string;
        language: Array<TextLangArea>;
        lastPointPass: string;
        oldId: number;
    };
    trainings: Array<{
        id: string;
        total: nuber;
        passScore: string;
        language: Array<TextLangArea>;
        training: {
            id: string;
            language: Array<TextLangArea>;
        };
    }>;
    scholarshipId: string;
    scholarshipTypeId: string;
}

interface Specialized {
    id: string;
    createdAt: string;
    code: string;
    linkDetail: string;
    level: string;
    rating: string;
    rank: number;
    language: Array<TextLangArea>;
    major: Major;
    training: {
        id: string;
        language: Array<TextLangArea>;
    };
}

interface SchoolDetailSpecialized {
    id: string;
    createdAt: string;
    rankAlphabet: string;
    rank: string;
    specialized: Specialized;
}

interface SchoolDetailTraining {
    id: string;
    createdAt: string;
    training: {
        id: string;
        language: Array<TextLangArea>;
    };
}

interface SchoolDetail {
    id: string;
    language: Array<SchoolDetailLang>;
    shortName: string;
    logo: string;
    background: string;
    rank: number;
    code: number;
    linkDetail: string;
    favourite: number;
    favoriteTotal: number;
    lastScorePass: string;
    likeTotal: number;
    schoolTypeId: string;
    level: number;
    view: number;
    area: Area;
    city: City;
    contact: SchoolDetailContact;
    attributes: Array<SchoolDetailAttribute>;
    medias: Array<SchoolDetailImage>;
    scholarships: {
        items: Array<SchoolDetailScholarship>;
        meta: { totalItems: number; itemCount: number; itemsPerPage: number; totalPages: number; currentPage: number };
    };
    services: {
        items: Array<any>;
        meta: { totalItems: number; itemCount: number; itemsPerPage: number; totalPages: number; currentPage: number };
    };
    specializeds: {
        items: Array<SchoolDetailSpecialized>;
        meta: { totalItems: number; itemCount: number; itemsPerPage: number; totalPages: number; currentPage: number };
    };
    map?: {
        lat: number;
        lng: number;
    };
    view720: string | null;
    statistics: SchoolStatistic[];
}

interface SchoolStatistic {
    id: string;
    createdAt: string;
    schoolId: string;
    year: number;
    total: number;
}

interface SchoolReview {
    id: sring;
    createdAt: string;
    rating: number;
    tags: Array<string>;
    content: string;
    status: number;
    user: {
        id: string;
        userName: string;
        firstName: string;
        lastName: string;
        avatar: string;
        gender: string;
        profile: string;
    };
}

interface Category {
    id: string;
    createdAt: string;
    language: Array<TextLangArea>;
}

interface SchoolNews {
    id: string;
    createdAt: string;
    language: Array<{
        lang: string;
        title: string;
        content: string;
        shortContent: string;
    }>;
    slug: string;
    thumbnail: string;
    view: number;
    like: number;
    status: number;
    tags: Array<string>;
    category: Category;
    school: {
        id: string;
        createdAt: string;
        language: {
            lang: string;
            name: string;
            introduce: string;
        }[];
        contact: {
            email: string;
            phone: string;
            address: string;
            socials: Record<string, string>;
            website: string;
        };
        shortName: string | null;
        slug: string;
        logo: string;
        background: string;
        rank: number;
        code: number;
        linkDetail: string;
        favourite: number;
        lastScorePass: string;
        schoolTypeId: string;
        level: number | null;
        view: number;
        syncLink: string;
        map?: {
            lat: string;
            lng: string;
        };
        rate: number;
        isPublic: boolean;
    };
    creator: {
        id: string;
        userName: string;
        firstName: string;
        lastName: string;
        avatar: string;
        gender: string;
        profile: string;
    };
}

interface FaqSchool {
    id: string;
    title: string;
    question: string;
    answer: string;
}

interface UserProfile {
    id: string;
    createdAt: string;
    username: string;
    firstName: string;
    lastName: string;
    birthday: string;
    avatar: string;
    gender: string;
    email: string;
    phone: string;
    emailVerifiedAt: string;
    passwordResetTokenExpiresAt: string;
    status: number;
    coin: number;
    code: string;
    role: number;
    isAdmin: boolean;
    profile: null;
    score: string;
    refId: string;
    learningPlan: string;
    cardId: string;
    address: string;
    coinTransactions: [];
    profile: InputUpdateUserProfile;
}

interface Method {
    id: string;
    createdAt: string;
    updatedAt: string;
    language: Array<{
        lang: string;
        name: string;
        content: string;
    }>;
    thumbnail: string;
    status: number;
    info: {
        accountNumber: string;
        owner: string;
    };
}

interface UserBlog {
    id: string;
    createdAt: string;
    updatedAt: string;
    language: Array<{
        lang: string;
        content: string;
        title: string;
        shortContent: string;
    }>;
    title: string;
    shortContent: string;
    content: string;
    slug: string;
    thumbnail: string;
    tags: Array<string>;
    status: boolean;
    approved: boolean;
    userId: string;
    approvedAt: string;
    view: number;
    like: number;
    user: {
        id: string;
        createdAt: string;
        username: string;
        firstName: string;
        lastName: string;
        birthday: string;
        avatar: string | null;
        gender: string;
        email: string;
        phone: string | null;
        emailVerifiedAt: string;
        passwordResetTokenExpiresAt: string | null;
        status: number;
        coin: number;
        code: string;
        role: number;
        isAdmin: boolean;
        profile: UserProfile;
        score: string;
        refId: string | null;
        learningPlan: string | null;
        cardId: string | null;
        address: string | null;
        startWelcome: boolean;
    };
}

interface UserPayment {
    id: string;
    createdAt: string;
    updatedAt: string;
    amount: string;
    note: string;
    type: "INCOME" | "EXPENSE";
    source: "DEPOSIT" | "CONTRACT" | "WITHDRAW" | "REFUND" | "TRANSFER" | "OTHER";
    fund: "CASH" | "ONLINE";
    status: "PENDING" | "REJECTED" | "DONE";
    approveId: string;
    date: string;
    txId: string;
}
