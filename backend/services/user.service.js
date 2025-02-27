import User from "../models/user.model.js";  // ✅ Import the actual model

const createUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const hashedPassword = await User.hashPassword(password);  // ✅ Call static method correctly
    
    const user = await User.create({ email, password: hashedPassword }); // ✅ Use `User.create`

    return user;
}

export { createUser };
