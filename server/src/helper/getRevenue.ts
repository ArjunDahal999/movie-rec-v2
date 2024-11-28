export function handleRevenueQuery(revenueParam: any)
{
    const minMax = revenueParam.split('-');
    const min = parseInt(minMax[0]);
    const max = parseInt(minMax[1]);
    return {
        revenue: {
            $gte: min || 0,
            $lte: max || 100000000000000,
        },
    };
} 