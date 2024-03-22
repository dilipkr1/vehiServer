const express = require("express")
const router = express.Router();
const { post_package, get_package, update_package, delete_package } = require("../controllers/packageController");
  
router.post("/create-package", post_package)
router.get("/get-package", get_package)
router.put("/update-package/:id", update_package)
router.delete("/delete-package/:id", delete_package)

module.exports = router


