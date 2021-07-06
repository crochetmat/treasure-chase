export const TYPE = 0;
export const ITEM_X = 1;
export const ITEM_Y = 2;
export const ITEM_NB_TREASURE = 3;

export const A_NAME = 1;
export const A_X = 2;
export const A_Y = 3;
export const A_DIRECTION = 4;
export const A_MOVES = 5;

export const IS_PLAIN = /^[C]-[0-9]*-[0-9]*$/;
export const IS_MOUNTAIN = /^[M]-[0-9]*-[0-9]*$/;
export const IS_TREASURE = /^[T]-[0-9]*-[0-9]*-[0-9]*$/;
export const IS_ADVENTURER =
  /^[A]-[A-Za-z0-9]*-[0-9]*-[0-9]*-[NSEOnseo]-[ADG]*$/;
