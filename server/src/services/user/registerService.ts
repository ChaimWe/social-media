import { User } from '../../models/UserModel';
import { UserInput, userZodSchema } from '../../schemas/userSchema';
import { AppError } from '../../utils/appError';

export async function createUser(userData: UserInput) {
  const validatedData = userZodSchema.parse(userData);

  const existingUser = await User.findOne({ email: validatedData.email });
  if (existingUser) throw new AppError('User with this email already exists', 409);
  
  const user = new User({
    name: validatedData.name,
    email: validatedData.email,
    password: validatedData.password,
  });

  await user.save();

  return user;
}