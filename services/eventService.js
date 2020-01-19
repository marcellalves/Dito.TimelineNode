require('dotenv').config()
const https = require('https')

function eventService() {
    function getEvents(callback) {
        https.get('https://storage.googleapis.com/dito-questions/events.json',(res) => {
            let body = "";
        
            res.on("data", (chunk) => {
                body += chunk;
            });
        
            res.on("end", () => {
                try {
                    callback(body);
                } catch (error) {
                    console.error(error.message);
                };
            });
        
        }).on("error", (error) => {
            console.error(error.message);
        });
    }

    return { getEvents }
}

module.exports = eventService();