import asyncHandler from "express-async-handler";
import Flashcard from "../models/flashcard";

const updateFlashcardSet = asyncHandler(async (req, res) => {
	const flashcard = await Flashcard.findById(req.flashcard._id);

	if (flashcard) {
		flashcard.name = req.body.name || flashcard.name;
		flashcard.email = req.body.email || flashcard.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedFlashcardSet = await flashcard.save();

		res.json({
			_id: updatedFlashcardSet._id,
			name: updatedFlashcardSet.name,
			email: updatedFlashcardSet.email,
			token: generateToken(updatedFlashcardSet._id),
		});
	} else {
		res.status(404);
		throw new Error("Flashcard Set Not Found");
	}
});

export { updateFlashcardSet };
