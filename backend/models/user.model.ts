import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../config/default";

export interface UserModel extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  loggedIn: Date;
  seconds: Number;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "auth"], required: true },
    loggedIn: { type: Date, default: Date.now, required: true },
    seconds: { type: Number, default: 0, required: true },
  },
  { timestamps: false, versionKey: false }
);

UserSchema.pre<UserModel>("save", async function (next) {
  let user = this as UserModel;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(<number>config.saltWorkFactor);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserModel;
  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((e: any) => false);
};

export default model<UserModel>("User", UserSchema);
