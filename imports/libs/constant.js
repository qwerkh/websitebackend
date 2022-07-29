let secret = "narongwebsite";

let defaultRoles = [
    "Admin",
    "Create",
    "Update",
    "Delete",
    "Setting",
    "Data",
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
    'News And Event', 'Media', 'National Cooperation','International Cooperation'
];
let Setting = [
    'Admin', 'Setting', 'Super'
];
let Data = [
    'Admin', 'Data', 'Super'
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

import {en} from "../libs/lang/en";
import {km} from "../libs/lang/km";

export const t = {en, km};

export const Constants = {
    rolesOption: defaultRoles,
    modulesOption: defaultModules,
    setting: Setting,
    data: Data,
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

    currencyList: CurrencyList,
    currencyListOpt: CurrencyListOpt,
    fontSizeArr : ['8px','9px','10px','12px','14px','16px','20px','24px','32px','42px','54px','68px','84px','98px']

}

