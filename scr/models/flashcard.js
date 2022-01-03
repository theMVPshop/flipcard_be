import mongoose from "mongoose";

const flashcardSchema = mongoose.Schema(
	{
		//category- should this be a single enummerated value from dropdown- this is the course- dental, medical, code
		category: {
			type: String,
			enum: ["Dental", "Medical", "Coding"], //need to check same syntax as FE dropdowns when they build
			required: true,
		},
		//this is published or draft- default is false so default is that it is a draft- need to check with FE for how putting into form- radio, toggle or reg button
		visible: {
			type: Boolean,
			required: true,
			default: false,
		},
		setName: {
			type: String,
			required: true,
		},
		//description is option text filed in FE form- for the flashcard "set/collection"- just push for form edits and review, not pushed in individual cards
		description: {
			type: String,
			required: false,
		},
		//term & definition- front/back of flashcards
		term: {
			type: String,
			required: true,
		},
		definition: {
			type: String,
			required: true,
		},

		imageUrl: {
			type: URL,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
