const { Router } = require("express");
const { nanoid } = require("nanoid");

const { Product } = require("../../data-access");
const productService = require("../../services/product");

const asyncHandler = require("../../utils/async-handler");

const router = Router();

router.post(
	"/",
	asyncHandler(async (req, res, next) => {
		const { name, price, description, company, categoryName, image } =
			req.body;

		if (
			!name ||
			!price ||
			!description ||
			!company ||
			!categoryName ||
			!image
		) {
			const error = new Error("모든 값은 필수 값입니다.");
			error.statusCode = 400;
			throw error;
		}

		const id = nanoid(10);

		const createdProduct = productService.createProduct({
			id,
			name,
			price,
			description,
			company,
			categoryName,
			image,
		});

		res.status(201);
		res.json({
			success: true,
			data: {
				id,
			},
		});
	})
);

router.put(
	"/:id",
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const { name, price, description, company, categoryName, image } =
			req.body;

		if (
			!name ||
			!price ||
			!description ||
			!company ||
			!categoryName ||
			!image
		) {
			const error = new Error("모든 값은 필수 값입니다.");
			error.statusCode = 400;
			throw error;
		}

		const updatedProduct = productService.updateProduct({
			id,
			name,
			price,
			description,
			company,
			categoryName,
			image,
		});

		res.status(201);
		res.json({
			success: true,
		});
	})
);

router.delete(
	"/:id",
	asyncHandler(async (req, res) => {
		const { id } = req.params;

		const deletedProduct = productService.deleteProduct({ id });

		res.status(200);
		res.json({
			success: true,
		});
	})
);

module.exports = router;
