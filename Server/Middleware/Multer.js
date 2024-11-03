import multer from 'multer';
import path from 'path';

// Configure storage options for PDF files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents'); // Set your desired upload directory for PDFs
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// Set multer options
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: fileFilter,
});

// Middleware function to handle single PDF upload
const uploadPDF = upload.single('document'); // 'document' is the field name expected in the form

export default uploadPDF;