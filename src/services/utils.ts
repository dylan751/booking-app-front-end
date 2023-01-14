import { Room } from '../models/Room';

const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export const dayDifference = (startDate: Date, endDate: Date) => {
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
  return diffDays;
};

export const range = (start, end) => {
  const length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};

export const calculatePrice = (
  rooms: Room[],
  selectedRoom: number[],
): number => {
  let price = 0;

  rooms.map((room) =>
    room.roomNumbers.map((roomNumber) => {
      if (selectedRoom.includes(roomNumber._id)) {
        price += room.price;
      }
    }),
  );

  return price;
};
