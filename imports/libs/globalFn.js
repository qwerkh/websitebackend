var jwt = require('jsonwebtoken');
import numeral from "numeral";


export default class GlobalFn {
    static CheckRoles({userId, roles}) {
        let currentUser = Meteor.user();
        if (userId) {
            currentUser = Meteor.users.findOne({_id: userId}); //use to check on server only
            if (currentUser && !currentUser.profile.approved) {
                return false;
            }
        }
        if (currentUser) {
            return Roles.userIsInRole(currentUser._id, roles);
        }
    }

    static Namespace1(route) {
        return '/api/v1' + route;
    }

    static verifyToken(token, secret) {
        //return jwt.verify(token, secret);
        return token && token === secret;
    };

    static checkLogin(user, password) {
        let detailLogin = Accounts._checkPassword(user, password);
        if (detailLogin.error) {
            return detailLogin;
        }
        return true;
    }

    static collectionReact = (collectionReactName, id, collectionAuditName, oldDoc, type) => {
        let doc = collectionReactName.findOne();
        !!doc ? collectionReactName.update({_id: doc._id}, {
            $set: {
                id: id
            }
        }) : collectionReactName.insert({
            id: id
        });
        if (type && type !== undefined && oldDoc && oldDoc !== undefined) {
            let od = {};
            od.type = type;
            od.data = oldDoc;
            collectionAuditName.insert(od);
        }
    };


    static formatNumber = (val) => {
        return val !== "" && val !== null && val !== undefined ? numeral(val).format("0,00") : "";
    }


    static ousKot = (data) => {
        let list = [];
        let num = data.split("-");
        let i = 0;
        if ((num[0]).length === 2) {
            for (i = parseInt(num[0]); i <= parseInt(num[1]); i = i + 10) {
                if (i.toString().length === 1) {
                    list.push('0' + i);
                } else {
                    list.push(i + "");
                }
            }
        } else if ((num[0]).length === 3) {
            if (parseInt(num[1]) < parseInt(num[0]) + 100) {
                for (i = parseInt(num[0]); i <= parseInt(num[1]); i = i + 10) {
                    if (i.toString().length === 1) {
                        list.push('00' + i);
                    } else if (i.toString().length === 2) {
                        list.push('0' + i);
                    } else {
                        list.push(i + "");
                    }
                }
            } else {
                for (i = parseInt(num[0]); i <= parseInt(num[1]); i = i + 100) {
                    if (i.toString().length === 1) {
                        list.push('00' + i);
                    } else if (i.toString().length === 2) {
                        list.push('0' + i);
                    } else {
                        list.push(i + "");
                    }
                }
            }

        }
        return list;
    }
    static ousPhe = (data) => {
        let list = [];
        let num = data.split("-");

        if ((num[0]).length === 2) {
            if (0 >= parseInt(num[0]) && 0 <= parseInt(num[1])) {
                list.push("00");
            }
            if (11 >= parseInt(num[0]) && 11 <= parseInt(num[1])) {
                list.push("11");
            }
            if (22 >= parseInt(num[0]) && 22 <= parseInt(num[1])) {
                list.push("22");
            }
            if (33 >= parseInt(num[0]) && 33 <= parseInt(num[1])) {
                list.push("33");
            }
            if (44 >= parseInt(num[0]) && 44 <= parseInt(num[1])) {
                list.push("44");
            }
            if (55 >= parseInt(num[0]) && 55 <= parseInt(num[1])) {
                list.push("55");
            }
            if (66 >= parseInt(num[0]) && 66 <= parseInt(num[1])) {
                list.push("66");
            }
            if (77 >= parseInt(num[0]) && 77 <= parseInt(num[1])) {
                list.push("77");
            }
            if (88 >= parseInt(num[0]) && 88 <= parseInt(num[1])) {
                list.push("88");
            }
            if (99 >= parseInt(num[0]) && 99 <= parseInt(num[1])) {
                list.push("99");
            }
        } else if ((num[0]).length === 3) {
            if (0 >= parseInt(num[0]) && 0 <= parseInt(num[1])) {
                list.push("000");
            }
            if (111 >= parseInt(num[0]) && 111 <= parseInt(num[1])) {
                list.push("111");
            }
            if (222 >= parseInt(num[0]) && 222 <= parseInt(num[1])) {
                list.push("222");
            }
            if (333 >= parseInt(num[0]) && 333 <= parseInt(num[1])) {
                list.push("333");
            }
            if (444 >= parseInt(num[0]) && 444 <= parseInt(num[1])) {
                list.push("444");
            }
            if (555 >= parseInt(num[0]) && 555 <= parseInt(num[1])) {
                list.push("555");
            }
            if (666 >= parseInt(num[0]) && 666 <= parseInt(num[1])) {
                list.push("666");
            }
            if (777 >= parseInt(num[0]) && 777 <= parseInt(num[1])) {
                list.push("777");
            }
            if (888 >= parseInt(num[0]) && 888 <= parseInt(num[1])) {
                list.push("888");
            }
            if (999 >= parseInt(num[0]) && 999 <= parseInt(num[1])) {
                list.push("999");
            }
        }
        return list;
    }
    static reang = (data) => {
        let list = [];
        let num = data.split("-");
        let i = 0;
        if ((num[0]).length === 2) {
            for (i = parseInt(num[0]); i <= parseInt(num[1]); i++) {
                if (i.toString().length === 1) {
                    list.push('0' + i);
                } else {
                    list.push(i + "");
                }
            }
        } else if ((num[0]).length === 3) {
            for (i = parseInt(num[0]); i <= parseInt(num[1]); i++) {
                if (i.toString().length === 1) {
                    list.push('00' + i);
                } else if (i.toString().length === 2) {
                    list.push('0' + i);
                } else {
                    list.push(i + "");
                }
            }
        }
        return list;
    }
    static ouskbal = (data) => {
        let list = [];
        let num = data.split(">");
        let i = 0;
        for (i = parseInt(num[0]); i < parseInt(num[0]) + 10; i++) {
            if (i.toString().length === 1) {
                list.push('0' + i);
            } else {
                list.push(i + "");
            }
        }
        return list;
    }
    static ouskontoy = (data) => {
        let list = [];
        let num = data.split(">");
        let i = 0;
        for (i = parseInt(num[0]); i < 100; i = i + 10) {
            if (i.toString().length === 1) {
                list.push('0' + i);
            } else {
                list.push(i + "");
            }
        }
        return list;
    }
    static trolob = (data) => {
        let list = [];
        let num = data.split("*");
        let numArray = num[0].split("");
        let numLength = numArray.length;
        let numPrepare;
        if (numLength === 2) {
            let i = 0;
            for (i; i < numLength; i++) {
                let j = 0;
                numPrepare = numArray[i];
                for (j; j < numLength; j++) {
                    if (j !== i) {
                        numPrepare += numArray[j];
                    }
                }
                list.push(numPrepare);
            }

        } else if (numLength === 3) {
            let i = 0;
            for (i; i < numLength; i++) {
                let j = 0;
                for (j; j < numLength; j++) {
                    if (j !== i) {
                        let k = 0;
                        for (k; k < numLength; k++) {
                            if (k !== i && k !== j) {
                                numPrepare = numArray[i] + numArray[j] + numArray[k];
                            }
                        }
                        list.push(numPrepare);
                    }
                }
            }
        }

        //a.filter( onlyUnique );
        return list.filter(onlyUnique);

    }

