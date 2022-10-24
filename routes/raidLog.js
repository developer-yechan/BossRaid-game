const express = require("express");
const raidControllers = require("../controllers/raidLog");
const BossRaidEnd = require("../middlewares/BossRaidEnd");
const router = express();

router.post("/enter", raidControllers.createRaidHistory);
router.patch("/end", BossRaidEnd, raidControllers.endRaidHistory);
router.get("/:userId", raidControllers.getRaidRankings);
router.get("/", raidControllers.getRaidStatus);

/**
 * @swagger
 * paths:
 *   /api/bossraids/:userId:
 *    get:
 *      summary:  "보스레이드 랭킹 조회"
 *      description: "보스레이드 전체 및 유저 랭킹을 조회합니다."
 *      tags: [BossRaid]
 *      parameters :
 *         - in : path
 *           name : userId
 *           required : true
 *           description : 유저 id
 *           schema :
 *              type : String
 *      responses:
 *        "200":
 *          description: "보스레이드 전체 및 유저 랭킹을 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                           {
 *                               "ranking": [
 *                                   {
 *                                       "totalScore": "275",
 *                                       "userId": "1309c824-e8c9-49b7-9fd6-6eb9be2c1c17",
 *                                       "ranking": 0
 *                                   },
 *                                   {
 *                                       "totalScore": "94",
 *                                       "userId": "51d40b6f-2679-4aad-ad18-2a4388ed5462",
 *                                       "ranking": 1
 *                                   },
 *                                   {
 *                                       "totalScore": "94",
 *                                       "userId": "823d9563-6f06-4a03-8a2a-76e0aa3949d0",
 *                                        "ranking": 1
 *                                   },
 *                                   {
 *                                       "totalScore": "85",
 *                                       "userId": "1b89508c-35b1-4b7c-b413-93aa340ec4a4",
 *                                       "ranking": 2
 *                                    },
 *                                   {
 *                                       "totalScore": "47",
 *                                       "userId": "1c05d2fc-aec1-4c42-ba46-0213b126f8d6",
 *                                       "ranking": 3
 *                                   }
 *                               ],
 *                               "userRanking": {
 *                                   "totalScore": "94",
 *                                   "userId": "823d9563-6f06-4a03-8a2a-76e0aa3949d0",
 *                                   "ranking": 1
 *                               }
 *                           }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error:
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                  }
 *
 */

/**
 * @swagger
 * paths:
 *   /api/bossraids:
 *    get:
 *      summary:  "보스레이드 상태 조회"
 *      description: "보스레이드 상태를 조회합니다."
 *      tags: [BossRaid]
 *      responses:
 *        "200":
 *          description: "보스레이드 상태를 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                    {
 *                        "canEnter": true,
 *                        "enteredUserId": null
 *                    }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error:
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                  }
 *
 */

/**
 * @swagger
 * paths:
 *   /api/bossraids/enter:
 *    post:
 *      summary:  "보스레이드 시작"
 *      description: "보스레이드를 시작합니다."
 *      tags: [BossRaid]
 *      parameters :
 *         - in : body
 *           name : data
 *           required : true
 *           description : 생성할 데이터
 *           schema :
 *              type : object
 *              example :
 *                {userId: "1309c824-e8c9-49b7-9fd6-6eb9be2c1c17", level: 0}
 *      responses:
 *        "201":
 *          description: "보스레이드 입장 상태를 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                    {
 *                        "isEntered": true,
 *                        "raidRecordId": "465a3549-f83f-4fca-9cfd-a53987f9f169"
 *                    }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error:
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                  }
 *
 */

/**
 * @swagger
 * paths:
 *   /api/bossraids/end:
 *    patch:
 *      summary:  "보스레이드 종료"
 *      description: "보스레이드를 종료하고 정상 종료 시 보스레이드 기록을 생성하고 유저의 totalScore를 갱신합니다."
 *      tags: [BossRaid]
 *      parameters :
 *         - in : body
 *           name : data
 *           required : true
 *           description : 검증할 데이터
 *           schema :
 *              type : object
 *              example :
 *                {userId: "1309c824-e8c9-49b7-9fd6-6eb9be2c1c17", raidRecordId: "465a3549-f83f-4fca-9cfd-a53987f9f169"}
 *      responses:
 *        "200":
 *          description: "보스레이드 클리어"
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                           {
 *                               "message": "보스레이드 Lv.1 클리어"
 *                           }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error:
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                  }
 *
 */

module.exports = router;
