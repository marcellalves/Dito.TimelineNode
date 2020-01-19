FROM mongo
COPY events.json /events.json
CMD mongoimport --host mongo --db EventDB --collection events --type json --drop --file /events.json