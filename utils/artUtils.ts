import { connectToDatabase } from "./mongoose";
import ArtTable from "../model/ArtTable";

export async function scheduleArt(data: any): Promise<any> {
  await connectToDatabase();
  const startDate = new Date();
  const newArt = new ArtTable({
    ...data,
    uploadedTime: startDate,
  });
  return newArt.save();
}

export const findAllArts = async (): Promise<any> => {
  await connectToDatabase();
  const date = new Date();
  return ArtTable.find({isCompleted:false});
};

export const updateArtById = async (id: any): Promise<any> => {
  await connectToDatabase();
  return ArtTable.findByIdAndUpdate(
    id,
    { $inc: { upVotes: 1 } },
    { new: true }
  );
};

export const findBattles = async (): Promise<any> => {
  await connectToDatabase();
  return await ArtTable.find().sort({ upVotes: -1 }).limit(2).exec();
};
