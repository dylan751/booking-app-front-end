export interface RoomNumber {
  _id: number;
  number: number;
  unavailableDates: {
    types: Date[];
  };
}

export interface Room {
  _id: number;
  title: string;
  price: number;
  maxPeople: number;
  description: string;
  roomNumbers: RoomNumber[];
}
