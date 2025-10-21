import {Meteor} from 'meteor/meteor';
import GlobalFn from "../../imports/libs/globalFn"
import {Web_Product, Web_ProductReact, Web_ProductAudit} from "../../imports/collections/product"
import {Web_ProductPrice} from "../../imports/collections/productPrice";
import {Web_Media} from "../../imports/collections/media";

let secret = Meteor.settings.private.secret;
Meteor.methods({
  async  web_fetchProduct({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken, userId}) {
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

            selector.branchId=branchId;
            const rawCollection = Web_Product.rawCollection();
            data.content =await rawCollection.aggregate([
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
                }).toArray();
            data.countContent = Web_Product.find(selector).count();
            return data;
        }
    },
   async web_productPriceReport(branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let data = {};
                let dataHtml = "";
                let selector = {};
                selector.branchId = branchId;
                selector.date = {$gte: moment(moment().add(-2, "months").toDate()).format("YYYY-MM")};

                let monthList = [];
                // let m = 8;
                // while (m > 0) {
                //     let newM = 6 - m;
                //     monthList.unshift(moment(moment().add(-newM, "months").toDate()).format("YYYY-MM"));
                //     m--;
                // }
                const rawCollection = Web_ProductPrice.rawCollection();
                let dList =await rawCollection.aggregate([
                        {
                            $match: selector
                        },
                        {
                            $sort: {
                                date: 1
                            }
                        },
                        {
                            $group: {
                                _id: "$date"
                            }
                        },
                    ],
                    {
                        allowDiskUse: true
                    }).toArray();
                dList.forEach((d) => {
                    monthList.push(d._id);
                })

                let productList =await Web_ProductPrice.rawCollection().aggregate([
                        {
                            $match: selector
                        },
                        {
                            $sort: {
                                date: 1
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    productId: "$productId",
                                },
                                data: {$addToSet: "$$ROOT"},
                            }
                        },
                        {
                            $lookup:
                                {
                                    from: "web_product",
                                    localField: "_id.productId",
                                    foreignField: "_id",
                                    as: "productDoc"
                                }
                        },
                        {
                            $unwind: {
                                path: "$productDoc",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $sort: {
                                "productDoc.order": 1
                            }
                        },
                    ],
                    {
                        allowDiskUse: true
                    }).toArray();

                productList.forEach((obj, ind) => {
                    dataHtml += `
                        <tr>
                            <td>${ind + 1}</td>
                            <td style="text-align: left">${obj.productDoc.title.en}</td>
                            
                    `;
                    monthList.forEach((mon) => {
                        let priceDoc = obj.data.find(t => t.date === mon);

                        dataHtml += `
                            <td>${priceDoc && priceDoc.price || ""}</td>
                        `;
                    })

                    dataHtml += `
                        </tr>
                    `;

                })
                data.monthList = monthList;
                data.dataHtml = dataHtml;
                return data;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
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
    web_findProduct(branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};

                selector.branchId = branchId;
                return Web_Product.find(selector, {sort: {order: 1}}).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
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