const userModel = require("../Model/userModel");

const userSignUp = async (req, res) => {
  const { email, password } = await req.body;

  try {
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      res.json({
        validationMessage: "User Already Exists",
      });
    }

    const newUser = await new userModel({ email, password });
    await newUser.save();

    res.status(201).json({
      newUser: newUser,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { email, password } = await req.body;

  const userExists = await userModel.findByIdAndUpdate(id, {email, password})

  if(!userExists){
    res.status(404).json({
        errorMessage: `User with ${id} doesn't Exists!`
    })
  }

  res.status(201).json({
    message: `User with ${email} has been updated!`
  })

};

const usersignIn = async (req, res) => {
  const user = await req.body;
  console.log(user);
  res.status(200).json({
    message: "User Signed In"
  })
};

module.exports = {
  userSignUp,
  usersignIn,
  updateUser,
};
