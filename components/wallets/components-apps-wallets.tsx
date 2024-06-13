'use client';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconListCheck from '@/components/icon/icon-list-check';
import IconSearch from '@/components/icon/icon-search';
import React, { Fragment, useEffect, useState } from 'react';
import IconPlus from '../icon/icon-plus';
import { useRouter } from 'next/navigation';
import { Transition, Dialog } from '@headlessui/react';
import Swal from 'sweetalert2';
import IconCopy from '../icon/icon-copy';

const ComponentsAppsWallets = () => {
    const [value, setValue] = useState<any>('list');
    const [search, setSearch] = useState<any>('');
    const [mnemonicsList, setMnemonicsList] = useState<any>([]);
    const [addWallet, setAddWallet] = useState<any>(false);

    const getAllMnemonics = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wallets`);
            const data = await response.json();
            setMnemonicsList(data.mnemonics || []);
        } catch (error) {
            console.error('Error fetching Mnemonics:', error);
        }
    };

    useEffect(() => {
        getAllMnemonics();
    }, []);

    const [filteredItems, setFilteredItems] = useState<any>(mnemonicsList);

    const searchmnemonic = () => {
        setFilteredItems(() => {
            return mnemonicsList.filter((item: any) => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            });
        });
    };

    useEffect(() => {
        searchmnemonic();
    }, [search]);

    const handleClick = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wallets/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to create wallet');
            }
            const data = await response.json();
            console.log(data);
            getAllMnemonics();
            setAddWallet(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const router = useRouter();
    const viewMnemonic = (id: number) => {
        console.log('ID:', id);
        void router.push(`./wallets/${id}`);
    };

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
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Wallets</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button onClick={() => setAddWallet(true)} type="button" className="btn btn-primary">
                                <IconPlus className="ltr:mr-2 rtl:ml-2" />
                                Add Wallet
                            </button>
                        </div>
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
                                    <th>Name</th>
                                    <th>Mnemonics</th>
                                    <th>PrivateKey</th>
                                    <th>PublicKey</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mnemonicsList.map((mnemonic: any) => {
                                    return (
                                        <tr key={mnemonic.id}>
                                            <td className=" flex-1">{mnemonic.id}</td>
                                            <td>
                                                <div className="flex w-max flex-1 items-center">
                                                    <div>{mnemonic.walletName}</div>
                                                </div>
                                            </td>
                                            <td className="flex-1 whitespace-nowrap">
                                                <p className="flex gap-2">
                                                    {maskAddress(mnemonic.mnemonic)}{' '}
                                                    <span className=" cursor-pointer" onClick={() => onCopy(mnemonic.mnemonic)}>
                                                        <IconCopy />
                                                    </span>
                                                </p>
                                            </td>
                                            <td className="flex-1 whitespace-nowrap">
                                                <p className="flex gap-2">
                                                    {maskAddress(mnemonic.privateKey)}
                                                    <span className=" cursor-pointer" onClick={() => onCopy(mnemonic.privateKey)}>
                                                        <IconCopy />
                                                    </span>
                                                </p>
                                            </td>
                                            <td className="flex-1 whitespace-nowrap">
                                                <p className="flex gap-2">
                                                    {maskAddress(mnemonic.publicKey)}
                                                    <span className=" cursor-pointer" onClick={() => onCopy(mnemonic.publicKey)}>
                                                        <IconCopy />
                                                    </span>
                                                </p>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center gap-4">
                                                    <button type="button" onClick={() => viewMnemonic(mnemonic.id)} className="btn btn-sm btn-outline-primary">
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
                    {mnemonicsList.map((mnemonic: any) => {
                        return (
                            <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]" key={mnemonic.id}>
                                <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
                                    <div className="relative -mt-10 px-6 pb-24">
                                        <div className="rounded-md bg-white px-2 py-4 shadow-md dark:bg-gray-900">
                                            <div className="text-xl">{mnemonic.id}</div>
                                            <div className="text-white-dark">{mnemonic.walletName}</div>
                                        </div>
                                        <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">Mnemonics :</div>
                                                <div className="truncate text-white-dark">{mnemonic.mnemonic}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">PrivateKey :</div>
                                                <div className=" truncate text-white-dark">{mnemonic.privateKey}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">PublicKey :</div>
                                                <div className="truncate text-white-dark">{mnemonic.publicKey}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 mt-6 flex w-full gap-4 p-6 ltr:left-0 rtl:right-0">
                                        <button onClick={() => viewMnemonic(mnemonic.id)} type="button" className="btn btn-outline-primary w-1/2">
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <Transition appear show={addWallet} as={Fragment}>
                <Dialog as="div" open={addWallet} onClose={() => setAddWallet(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="p-5">
                                        <p>Are you sure you want to create a new wallet?</p>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button onClick={() => setAddWallet(false)} type="button" className="btn btn-outline-danger">
                                                Discard
                                            </button>
                                            <button onClick={handleClick} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ComponentsAppsWallets;
