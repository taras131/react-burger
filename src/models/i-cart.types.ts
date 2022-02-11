import {IIngredient} from './i-ingredient.types';

export interface ICartTypes extends IIngredient {
  key: number;
}
export interface IOrderNumber {
  number: string;
}