// User Types
export enum UserRole {
  GUEST = 'guest',
  OWNER = 'owner',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  role: UserRole;
  profile: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
  };
  createdAt: Date;
}

// Listing Types
export interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
  country: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface Listing {
  id: string;
  tenantId: string;
  ownerId: string;
  title: string;
  description: string;
  location: Location;
  amenities: Amenity[];
  images: string[];
  status: 'active' | 'inactive' | 'suspended';
  rating: number;
  reviewCount: number;
}

// Room Types
export interface Room {
  id: string;
  listingId: string;
  roomType: string;
  capacity: number;
  basePrice: number;
  currency: string;
  quantityAvailable: number;
  quantityTotal: number;
}

// Availability Types
export interface DateRange {
  start: Date;
  end: Date;
}

export interface Availability {
  roomId: string;
  date: Date;
  availableCount: number;
  bookedCount: number;
  price?: number;
  minimumStay?: number;
  maximumStay?: number;
}

// Booking Types
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  NO_SHOW = 'no_show'
}

export enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  REFUNDED = 'refunded',
  PARTIAL_REFUND = 'partial_refund'
}

export interface Booking {
  id: string;
  tenantId: string;
  guestId: string;
  listingId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
  createdAt: Date;
}

// Review Types
export interface Review {
  id: string;
  bookingId: string;
  guestId: string;
  listingId: string;
  rating: number;
  categories: {
    cleanliness: number;
    location: number;
    value: number;
    staff: number;
  };
  comment: string;
  verifiedStay: boolean;
  createdAt: Date;
}

// Search Types
export interface SearchFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guestCount?: number;
  priceRange?: [number, number];
  amenities?: string[];
  rating?: number;
  roomType?: string[];
}

export interface SearchResult {
  listing: Listing;
  availableRooms: Room[];
  minPrice: number;
  availability: Record<string, number>; // date -> count
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
