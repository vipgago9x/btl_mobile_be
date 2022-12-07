const jwt = require("jsonwebtoken");
const config = require("../configs/config");

module.exports.requireAuth = (req, res, next) => {
  if (req.originalUrl === "/v1/facility/activate-facility") {
    next();
  } else {
    try {
      if (!req.headers.authorization) {
        return res.status(401).send({
          ok: false,
          payload: null,
          message: "Unauthorized!",
        });
      }
      const payload = jwt.verify(
        req.headers.authorization.split(" ")[1],
        config.jwt_secret_key
      );
      if (req.originalUrl.startsWith("/v1/client") && !payload.facilityId) {
        return res.status(400).send({
          ok: false,
          payload: null,
          message: "This account does not belong to any facility!",
        });
      }
      req.body.currentUserId = payload.id;
      req.body.currentUserEmail = payload.email;
    } catch (e) {
      return res.status(401).send({
        ok: false,
        payload: null,
        message: e.message,
      });
    }
    next();
  }
};
