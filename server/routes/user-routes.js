const express = require("express");
const router = express.Router();
// configure service interface object
const AWS = require("aws-sdk");
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

module.exports = router;
