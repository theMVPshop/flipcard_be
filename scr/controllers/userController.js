import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /FLIPCARD_BE/users/login
//@access          Public


const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}

	console.log("SUCCESS!");
});

//@description     Register new user
//@route           POST /FLIPCARD_BE/users/
//@access          Public
// Unable to connect to Mongoose server, no .env file, and unable to authorize
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
 
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(404);
		throw new Error("User already exists");
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	//encrypt user password
	encryptedPassword = await bcrypt.hash(password, 10)

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email.toLowerCase(),
			token: generateToken(user._id),
			//generate web token comes from utils
		});
	} else {
		res.status(400);
		throw new Error("User not found");
	}
});

// @desc    GET user profile
// @route   GET /FLIPCARD_BE/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error("User Not Found");
	}
});

export { authUser, updateUserProfile, registerUser };
