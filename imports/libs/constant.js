let secret = "naronglts";

let defaultRoles = [
    "Admin",
    "Create",
    "Update",
    "Delete",
    "Setting",
    "Data",
    "Report",
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

let TimeList = [
    {label: "eveningVietnam", value: "E"},
    {label: "nightVietnam", value: "N"},
    {label: "vietnam13", value: "V13"},
    {label: "eveningKhmer", value: "EK"},
    {label: "nightKhmer", value: "NK"},
    {label: "thai", value: "T"},
    {label: "vathu", value: "Vat"},
]
let TypeList = [
    {label: "vietnam", value: "V"},
    {label: "thai", value: "T"},
    {label: "khmer", value: "KH"},
    {label: "vathu", value: "Vat"},
]

let PostList = [
    "4P", "0A", "1B", "2C", "3D", "5Lo", "F", "I", "K", "L", "N", "O", "A1", "A2", "A3", "A4", "T", "Ler", "Tot", "Vat", "01AB", "02AC", "03AD", "12BC", "13BD", "23CD", "012ABC", "023ACD", "123BCD"
]
let PostListT = [
    "T", "Ler", "Tot"
]
let PostListVat = [
    "Vat"
]

let PostChange = ["01AB", "02AC", "03AD", "12BC", "13BD", "23CD", "012ABC", "023ACD", "123BCD"];
let PostListOpt = [
    {label: "4P", value: "4P"},
    {label: "A", value: "0A"},
    {label: "B", value: "1B"},
    {label: "C", value: "2C"},
    {label: "D", value: "3D"},
    {label: "Lo", value: "5Lo"},
    {label: "F", value: "F"},
    {label: "I", value: "I"},
    {label: "K", value: "K"},
    {label: "L", value: "L"},
    {label: "N", value: "N"},
    {label: "O", value: "O"},
    {label: "A1", value: "A1"},
    {label: "A2", value: "A2"},
    {label: "A3", value: "A3"},
    {label: "A4", value: "A4"},
    {label: "T", value: "T"},
    {label: "Lលើ", value: "Ler"},
    {label: "Tតូត", value: "Tot"},
    {label: "Vវត្ថុ", value: "Vat"},
    {label: "AB", value: "01AB"},
    {label: "AC", value: "02AC"},
    {label: "AD", value: "03AD"},
    {label: "BC", value: "12BC"},
    {label: "BD", value: "13BD"},
    {label: "CD", value: "23CD"},
    {label: "ABC", value: "012ABC"},
    {label: "ACD", value: "023ACD"},
    {label: "BCD", value: "123BCD"}
]
let CurrencyList = ["1:KHR", "2:USD", "3:THB"]
let CurrencyListOpt = [
    {label: "៛", value: "1:KHR"},
    {label: "$", value: "2:USD"},
    {label: "B", value: "3:THB"},
]
let BillingCycle = [
    {label: "oneMonth", value: 1},
    {label: "twoMonth", value: 2},
    {label: "threeMonth", value: 3},
    {label: "fourMonth", value: 4},
    {label: "fiveMonth", value: 5},
    {label: "sixMonth", value: 6},
]

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
    "Lottery"
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
    billingCycle: BillingCycle,
    timeList: TimeList,
    postList: PostList,
    postChange: PostChange,
    postListT: PostListT,
    postListVat: PostListVat,
    postListOpt: PostListOpt,
    currencyList: CurrencyList,
    currencyListOpt: CurrencyListOpt,
    typeList: TypeList
}

