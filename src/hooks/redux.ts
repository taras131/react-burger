import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../services/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
