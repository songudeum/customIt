const { Router } = require('express');
const { Users } = require('../../data-access');
const asyncHandler = require('../../utils/async-handler');
// const createHash = require('../../utils/hash-password');

const router = Router();

// 사용자 이메일 중복 확인 api
// router.post("/:email");
router.post('/:email',)

// 사용자 정보 수정 api (토큰과 ejs작성 전이라 일단 대강적으로 작성)
// 아직 2번 눌러야 제대로 작동함 왜인지는 파악중
router.put(
	'/:email',
	asyncHandler(async (req, res) => {
		const userEmail = req.params.email;
		const { email, password, name, phoneNumber, address } = req.body;
		await Users.findOneAndUpdate(
			{ email: userEmail },
			{
				email,
				password,
				name,
				phoneNumber,
				address,
			},
		);
		res.send('성공');
	}),
);

module.exports = router;
