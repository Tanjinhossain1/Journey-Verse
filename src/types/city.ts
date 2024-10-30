
export interface CityType {
    city: string;
    id: number;
    countryName: string;
    displayImage: string;
    images: unknown;
    about: unknown;
    hotels: string | null;
    tours: string | null;
    rentals: string | null;
    cars: string | null;
    activities: string | null;
    updatedAt: Date;
    createdAt: Date;
}