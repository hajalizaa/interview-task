'use client';

import React, { FC, Fragment, HTMLProps, useEffect, useState } from 'react';
import clsx from 'clsx';

import { useCoinsList } from 'hooks';
import { CoinsService, ConnectionState } from 'modules/coins/CoinsService';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'constant';
import { GetCoinsResponse } from 'types';
import Spinner from 'components/UI/Spinner';

export interface CoinsTableProps extends HTMLProps<HTMLTableElement> {}

const coinsService = CoinsService.getInstance();

const CoinsTable: FC<CoinsTableProps> = ({ className, ...props }) => {
  const queryClient = useQueryClient();
  const { data: coins } = useCoinsList();
  const [connectionState, setConnectionState] =
    useState<ConnectionState | null>(null);

  useEffect(() => {
    const priceUpdateHandler = (updatedCoinData: { [key: string]: string }) => {
      for (const [coinId, coinPrice] of Object.entries(updatedCoinData)) {
        queryClient.setQueryData<GetCoinsResponse>(
          [queryKeys.COINS.LIST],
          (prevData) => {
            if (!prevData) return;

            // Find the index of the coin with the matching id in the previous data
            const updatedIndex = prevData.data.findIndex(
              (coin) => coin.id === coinId
            );

            if (updatedIndex !== -1) {
              // Create a shallow copy of the previous data array and update the price
              const newData = [...prevData.data];
              newData[updatedIndex] = {
                ...newData[updatedIndex],
                priceUsd: coinPrice
              };

              // Return the updated data
              return { ...prevData, data: newData };
            }

            return prevData;
          }
        );
      }
    };

    const connectionStateListener = (state: ConnectionState) =>
      setConnectionState(state);

    coinsService.subscribe(priceUpdateHandler);
    coinsService.listen(connectionStateListener);

    return () => {
      coinsService.unsubscribe(priceUpdateHandler);
    };
  }, [queryClient]);

  return (
    <Fragment>
      {connectionState === 'connecting' && (
        <div className="flex justify-center my-4 space-x-2">
          <p className="text-gray-500 font-bold text-2xl">Connecting</p>
          <Spinner />
        </div>
      )}

      {connectionState === 'disconnected' && (
        <p className="text-red-600 font-bold text-2xl text-center my-4">
          You are disconnected. Please check your network.
        </p>
      )}

      <table
        className={clsx(
          className,
          'relative overflow-x-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'
        )}
        {...props}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Rank
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Symbol
            </th>
            <th scope="col" className="px-6 py-3">
              Price(USD)
            </th>
            <th scope="col" className="px-6 py-3">
              MarketCap(Usd)
            </th>
          </tr>
        </thead>
        <tbody>
          {coins?.data.map((coin, i) => (
            <tr
              key={i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {coin.rank}
              </th>
              <td className="px-6 py-4">{coin.name}</td>
              <td className="px-6 py-4">{coin.symbol}</td>
              <td className="px-6 py-4">{coin.priceUsd}</td>
              <td className="px-6 py-4">{coin.marketCapUsd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default CoinsTable;
