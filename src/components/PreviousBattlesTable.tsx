import React, { useEffect, useState } from 'react';
import { BattleData, useFetchBattles } from '@/hooks/battleHooks';
import { useMbWallet } from "@mintbase-js/react";
import Image from 'next/image';

const PreviousArtTable: React.FC<{ toggleUploadModal: () => void }> = ({ toggleUploadModal }) => {
    const [previousBattles, setPreviousBattles] = useState<BattleData[]>([]);
    const { battles, error, loading } = useFetchBattles();
    const { isConnected, selector, connect, activeAccountId } = useMbWallet();

    console.log("Fetched battles from hook:", battles);

    useEffect(() => {
        if (battles && battles.pastBattles) {
            console.log("Setting previous battles:", battles.pastBattles);
            setPreviousBattles(battles.pastBattles);
        }
    }, [battles]);

    console.log("Previous Battles in state:", previousBattles);

    return (
        <div className="battle-table mt-8 pb-10 justify-center flex flex-col items-center" style={{ width: '100%', gap: 8 }}>
            <h2 className="text-xl font-bold text-black text-center">Previous Battles</h2>
            <div className='battle-table1 pb-10'>
                <div className='flex items-center justify-between'>
                    <table className="min-w-full mt-4">
                        <thead>
                            <tr className="bg-white">
                                <th className="px-6 py-3 text-xs text-left" style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRight: '1px solid black', color: 'black' }}>Art A</th>
                                <th className="px-6 py-3 text-xs text-left" style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRight: '1px solid black', color: 'black' }}>Art B</th>
                                <th className="px-6 py-3 text-xs text-left" style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRight: '1px solid black', color: 'black' }}>Special Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {previousBattles.slice(-10).map((battle, index) => (
                                <tr key={index} className="border-b bg-white">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: 'black' }}>
                                        <Image
                                            src={battle.artAgrayScale}
                                            alt="Art A"
                                            width={300}
                                            height={300}
                                            unoptimized
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: 'black' }}>
                                        <Image
                                            src={battle.artBgrayScale}
                                            alt="Art B"
                                            width={300}
                                            height={300}
                                            unoptimized
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'black' }}>
                                        {battle.specialWinner}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PreviousArtTable;
