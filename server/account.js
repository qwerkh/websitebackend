import {Accounts} from "meteor/accounts-base";

Accounts.config({
    loginExpirationInDays: 1
});
Accounts.onCreateUser((options, user) => {
    user.profile = !!options.profile ? options.profile : {};
    // user.services = !user.services && !!options.services ? options.services : user.services; //social sign in
    /*super*/

    user.roles = options.roles || [];
    user.module = options.module || [];
    user.agentId = options.agentId || "";
    user.branch = options.branch || [];
    user.defaultBranch = options.defaultBranch || [];
    if (user.username === "super") {
        user.profile.approved = true;
        user.profile.owner = true;
        user.profile.language = 'en';
        user.profile.isDark = false;
        user.profile.dense = true;
        user.profile.sideColorFilter = 0;
        user.profile.imgBackground = 0;
        user.profile.isSideBarImage = true;
        user.profile.userLogin = 0;
        user.profile.maxUserLogin = 1;
        user.profile.workDayMorning = [0, 1, 2, 3, 4, 5, 6];
        user.profile.workDayAfternoon = [0, 1, 2, 3, 4, 5, 6];
        user.profile.workTimeMorningStart = moment().startOf("day").format("hh:mm");
        user.profile.workTimeMorningEnd = moment().startOf("day").add(12, "hours").format("hh:mm");
        user.profile.workTimeAfternoonStart = moment().startOf("day").add(12, "hours").format("hh:mm");
        user.profile.workTimeAfternoonEnd = moment().startOf("day").add(24, "hours").format("hh:mm");
        // user.roles = ["super", "admin"];
        Roles.addUsersToRoles(user._id, ["Super", "Admin", "Control User"]);
    }
    /*admin*/
    else if (user.username === "admin") {
        user.profile.approved = true;
        user.profile.owner = false;
        user.profile.language = 'en';
        user.profile.isDark = false;
        user.profile.dense = true;
        user.profile.sideColorFilter = 0;
        user.profile.imgBackground = 0;
        user.profile.isSideBarImage = true;
        user.profile.userLogin = 0;
        user.profile.maxUserLogin = 1;
        user.profile.workDayMorning = [0, 1, 2, 3, 4, 5, 6];
        user.profile.workDayAfternoon = [0, 1, 2, 3, 4, 5, 6];

        user.profile.workTimeMorningStart = moment().startOf("day").format("hh:mm");
        user.profile.workTimeMorningEnd = moment().startOf("day").add(12, "hours").format("hh:mm");
        user.profile.workTimeAfternoonStart = moment().startOf("day").add(12, "hours").format("hh:mm");
        user.profile.workTimeAfternoonEnd = moment().startOf("day").add(24, "hours").format("hh:mm");
        // user.roles = ["admin"];
        Roles.addUsersToRoles(user._id, ["Admin", "Control User"]);
    } else {
        user.profile.owner = false;
        user.profile.language = 'km';
        user.profile.isDark = false;
        user.profile.dense = true;
        user.profile.sideColorFilter = 0;
        user.profile.imgBackground = 0;
        user.profile.isSideBarImage = true;
        user.profile.userLogin = 0;
        user.profile.maxUserLogin = 1;

        if (user.roles.length > 0) {
            Roles.addUsersToRoles(user._id, user.roles);
        }
    }
    return user;
});


Accounts.validateLoginAttempt((obj) => {
    if (obj && obj.user && obj.user.username === "super") {
        return true;
    }

    if (!(obj && obj.user && obj.user.profile)) {
        return false;
    }

    let loginTime = moment().tz("Asia/Bangkok").format('HH:mm');
    let loginWeekday = moment(moment().tz("Asia/Bangkok").format()).weekday();
    if (!(((compareTime(loginTime, obj.user.profile.workTimeMorningStart) && !compareTime(loginTime, obj.user.profile.workTimeMorningEnd)) && (obj.user.profile.workDayMorning.indexOf(loginWeekday) > -1)) || ((compareTime(loginTime, obj.user.profile.workTimeAfternoonStart) && !compareTime(loginTime, obj.user.profile.workTimeAfternoonEnd)) && (obj.user.profile.workDayAfternoon.indexOf(loginWeekday) > -1)))) {
        throw new Meteor.Error("userOutOfRole");
    }

    let ipList = obj.user.ipList || [];
    if (ipList.indexOf(obj.connection.clientAddress) > -1) {
        return true;
    }
    if (obj.user.profile.userLogin >= obj.user.profile.maxUserLogin) {
        throw new Meteor.Error("maxUserLogin");
    }
    return true;
})

Accounts.onLogin((obj) => {
    let ipList = obj.user.ipList || [];
    if (ipList.indexOf(obj.connection.clientAddress) > -1) {
        return true;
    } else {
        ipList.push(obj.connection.clientAddress);
        Meteor.users.update({_id: obj.user._id}, {
            $set: {
                "profile.status": true,
                ipList: ipList
            },
            $inc: {"profile.userLogin": 1}
        });
        return true;
    }

})
Accounts.onLogout((obj) => {
    let userLogoutList = Meteor.users.find({ipList: {$all: [obj.connection.clientAddress]}}).fetch();
    userLogoutList.forEach((ob) => {
        let newIpList = ob.ipList.filter(item => item !== obj.connection.clientAddress)
        Meteor.users.update({_id: ob._id}, {
            $set: {ipList: newIpList, "profile.userLogin": newIpList.length},
        });
    })

})


let compareTime = function (loginTime, workTime) {
    /*if (loginTime === workTime) {
        return 0;
    }*/
    let time1 = loginTime.split(':');
    let time2 = workTime.split(':');
    if (eval(time1[0]) > eval(time2[0])) {
        return true;
    } else if (eval(time1[0]) == eval(time2[0]) && eval(time1[1]) > eval(time2[1])) {
        return true;
    } else {
        return false;
    }
}
