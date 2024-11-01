
// TypeScript type
export type Order = {
    id: number;
    fullName: string;
    cardNumber: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    stateProvince: string;
    zipCode: string;
    country: string;
    specialRequirements?: string | null;
    couponCode?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };