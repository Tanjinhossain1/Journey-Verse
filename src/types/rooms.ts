export interface RoomsType {
    id: number;
    title: string;
    displayImage: string;
    price: string;
    images: string[]; // Array of image URLs
    facilities: { name: string }[]; // Array of facilities, each with a name
    about: { detail: string }[]; // Array of details, each with a detail string
    foot_age: string;
    bed: string;
    adult: string;
    hotel: string;
    kid: string;
    createdAt: Date;
    updatedAt: Date;
  }
  