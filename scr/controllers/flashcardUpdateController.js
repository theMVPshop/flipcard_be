import asyncHandler from "express-async-handler";
import Flashcard from "../models/flashcard";

const updateFlashcardSet = asyncHandler(async (req, res) => {
	const flashcard = await Flashcard.findById(req.flashcard._id);

	//has to match flashcard set in order to confirm it's the correct one to update and pull/update the data?

	if (flashcard) {
		flashcard.setName = req.body.setName || flashcard.setName;

		const updatedFlashcardSet = await flashcard.save();

		res.json({
			_id: updatedFlashcardSet._id,
			category: updatedFlashcardSet.category,
			visible: updatedFlashcardSet.visible,
			setName: updatedFlashcardSet.setName,
			description: updatedFlashcardSet.description,
			term: updatedFlashcardSet.term,
			definition: updatedFlashcardSet.definition,
			imageUrl: updatedFlashcardSet.imageUrl,
		});
	} else {
		res.status(404);
		throw new Error("Flashcard Set Not Found");
	}
});

export { updateFlashcardSet };

// might need to add a subschema for the flashcard per set -- array of arrays
// https://stackoverflow.com/questions/64452045/mongoose-updatemany-documents-containing-specific-array-element
// https://stackoverflow.com/questions/66914574/mongoose-updatemany-with-aggregation-pipeline
