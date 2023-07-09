const multer = require('multer');
const path = require('node:path');

// const fileFilter = (req, file, next) => {
//     if (
//         file.mimetype === 'image/png' ||
//         file.mimetype === 'image/jpg' ||
//         file.mimetype === 'image/jpeg'
//     ) {
//         next(null, true);
//     } else {
//         req.fileValidationError = 'jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.';
//         next(new Error('errrofkdjflksj'), false);
//     }
// };

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
