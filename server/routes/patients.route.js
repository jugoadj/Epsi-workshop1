const router = require("express").Router();
// const multer = require('multer');

const clientConctroller = require("../controllers/patients.controller");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); 
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname); /
//     }
//   });
  
// const upload = multer({ storage: storage });
  

/**authentification */
router.post("/signup", clientConctroller.signUp)
router.post("/signup/code", clientConctroller.ValidateCode)

router.post("/login", clientConctroller.Login)



module.exports = router;