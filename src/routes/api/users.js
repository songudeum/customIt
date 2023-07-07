const { Router } = require("express");
const { Users } = require("../../data-access");
const asyncHandler = require("../../utils/async-handler");
const createHash = require("../../utils/hash-password");

const router = Router();

//사용자 이메일 중복 확인 api
router.post("/:email");

//사용자 정보 수정 api (토큰과 ejs작성 전이라 일단 대강적으로 작성)
//아직 2번 눌러야 제대로 작동함 왜인지는 파악중
router.put(
    "/:email",
    asyncHandler(async (req, res) => {
        const userEmail = req.params.email;
        const { email, password, name, phoneNumber, address } = req.body;

        //아이디로 DB에서 유저 조회
        const userInfo = await Users.findOne({ userEmail });

        //입력한 정보로 유저 정보 수정
        const upadateUserInfo = await userInfo.update({
            email: email,
            password: createHash(password),
            name: name,
            phoneNumber: phoneNumber,
            address: address,
        });

        res.render(upadateUserInfo);
    })
);
