import bcrypt from "bcrypt";
import mongoose from "mongoose";
const saltRounds = 10;

export interface UserInput {
    email: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

UserSchema.pre("save", async function(next) {
    const user = this as UserDocument;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

UserSchema.methods.comparePassword = async function(password: string) {
    const user = this as UserDocument;
    return await bcrypt.compare(password, user.password);
}

const User = mongoose.model<UserDocument>("UserVerification", UserSchema);

export default User;