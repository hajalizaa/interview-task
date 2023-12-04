import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'constant';
import { getCoins } from 'services/coins';
import { GetCoinsResponse } from 'types';

export const useCoinsList = () => {
  return useQuery<GetCoinsResponse>({
    queryKey: [queryKeys.COINS.LIST],
    queryFn: () => getCoins()
  });
};
