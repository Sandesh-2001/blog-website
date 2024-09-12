const asyncErrorHandler = require('../utils/async-error-handler');

const cloudinary = require('cloudinary').v2;

const uploadCloudinary = asyncErrorHandler(async (req, res, next) => {
    // console.log("dir LL", __dirname)
    let indexOfSrc = __dirname.indexOf('src');
    let path = __dirname.substring(0, indexOfSrc - 1);
    // console.log("path=++", path)
    console.log('req file ====>>>', req)
    const { public_id, url, secure_url } = await cloudinary.uploader.upload(`${path}/uploads/${req.file.filename}`, { folder: 'blogs' })
    req.body = { ...req.body, coverPhoto: { public_id, url, secure_url } }
    next();
})

module.exports = { uploadCloudinary }