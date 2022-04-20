const AWS = require("aws-sdk");

// modify aws config object to connect DynamoDB to local instance
AWS.config.update({
  region: "us-east-2",
});

// create DynamoDB interface object using DynamoDB class
// specify API version to ensure API library is compatible with commands
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// create params object
const params = {
  TableName: "Thoughts",
  // define only keys, not other attributes like thoughts, because nonrelational db
  KeySchema: [
    { AttributeName: "username", KeyType: "HASH" }, // Partition key
    { AttributeName: "createdAt", KeyType: "RANGE" }, // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "username", AttributeType: "S" }, // string
    { AttributeName: "createdAt", AttributeType: "N" }, // number
  ],
  // reserve a maximum write and read capacity of the database, which is how AWS factors in pricing
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

// make call to DynamoDB instance and create table
dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
