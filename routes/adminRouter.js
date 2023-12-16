const express = require("express");
const router = new express.Router();
const {
  approveUser,
  disapproveUser,
} = require("../controllers/adminApprovalController");

router.put("/approve/:email", approveUser);
router.delete("/disapprove/:email", disapproveUser);

module.exports = router;
