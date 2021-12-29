import mongoose from "mongoose";

const flashcardSchema = mongoose.Schema(
	{
		//category- should this be a radio button in dropdown?- how to work into schema?
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
		front: {
			type: String,
			required: true,
		},
		back: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
