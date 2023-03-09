const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinaryUpload = require("../../helper/cloudinary");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/upload/");
    },
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    },
});

const storageOnline = new CloudinaryStorage({
    cloudinary: cloudinaryUpload,
    params: {
        folder: "fazzpay",
        format: async (req, file) => "png",
        public_id: (req, file) => new Date().getTime(),
    },
});

const formUploadOnline = multer({
    storage: storageOnline, //test bisa atau ga
    fileFilter: (req, file, cb) => {
        // console.log(file);
        let formatType = path.extname(file.originalname);
        if (formatType == ".png" || formatType == ".jpg" || formatType == ".jpeg") {
            cb(null, true);
        } else {
            cb("image not valid", false);
        }
    },
    limits: {
        fileSize: 1048576 * 10, //10 mb
    },
});

module.exports = formUploadOnline