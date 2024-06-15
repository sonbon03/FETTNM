interface User {
    id: string;
    createdAt: string;
    updatedAt: string;
    username: string;
    firstName: string;
    lastName: string;
    birthday: string;
    avatar?: string | null;
    gender: "Male" | "Female" | "Other";
    email: string;
    phone?: string | null;
    emailVerifiedAt: string;
    password: string | null;
    passwordResetToken: string | null;
    passwordResetTokenExpiresAt: string | null;
    status: number;
    coin: number;
    code: string;
    role: number;
    isAdmin: boolean;
    profile: UserProfile | null;
    createdBy: any | null;
    score: string;
    refId: any | null;
    learningPlan: any | null;
    cardId: any | null;
    address: any | null;
    metadataInit: InputWelcomeUser | null;
    tmpPassword: string;
    startWelcome: boolean;
    coinTransactions: any[];
}

// interface UserProfile {
//     Gpa: {
//         coefficients: number;
//         mark: number;
//     };
//     Hsk: {
//         level: string;
//         mark: number;
//     };
//     Hskk: {
//         level: string;
//         mark: number;
//     };
//     ielts: number;
//     exCertificate: number;
//     certificate: number;
// }

// interface ICheckinUser {
//     id: string;
//     createdAt: string;
//     updatedAt: string;
//     date: string;
//     userId: string;
// }

// /** Admin */

// interface IBaseAdmin {
//     id: string;
//     language: Array<ILanguage>;
//     createdAt: Date;
//     updatedAt: Date;
// }

// interface IArea extends IBaseAdmin {
//     status: 0 | 1;
// }

// interface ICity extends IBaseAdmin {
//     areaId: string;
//     area?: IArea;
// }

// interface ITraining extends IBaseAdmin {}

// interface IMajor extends IBaseAdmin {
//     status: 0 | 1;
//     code: string;
//     training?: ITraining;
// }

// interface ISpecialized extends IBaseAdmin {
//     linkDetail: string;
//     level: number;
//     majorId: string;
//     rating: string;
//     rank: number;
//     code: string;
//     major?: IMajor;
//     slug: string;
//     thumbnail: string;
//     training: ITraining;
// }

// interface IProject {
//     id: string;
//     name: string;
//     description: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

// interface IScholarshipType extends IBaseAdmin {
//     lastPointPass: number;
// }

// interface IScholarship extends IBaseAdmin {
//     scholarshipTypeId: string;
//     passScore: number;
//     link: string;
//     scholarshipType?: IScholarshipType;
//     thumbnail: string;
//     slug: string;
//     oldId: string;
// }

// interface IScholarshipPolicy extends IBaseAdmin {}

// interface IAdminSchool {
//     id: string;
//     language: Array<{
//         lang: string;
//         name: string;
//         introduce?: string;
//     }>;
//     createdAt: Date;
//     updatedAt: Date;
//     contact: any;
//     shortName: string;
//     logo: string;
//     background: string;
//     rank: number;
//     code: number;
//     linkDetail: string;
//     favourite: number;
//     lastScorePass: string;
//     schoolTypeId: string;
//     level: number;
//     areaId: string;
//     cityId: string;
//     view: number;
//     oldId: number;
//     area?: IArea;
//     city?: ICity;
//     medias?: any;
//     scholarships?: any;
//     projects?: any;
//     attributes?: any;
//     specializeds?: any;
//     syncLink?: string;
//     lastSessionPass?: any;
//     map?: {
//         lat: string;
//         long: string;
//     };
//     isPublic?: boolean;
//     view720?: string;
// }

// interface IAdminSchoolType extends IBaseAdmin {}

// interface ISchoolCategory extends IBaseAdmin {}

// interface ISchoolCategoryInput {
//     language: Array<{
//         lang: string;
//         title: string;
//     }>;
//     id?: string;
// }

// interface ISchoolService {
//     scholarshipId: string;
//     trainingId: string;
//     majorSpecializedIds: string[];
//     amount: number;
//     required?: {
//         gpa?: number;
//         language?: number;
//     };
//     total: number;
//     apply: number;
//     expireApply: string;
//     supported: boolean;
//     schoolId: string;
//     id?: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

// interface ISchoolServiceInput {
//     scholarshipId: string;
//     trainingId: string;
//     majorSpecializedIds: string[];
//     amount: number;
//     required?: {
//         gpa?: number;
//         language?: number;
//     };
//     total: number;
//     apply: number;
//     expireApply: string;
//     supported: boolean;
//     schoolId: string;
//     id?: string;
// }

// interface ISchoolFaq {
//     question: string;
//     answer: string;
//     schoolId: string;
//     title?: string;
//     id?: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

