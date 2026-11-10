import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../conf/sequelize.connection";

const sequelize = sequelizeConnection.getSequelize();

export interface ISong extends Model {
  id: number;
  user_id: number;
  title: string;
  music_genre: number;
  audio_Url: string;
  cover_Url?: string;
  date: Date;
  active: boolean;
}

export const Song = sequelize.define<ISong>(
  "Song",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    music_genre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    audio_Url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover_Url: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: true },
);

export default Song;