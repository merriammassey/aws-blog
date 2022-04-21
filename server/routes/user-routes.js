const express = require("express");
const router = express.Router();
// configure service interface object
const AWS = require("aws-sdk");
const { stringify } = require("uuid");
const awsConfig = {
  region: "us-east-2",
};
AWS.config.update(awsConfig);
//connect with local DynamoDB instance and DocumentClient class to use native JS objects to interface with dynamodb service object
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = "Thoughts";

// Access all thoughts
router.get("/users", (req, res) => {
  const params = {
    TableName: table,
  };
  //scan return all items in table
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      //data in table is Items property of response
      res.json(data.Items);
    }
  });
});

// get all thoughts for specific user, get to profile page by selecting name of user on homepage
router.get("/users/:username", (req, res) => {
  console.log(`Querying for thought(s) from ${req.params.username}.`);

  const params = {
    TableName: table,
    // specify search criteria - filter query
    KeyConditionExpression: "#un = :user",
    // DynamoDB aliases are best practice to avoid list of reserved words like time/date/user/data
    ExpressionAttributeNames: {
      "#un": "username",
      "#ca": "createdAt",
      "#th": "thought",
      "#img": "image",
    },
    //use the username selected by user to determine condition of search
    ExpressionAttributeValues: {
      ":user": req.params.username,
    },
    // determine which attributes or columns will be returned (similar to SELECT in SQL)
    // return thoughts and createdAt
    ProjectionExpression: "#th, #ca",
    // specify order for sort key - descending
    ScanIndexForward: false,
  };

  // use service interface object and query method to retrieve thoughts
  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err); // an error occurred
    } else {
      console.log("Query succeeded.");
      res.json(data.Items);
    }
  });
});

// create new thought at /api/users
router.post("/users", (req, res) => {
  //set params object to form data in ThoughtForm, accessed with req.body
  const params = {
    TableName: table,
    Item: {
      username: req.body.username,
      createdAt: Date.now(),
      thought: req.body.thought,
      image: req.body.image,
    },
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      ),
        res.status(500).json(err);
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      res.json({ Added: JSON.stringify(data, null, 2) });
    }
  });
});
module.exports = router;
