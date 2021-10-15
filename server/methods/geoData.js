import {Meteor} from 'meteor/meteor';

Meteor.methods({
    fetchProvinceOption() {
        let list = [];
        let provinces = JSON.parse(Assets.getText('geoData/province.json'));
        provinces.forEach(function (province) {
            list.push({
                // label: `${province.properties.ADMIN_ID1} | ${province.properties.NAME1}`,
                label: `${province.properties.NAME1}`,
                value: `${province.properties.ADMIN_ID1}`
            });
        });
        return list;
    },
    fetchDistrictOption(adminId1) {
        let list = [];
        let districts = JSON.parse(Assets.getText('geoData/district.json'));
        districts.map(function (o) {
            if (o.properties.ADMIN_ID1 === adminId1) {
                list.push({
                    label: `${o.properties.NAME2}`,
                    value: `${o.properties.ADMIN_ID2}`
                });
            }
        });
        return list;
    },
    fetchCommuneOption(adminId2) {
        let list = [];
        let districts = JSON.parse(Assets.getText('geoData/commune.json'));
        districts.map(function (o) {
            if (o.properties.ADMIN_ID2 === adminId2) {
                list.push({
                    label: `${o.properties.NAME3}`,
                    value: `${o.properties.ADMIN_ID3}`
                });
            }
        });
        return list;
    },
    fetchVillageOption(adminId3) {
        let list = [];
        let districts = JSON.parse(Assets.getText('geoData/village.json'));
        districts.map(function (o) {
            if (o.properties.ADMIN_ID3 === adminId3) {
                list.push({
                    label: `${o.properties.NAME}`,
                    value: `${o.properties.ADMIN_ID}`
                });
            }
        });
        return list;
    },
})
