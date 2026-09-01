import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AdminCredentials, AdminDashboard, AdminSession, Booking, BookingInput, BookingStats, BookingUpdate, HealthStatus, Inquiry, InquiryInput, InquiryStats, InquiryUpdate, ListBookingsParams, ListInquiriesParams, ListPropertiesParams, Property, PropertyInput, PropertyStats, PropertyUpdate } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListPropertiesUrl: (params?: ListPropertiesParams) => string;
/**
 * @summary List all properties
 */
export declare const listProperties: (params?: ListPropertiesParams, options?: RequestInit) => Promise<Property[]>;
export declare const getListPropertiesQueryKey: (params?: ListPropertiesParams) => readonly ["/api/properties", ...ListPropertiesParams[]];
export declare const getListPropertiesQueryOptions: <TData = Awaited<ReturnType<typeof listProperties>>, TError = ErrorType<unknown>>(params?: ListPropertiesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProperties>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listProperties>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListPropertiesQueryResult = NonNullable<Awaited<ReturnType<typeof listProperties>>>;
export type ListPropertiesQueryError = ErrorType<unknown>;
/**
 * @summary List all properties
 */
export declare function useListProperties<TData = Awaited<ReturnType<typeof listProperties>>, TError = ErrorType<unknown>>(params?: ListPropertiesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProperties>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreatePropertyUrl: () => string;
/**
 * @summary Create a property (admin)
 */
export declare const createProperty: (propertyInput: PropertyInput, options?: RequestInit) => Promise<Property>;
export declare const getCreatePropertyMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProperty>>, TError, {
        data: BodyType<PropertyInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createProperty>>, TError, {
    data: BodyType<PropertyInput>;
}, TContext>;
export type CreatePropertyMutationResult = NonNullable<Awaited<ReturnType<typeof createProperty>>>;
export type CreatePropertyMutationBody = BodyType<PropertyInput>;
export type CreatePropertyMutationError = ErrorType<unknown>;
/**
* @summary Create a property (admin)
*/
export declare const useCreateProperty: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProperty>>, TError, {
        data: BodyType<PropertyInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createProperty>>, TError, {
    data: BodyType<PropertyInput>;
}, TContext>;
export declare const getListFeaturedPropertiesUrl: () => string;
/**
 * @summary List featured properties for homepage
 */
export declare const listFeaturedProperties: (options?: RequestInit) => Promise<Property[]>;
export declare const getListFeaturedPropertiesQueryKey: () => readonly ["/api/properties/featured"];
export declare const getListFeaturedPropertiesQueryOptions: <TData = Awaited<ReturnType<typeof listFeaturedProperties>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listFeaturedProperties>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listFeaturedProperties>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListFeaturedPropertiesQueryResult = NonNullable<Awaited<ReturnType<typeof listFeaturedProperties>>>;
export type ListFeaturedPropertiesQueryError = ErrorType<unknown>;
/**
 * @summary List featured properties for homepage
 */
export declare function useListFeaturedProperties<TData = Awaited<ReturnType<typeof listFeaturedProperties>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listFeaturedProperties>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetPropertyStatsUrl: () => string;
/**
 * @summary Get property stats summary
 */
export declare const getPropertyStats: (options?: RequestInit) => Promise<PropertyStats>;
export declare const getGetPropertyStatsQueryKey: () => readonly ["/api/properties/stats"];
export declare const getGetPropertyStatsQueryOptions: <TData = Awaited<ReturnType<typeof getPropertyStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPropertyStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getPropertyStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetPropertyStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getPropertyStats>>>;
export type GetPropertyStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get property stats summary
 */
export declare function useGetPropertyStats<TData = Awaited<ReturnType<typeof getPropertyStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPropertyStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetPropertyUrl: (id: number) => string;
/**
 * @summary Get a single property
 */
export declare const getProperty: (id: number, options?: RequestInit) => Promise<Property>;
export declare const getGetPropertyQueryKey: (id: number) => readonly [`/api/properties/${number}`];
export declare const getGetPropertyQueryOptions: <TData = Awaited<ReturnType<typeof getProperty>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProperty>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProperty>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetPropertyQueryResult = NonNullable<Awaited<ReturnType<typeof getProperty>>>;
export type GetPropertyQueryError = ErrorType<void>;
/**
 * @summary Get a single property
 */
export declare function useGetProperty<TData = Awaited<ReturnType<typeof getProperty>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProperty>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdatePropertyUrl: (id: number) => string;
/**
 * @summary Update a property (admin)
 */
export declare const updateProperty: (id: number, propertyUpdate: PropertyUpdate, options?: RequestInit) => Promise<Property>;
export declare const getUpdatePropertyMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProperty>>, TError, {
        id: number;
        data: BodyType<PropertyUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateProperty>>, TError, {
    id: number;
    data: BodyType<PropertyUpdate>;
}, TContext>;
export type UpdatePropertyMutationResult = NonNullable<Awaited<ReturnType<typeof updateProperty>>>;
export type UpdatePropertyMutationBody = BodyType<PropertyUpdate>;
export type UpdatePropertyMutationError = ErrorType<unknown>;
/**
* @summary Update a property (admin)
*/
export declare const useUpdateProperty: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProperty>>, TError, {
        id: number;
        data: BodyType<PropertyUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateProperty>>, TError, {
    id: number;
    data: BodyType<PropertyUpdate>;
}, TContext>;
export declare const getDeletePropertyUrl: (id: number) => string;
/**
 * @summary Delete a property (admin)
 */
export declare const deleteProperty: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeletePropertyMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteProperty>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteProperty>>, TError, {
    id: number;
}, TContext>;
export type DeletePropertyMutationResult = NonNullable<Awaited<ReturnType<typeof deleteProperty>>>;
export type DeletePropertyMutationError = ErrorType<unknown>;
/**
* @summary Delete a property (admin)
*/
export declare const useDeleteProperty: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteProperty>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteProperty>>, TError, {
    id: number;
}, TContext>;
export declare const getListBookingsUrl: (params?: ListBookingsParams) => string;
/**
 * @summary List all bookings (admin)
 */
export declare const listBookings: (params?: ListBookingsParams, options?: RequestInit) => Promise<Booking[]>;
export declare const getListBookingsQueryKey: (params?: ListBookingsParams) => readonly ["/api/bookings", ...ListBookingsParams[]];
export declare const getListBookingsQueryOptions: <TData = Awaited<ReturnType<typeof listBookings>>, TError = ErrorType<unknown>>(params?: ListBookingsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListBookingsQueryResult = NonNullable<Awaited<ReturnType<typeof listBookings>>>;
export type ListBookingsQueryError = ErrorType<unknown>;
/**
 * @summary List all bookings (admin)
 */
export declare function useListBookings<TData = Awaited<ReturnType<typeof listBookings>>, TError = ErrorType<unknown>>(params?: ListBookingsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateBookingUrl: () => string;
/**
 * @summary Submit a booking request
 */
export declare const createBooking: (bookingInput: BookingInput, options?: RequestInit) => Promise<Booking>;
export declare const getCreateBookingMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createBooking>>, TError, {
        data: BodyType<BookingInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createBooking>>, TError, {
    data: BodyType<BookingInput>;
}, TContext>;
export type CreateBookingMutationResult = NonNullable<Awaited<ReturnType<typeof createBooking>>>;
export type CreateBookingMutationBody = BodyType<BookingInput>;
export type CreateBookingMutationError = ErrorType<unknown>;
/**
* @summary Submit a booking request
*/
export declare const useCreateBooking: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createBooking>>, TError, {
        data: BodyType<BookingInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createBooking>>, TError, {
    data: BodyType<BookingInput>;
}, TContext>;
export declare const getGetBookingStatsUrl: () => string;
/**
 * @summary Get booking statistics (admin)
 */
export declare const getBookingStats: (options?: RequestInit) => Promise<BookingStats>;
export declare const getGetBookingStatsQueryKey: () => readonly ["/api/bookings/stats"];
export declare const getGetBookingStatsQueryOptions: <TData = Awaited<ReturnType<typeof getBookingStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBookingStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getBookingStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetBookingStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getBookingStats>>>;
export type GetBookingStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get booking statistics (admin)
 */
export declare function useGetBookingStats<TData = Awaited<ReturnType<typeof getBookingStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBookingStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetBookingUrl: (id: number) => string;
/**
 * @summary Get a booking
 */
export declare const getBooking: (id: number, options?: RequestInit) => Promise<Booking>;
export declare const getGetBookingQueryKey: (id: number) => readonly [`/api/bookings/${number}`];
export declare const getGetBookingQueryOptions: <TData = Awaited<ReturnType<typeof getBooking>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBooking>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getBooking>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetBookingQueryResult = NonNullable<Awaited<ReturnType<typeof getBooking>>>;
export type GetBookingQueryError = ErrorType<unknown>;
/**
 * @summary Get a booking
 */
export declare function useGetBooking<TData = Awaited<ReturnType<typeof getBooking>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBooking>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateBookingUrl: (id: number) => string;
/**
 * @summary Update booking status (admin)
 */
export declare const updateBooking: (id: number, bookingUpdate: BookingUpdate, options?: RequestInit) => Promise<Booking>;
export declare const getUpdateBookingMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateBooking>>, TError, {
        id: number;
        data: BodyType<BookingUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateBooking>>, TError, {
    id: number;
    data: BodyType<BookingUpdate>;
}, TContext>;
export type UpdateBookingMutationResult = NonNullable<Awaited<ReturnType<typeof updateBooking>>>;
export type UpdateBookingMutationBody = BodyType<BookingUpdate>;
export type UpdateBookingMutationError = ErrorType<unknown>;
/**
* @summary Update booking status (admin)
*/
export declare const useUpdateBooking: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateBooking>>, TError, {
        id: number;
        data: BodyType<BookingUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateBooking>>, TError, {
    id: number;
    data: BodyType<BookingUpdate>;
}, TContext>;
export declare const getListInquiriesUrl: (params?: ListInquiriesParams) => string;
/**
 * @summary List all inquiries (admin)
 */
export declare const listInquiries: (params?: ListInquiriesParams, options?: RequestInit) => Promise<Inquiry[]>;
export declare const getListInquiriesQueryKey: (params?: ListInquiriesParams) => readonly ["/api/inquiries", ...ListInquiriesParams[]];
export declare const getListInquiriesQueryOptions: <TData = Awaited<ReturnType<typeof listInquiries>>, TError = ErrorType<unknown>>(params?: ListInquiriesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listInquiries>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listInquiries>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListInquiriesQueryResult = NonNullable<Awaited<ReturnType<typeof listInquiries>>>;
export type ListInquiriesQueryError = ErrorType<unknown>;
/**
 * @summary List all inquiries (admin)
 */
export declare function useListInquiries<TData = Awaited<ReturnType<typeof listInquiries>>, TError = ErrorType<unknown>>(params?: ListInquiriesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listInquiries>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateInquiryUrl: () => string;
/**
 * @summary Submit a customer inquiry
 */
export declare const createInquiry: (inquiryInput: InquiryInput, options?: RequestInit) => Promise<Inquiry>;
export declare const getCreateInquiryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createInquiry>>, TError, {
        data: BodyType<InquiryInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createInquiry>>, TError, {
    data: BodyType<InquiryInput>;
}, TContext>;
export type CreateInquiryMutationResult = NonNullable<Awaited<ReturnType<typeof createInquiry>>>;
export type CreateInquiryMutationBody = BodyType<InquiryInput>;
export type CreateInquiryMutationError = ErrorType<unknown>;
/**
* @summary Submit a customer inquiry
*/
export declare const useCreateInquiry: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createInquiry>>, TError, {
        data: BodyType<InquiryInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createInquiry>>, TError, {
    data: BodyType<InquiryInput>;
}, TContext>;
export declare const getGetInquiryStatsUrl: () => string;
/**
 * @summary Get inquiry statistics (admin)
 */
export declare const getInquiryStats: (options?: RequestInit) => Promise<InquiryStats>;
export declare const getGetInquiryStatsQueryKey: () => readonly ["/api/inquiries/stats"];
export declare const getGetInquiryStatsQueryOptions: <TData = Awaited<ReturnType<typeof getInquiryStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInquiryStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getInquiryStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetInquiryStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getInquiryStats>>>;
export type GetInquiryStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get inquiry statistics (admin)
 */
export declare function useGetInquiryStats<TData = Awaited<ReturnType<typeof getInquiryStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInquiryStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetInquiryUrl: (id: number) => string;
/**
 * @summary Get an inquiry
 */
export declare const getInquiry: (id: number, options?: RequestInit) => Promise<Inquiry>;
export declare const getGetInquiryQueryKey: (id: number) => readonly [`/api/inquiries/${number}`];
export declare const getGetInquiryQueryOptions: <TData = Awaited<ReturnType<typeof getInquiry>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInquiry>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getInquiry>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetInquiryQueryResult = NonNullable<Awaited<ReturnType<typeof getInquiry>>>;
export type GetInquiryQueryError = ErrorType<unknown>;
/**
 * @summary Get an inquiry
 */
export declare function useGetInquiry<TData = Awaited<ReturnType<typeof getInquiry>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInquiry>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateInquiryUrl: (id: number) => string;
/**
 * @summary Update inquiry status / add reply (admin)
 */
export declare const updateInquiry: (id: number, inquiryUpdate: InquiryUpdate, options?: RequestInit) => Promise<Inquiry>;
export declare const getUpdateInquiryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateInquiry>>, TError, {
        id: number;
        data: BodyType<InquiryUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateInquiry>>, TError, {
    id: number;
    data: BodyType<InquiryUpdate>;
}, TContext>;
export type UpdateInquiryMutationResult = NonNullable<Awaited<ReturnType<typeof updateInquiry>>>;
export type UpdateInquiryMutationBody = BodyType<InquiryUpdate>;
export type UpdateInquiryMutationError = ErrorType<unknown>;
/**
* @summary Update inquiry status / add reply (admin)
*/
export declare const useUpdateInquiry: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateInquiry>>, TError, {
        id: number;
        data: BodyType<InquiryUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateInquiry>>, TError, {
    id: number;
    data: BodyType<InquiryUpdate>;
}, TContext>;
export declare const getGetAdminDashboardUrl: () => string;
/**
 * @summary Get admin dashboard summary
 */
export declare const getAdminDashboard: (options?: RequestInit) => Promise<AdminDashboard>;
export declare const getGetAdminDashboardQueryKey: () => readonly ["/api/admin/dashboard"];
export declare const getGetAdminDashboardQueryOptions: <TData = Awaited<ReturnType<typeof getAdminDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAdminDashboard>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAdminDashboardQueryResult = NonNullable<Awaited<ReturnType<typeof getAdminDashboard>>>;
export type GetAdminDashboardQueryError = ErrorType<unknown>;
/**
 * @summary Get admin dashboard summary
 */
export declare function useGetAdminDashboard<TData = Awaited<ReturnType<typeof getAdminDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getAdminLoginUrl: () => string;
/**
 * @summary Admin login
 */
export declare const adminLogin: (adminCredentials: AdminCredentials, options?: RequestInit) => Promise<AdminSession>;
export declare const getAdminLoginMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, {
        data: BodyType<AdminCredentials>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, {
    data: BodyType<AdminCredentials>;
}, TContext>;
export type AdminLoginMutationResult = NonNullable<Awaited<ReturnType<typeof adminLogin>>>;
export type AdminLoginMutationBody = BodyType<AdminCredentials>;
export type AdminLoginMutationError = ErrorType<void>;
/**
* @summary Admin login
*/
export declare const useAdminLogin: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, {
        data: BodyType<AdminCredentials>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof adminLogin>>, TError, {
    data: BodyType<AdminCredentials>;
}, TContext>;
export declare const getAdminLogoutUrl: () => string;
/**
 * @summary Admin logout
 */
export declare const adminLogout: (options?: RequestInit) => Promise<void>;
export declare const getAdminLogoutMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext>;
export type AdminLogoutMutationResult = NonNullable<Awaited<ReturnType<typeof adminLogout>>>;
export type AdminLogoutMutationError = ErrorType<unknown>;
/**
* @summary Admin logout
*/
export declare const useAdminLogout: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext>;
export declare const getGetAdminMeUrl: () => string;
/**
 * @summary Get current admin session
 */
export declare const getAdminMe: (options?: RequestInit) => Promise<AdminSession>;
export declare const getGetAdminMeQueryKey: () => readonly ["/api/admin/me"];
export declare const getGetAdminMeQueryOptions: <TData = Awaited<ReturnType<typeof getAdminMe>>, TError = ErrorType<void>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminMe>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAdminMe>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAdminMeQueryResult = NonNullable<Awaited<ReturnType<typeof getAdminMe>>>;
export type GetAdminMeQueryError = ErrorType<void>;
/**
 * @summary Get current admin session
 */
export declare function useGetAdminMe<TData = Awaited<ReturnType<typeof getAdminMe>>, TError = ErrorType<void>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminMe>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map