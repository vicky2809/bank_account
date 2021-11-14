const express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://localhost:27017/bank_account";
const DATABASE_NAME = "bank_account";

var app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("customer");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});


//creating bank account.
app.post("/createAccount", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        return response.send(result);
    });
});

//Retrieve bank account details
app.get("/getAccountDetails", (request, response) => {
    collection.find(request.body).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//Updating bank account details.
app.put("/updateUser", (request, response) => {
    var AGE = {"age":request.body.age}
    var NAME = {"account_holder_name":request.body.account_holder_name}
    collection.updateOne(NAME,{$set:AGE},(error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//Delete bank account details.
app.delete("/deleteUser", (request, response) => {
    collection.deleteOne(request.body,(error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});