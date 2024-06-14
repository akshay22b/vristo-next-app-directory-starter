'use client';
import { getUSDCBalance, getETHBalance, getUSDTBalance } from '@/api/balance';
import IconCopy from '@/components/icon/icon-copy';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface Address {
    assetId: string;
    walletAddress: string;
}

function WalletDetails() {
    const pathname = usePathname();
    const walletId = pathname.split('/wallets/')[1];
    const [mnemonicsList, setMnemonicsList] = useState<any>([]);
    const [getBalance, setgetBalance] = useState<any>([]);
    const [mnemonics, setMnemonics] = useState([]);

    const getAllMnemonics = async (walletId: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wallets/${walletId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMnemonics(data.mnemonic.walletName);
            setMnemonicsList(data.mnemonic.WalletAddresses);
        } catch (error) {
            console.error('Error fetching Mnemonics:', error);
        }
    };

    useEffect(() => {
        getAllMnemonics(walletId);
    }, [walletId]);

    // ---------------------------------------------------
    const getBalances = async (mnemonicsList: any[]) => {
        const balancePromises = mnemonicsList.map(async (item: any) => {
            let balance = 0;
            if (item.assetId === 'ETH') {
                const ethBalance = await getETHBalance(item.address);
                balance = ethBalance.body.etherAmount;
            } else if (item.assetId === 'USDC') {
                const usdcBalance = await getUSDCBalance(item.address);
                balance = usdcBalance.body.resultInEther;
            } else if (item.assetId === 'USDT_ERC20') {
                const usdtBalance = await getUSDTBalance(item.address);
                balance = usdtBalance.body.resultInEther;
            } else {
                // console.log(`${item.assetId} Balance`, balance);
            }
            return { ...item, balance };
        });

        const balances = await Promise.all(balancePromises);
        return balances;
    };

    useEffect(() => {
        const fetchBalances = async () => {
            const result = await getBalances(mnemonicsList);
            setgetBalance(result);
        };

        fetchBalances();
    }, [mnemonicsList]);

    console.log('getBalance', getBalance);
    // ---------------------------------------------------

    const maskAddress = (address: string): string => {
        if (address.length < 16) {
            throw new Error('Address is too short to mask');
        }
        const firstFour = address.slice(0, 16);
        const masked = `${firstFour}...`;
        return masked;
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    const onCopy = (text: any) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                showMessage('Copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy!', err);
            });
    };

    return (
        <div>
            <div className="flex w-fit gap-4 rounded-md bg-white px-4 py-3 shadow dark:bg-[#1c232f] dark:text-white-dark">
                <h2 className=" text-base">
                    Wallet ID: <span className=" font-bold dark:text-white ">{walletId}</span>
                </h2>
                <h2 className=" text-base">
                    Wallet Name: <span className=" font-bold dark:text-white">{mnemonics}</span>
                </h2>
            </div>

            <div className="panel mt-5 overflow-hidden border-0 p-0">
                <div className="table-responsive">
                    <table className="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>assetId</th>
                                <th>address</th>
                                <th>balance</th>
                                <th>privateKey</th>
                                <th>publicKey</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getBalance.map((mnemonic: any) => {
                                return (
                                    <tr key={mnemonic.id}>
                                        <td className="">{mnemonic.id}</td>
                                        <td className="whitespace-nowrap">{mnemonic.assetId}</td>
                                        <td className="whitespace-nowrap">{mnemonic.address}</td>
                                        <td className="whitespace-nowrap">{mnemonic.balance}</td>
                                        <td className="whitespace-nowrap">
                                            <p className=" flex min-w-32 justify-between">
                                                {maskAddress(mnemonic.privateKey)}
                                                <span className=" cursor-pointer" onClick={() => onCopy(mnemonic.privateKey)}>
                                                    <IconCopy />
                                                </span>
                                            </p>
                                        </td>
                                        <td className="whitespace-nowrap">
                                            <p className="flex min-w-32 justify-between">
                                                {maskAddress(mnemonic.publicKey)}
                                                <span className=" cursor-pointer" onClick={() => onCopy(mnemonic.publicKey)}>
                                                    <IconCopy />
                                                </span>
                                            </p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default WalletDetails;
