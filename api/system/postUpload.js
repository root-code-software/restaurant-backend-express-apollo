const AWS = require('aws-sdk');
const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;

const BUCKET_NAME = 'chefsimages';
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

module.exports = (req, res) => {
    try {
        console.log('incoming',  req.body, req.files )
        const cloudImage = req.files.image.path
        const { image_name, user_id } = req.body;

        s3.putObject({
            Bucket: BUCKET_NAME,
            Key: image_name,
            Body: cloudImage,
          },function (resp) {
            console.log(arguments);
            console.log('Successfully uploaded package.');
            console.log(resp, resp.Location)
            res.status(201).json({
                success: true,
                msg: 'You have successfully uploaded the image',
                data: [{
                    image_name,
                    url: resp.Location,
                    image_id: image_name
                }]
            })
          });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'There was a problem with aws s3.',
            errors: [{ error: error.message, trace: error.trace }]
        })
    }
}