    static getPost(valList) {
        let arrList = [];
        valList.forEach((ob) => {
            let v = "";
            switch (ob) {
                case "0A":
                    v = "A";
                    break;
                case "1B":
                    v = "B";
                    break;
                case "1B":
                    v = "B";
                    break;
                case "2C":
                    v = "C";
                    break;
                case "3D":
                    v = "D";
                    break;
                case "5Lo":
                    v = "Lo";
                    break;
                case "O":
                    v = "O";
                    break;
                case "F":
                    v = "F";
                    break;
                case "I":
                    v = "I";
                    break;
                case "K":
                    v = "K";
                    break;
                case "L":
                    v = "L";
                    break;
                case "N":
                    v = "N";
                    break;
                case "A1":
                    v = "A1";
                    break;
                case "A2":
                    v = "A2";
                    break;
                case "A3":
                    v = "A3";
                    break;
                case "A4":
                    v = "A4";
                    break;
                case "T":
                    v = "T";
                    break;
                case "Ler":
                    v = "Ler";
                    break;
                case "Tot":
                    v = "Tot";
                    break;
                case "Vat":
                    v = "Vat";
                    break;
                default:
                    v = "4P";
                    break;
            }
            arrList.push(v);
        })


        return arrList;
    }

    static getPostChange(post) {
        let arrList = [];
        // ["01AB", "02AC", "03AD", "12BC", "13BD", "23CD", "012ABC", "023ACD", "123BCD"]
        let v = "";
        switch (post) {
            case "01AB":
                v = ["0A", "1B"];
                break;
            case "02AC":
                v = ["0A", "2C"];
                break;
            case "03AD":
                v = ["0A", "3D"];
                break;
            case "12BC":
                v = ["1B", "2C"];
                break;
            case "13BD":
                v = ["1B", "3D"];
                break;
            case "23CD":
                v = ["2C", "3D"];
                break;
            case "012ABC":
                v = ["0A", "1B", "2C"];
                break;
            case "023ACD":
                v = ["0A", "2C", "3D"];
                break;
            case "123BCD":
                v = ["1B", "2C", "3D"];
                break;
            default:
                v = [post];
                break;
        }
        arrList.push(...v);
        return arrList;
    }


}


function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * Meteor.call('factorial', n - 1);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
};
