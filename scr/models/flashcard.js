import mongoose from "mongoose";

const flashcardSchema = mongoose.Schema(
	{
		//category- should this be a radio button in dropdown?- how to work into schema?- this is the course- dental, medical, code
		category: {
			type: String,
			required: true,
		},
		//this is published or draft- default is false so default is that it is a draft
		visible: {
			type: Boolean,
			required: true,
			default: false,
		},
		setName: {
			type: String,
			required: true,
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
