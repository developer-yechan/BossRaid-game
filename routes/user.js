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
 *                        {
 *                            "totalScore": 60,
 *                            "bossRaidHistory": [
 *                                {
 *                                    "raidRecordId": "3efc39bd-b597-43a4-9b81-7156a12c3186",
 *                                    "score": 20,
 *                                    "enterTime": "2022-09-20T07:37:23.727Z",
 *                                    "endTime": "2022-09-20T16:37:32+09:00"
 *                                },
 *                                {
 *                                    "raidRecordId": "465a3549-f83f-4fca-9cfd-a53987f9f169",
 *                                    "score": 20,
 *                                    "enterTime": "2022-09-20T07:34:41.913Z",
 *                                    "endTime": "2022-09-20T16:34:52+09:00"
 *                                }
 *                            ]
 *                        }
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
