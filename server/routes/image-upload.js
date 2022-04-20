const express = require("express");
const router = express.Router();
const multer = require("multer"); //middleware for handling multipart/form-data, adding a file property on the req object
const AWS = require("aws-sdk");
const paramsConfig = require("../utils/params-config");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

//store the image data from form data received by POST route
// will receive only a single image
const upload = multer({ storage }).single("image");

//instantiate the service object s3 to communicate with the web service to upload to a bucket
const s3 = new AWS.S3({
  //avoid breaking due to default s3 version changes
  apiVersion: "2006-03-01",
});

//endpoint is api/image-upload
//use post method to transfer req body
// include upload function as second argument to define key and storage destination
router.post("/image-upload", upload, (req, res) => {
  // use params object in utils folder
  // retrieve image file req.file from route using multer
  // assign returned object from paramsConfig function to params object
  const params = paramsConfig(req.file);
  //s3 service call
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    // send data to client...data will contain the image file's metadata, including the URL, bucket name, file name, and more
    res.json(data);
  });
});

module.exports = router;
