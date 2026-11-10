import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../conf/sequelize.connection";

const sequelize = sequelizeConnection.getSequelize();

export interface IUser extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "listener" | "artist";
  profile_Picture?: string;
  bio?: string;
  active: boolean;
}

export const User = sequelize.define<IUser>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("listener", "artist"),
      defaultValue: "listener",
    },
    profile_Picture: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: true },
);

export default User;