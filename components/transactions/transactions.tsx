'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import Swal from 'sweetalert2';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconListCheck from '@/components/icon/icon-list-check';
import IconSearch from '@/components/icon/icon-search';

const Transactions = () => {
    const [value, setValue] = useState<any>('list');
    const [search, setSearch] = useState<any>('');
    const [transactionsList, setTransactionsList] = useState<any>([]);

    const getAllMnemonics = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/transactions/`);
            const data = await response.json();
            setTransactionsList(data.mnemonics || []);
        } catch (error) {
            console.error('Error fetching Mnemonics:', error);
        }
    };

    useEffect(() => {
        getAllMnemonics();
    }, []);

    const [filteredItems, setFilteredItems] = useState<any>(transactionsList);

    // const searchmnemonic = () => {
    //     setFilteredItems(() => {
    //         return transactionsList.filter((item: any) => {
    //             return item.name.toLowerCase().includes(search.toLowerCase());
    //         });
    //     });
    // };

    // useEffect(() => {
    //     searchmnemonic();
    // }, [search]);

    const router = useRouter();
    const viewMnemonic = (id: number) => {
        console.log('ID:', id);
        void router.push(`./wallets/${id}`);
    };

    // const maskAddress = (address: string): string => {
    //     if (address.length < 16) {
    //         throw new Error('Address is too short to mask');
    //     }
    //     const firstFour = address.slice(0, 16);
    //     const masked = `${firstFour}...`;
    //     return masked;
    // };

    // const showMessage = (msg = '', type = 'success') => {
    //     const toast: any = Swal.mixin({
    //         toast: true,
    //         position: 'top',
    //         showConfirmButton: false,
    //         timer: 3000,
    //         customClass: { container: 'toast' },
    //     });
    //     toast.fire({
    //         icon: type,
    //         title: msg,
    //         padding: '10px 20px',
    //     });
    // };

    // const onCopy = (text: any) => {
    //     navigator.clipboard
    //         .writeText(text)
    //         .then(() => {
    //             showMessage('Copied to clipboard!');
    //         })
    //         .catch((err) => {
    //             console.error('Failed to copy!', err);
    //         });
    // };

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Transactions</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'list' && 'bg-primary text-white'}`} onClick={() => setValue('list')}>
                                <IconListCheck />
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'grid' && 'bg-primary text-white'}`} onClick={() => setValue('grid')}>
                                <IconLayoutGrid />
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Wallet" className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="panel mt-5 overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>AssetId</th>
                                    <th>Transaction Id</th>
                                    <th>Transaction Type</th>
                                    <th>Transaction Hash</th>
                                    <th>From Address</th>
                                    <th>To Address</th>
                                    <th>Amount</th>
                                    <th>Fee</th>
                                    <th>Status</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionsList.map((transaction: any) => {
                                    return (
                                        <tr key={transaction.id}>
                                            <td className=" flex-1">{transaction.id}</td>
                                            <td>
                                                <div className="flex flex-1 whitespace-nowrap">{transaction.assetId}</div>
                                            </td>
                                            <td className="flex-1 whitespace-nowrap">
                                                <p className="flex gap-2">{transaction.transactionId}</p>
                                            </td>
                                            <td className="flex-1 whitespace-nowrap">
                                                <p className="flex gap-2">{transaction.transactiontype}</p>
                                            </td>
                                            <td className="flex-1 whitespace-nowrap">
                                                <p className="flex gap-2">{transaction.transactionHash}</p>
                                            </td>
                                            <td className="flex-1 whitespace-nowrap">
                                                <p className="flex gap-2">{transaction.fromAddress}</p>
                                            </td>
                                            <td className="flex-1 whitespace-nowrap">
                                                <p className="flex gap-2">{transaction.toAddress}</p>
                                            </td>
                                            <td className="flex-1 whitespace-nowrap">
                                                <p className="flex gap-2">{transaction.amount}</p>
                                            </td>
                                            <td className="flex-1 whitespace-nowrap">
                                                <p className="flex gap-2">{transaction.fee}</p>
                                            </td>
                                            <td className="flex-1 whitespace-nowrap">
                                                <p className="flex gap-2">{transaction.status}</p>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center gap-4">
                                                    <button type="button" onClick={() => viewMnemonic(transaction.id)} className="btn btn-sm btn-outline-primary">
                                                        View
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {value === 'grid' && (
                <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {transactionsList.map((transaction: any) => {
                        return (
                            <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]" key={transaction.id}>
                                <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
                                    <div className="relative -mt-10 px-6 pb-24">
                                        <div className="rounded-md bg-white px-2 py-4 shadow-md dark:bg-gray-900">
                                            <div className="text-xl">{transaction.id}</div>
                                            <div className="text-white-dark">{transaction.assetId}</div>
                                        </div>
                                        <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">transactions :</div>
                                                <div className="truncate text-white-dark">{transaction.transactionId}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">From Address :</div>
                                                <div className=" truncate text-white-dark">{transaction.fromAddress}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">To Address :</div>
                                                <div className="truncate text-white-dark">{transaction.toAddress}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 mt-6 flex w-full gap-4 p-6 ltr:left-0 rtl:right-0">
                                        <button onClick={() => viewMnemonic(transaction.id)} type="button" className="btn btn-outline-primary w-1/2">
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Transactions;
