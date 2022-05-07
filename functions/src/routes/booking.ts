const bookingRouter = require("express").Router();

let booking_controller = require("../controllers/bookingController");

bookingRouter.get("/", booking_controller.sendEmail);

module.exports = bookingRouter;
