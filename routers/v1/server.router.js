const express = require('express');
const serviceController = require('../../controller/service.router');
const limiter = require('../../middelware/limiter');
const viewCount = require('../../middelware/viewCount');
const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("Services found")
// })

// router.post("/", (req, res) => {
//     res.send("data is success full ")
// })

router
    .route('/')
    /**
   * @api {get} /tools save a Services
   * @apiDescription Get all the services
   * @apiPermission user 
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
    .get(serviceController.getAllService)

    /**
   * @api {post} /tools save a service
   * @apiDescription Get all the services
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
    .post(serviceController.getPostService)
router.route("/:id")
.get(viewCount, limiter, serviceController.getServiceDetail)
.patch(serviceController.updateService)
.delete(serviceController.deleteService)
module.exports = router;