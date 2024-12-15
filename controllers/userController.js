//@route POST /api/users/register
const registerUser = async(req,res)=>{
    res.json({message: "Register the user"})
}

//@route POST /api/users/login
const loginUser = async(req,res)=>{
    res.json({message: "login user"})
}

//@route GET /api/users/login
const currentUser = async(req,res)=>{
    res.json({message: "Current user information"})
}

module.exports = {registerUser, loginUser, currentUser}