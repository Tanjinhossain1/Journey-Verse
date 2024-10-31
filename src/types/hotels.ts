export interface HotelType {
    title: string;
    city: string;
    displayImage: string;
    images: string[];
    country:string;
    ratings: RatingsType;
    facilities: { name: string }[];
    about: {detail:string}[]
    reviews: ReviewsTypes[];
    id: number;
    price:string;
    createdAt: Date;
    updatedAt: Date;
    
        // id: number;
        // createdAt: Date;
        // updatedAt: Date;
        // title: string;
        // about: string;
        // city: string;
        // displayImage: string;
        // images: unknown;
        // facilities: unknown;
        // ratings: unknown;
        // reviews: unknown;
    
}

export interface RatingsType {
    total: number,
    specific: {
        [key: string]: string | number, cleanliness: string, accuracy: string, Communication: string, Location: string, CheckIn: string, Value: string }
}
export interface ReviewsTypes {

    name: string, email: string, content: string, like: string, id: string

}