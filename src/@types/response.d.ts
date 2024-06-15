interface TextLangArea {
    lang: string;
    title: string;
}

interface TextLangSchool {
    lang: string;
    name: string;
}

interface Area {
    id: string;
    createdAt: string;
    updatedAt: string;
    language: [TextLangArea];
    status: number;
    oldId: number;
}

interface City {
    id: string;
    createdAt: string;
    updatedAt: string;
    language: [TextLangArea];
    areaId: string;
    oldId: number;
    area: Area;
}

interface Project {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    oldId: number;
    description: string;
}

interface Major {
    id: string;
    createdAt: string;
    updatedAt: string;
    code: string;
    language: [TextLangArea];
    status: number;
    oldId: number;
    parentId: string | null;
}

interface Specialized {
    id: string;
    createdAt: string;
    updatedAt: string;
    code: string;
    linkDetail: string;
    level: number;
    majorId: string;
    rating: string;
    rank: number;
    language: [TextLangArea];
    oldId: number;
    major: Major;
    rankAlphabet: string;
}

interface ShortSchool {
    id: string;
    language: TextLangSchool[];
    contact: any;
    shortName: any;
    logo: string;
    background: any;
    rank: number;
    code: number;
    linkDetail: string;
    favourite: number;
    lastScorePass: string;
    schoolTypeId: string;
    level: any;
    view: number;
    area: Area;
    city: City;
    projects: [Project];
    likeTotal: number;
    favoriteTotal: number;
    reviewTotal: number;
    slug: string;
    rate: number;
    totalApply: number;
    totalReview: number;
    scholarships: ResponseWithPaginateFormat<SchoolDetailScholarship>;
    supportApply: boolean;
}

interface SchoolType {
    id: string;
    createdAt: string;
    updatedAt: string;
    language: [TextLangArea];
    oldId: number;
}

interface ResponseWithPaginateFormat<T> {
    items: Array<T>;
    meta: {
        itemCount: number;
        totalItems: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}

interface ImageSchool {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    type: string;
    url: string;
}

interface Deposit {
    id: string;
    createdAt: string;
    updatedAt: string;
    amount: number;
    memo: string;
    note: string;
    status: "PENDING" | "CANCEL" | "REJECT" | "DONE";
    userId: string;
    approveId: string;
    methodId: string;
    expireAt: string;
    method: MethodDeposit;
}

interface MethodDeposit {
    id: string;
    createdAt: string;
    language: TextLangSchool[];
    thumbnail: string;
    status: number;
}

interface UserNotification {
    id: string;
    createdAt: string;
    updatedAt: string;
    language: Array<{
        lang: string;
        content: string;
        title: string;
    }>;
    description: string;
    type: "EMAIL" | "SMS" | "TELEGRAM" | "SYSTEM" | "APP";
    isRead: boolean;
}

interface ResponseWelcomeUser {
    apply: ApplyWelcome;
    news: ResponseWithPaginateFormat<SchoolNews>;
    rank: RankWelcome;
    schools: ResponseWithPaginateFormat<ShortSchool>;
    user: User;
}

interface RankWelcome {
    rankProfile: number;
    rankProvince: number;
    rankCity: number;
}

interface ApplyWelcome {
    applySameTraining: number;
    applySameArea: number;
    applySameCity: number;
}

interface StatisticsUserDashboard {
    totalUsers: number;
    totalUsersToday: number;
    totalSchools: number;
    totalApplies: number;
    totalSpecialties: number;
    totalMajors: number;
    totalPosts: number;
    totalScholarships: number;
}

interface SpecializedBySchoolId {
    specializeds: Specialized[];
    training: Training;
    statistics: SchoolStatistic[];
}
