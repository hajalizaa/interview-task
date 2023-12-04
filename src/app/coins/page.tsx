import { dehydrate } from '@tanstack/react-query';

import Hydrate from 'components/providers/RqHydrate';
import CoinsTable from 'modules/coins/sections/CoinsTable';

import { queryKeys } from 'constant';
import { getCoins } from 'services/coins';
import getQueryClient from 'utils/getQueryClient';
import { CoinsService } from 'modules/coins/CoinsService';

CoinsService.getInstance();

const Coins = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.COINS.LIST],
    queryFn: () => getCoins()
  });

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <div className="container mx-auto px-8">
        <h2 className="mt-5 text-2xl font-bold text-center text-white mb-4">
          Coins price using websocket
        </h2>

        <CoinsTable />
      </div>
    </Hydrate>
  );
};

export default Coins;
