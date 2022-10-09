
# 🔗목차

[요구사항 분석](#-요구사항-분석)

[API 문서](#-api-문서)

[테스트 케이스](#-테스트-케이스)

[컨벤션](#-컨벤션)

[ERD](#-erd)

[폴더 구조](#-폴더-구조)

[패키지](#-패키지)

[기술 스택](#-기술-스택)

[트러블 슈팅](#-트러블-슈팅)

# 🚩 BossRaid Game service

** 보스레이드 게임 서비스 API **

### ✔ 기능 설명


- 유저를 생성할 수 있습니다.
- 유저를 조회 할 수 있습니다.
- 보스레이드 게임의 상태를 조회할 수 있습니다.
- 보스레이드 게임을 시작할 수 있습니다.
- 보스레이드 게임을 종료할 수 있습니다.
- 보스레이드 게임의 전체 랭킹과 나의 랭킹을 조회 할 수 있습니다.

### ✔ 구현한 요구사항
- 유저 생성 시 중복되지 않는 userId를 생성하고 응답 시 생성된 userId를 응답합니다.
- 유저 조회 시 해당 유저의 보스레이드 총 점수와 참여기록을 응답합니다.
- 보스레이드 상태 조회 시 요구사항 명세서의 입장 가능 조건에 따라 현재 보스레이드에 입장 가능한지 여부를 판별하고, 현재 진행중인 유저가 있을 경우 해당 유저의 Id를 응답합니다.
- 보스레이드 시작 시 레이드 시작이 가능하다면 중복되지 않는 raidRecordId를 생성하여 isEntered:true와 함께 응답하고 레이드 시작이 불가하다면 isEntered : false를 응답합니다.
- 보스레이드 종료 시 레이드 레벨에 따른 score를 반영합니다. 이 때 저장된 userId와 raidRecoridId 일치하지 않거나 시작한 시간으로부터 레이드 제한시간이 지났다면 예외 처리 합니다.
- 보스레이드 랭킹 조회시 보스레이드 totalScore 내림차순으로 랭킹을 조회합니다
- 랭킹 데이터는 레디스에 캐싱하여 구현 했습니다.
- 제공된 staticData는 레디스에 캐싱 했습니다.

    
# 📑 API 문서


[bossRaid_swagger.pdf](https://github.com/developer-yechan/BossRaid-game/files/9741747/bossRaid_swagger.pdf)


# 📜 테스트 케이스

- 추가 예정



# 💡 컨벤션

### ✔ camelCase / PascalCase

- **파일, 생성자, 변수, 메서드명**은 **camelCase**를 사용합니다.
- **클래스명**은 **PascalCase**를 사용합니다.

### ✔ Lint 규칙

| 들여쓰기 2칸 | 탭 사용 x |
| --- | --- |
| double quote 사용. | commonJS 사용 |
| 마지막 콤마 사용 | 한줄 최대 글자수: 80 |
| var는 사용하지 않습니다. | 세미 콜론 사용을 허용합니다. |

### ✔ 메서드명 규칙

- 전체조회는 복수형으로 작성합니다.

| 요청 내용  | service | repo |
| --- |--- | --- |
| 생성 | createPost | createPost |
| 조회 | readPost | findPost |
| 전체조회 | readPosts | findPosts |
| 수정 | updatePost | updatePost |
| 삭제 | deletePost | deletePost |

### ✔ 주석

- 메서드 및 코드 설명을 주석으로 간단하게 작성합니다.

### ✔ Git commit

![image](https://user-images.githubusercontent.com/80232260/188366205-84d8a796-3c51-4eb0-bb29-3a61c96bb047.png)

[깃 커밋 컨벤션 참고 사이트](https://overcome-the-limits.tistory.com/entry/협업-협업을-위한-기본적인-git-커밋컨벤션-설정하기)

# 🗝 ERD
![image](https://user-images.githubusercontent.com/99064214/191505460-c4014797-4549-4f36-a1ee-2afdc722f751.png)

# 🗂 폴더 구조
![image](https://user-images.githubusercontent.com/99064214/194761042-8d35bb4e-c224-4c91-8506-7eb96305cd22.png)


# ⚙ 패키지

```json
{
  "name": "bossraid-game",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/developer-yechan/BossRaid-game.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/developer-yechan/BossRaid-game/issues"
  },
  "homepage": "https://github.com/developer-yechan/BossRaid-game#readme",
  "dependencies": {
    "axios": "^0.27.2",
    "bcrypt": "^5.0.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "cross-env": "^7.0.3",
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "JSON": "^1.0.0",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.29.4",
    "morgan": "^1.10.0",
    "mysql2": "^2.3.3",
    "redis": "^4.3.1",
    "sequelize": "^6.21.4",
    "uuid": "^8.3.2"
  },
  "devDependencies": {
    "@babel/eslint-parser": "^7.18.9",
    "dotenv": "^16.0.2",
    "eslint": "^8.23.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "jest": "^29.0.2",
    "mocha": "^10.0.0",
    "nodemon": "^2.0.19",
    "prettier": "^2.7.1",
    "sequelize-cli": "^6.4.1",
    "supertest": "^6.2.4",
    "swagger-jsdoc": "^6.2.5",
    "swagger-ui-express": "^4.5.0"
  }
}


```

# ⚡ 기술 스택
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-FCC624?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/Sequelize-007396?style=for-the-badge&logo=Sequelize&logoColor=white">
<img src="https://img.shields.io/badge/Swagger-61DAFB?style=for-the-badge&logo=Swagger&logoColor=white"> <img src="https://img.shields.io/badge/Mocha-F8DC75?style=for-the-badge&logo=Mocha&logoColor=white">
redis

# ✋ 트러블 슈팅

## 이슈 / 해결과정 

- 보스레이드 랭킹을 조회 하는 과정에서 유저의 totalScore가 동일하더라도 조회 리스트에서 순서가 빠른 유저의 랭킹이 더 높은 버그가 있었는데 찾지 못하고 있다가 팀원들의 도움으로 찾고 해결했습니다.
- 로컬 레디스 연동시 json 타입 데이터가 저장되지 않는 오류가 있었는데 redislabs에서 원격 레디스 저장소 생성하여 연결했더니 해결되었습니다.  
