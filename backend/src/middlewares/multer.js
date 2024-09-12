const multer = require('multer');
// console.log('called')
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        console.log('file name', file)
        return cb(null, file.originalname)
    }
})



const upload = multer({ storage })
module.exports = upload