const { Router } = require("express");
const asyncHandler = require("../utils/async-handler");
const { Users } = require("../data-access/");

const router = Router();

router.put(
    "/",
    asyncHandler(async (req, res) => {
        const x = await Users.create({
            email: "qwer@naver.com",
            password: "qwer1234!",
            name: "김수연",
            phoneNumber: "12345678",
            address: {
                postalCode: "12345",
                address1: "서울시 oo로 00빌딩",
                address2: "3층 991호",
            },
        });

        const userEmail = x.email;

        const { email, password, name, phoneNumber, address } = req.body;

        //입력한 정보로 유저 정보 수정
        const upadateUserInfo = await Users.findOneAndUpdate(
            { email: userEmail },
            {
                email: email,
                password: password,
                name: name,
                phoneNumber: phoneNumber,
                address: address,
            }
        );
        res.send(upadateUserInfo);

        // res.render()
    })
);

module.exports = router;
