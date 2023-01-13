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
  type: string;
  price: number;
  maxPeople: number;
  description: string;
  tags: string[];
  roomNumbers: RoomNumber[];
}
