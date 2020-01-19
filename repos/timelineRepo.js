require('dotenv').config()

const { MongoClient } = require("mongodb");

function timelineRepo() {
    function loadTimeline() {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient('mongodb://mongo:27017');
            try {
                await client.connect();
                const db = client.db('EventDB');

                var timeline = await db.collection('events').aggregate([
                    { $unwind : "$events" },
                    { $addFields: { custom_data: { $arrayToObject: "$events.custom_data" } } },
                    { 
                        $project: { 
                                    event: "$events.event",
                                    timestamp: "$events.timestamp",
                                    transaction_id: "$custom_data.transaction_id",
                                    revenue: { revenue: "$events.revenue" },
                                    store: { store_name: "$custom_data.store_name" },
                                    products: {
                                                name: "$custom_data.product_name",
                                                price: "$custom_data.product_price"
                                            }
                            } 
                    },
                    { 
                        $group: { 
                                _id: "$transaction_id", 
                                timestamp: { $first: "$timestamp" },
                                revenue: { $mergeObjects: "$revenue" },
                                store: { $mergeObjects: "$store" },
                                products: { $push: "$products" } } 
                    },
                    { $sort: { timestamp: -1 } }
                ]).toArray();

                resolve(timeline);
                client.close();
            } catch (error) {
                reject(error);
            }
        });
    }

    return { loadTimeline }
}

module.exports = timelineRepo();