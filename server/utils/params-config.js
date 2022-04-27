//use uuid to create unique image file names
const { v4: uuidv4 } = require("uuid");

//receive fileName from Express route
const params = (fileName) => {
  //store fileName
  const myFile = fileName.originalname.split(".");
  //store file Type
  const fileType = myFile[myFile.length - 1];

  //define 3 properties of imageParams
  const imageParams = {
    // Replace the <My_Bucket_Name> with the name of your own S3 bucket
    Bucket: "user-images-9e064967-db5b-412b-84a7-d71d56c2ff82",
    Key: `${uuidv4()}.${fileType}`,
    //temporary storage container, which multer will remove
    Body: fileName.buffer,
  };

  return imageParams;
};

module.exports = params;
