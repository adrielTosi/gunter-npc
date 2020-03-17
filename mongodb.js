const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "gunter-npc-db";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);

    db.collection("npcs").insertMany(
      [
        {
          name: "Gunter",
          occupation: "Fighter",
          history: "Many details inside.."
        },
        { name: "Zee", occupation: "Thief", history: "steal many things" }
      ],
      (err, result) => {
        if (err) {
          return console.log("Not possible to add", err);
        }
        console.log(result.ops);
      }
    );
  }
);
