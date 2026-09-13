-- Enumerated types shared across the CRM/operations schema.

create type public.user_role as enum (
  'SUPER_ADMIN',
  'ADMIN',
  'OPERATIONS',
  'FINANCE',
  'DISPATCHER',
  'VIEWER'
);

create type public.lead_status as enum (
  'NEW',
  'CONTACTED',
  'QUOTED',
  'NEGOTIATING',
  'WON',
  'LOST'
);

create type public.quotation_status as enum (
  'DRAFT',
  'SENT',
  'VIEWED',
  'ACCEPTED',
  'REJECTED',
  'EXPIRED',
  'CONVERTED'
);

create type public.booking_status as enum (
  'PENDING',
  'CONFIRMED',
  'ASSIGNED',
  'DRIVER_EN_ROUTE',
  'PASSENGER_PICKED_UP',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW'
);

create type public.payment_status as enum (
  'UNPAID',
  'PARTIALLY_PAID',
  'PAID',
  'REFUNDED'
);

create type public.invoice_status as enum (
  'DRAFT',
  'SENT',
  'PARTIALLY_PAID',
  'PAID',
  'OVERDUE',
  'VOID',
  'REFUNDED'
);

create type public.vehicle_category as enum (
  'SEDAN',
  'SUV',
  'VAN',
  'LUXURY',
  'MINIBUS'
);

create type public.vehicle_status as enum (
  'ACTIVE',
  'MAINTENANCE',
  'INACTIVE'
);

create type public.driver_availability as enum (
  'AVAILABLE',
  'ON_TRIP',
  'OFF_DUTY'
);

create type public.expense_category as enum (
  'DRIVER',
  'FUEL',
  'TOLL',
  'PARKING',
  'MAINTENANCE',
  'AIRPORT',
  'COMMISSION',
  'OTHER'
);

create type public.follow_up_type as enum (
  'NEW_LEAD',
  'QUOTATION_FOLLOWUP',
  'UNPAID_INVOICE',
  'UPCOMING_TRIP',
  'POST_TRIP_FOLLOWUP',
  'REVIEW_REQUEST',
  'REPEAT_BOOKING',
  'CUSTOM'
);

create type public.follow_up_status as enum (
  'PENDING',
  'COMPLETED',
  'CANCELLED'
);

create type public.payment_method as enum (
  'CASH',
  'BANK_TRANSFER',
  'CARD',
  'ONLINE',
  'OTHER'
);

create type public.notification_channel as enum (
  'EMAIL',
  'WHATSAPP',
  'SYSTEM'
);

create type public.notification_status as enum (
  'PENDING',
  'SENT',
  'FAILED'
);

create type public.document_kind as enum (
  'QUOTATION',
  'INVOICE',
  'RECEIPT',
  'BOOKING_CONFIRMATION',
  'DRIVER_DOCUMENT',
  'VEHICLE_DOCUMENT',
  'OTHER'
);

create type public.booking_source as enum (
  'WEBSITE',
  'ADMIN',
  'PHONE',
  'EMAIL',
  'WHATSAPP',
  'REPEAT'
);
