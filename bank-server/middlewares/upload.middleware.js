import multer from "multer";
import ApiError from "../utils/apiError.utils.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        return cb(null, true);
    }

    cb(
        new ApiError(
            400,
            "Only JPG, JPEG, PNG and WEBP images are allowed."
        )
    );
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});