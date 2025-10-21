let secret = "narongwebsite";

let defaultRoles = [
    "Admin",
    "Create",
    "Update",
    "Delete",
    "Setting",
    "Data",
    "Book",
    "Control User"
];

let Gender = [
    {label: "male", value: "1"},
    {label: "female", value: "2"},
]
let OperationCode = [
    {label: "new", value: "1"},
    {label: "update", value: "2"},
]
let CurrencyList = ["1:KHR", "2:USD", "3:THB"]
let CurrencyListOpt = [
    {label: "៛", value: "1:KHR"},
    {label: "$", value: "2:USD"},
    {label: "B", value: "3:THB"},
]

let PagePostList = [
    'News And Event', 'Media', 'National Cooperation', 'International Cooperation'
];
let Setting = [
    'Admin', 'Setting', 'Super'
];
let Data = [
    'Admin', 'Data', 'Super'
];
let Book = [
    'Admin', 'Data','Book', 'Super'
];
let Report = [
    'Admin', 'Report', 'Super'
];

let ControlUser = [
    'Control User', 'Super'
];

let Super = [
    'Super'
];

let Create = [
    'Create', "Super"
];
let Delete = [
    'Delete', "Super"
];

let Update = [
    'Update', "Super"
];

let defaultModules = [
    "Website"
]

let methodType = [
    "Top Floor",
    "Floor"
]

let categoryOpt = [
    {label: "electricity", value: "electricity"},
    {label: "electronic", value: "electronic"},
    {label: "informationTechnology", value: "informationTechnology"},
    {label: "agriculture", value: "agriculture"},
    {label: "bankAndFinance", value: "bankAndFinance"},
    {label: "mechanic", value: "mechanic"},
]


const SPACES_END_POINT = "https://sgp1.digitaloceanspaces.com";
const SPACES_KEY = "DO00XNQC2W6MK6HHMRNP";
const SPACES_SECRET = "LZS3DSSFDWf35dMrkwlr/C5UKVc2TegED4CmxP1OdfM";
const SPACES_IMAGE_BUCKET = "zib";

import {en} from "../libs/lang/en";
import {km} from "../libs/lang/km";

export const t = {en, km};

export const Constants = {
    rolesOption: defaultRoles,
    modulesOption: defaultModules,
    setting: Setting,
    data: Data,
    book: Book,
    report: Report,
    controlUser: ControlUser,
    super: Super,
    create: Create,
    delete: Delete,
    update: Update,
    secret: secret,
    methodType: methodType,
    gender: Gender,
    operationCode: OperationCode,
    pagePostList: PagePostList,


    SPACES_END_POINT: SPACES_END_POINT,
    SPACES_KEY: SPACES_KEY,
    SPACES_SECRET: SPACES_SECRET,
    SPACES_IMAGE_BUCKET: SPACES_IMAGE_BUCKET,

    currencyList: CurrencyList,
    currencyListOpt: CurrencyListOpt,
    categoryOpt: categoryOpt,
    fontSizeArr: ['8px', '9px', '10px', '12px', '14px', '16px', '20px', '24px', '32px', '42px', '54px', '68px', '84px', '98px']

}

