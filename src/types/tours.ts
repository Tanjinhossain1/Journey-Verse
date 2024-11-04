export type TourTypes = {
    id: number;
    city: string;
    title: string;
    totalRating: string;
    price: string;
    displayImage: string;
    images: string[];
    totalDuration: string;
    tourType: string;
    groupSize: string;
    languages: { lang: string }[];
    about: { detail: string }[];
    highlight: { list: string }[];
    included: { list: string }[];
    excluded: { list: string }[];
    itinerary: { title: string; description: string }[];
    durations: { duration: string }[];
    questions: { title: string; description: string }[];
    discounts: { group: string; fromAdult: string; toAdult: string; value: string }[];
    reviews: {
      name: string;
      email: string;
      content: string;
      like: string;
      id: string;
    }[];
    specificReviews: {
      cleanliness: string;
      accuracy: string;
      communication: string;
      location: string;
      checkIn: string;
      value: string;
    };
    createdAt: Date;
    updatedAt: Date;
  };
  