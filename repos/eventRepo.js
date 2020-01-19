require('dotenv').config()

const { MongoClient } = require("mongodb");
var eventService = require('../services/eventService');

function eventRepo() {
    const url = 'mongodb://mongo:27017';

    function addEvents() {
        const client = new MongoClient(url);
        try {
            await client.connect();
            const db = client.db('EventDB');

            eventService.getEvents(function(result) {
                console.log('eventRepo RESULT', result);
                db.collection('events').insertOne(JSON.parse(result), { forceServerObjectId: true });            
            });

            client.close(); 

        } catch (error) {
            console.log(error);
        }
    }

    return { addEvents }
}

module.exports = eventRepo();