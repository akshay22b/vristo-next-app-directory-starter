export const getUSDCBalance = async (walletAddress: string): Promise<any> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/balance/usdcerc20/${walletAddress}`);
    if (!response.ok) throw new Error('Failed to fetch USDC balance');
    return response.json();
};

export const getETHBalance = async (walletAddress: string): Promise<any> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/balance/eth/${walletAddress}`);
    if (!response.ok) throw new Error('Failed to fetch ETH balance');
    return response.json();
};

export const getUSDTBalance = async (walletAddress: string): Promise<any> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/balance/usdt/${walletAddress}`);
    if (!response.ok) throw new Error('Failed to fetch USDT balance');
    return response.json();
};
