import { UserModel } from "./models/User.model.js";

export default class UserDaoMongoDB {
  async createUser(obj) {
    try {
      const newUser = UserModel.create(obj);
      return newUser;
    } catch (error) {
      console.error("Error creating a user:", error);
      throw error;
    }
  }

  async getAllUser() {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (error) {
      console.error("Error retrieving all users:", error);
      throw error;
    }
  }

  async getUserById(id){

    try {
        const user = await UserModel.findById(id);
        if (!user) throw new Error("User not found");
        return user;

        
    } catch (error) {
        console.error("Error getting a user:", error);
        throw error;
    }

  }
}
