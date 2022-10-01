import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {Web_Product, Web_ProductReact, Web_ProductAudit} from "../../imports/collections/product"
import {Web_PlantType} from "../../imports/collections/plantType"
import {Web_PlantRoom} from "../../imports/collections/plantRoom"
import {Web_PlantGift} from "../../imports/collections/plantGift"
import {Web_PlantLifeStyle} from "../../imports/collections/plantLifeStyle"
import excel from "node-excel-export";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    web_fetchProduct({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken, userId}) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let data = {
                content: [],
                countContent: 0,
            };
            let selector = {};
            let sortObj = {};
            if (sort.sortBy !== "") {
                let nameSort = sort.sortBy;
                sortObj[nameSort] = sort.sortDesc === true ? 1 : -1;
            } else {
                sortObj = {createdAt: -1};
            }
            if (!!q) {
                let reg = new RegExp(q);
                if (!!filter) {
                    selector[filter] = {$regex: reg, $options: 'mi'}
                } else {
                    selector.$or = [{title: {$regex: reg, $options: 'mi'}}, {
                        phoneNumber: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }, {
                        address: {
                            $regex: reg,
                            $options: 'mi'
                        }
                    }];
                }
            }

            selector.branchId = branchId;

            data.content = Web_Product.aggregate([
                    {
                        $match: selector
                    }
                    ,
                    {
                        $sort: {
                            createdAt: -1
                        }
                    },

                    {
                        $limit: options.limit
                    },
                    {
                        $skip: options.skip
                    },
                ],
                {
                    allowDiskUse: true
                });
            data.countContent = Web_Product.find(selector).count();
            return data;
        }
    },
    downloadPlantTemplate(accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            const styles = {
                mainHeader: {
                    alignment: {
                        horizontal: 'center',
                        vertical: 'center'
                    },
                    font: {
                        color: {
                            rgb: '000000'
                        },
                        sz: 18,
                        bold: true,
                        underline: true
                    }
                },
                headerDark: {
                    border: {
                        top: {
                            style: 'thin',
                            color: {rgb: "000000"}
                        }, right: {
                            style: 'thin',
                            color: {rgb: "000000"}
                        }, left: {
                            style: 'thin',
                            color: {rgb: "000000"}
                        }, bottom: {
                            style: 'thin',
                            color: {rgb: "000000"}
                        }
                    },
                    // fill: {
                    //     fgColor: {
                    //         rgb: 'FF000000'
                    //     }
                    // },
                    font: {
                        color: {
                            rgb: '000000'
                        },
                        sz: 11,
                        bold: true,
                    }
                },
                cellPink: {
                    fill: {
                        fgColor: {
                            rgb: 'FFFFCCFF'
                        }
                    }
                },
                cellGreen: {
                    fill: {
                        fgColor: {
                            rgb: 'FF00FF00'
                        }
                    }
                },
                cellHeight: {
                    height: 50
                }
            };
            //for style info go to https://www.npmjs.com/package/xlsx-style#style


            //Array of objects representing heading rows (very top)
            const heading = [];

            //Here you specify the export structure
            const specification = {
                /*_id: { // <- the key should match the actual data key
                    displayName: '_id', // <- Here you specify the column header
                    headerStyle: styles.headerDark, // <- Header style
                    width: 200, // <- width in pixels,
                    cellStyle: styles.cellHeight
                },*/
                code: {
                    displayName: 'Code',
                    headerStyle: styles.headerDark,
                    width: 100
                },
                enName: {
                    displayName: 'EnglishName',
                    headerStyle: styles.headerDark,
                    width: 500
                },
                khName: {
                    displayName: 'KhmerName',
                    headerStyle: styles.headerDark,
                    width: 500
                },
                minPrice: {
                    displayName: 'MinPrice',
                    headerStyle: styles.headerDark,
                    width: 100
                },
                maxPrice: {
                    displayName: 'MaxPrice',
                    headerStyle: styles.headerDark,
                    width: 100
                },
                currency: {
                    displayName: 'Currency',
                    headerStyle: styles.headerDark,
                    width: 100
                },
                description: {
                    displayName: 'Description',
                    headerStyle: styles.headerDark,
                    width: 500
                },
                plantType: {
                    displayName: 'PlantType',
                    headerStyle: styles.headerDark,
                    width: 500
                },
                plantLifeStyle: {
                    displayName: 'PlantLifeStyle',
                    headerStyle: styles.headerDark,
                    width: 500
                },
                plantRoom: {
                    displayName: 'PlantRoom',
                    headerStyle: styles.headerDark,
                    width: 500
                },
                plantGift: {
                    displayName: 'PlantGift',
                    headerStyle: styles.headerDark,
                    width: 500
                },
                size: {
                    displayName: 'Size',
                    headerStyle: styles.headerDark,
                    width: 500
                },
                light: {
                    displayName: 'Light',
                    headerStyle: styles.headerDark,
                    width: 500
                },
                care: {
                    displayName: 'Care',
                    headerStyle: styles.headerDark,
                    width: 500
                },

                url: {
                    displayName: 'Url',
                    headerStyle: styles.headerDark,
                    width: 300
                },
                urlList: {
                    displayName: 'UrlList',
                    headerStyle: styles.headerDark,
                    width: 600
                },


            }

            // Create the excel report.
            // This function will return Buffer
            const report = excel.buildExport(
                [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
                    {
                        name: 'PlantTemplate', // <- Specify sheet name (optional)
                        heading: heading, // <- Raw heading array (optional)
                        // merges: merges, // <- Merge cell ranges
                        specification: specification, // <- Report specification
                        data: [{
                            code: "L001",
                            enName: "LARGE PHALAENOPSIS ORCHID: BLUE",
                            khName: "ផ្កាអ័រគីដេ PHalaenopsis ធំ៖ ខៀវ",
                            minPrice: 30,
                            maxPrice: 45,
                            currency: "USD",
                            description: "Requires just 3 ice cubes a week",
                            plantType: "Orchids,Floor Plants",
                            plantLifeStyle: "Zodiac Plant,Feng Shui Plant",
                            plantRoom: "Office Plant,Bedroom Plant,Kitchen Plant",
                            plantGift: "Birthday Collection,Gift For Parent",
                            size: "small,medium,large",
                            light: "lowLight,indirectLight,directLight",
                            care: "easy,moderate,advanced",
                            url: "http://linkImage",
                            urlList: "link1,link2,link3",

                        }]
                    }
                ]
            );
            return report

        }
    },
    web_insertProduct(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = Web_Product.insert(doc);
                if (id) {
                    GlobalFn.collectionReact(Web_ProductReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_uploadProduct(dataList, branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = "";
                dataList.forEach((d) => {
                    let doc = {};
                    let oldPro = Web_Product.findOne({code: d.Code});
                    if (!oldPro || d.Code === "" || d.Code === undefined) {
                        doc.branchId = branchId;
                        doc.title = {
                            en: d.EnglishName || " ",
                            km: d.KhmerName || " ",
                            cn: d.EnglishName || " ",

                        };
                        doc.body = {
                            en: d.Description || " ",
                            km: d.Description || " ",
                            cn: d.Description || " ",

                        };
                        doc.code = d.Code || '';
                        doc.minPrice = d.MinPrice || '';
                        doc.maxPrice = d.MaxPrice || '';
                        doc.currency = d.Currency || '';
                        doc.size = d.Size ? d.Size.split(",") : [];
                        doc.light = d.Light ? d.Light.split(",") : [];
                        doc.care = d.Care ? d.Care.split(",") : [];
                        doc.url = d.Url || "";
                        doc.urlList = d.UrlList ? d.UrlList.split(",") : [];

                        doc.plantTypeId = [];
                        doc.plantLifeStyleId = [];
                        doc.plantGiftId = [];
                        doc.plantRoomId = [];
                        if (d.PlantType) {
                            d.PlantType.split(",").forEach((ob) => {
                                if (ob !== "" && ob !== undefined && ob !== null) {
                                    let tDoc = Web_PlantType.findOne({"title.en": ob});
                                    if (tDoc) {
                                        doc.plantTypeId.push(tDoc._id);
                                    } else {
                                        let tD = {};
                                        tD.title = {
                                            en: ob,
                                            km: "",
                                            cn: ""
                                        }
                                        tD.body = {
                                            en: "",
                                            km: "",
                                            cn: ""
                                        }
                                        tD.branchId = branchId;

                                        let idI = Web_PlantType.insert(tD);
                                        doc.plantTypeId.push(idI);
                                    }
                                }
                            })
                        }
                        if (d.PlantLifeStyle) {
                            d.PlantLifeStyle.split(",").forEach((ob) => {
                                if (ob !== "" && ob !== undefined && ob !== null) {

                                    let tDoc = Web_PlantLifeStyle.findOne({"title.en": ob});
                                    if (tDoc) {
                                        doc.plantLifeStyleId.push(tDoc._id);
                                    } else {
                                        let tD = {};
                                        tD.title = {
                                            en: ob,
                                            km: "",
                                            cn: ""
                                        }
                                        tD.body = {
                                            en: "",
                                            km: "",
                                            cn: ""
                                        }
                                        tD.branchId = branchId;

                                        let idI = Web_PlantLifeStyle.insert(tD);
                                        doc.plantLifeStyleId.push(idI);
                                    }
                                }
                            })
                        }
                        if (d.PlantRoom) {
                            d.PlantRoom.split(",").forEach((ob) => {
                                if (ob !== "" && ob !== undefined && ob !== null) {

                                    let tDoc = Web_PlantRoom.findOne({"title.en": ob});
                                    if (tDoc) {
                                        doc.plantRoomId.push(tDoc._id);
                                    } else {
                                        let tD = {};
                                        tD.title = {
                                            en: ob,
                                            km: "",
                                            cn: ""
                                        }
                                        tD.body = {
                                            en: "",
                                            km: "",
                                            cn: ""
                                        }
                                        tD.branchId = branchId;

                                        let idI = Web_PlantRoom.insert(tD);
                                        doc.plantRoomId.push(idI);
                                    }
                                }
                            })
                        }

                        if (d.PlantGift) {
                            d.PlantGift.split(",").forEach((ob) => {
                                if (ob !== "" && ob !== undefined && ob !== null) {

                                    let tDoc = Web_PlantGift.findOne({"title.en": ob});
                                    if (tDoc) {
                                        doc.plantGiftId.push(tDoc._id);
                                    } else {
                                        let tD = {};
                                        tD.title = {
                                            en: ob,
                                            km: "",
                                            cn: ""
                                        }
                                        tD.body = {
                                            en: "",
                                            km: "",
                                            cn: ""
                                        }
                                        tD.branchId = branchId;
                                        let idI = Web_PlantGift.insert(tD);
                                        doc.plantGiftId.push(idI);
                                    }
                                }
                            })
                        }

                        id = Web_Product.insert(doc);
                    }

                });

                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_viewProduct(id, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isUpdate = Web_Product.update({_id: id}, {$inc: {view: 1}});

                return isUpdate;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    web_updateProduct(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Web_Product.findOne({_id: id});
                let isUpdated = Web_Product.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Web_ProductReact, id, Web_ProductAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_updateProductPrice(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let rawDoc = doc;
                let oldDoc = Web_Product.findOne({_id: id});
                let isUpdated = Web_Product.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Web_ProductReact, id, Web_ProductAudit, oldDoc, "Update");
                    let productPriceDoc = Web_ProductPrice.findOne({productId: id, date: doc.date});
                    if (productPriceDoc) {
                        Web_ProductPrice.update({productId: id, date: doc.date}, {$set: {price: doc.price}});
                    } else {
                        rawDoc.productId = id;
                        Web_ProductPrice.insert(rawDoc);
                    }
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_removeProduct(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Web_Product.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(Web_ProductReact, doc._id, Web_ProductAudit, doc, "Remove");
                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findProduct(branchId, accessToken, params) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                if (params.size) {
                    selector.size = params.size;
                }
                if (params.light) {
                    selector.light = params.light;
                }
                if (params.care) {
                    selector.care = params.care;
                }
                if (params.plantTypeId) {
                    selector.plantTypeId = params.plantTypeId;
                }
                if (params.plantLifeStyleId) {
                    selector.plantLifeStyleId = params.plantLifeStyleId;
                }

                if (params.plantGiftId) {
                    selector.plantGiftId = params.plantGiftId;
                }
                if (params.plantRoomId) {
                    selector.plantRoomId = params.plantRoomId;
                }

                selector.branchId = branchId;
                return Web_Product.find(selector, {sort: {createdAt: 1}}).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findProductById(id, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                selector._id = id;
                return Web_Product.findOne(selector);

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_findTopTrendProduct(branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                selector.branchId = branchId;
                let list = Web_Product.find(selector, {sort: {view: -1, createdAt: 1}, limit: 50}).fetch();
                return list;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    web_fetchProductWithFilter({q, params, options = {limit: 500, skip: 0}, branchId, accessToken}) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {

            let selector = {};
            let sortObj = {};
            if (params.sortBy) {
                sortObj = params.sortBy;
            } else {
                sortObj = {createdAt: -1};
            }
            if (!!q) {
                let reg = new RegExp(q);

                selector.$or = [
                    {"title.en": {$regex: reg, $options: 'mi'}},
                    {"title.km": {$regex: reg, $options: 'mi'}},
                    {"title.cn": {$regex: reg, $options: 'mi'}},
                    {"body.en": {$regex: reg, $options: 'mi'}},
                    {"body.km": {$regex: reg, $options: 'mi'}},
                    {"body.cn": {$regex: reg, $options: 'mi'}},
                    {code: {$regex: reg, $options: 'mi'}},
                ];

            }
            if (params.price) {
                selector.$or = params.price;
            }

            if (params.care) {
                selector.care = params.care;
            }

            if (params.light) {
                selector.light = params.light;
            }

            if (params.size) {
                selector.size = params.size;
            }

            if (params.plantTypeId) {
                selector.plantTypeId = params.plantTypeId;
            }
            if (params.plantLifeStyleId) {
                selector.plantLifeStyleId = params.plantLifeStyleId;
            }
            if (params.plantGiftId) {
                selector.plantGiftId = params.plantGiftId;
            }
            if (params.plantRoomId) {
                selector.plantRoomId = params.plantRoomId;
            }

            selector.branchId = branchId;
            let data = Web_Product.aggregate([
                    {
                        $match: selector
                    }
                    ,
                    {
                        $sort: sortObj
                    },

                    {
                        $limit: options.limit
                    },
                    {
                        $skip: options.skip
                    },
                ],
                {
                    allowDiskUse: true
                });
            return data;
        }
    },

})


//Unique

Web_Product._ensureIndex({
    title: 1,
    body: 1,
    order: 1,
    branchId: 1
}, {unique: 1, name: "Web_ProductUnique"});