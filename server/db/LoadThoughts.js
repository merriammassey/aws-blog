//run this file from root director with node ./server/db/LoadThoughts.js

// create interface with DynamoDB
const AWS = require("aws-sdk");
// use the file system package to read users.json
const fs = require("fs");

AWS.config.update({
  region: "us-east-2",
});
// use the DocumentClient class to create dynamodb service object
// use JS objects and return JS types, map objects which reduces impedance mismatching
const dynamodb = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

// use fs package to read users.json and assign object to allUsers constant
console.log("Importing thoughts into DynamoDB. Please wait.");
const allUsers = JSON.parse(
  fs.readFileSync("./server/seed/users.json", "utf8")
);

// loop over allUsers and create params object
allUsers.forEach((user) => {
  const params = {
    TableName: "Thoughts",
    //assign values from array elements in Item property
    Item: {
      username: user.username,
      createdAt: user.createdAt,
      thought: user.thought,
    },
  };

  // make call to database with service interface object, dynamodb
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to add thought",
        user.username,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("PutItem succeeded:", user.username);
    }
  });
});
