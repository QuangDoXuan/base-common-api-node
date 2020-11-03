'use strict';

import config from '../config';
const format = require('string-format');
const _ = require('lodash');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
    // endpoint: wasabiEndpoint,
    secretAccessKey: config.awsUpload.secretAccessKey,
    accessKeyId: config.awsUpload.accessKeyId,
    region: config.awsUpload.region,
});
export const multerMidle = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.awsUpload.bucket,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + file.originalname);
        }
    })
});
export const renameObject = (oldKey, newKey) => {
    try {
        oldKey = oldKey.substr(1);
        newKey = newKey.substr(1);
        const BUCKET_NAME = config.awsUpload.bucket;
        // Copy the object to a new location
        s3.copyObject({
            Bucket: BUCKET_NAME,
            CopySource: `/${BUCKET_NAME}/${oldKey}`,
            Key: newKey
        }).promise().then(() =>
            //Delete the old object
            s3.deleteObject({
                Bucket: BUCKET_NAME,
                Key: oldKey
            }).promise().then(() => {

            })
        ).catch((e) => console.log(e));
    } catch (e) {
        console.log(e);
    }
}
export const emoveObject = (objects) => {
    try {
        console.log(objects);
        const BUCKET_NAME = config.awsUpload.bucket;
        s3.deleteObjects({
            Bucket: BUCKET_NAME,
            Delete: {
                Objects: objects
            }
        }).promise().then(() => {
            console.log('ok');
        });
    } catch (e) {
        console.log(e);
    }
}
export const removeKey = (key: string) => {
    try {
        if (key.startsWith('/'))
            key = key.substr(1);
        const BUCKET_NAME = config.awsUpload.bucket;
        s3.deleteObject({
            Bucket: BUCKET_NAME,
            Key: key
        }).promise().then(() => {

        });
    } catch (e) {
        console.log(e);
    }
}

export const awsThumbFormat = (img: string) => {
    // if (!img && config.avatar.default)
    //     return format('{0}/{1}', config.awsUpload.downloadUrl, config.avatar.default);

    if (img && img != "" && !img.startsWith("http"))
        //return format('{0}/{1}x{2}/{3}', config.awsUpload.downloadUrl, w, h, img);
        return format("{0}{1}", config.awsUpload.downloadUrl, img);
    return img;
}