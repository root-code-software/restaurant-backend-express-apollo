const AWS = require('aws-sdk');
const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;

const BUCKET_NAME = 'test-bucket';
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

console.log(ID, SECRET)

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "eu-west-1"
    }
};

s3.listBuckets(function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
// s3.createBucket(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log('Bucket Created Successfully', data.Location);
// });