import UserDaoMongoDB from "../daos/mongodb/user.dao.js";

const userDao = new UserDaoMongoDB();

export const createUser = async (obj) => {
  try {
    const newUser = await userDao.createUser(obj);
    if (!newUser) return false;
    else return newUser;
  } catch (error) {
    throw error;
    // console.log(error)
  }
};

export const getAllUser = async () => {
  try {
    const users = await userDao.getAllUser();
    if (!users) return false;
    else return users;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};

export const getUserById = async (id) => {
  try {
    const user = await userDao.getUserById(id);
    if (!user) return false;
    else return user;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};
