'use client';

import React, {
  FC,
  FormEvent,
  HTMLProps,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from 'constant';

export interface SearchboxProps extends HTMLProps<HTMLFormElement> {}

const Searchbox: FC<SearchboxProps> = ({ className, ...props }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const searchParam = searchParams.get('searchText')?.toString();
  const [searchText, setSearchText] = useState<string>(searchParam || '');

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MOVIES.LIST],
        exact: false
      });
      router.push(`/movies?searchText=${searchText}`);
    },
    [queryClient, router, searchText]
  );

  const handleReset = useCallback(() => {
    setSearchText('');
    queryClient.invalidateQueries({
      queryKey: [queryKeys.MOVIES.LIST],
      exact: false
    });
    router.push(`/movies`);
  }, [queryClient, router]);

  useEffect(() => {
    if (searchParam) {
      setSearchText(searchParam);
      formRef.current?.submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      className={clsx(className)}
      ref={formRef}
      {...props}
      onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="z-[9999] absolute inset-y-0 start-0 flex items-center ps-3">
          {searchText ? (
            <button className="cursor-pointer " onClick={handleReset}>
              <svg
                className="text-gray-500 dark:text-gray-400 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"></path>
              </svg>
            </button>
          ) : (
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          )}
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by movie title..."
          required
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Search
        </button>
      </div>
    </form>
  );
};

export default Searchbox;
