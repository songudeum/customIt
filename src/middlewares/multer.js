const multer = require('multer');
const path = require('node:path');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/image'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;
