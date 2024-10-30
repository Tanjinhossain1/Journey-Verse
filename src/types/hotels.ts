export interface HotelType {
    title: string;
    city: string;
    displayImage: string;
    images: string[];
    ratings: RatingsType;
    facilities: { name: string }[];
    about: string;
    reviews: ReviewsTypes[];
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface RatingsType {
    total: number,
    specific: { cleanliness: string, accuracy: string, Communication: string, Location: string, CheckIn: string, Value: string }[]
}
export interface ReviewsTypes {

    name: string, email: string, content: string, like: string, id: string

}