// interface ISchoolNews extends IBaseAdmin {
//     createdAt: Date;
//     updatedAt: Date;
//     id?: string;
//     language: Array<{
//         lang: string;
//         title: string;
//         content: string;
//         shortContent: string;
//     }>;
//     thumbnail?: string;
//     schoolId: string;
//     categoryId: string;
//     school?: IAdminSchool;
//     category?: ISchoolCategory;
//     tags?: string[];
//     status: 0 | 1;
//     view: number;
//     creator: {
//         id: string;
//         userName: string;
//         firstName: string;
//         lastName: string;
//         avatar: string;
//         gender: string;
//         profile: string;
//         username: string;
//     };
// }

// interface IStep {
//     name: string;
//     order: number;
//     id?: string;
// }

// interface IStepInput {
//     name: string;
//     order: number;
//     id?: string;
// }

// interface IApplyTask {
//     name: string;
//     description?: string;
//     public: boolean;
//     roles: string[];
//     id?: string;
// }

// interface IApply {
//     applySteps?: any[];
//     id?: string;
//     userId: string;
//     schoolScholarshipTrainingId: string;
//     year: number;
//     period: number;
//     majorId: string;
//     schoolId: string;
//     specializeds: string[];
//     passPoint: number;
//     storageUri: string;
//     createdBy: string;
//     user?: IUser;
//     contract: {
//         schoolService?: any;
//         schoolServiceId: string;
//         discount: number;
//         contractMethod: "ONLINE" | "OFFLINE";
//         address: string;
//         aspirations: string[];
//         scholarshipTypes: string[];
//         hskPlace: string;
//         contact: string;
//         payments: {
//             amount: number;
//             date: string;
//             expiredAt: string;
//             note: string;
//         }[];
//     };
//     school?: any;
//     schoolScholarshipTraining?: any;
// }

// interface IUser {
//     id: string;
//     createdAt: string;
//     updatedAt: string;
//     username: string;
//     firstName: string;
//     lastName: string;
//     birthday: string;
//     avatar: string | null;
//     gender: string;
//     email: string;
//     phone: string | null;
//     emailVerifiedAt: string | null;
//     password: string;
//     passwordResetToken: string | null;
//     passwordResetTokenExpiresAt: string | null;
//     status: number;
//     coin: number;
//     code: string;
//     role: number;
//     isAdmin: boolean;
//     profile: any | null;
//     createdBy: any | null;
//     score: string;
//     refId: string | null;
//     learningPlan: any | null;
//     tmpPassword: string;
// }

// interface IApplyStep {
//     id?: string;
//     createdAt?: string;
//     updatedAt?: string;
//     applyId: string;
//     stepId: string;
//     status: ApplyStepStatus;
//     order: number;
// }

// enum ApplyStepStatus {
//     PROCESSING = "PROCESSING",
//     DONE = "DONE",
// }

// enum ApplyGrantStatus {
//     PENDING = "PENDING",
//     PROCESSING = "PROCESSING",
//     DONE = "DONE",
// }

// enum UserDepositStatus {
//     PENDING = "PENDING",
//     CANCEL = "CANCEL",
//     REJECT = "REJECT",
//     DONE = "DONE",
// }
// enum SharedStatus {
//     ACTIVE = 1,
//     INACTIVE = 0,
// }

// interface IApplyProcess {
//     id?: string;
//     applyStepId: string;
//     title: string;
//     description: string;
//     expiredAt: string;
//     applyTaskId: string;
//     grants: {
//         applyProcessId: string;
//         userId: string;
//         status: ApplyGrantStatus;
//         expiredAt: string;
//     }[];
// }

interface IProduct {
    id?: string;
    name: string;
    image?: string;
    typeProduct?: string;
    description: string;
    price: number;
    quantity: number;
    idTypeProduct: string;
    soluong?: number;
}

interface ICart {
    id?: string;
    idAccount: string;
    idProduct: string;
    idCart: string;
    name: string;
    quantity: number;
}

interface IOrder {
    id: string;
    idProduct: string;
    idShip: string;
    location: string;
    quantity: number;
    startDate: Date;
    timeShip: Date;
    money: number;
    action: number;
}

interface IComment {
    id: string;
    idAccount: string;
    comment: string;
    idProduct: string;
}

// interface IApplyPayment {
//     id?: string;
//     applyProcessId: string;
//     userId: string;
//     status: ApplyGrantStatus;
//     expiredAt: string;
// }

// interface IDeposit {
//     id: string;
//     amount: number;
//     memo: string;
//     note?: string;
//     status: UserDepositStatus;
//     userId: string;
//     approveId?: string;
//     methodId: string;
//     expireAt: Date;
// }

// interface IUserGrant {
//     customerId?: string;
//     employeeIds?: Array<>;
//     employeeId?: string;
//     customerIds?: Array<>;
// }
