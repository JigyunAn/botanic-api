import { User } from "../entity/user.entity";

export const userCreate = async (userData: any) => {
  try {
    return await User.create(userData);
  } catch (err) {
    console.log(err);
  }
};
