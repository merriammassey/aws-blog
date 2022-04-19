// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
//create a unique bucket name with uuidv4s
const { v4: uuidv4 } = require("uuid");
// Set the region
AWS.config.update({ region: "us-east-2" });
// Create S3 service object - ensure that the API library by specifying the API version
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Create the parameters for calling createBucket to assign bucket metadata
var bucketParams = {
  Bucket: "user-images-" + uuidv4(),
};

//create s3 bucket
// call S3 to create the bucket
s3.createBucket(bucketParams, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success");
  }
});
