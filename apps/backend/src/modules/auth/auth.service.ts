import { User } from "@/models/user.model";

class AuthService {
  static async getValidUser(email: string) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("User not found");
    if (!user.isActive) throw new Error("User is inactive");
    if (user.isDeleted) throw new Error("User is deleted");

    return user;
  }
}

export default AuthService;
