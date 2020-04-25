const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");

const AWS = require('aws-sdk');
const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;

const BUCKET_NAME = 'chefsimages';
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

let system = express.Router();
const ping = require("./ping");
// const postUpload = require('./postUpload');

const chatkit = require('../../lib/ChatKit');

system.get("/ping", ping);

system.get('/callback_stripe_connect', async (req, res) => {
  const {error, error_description, code} = req.query;

  if (error){
    console.log("Stripe Error", error);
    throw new Error('Upload Failed: ', error_description);
  }

  stripe.oauth.token({
    grant_type: 'authorization_code',
    code,
  }).then(function(response) {
    res.status(201).json({
      success: true,
      msg: 'You have successfully connect with stripe. Don\'t lose this id',
      data: [{
        stripe_account: response.stripe_user_id
      }]
    })
  });

})
system.get("/chatkit", (req, res)=>{
  const {room_id, creator, name} = req.param
  chatkit.createRoom({
    id: room_id,
    creatorId: creator,
    name: name
  })
    .then(() => {
      console.log('Room created successfully');
      res.status(201).json({
        success: true,
      msg: 'Room created successfully. Don\'t lose this id'
      })
    }).catch((err) => {
      console.log(err);
    });
})
system.post("/pay",(req, res) => {
  //TODO: check if all info is given
  try {
    return stripe.charges
      .create({
        amount: req.body.amount, // Unit: cents
        currency: req.body.currency,
        source: req.body.tokenId,
        description: req.body.description,
      }, {
        stripe_account: req.body.stripe_account,
      })
      .then(result => res.status(200).json(result));
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "There was a problem with stripe or your inputs.",
      errors: [{ error: error.message, trace: error.trace }]
    });
  }
});
system.post("/upload", multerUploads, async (req, res) => {
  try {
    const cloudImage = req.file.buffer;
    const fileName = req.file.originalname;
    const s3Params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: cloudImage,
    }

    s3.putObject(s3Params, function (err, resp) {
      if (err) {
        console.log("Upload Error", err);
        throw new Error('Upload Failed: ', err.message);
      } if (resp) {
        console.log('Successfully uploaded package.');

        s3.getSignedUrl('putObject', {
          Bucket: BUCKET_NAME,
          Key: fileName,
          ACL: 'public-read'}, (err, data) => {
          if(err){
            console.log(err);
            return res.end();
          }
          console.log('Successfully retrieved url.');
          res.status(201).json({
            success: true,
            msg: 'You have successfully uploaded the image',
            data: [{
                image_name: fileName,
                signedRequest: data,
                url: `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`
            }]
          })
        });

      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "There was a problem uploading.",
      errors: [{ error: error.message, trace: error.trace }]
    });
  }
});

module.exports = system;
