import type { RootState } from '@redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
