import { connectToDatabase } from "./mongoose";
import ArtTable from "../model/ArtTable";
import Battle from "../model/Battle";

export async function getNextAvailableDate(): Promise<Date> {
  await connectToDatabase();
  const latestBattle = await Battle.findOne().sort({ battleEndTime: -1 });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!latestBattle || latestBattle.battleEndTime < today) {
    return today;
  }

  const nextDay = new Date(latestBattle.battleEndTime);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay;
}
export const findTopTwoArts = async (): Promise<any[]> => {
  await connectToDatabase();
  const arts = await ArtTable.find().sort({ upVotes: -1 }).limit(2).exec();
  return arts;
};

export const createBattle = async (): Promise<any> => {
  const [artA, artB] = await findTopTwoArts();
  if (artA && artB) {
     const existingBattleWithArtA = await Battle.findOne({ $or: [{ artAId: artA._id }, { artBId: artA._id }] });
    const existingBattleWithArtB = await Battle.findOne({ $or: [{ artAId: artB._id }, { artBId: artB._id }] });

    if (existingBattleWithArtA || existingBattleWithArtB) {
      throw new Error("One or both of the selected artworks are already in a battle");
    }
    const startDate = await getNextAvailableDate();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);
    const battleData = {
      artAId: artA._id.toString(),
      artBId: artB._id.toString(),
      artAgrayScale: artA.grayScale,
      artBgrayScale: artB.grayScale,
      startTime: startDate,
      endTime: endDate,
      isBattleEnded: false,
      isNftMinted: false,
      artAVotes: 0,
      artBVotes: 0,
    };
    
    const newBattle = new Battle(battleData);
    await newBattle.save();
    return newBattle;
  } else {
    throw new Error("Not enough artworks to create a battle");
  }
};
