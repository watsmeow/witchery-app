import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//get all the users
export const getAllUsers = async (req, res) => {
    try {
      let users = await UserModel.find();
      users = users.map((user)=>{
        const {password, ...otherDetails} = user._doc
        return otherDetails
      })
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  };

//get a user from the database
export const getUser = async (req, res) => {
    //send the id in the parameters of the url
    const id = req.params.id

    try {
        //check if user exists in database
        const user = await UserModel.findById(id)

        //if the user exists, send the user info
        if (user) {
            //all details being received are held within the '_doc' document, breaks apart the response doc into the password and everything else
            const { password, ...otherDetails } = user._doc
            //sends back everything but the password
            res.status(200).json(otherDetails)
        } else {
            res.status(404).json({ message: "User does not exist."})
        }
    } catch (error) {
        res.status(500).json({ message: "Error: Cannot retrieve user from database." })
    }
};

//update a user
export const updateUser = async (req, res) => {
    //send the id of the user you are updating in the parameters of the url
    const id = req.params.id
    //currentUserId is the user performing the update, 
    const { _id, password } = req.body

    //conditions that allow a user to update user info
    if (id === _id) {
        try {
            console.log("HELLLLOOOOOOO")
            //checks if the password is valid
            if (password) {
                //hashes the password in the body of the request for security
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)
            }
            //id is searching for the specific user to be updates, req.body is the info that is being updated, new=true means that in the response you want to get the updated info back, if you don't specify you'll get the previous info back
            const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});
            const token = jwt.sign(
                {username: user.username, id: user._id}, 
                process.env.JWT_KEY,
                {expiresIn: "1h"}
            );
            console.log(token)
            res.status(200).json({user, token})
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error: Cannot update user in database."})
        }
    } else {
        res.status(403).json({ message: "Error: Access denied. You may only update your own profile." })
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id

    //currentUserId is the user performing the update, 
    const { currentUserId, currentUserAdminStatus } = req.body

    //conditions that allow a user to delete themselves or another user
    if (id === currentUserId || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json({ message: "User deleted successfully."})
        } catch (error) {
            res.status(500).json({ message: "Error: Cannot delete user."})
        }
    } else {
        res.status(403).json({ message: "Error: Access denied. You do not have permission to delete this user." })
    }
}

//follow another user
export const followUser = async (req, res) => {
    const id = req.params.id

    //gets the current user from the request body 
    const { _id } = req.body

    //conditions that allow a user to follow another user
    if (id === _id ) {
        res.status(403).json({ message: "Error: You cannot follow yourself. Weirdo." })
    } else {
        try {
            //defining who you're trying to follow
            const followUser = await UserModel.findById(id)
            //defining the user who is doing the following
            const follower = await UserModel.findById(_id)
            //if the you are NOT already following the followUser, then to both the following and followers arrays, respectively 
            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: {followers: _id}});
                await follower.updateOne({ $push: {following: id}})
                res.status(200).json({ message: "Following!"})
            } else {
                res.status(403).json({ message: "You're already following this user." })
            }
        } catch (error) {
            res.status(500).json({ message: "Error: Cannot follow user."})
        }
    }
};

//unfollow another user
export const unfollowUser = async (req, res) => {
    const id = req.params.id

    //gets the current user from the request body 
    const { _id } = req.body

    //conditions that allow a user to unfollow another user
    if (id === _id) {
        res.status(403).json({ message: "Error: You cannot follow yourself. Weirdo." })
    } else {
        try {
            //defining who you're trying to unfollow
            const followUser = await UserModel.findById(id)
            //defining the user who is doing the unfollowing
            const follower = await UserModel.findById(_id)
            //if the you are following the followUser, then to both the following and followers arrays, respectively 
            if (followUser.followers.includes(_id)) {
                await followUser.updateOne({ $pull: {followers: _id}});
                await follower.updateOne({ $pull: {following: id}})
                res.status(200).json({ message: "Unfollowed!"})
            } else {
                res.status(403).json({ message: "You're not following this user anyway." })
            }
        } catch (error) {
            res.status(500).json({ message: "Error: Cannot follow user."})
        }
    }
};