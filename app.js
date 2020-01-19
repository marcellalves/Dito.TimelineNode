const MongoClient = require('mongodb').MongoClient;
const timelineRepo = require('./repos/timelineRepo');

const url = 'mongodb://localhost:27017'
const dbName = 'EventDB'

async function main() {
    const client = new MongoClient(url);
    await client.connect();

    try {   
        const events = await timelineRepo.loadTimeline();
        console.log(events);
    } catch (error) {
        console.log(error)
    } finally {
        client.close();
    }
}

main();