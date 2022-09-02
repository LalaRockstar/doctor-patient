const express = require("express");
const { isLoggedIn } = require("../controllers/authController");
const {
  dashboard,
  login,
  appointments,
  patients,
  reports,
  pescriptions,
  invoices,
  index,
} = require("../controllers/viewController");
const router = express.Router();

router.use(isLoggedIn);
router.get("/dashboard", dashboard);
router.get("/", index);
router.get("/booking/appointments", appointments);
router.get("/patients", patients);
router.get("/reports", reports);
router.get("/reports", reports);
router.get("/pescriptions", pescriptions);
router.get("/bills", invoices);
router.get("/login", login);

module.exports = router;
