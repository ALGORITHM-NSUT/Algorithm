import multer from 'multer'
const storage = multer.memoryStorage()  // store image in memory
const upload = multer({ storage: storage })

export default upload;