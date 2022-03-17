import multer from 'multer'
import createError from 'http-errors'

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, '/src/images')
  },
  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const fileUpload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000 // 10000000 Bytes = 10 MB
  },
  fileFilter(_, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format

      return cb(
        createError(404, `Please upload a Image with format 'png' or 'jpg'.`)
      )
    }
    cb(null, true)
  }
})
