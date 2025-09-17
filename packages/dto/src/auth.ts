import z from "zod";

interface IAuthDto {
  login: {
    email: string;
    password: string;
  };

  register: {
    name: string;
    email: string;
    password: string;
  };
}

export class AuthSchema {
  static formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  });
}

export default IAuthDto;
