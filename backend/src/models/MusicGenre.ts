import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../conf/sequelize.connection";


const sequelize = sequelizeConnection.getSequelize();

export interface IMusicGenre extends Model {
  id: number;
  name: string;
  description?: string;
  active: boolean;
}

export const MusicGenre = sequelize.define<IMusicGenre>(
  "MusicGenre",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
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

export default MusicGenre;