import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/UserModel";
import { AppError } from "../../utils/appError";


export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });

  if (!user) throw new AppError("Invalid email or password", 401);

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new AppError("Invalid email or password", 401);
  
const JWT_SECRET = process.env.JWT_SECRET as string;
console.log("User id", user._id)
  if (!JWT_SECRET) throw new AppError("JWT_SECRET missing", 400);

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
    token,
  };
}
