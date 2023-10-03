const {DbUsers , Posts} = require('../models/relations')
const AWS = require('aws-sdk');
const sequelize = require('../utils/db');
const s3 = new AWS.S3();
require('dotenv').config()


const createPost = async (request , response , next ) =>{
    const { title  , description, userId } = request.body;
    const { filename, path } = request.file;
    let t ;
    try {
        
        t = await sequelize.transaction();
        const user = await DbUsers.findByPk(userId)

        if (!user){
            return response.json({
                message :'User not found '
            })
        }

        const s3Params = {
          Bucket:process.env.BUCKETNAME ,
          Key: filename,
          Body: require('fs').createReadStream(path),
        };
    
        const s3Response = await s3.upload(s3Params).promise();
    
        const newPost = await Posts.create({
          postTitle : title,
          filename: s3Response.Key,
          filepath: s3Response.Location,
          postDescription : description,
          userId : userId 
        } , { transaction : t });
        await user.addPosts(newPost , { transaction : t })
        await user.save()
        await t.commit();

        response.json({
            message :'POst created succefully '
        });

      } catch (error) {
        console.error('Error uploading newPost:', error);
        await t.rollback();
        res.status(500).json({ error: 'Failed to upload video' });
      }
}


module.exports = {
    createPost
}