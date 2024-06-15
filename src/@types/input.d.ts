interface LoginInput {
    email: string;
    password: string;
}

interface RegisterInput {
    recaptcha: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string;
    email: string;
    password: string;
}

interface ResetPass {
    recaptcha: string;
    hash: string;
    token: string;
    password: string;
}

interface CheckResetPass {
    token: string;
    hash: string;
}

interface ForgotPass {
    recaptcha: string;
    email: string;
}

interface InputSearchSchool {
    page: number;
    limit: number;
    s?: string;
    areas?: Array<string>;
    cities?: Array<string>;
    projects?: Array<string>;
    scholarshipTypes?: Array<string>;
    scholarships?: Array<string>;
    majors?: Array<string>;
    specializes?: Array<string>;
    types?: Array<string>;
    rankFrom?: number;
    rankTo?: number;
    // createdAt
    // rank
    // like
    // favorite
    // view
    sortBy?: string;
}

type InputAspirationApply = {
    applyYear?: number | null;
    applySemester?: number | null;
    training?: string[] | null;
    scholarshipType?: string[] | null;
    area?: string[] | null;
};

type InputWelcomeUser = {
    purposeOfUseId?: number[] | null;
    profileInformation?: InputProfileInformation | null;
    aspirationApply?: InputAspirationApply | null;
};

interface InputProfileInformation {
    currentStatus?: string | null;
    highestLevelOfEducation?: string | null;
    trainingIndustry?: string | null;
    Gpa?: {
        coefficients?: number | null;
        mark?: number | null;
    };
    Hsk?: {
        level?: string | null;
        mark?: number | null;
    };
    Hskk?: {
        level?: string | null;
        mark?: number | null;
    };
    ielts?: number | null;
    certificate?: number | null;
    exCertificate?: number | null;
    graduateSpecialized?: string | null;
    graduateYear?: number | null;
    scientificResearchAchievement?: string | null;
}

interface IApplyScholarShip {
    id?: string;
    scholarshipTypeId?: string;
    scholarshipId?: string;
    trainingId?: string;
}

/***  Admin */

interface IBaseAdminInput {
    id?: string;
    language: Array<ILanguage>;
}

interface IAdminAreaInput extends IBaseAdminInput {
    status: number;
}

interface IAdminCityInput extends IBaseAdminInput {
    areaId: string;
}

interface IAdminTrainingInput extends IBaseAdminInput {}

interface IAdminMajorInput extends IBaseAdminInput {
    status: number;
    code: string;
}

interface IAdminSpecializedInput extends IBaseAdminInput {
    linkDetail?: string;
    level: number;
    majorId: string;
    rating: string;
    rank: number;
    code: string;
}

interface IAdminProjectInput {
    id?: string;
    name: string;
    description: string;
}

interface IAdminScholarshipTypeInput extends IBaseAdminInput {
    lastPointPass: number;
}

interface IAdminScholarshipInput extends IBaseAdminInput {
    scholarshipTypeId: string;
    passScore: number;
    link: string;
}

interface IAdminScholarshipPolicyInput extends IBaseAdminInput {}

// interface ISchoolLanguageInput {
//     lang: string;
//     name: string;
//     introduce: string;
// }

// interface ISchoolContactInput {
//     address: string,
//     phone: string,
//     email: string,
//     website: string,
//     socials: ISchoolSocial
// }

// interface ISchoolSocial {
//     facebook: string,
//     youtube: string,
//     instagram: string,
//     twitter: string,
//     linkedin: string
// }

interface IAdminSchoolInput {
    id?: string;
    language: Array<{
        lang: string;
        title: string;
    }>;
    contact: {
        address: string;
        phone: string;
        email: string;
        website: string;
        socials: {
            facebook: string;
            youtube: string;
            instagram: string;
            twitter: string;
            linkedin: string;
        };
    };
    code: 0;
    shortName: string;
    logo: string;
    background: string;
    rank: 0;
    linkDetail: string;
    lastSeasonPass: 0;
    areaId: string;
    cityId: string;
    schoolTypeId: string;
    level: string;
    projectIds: Array<string>;
    medias?: Array<{
        name: string;
        type: "IMAGE" | "VIDEO" | "AUDIO";
        url: string;
    }>;
    attributes?: Array<{
        name: string;
        value: string;
        pk: true;
    }>;
    scholarships: Array<{
        scholarshipId: string;
        scholarshipTypeId: string;
        trainings: Array<{
            total: 0;
            passScore: 0;
            trainingId: string;
        }>;
    }>;
    majors: Array<{
        trainingId: string;
        majorIds: Array<string>;
        specializedIds: Array<string>;
    }>;
    projects?: Array<{
        name: string;
    }>;
    schoolSpecializeds?: any;
}

interface IAdminSchoolUploadInput {
    files: any;
}

interface InputUpdateUserProfile {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    phone?: string;
    gender?: "Male" | "Female";
    birthday?: string;
    password?: string;
    profile?: {
        Gpa: {
            coefficients: 10 | 4;
            mark: number;
        };
        Hsk: {
            level: "HSK1" | "HSK2" | "HSK3" | "HSK3" | "HSK4" | "HSK5" | "HSK6";
            mark: number;
        };
        Hskk: {
            level: "HSKK_BEGINNER" | "HSKK_INTERMEDIATE" | "HSKK_ADVANCED"; // cao cấp, trung cấp, sơ cấp
            mark: number;
        };
        ielts?: number;
        certificate?: number;
        exCertificate?: number;
    };
}

interface InputGetAllDepositByUser {
    status?: "PENDING" | "CANCEL" | "REJECT" | "DONE";
    methodId?: string;
}
interface InputGetAllPaymentByUser {
    page: number;
    limit: number;
}

interface InputCreateDeposit {
    amount: number;
    note: string;
    methodId: string;
    recaptcha: string;
}

interface InputCancelDeposit {
    id: string;
    recaptcha: string;
}

interface InputApproveDeposit {
    id: string;
}

interface InputUpdateDeposit {
    id: string;
}

interface InputDeleteDeposit {
    id: string;
}

interface InputGetNotificationByUser {
    userId?: string;
    page: number;
    limit: number;
}

interface InputCreateBlog {
    content?: string;
    title?: string;
    shortContent?: string;
    thumbnail?: string;
    tags?: Array<string>;
}

interface InputUpdateBlogById {
    id: string;
    language: Array<{
        lang: string;
        content: string;
        title: string;
        shortContent: string;
    }>;
    thumbnail: string;
    tags: Array<string>;
}

interface InputCreateUserApply {
    schoolId: string;
    majorId: string;
    scholarshipTypeId: string;
    scholarshipId: string;
    trainingId: string;
    year: number;
    period: number;
    specializeds: [string];
}

interface IAdminDepositInput {
    id: string;
    amount: number;
    memo: string;
    note?: string;
    status: UserDepositStatus;
    userId: string;
    approveId?: string;
    methodId: string;
    expireAt: Date;
}

interface InputCreateReview {
    schoolId: string;
    content: string;
    rating: number;
    tags?: Array<string>;
}
