const express = require("express");
const userController = require("../controllers/user");
const router = express();

router.post("/", userController.createUser);
router.get("/:id", userController.getUserRecord);

/**
 * @swagger
 * paths:
 *   /api/users:
 *    post:
 *      summary:  "유저 생성"
 *      description: "유저를 생성합니다."
 *      tags: [User]
 *      responses:
 *        "201":
 *          description: "생성된 userId를 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                          {
 *                               "userId": "af820931-cf3f-4713-818a-d765f752bba6"
 *                          }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error: [
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                     ]
 *                  }
 *
 */

/**
 * @swagger
 * paths:
 *   /api/users/:id:
 *    get:
 *      summary:  "유저 보스레이드 기록 조회"
 *      description: "유저의 보스레이드 기록을 조회합니다."
 *      tags: [User]
 *      parameters :
 *         - in : path
 *           name : id
 *           required : true
 *           description : 유저 id
 *           schema :
 *              type : String
 *      responses:
 *        "200":
 *          description: "유저의 보스레이드 기록을 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                           {
 *                               "totalScore": "94",
 *                               "bossRaidHistory": [
 *                                   {
 *                                       "raidRecordId": "215c2fb9-aa18-4745-9427-d8d60afe5812",
 *                                       "score": 47,
 *                                       "enterTime": "2022-09-21T11:47:59.000Z",
 *                                       "endTime": "2022-09-21T11:48:14.000Z"
 *                                   },
 *                                   {
 *                                       "raidRecordId": "aa50264c-5a67-4120-a0c5-b01f517deb91",
 *                                       "score": 47,
 *                                       "enterTime": "2022-09-21T11:46:24.000Z",
 *                                       "endTime": "2022-09-21T11:46:39.000Z"
 *                                   }
 *                               ]
 *                           }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error: [
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                     ]
 *                  }
 *
 */

module.exports = router;
