export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          actor_id: string | null
          after_state: Json | null
          before_state: Json | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json
        }
        Insert: {
          action: string
          actor_id?: string | null
          after_state?: Json | null
          before_state?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json
        }
        Update: {
          action?: string
          actor_id?: string | null
          after_state?: Json | null
          before_state?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_definitions: {
        Row: {
          config: Json
          description: string
          enabled: boolean
          key: string
          kind: string
          label: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          config?: Json
          description: string
          enabled?: boolean
          key: string
          kind: string
          label: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          config?: Json
          description?: string
          enabled?: boolean
          key?: string
          kind?: string
          label?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_definitions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_runs: {
        Row: {
          affected_count: number
          automation_key: string
          error_message: string | null
          finished_at: string
          id: string
          metadata: Json
          started_at: string
          status: string
          triggered_by: string
        }
        Insert: {
          affected_count?: number
          automation_key: string
          error_message?: string | null
          finished_at?: string
          id?: string
          metadata?: Json
          started_at?: string
          status: string
          triggered_by: string
        }
        Update: {
          affected_count?: number
          automation_key?: string
          error_message?: string | null
          finished_at?: string
          id?: string
          metadata?: Json
          started_at?: string
          status?: string
          triggered_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_runs_automation_key_fkey"
            columns: ["automation_key"]
            isOneToOne: false
            referencedRelation: "automation_definitions"
            referencedColumns: ["key"]
          },
        ]
      }
      booking_passengers: {
        Row: {
          booking_id: string
          full_name: string
          id: string
          is_primary: boolean
          phone: string | null
        }
        Insert: {
          booking_id: string
          full_name: string
          id?: string
          is_primary?: boolean
          phone?: string | null
        }
        Update: {
          booking_id?: string
          full_name?: string
          id?: string
          is_primary?: boolean
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_passengers_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_status_history: {
        Row: {
          booking_id: string
          changed_at: string
          changed_by: string | null
          from_status: Database["public"]["Enums"]["booking_status"] | null
          id: string
          note: string | null
          to_status: Database["public"]["Enums"]["booking_status"]
        }
        Insert: {
          booking_id: string
          changed_at?: string
          changed_by?: string | null
          from_status?: Database["public"]["Enums"]["booking_status"] | null
          id?: string
          note?: string | null
          to_status: Database["public"]["Enums"]["booking_status"]
        }
        Update: {
          booking_id?: string
          changed_at?: string
          changed_by?: string | null
          from_status?: Database["public"]["Enums"]["booking_status"] | null
          id?: string
          note?: string | null
          to_status?: Database["public"]["Enums"]["booking_status"]
        }
        Relationships: [
          {
            foreignKeyName: "booking_status_history_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          booking_reference: string
          cancellation_fee: number | null
          cancellation_initiated_by: string | null
          cancellation_reason: string | null
          cancellation_refund_amount: number | null
          cancelled_at: string | null
          cancelled_by: string | null
          completed_at: string | null
          confirmed_at: string | null
          created_at: string
          created_by: string | null
          currency: string
          customer_id: string
          customer_notes: string | null
          deleted_at: string | null
          discount: number
          distance_km: number | null
          driver_en_route_at: string | null
          driver_id: string | null
          dropoff: string
          estimated_duration_minutes: number
          flight_arrival_time: string | null
          flight_departure_time: string | null
          flight_number: string | null
          flight_terminal: string | null
          id: string
          internal_notes: string | null
          is_airport_pickup: boolean
          luggage: number | null
          meet_and_greet_notes: string | null
          no_show_at: string | null
          no_show_charge: number | null
          no_show_notes: string | null
          no_show_refund_amount: number | null
          no_show_type: string | null
          passengers: number | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          picked_up_at: string | null
          pickup: string
          price: number
          pricing_breakdown: Json | null
          quotation_id: string | null
          service_id: string | null
          source: Database["public"]["Enums"]["booking_source"]
          special_requests: string | null
          status: Database["public"]["Enums"]["booking_status"]
          tax_amount: number
          total: number
          trip_date: string
          trip_started_at: string | null
          trip_time: string
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          booking_reference: string
          cancellation_fee?: number | null
          cancellation_initiated_by?: string | null
          cancellation_reason?: string | null
          cancellation_refund_amount?: number | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          customer_id: string
          customer_notes?: string | null
          deleted_at?: string | null
          discount?: number
          distance_km?: number | null
          driver_en_route_at?: string | null
          driver_id?: string | null
          dropoff: string
          estimated_duration_minutes?: number
          flight_arrival_time?: string | null
          flight_departure_time?: string | null
          flight_number?: string | null
          flight_terminal?: string | null
          id?: string
          internal_notes?: string | null
          is_airport_pickup?: boolean
          luggage?: number | null
          meet_and_greet_notes?: string | null
          no_show_at?: string | null
          no_show_charge?: number | null
          no_show_notes?: string | null
          no_show_refund_amount?: number | null
          no_show_type?: string | null
          passengers?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          picked_up_at?: string | null
          pickup: string
          price?: number
          pricing_breakdown?: Json | null
          quotation_id?: string | null
          service_id?: string | null
          source?: Database["public"]["Enums"]["booking_source"]
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          tax_amount?: number
          total?: number
          trip_date: string
          trip_started_at?: string | null
          trip_time: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          booking_reference?: string
          cancellation_fee?: number | null
          cancellation_initiated_by?: string | null
          cancellation_reason?: string | null
          cancellation_refund_amount?: number | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          customer_id?: string
          customer_notes?: string | null
          deleted_at?: string | null
          discount?: number
          distance_km?: number | null
          driver_en_route_at?: string | null
          driver_id?: string | null
          dropoff?: string
          estimated_duration_minutes?: number
          flight_arrival_time?: string | null
          flight_departure_time?: string | null
          flight_number?: string | null
          flight_terminal?: string | null
          id?: string
          internal_notes?: string | null
          is_airport_pickup?: boolean
          luggage?: number | null
          meet_and_greet_notes?: string | null
          no_show_at?: string | null
          no_show_charge?: number | null
          no_show_notes?: string | null
          no_show_refund_amount?: number | null
          no_show_type?: string | null
          passengers?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          picked_up_at?: string | null
          pickup?: string
          price?: number
          pricing_breakdown?: Json | null
          quotation_id?: string | null
          service_id?: string | null
          source?: Database["public"]["Enums"]["booking_source"]
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          tax_amount?: number
          total?: number
          trip_date?: string
          trip_started_at?: string | null
          trip_time?: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      company_settings: {
        Row: {
          address: string | null
          auto_generate_invoice_on_confirm: boolean
          booking_prefix: string
          company_name: string
          currency_default: string
          discount_approval_threshold_percent: number
          email: string | null
          id: string
          invoice_prefix: string
          lead_prefix: string
          legal_name: string | null
          logo_url: string | null
          payment_terms: string | null
          phone: string | null
          quotation_prefix: string
          receipt_prefix: string
          singleton: boolean
          tax_number: string | null
          tax_rate_default: number
          terms_and_conditions: string | null
          updated_at: string
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          auto_generate_invoice_on_confirm?: boolean
          booking_prefix?: string
          company_name?: string
          currency_default?: string
          discount_approval_threshold_percent?: number
          email?: string | null
          id?: string
          invoice_prefix?: string
          lead_prefix?: string
          legal_name?: string | null
          logo_url?: string | null
          payment_terms?: string | null
          phone?: string | null
          quotation_prefix?: string
          receipt_prefix?: string
          singleton?: boolean
          tax_number?: string | null
          tax_rate_default?: number
          terms_and_conditions?: string | null
          updated_at?: string
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          auto_generate_invoice_on_confirm?: boolean
          booking_prefix?: string
          company_name?: string
          currency_default?: string
          discount_approval_threshold_percent?: number
          email?: string | null
          id?: string
          invoice_prefix?: string
          lead_prefix?: string
          legal_name?: string | null
          logo_url?: string | null
          payment_terms?: string | null
          phone?: string | null
          quotation_prefix?: string
          receipt_prefix?: string
          singleton?: boolean
          tax_number?: string | null
          tax_rate_default?: number
          terms_and_conditions?: string | null
          updated_at?: string
          website?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      credit_notes: {
        Row: {
          amount: number
          created_at: string
          credit_note_number: string
          currency: string
          customer_id: string | null
          id: string
          invoice_id: string | null
          reason: string | null
          refund_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          credit_note_number: string
          currency?: string
          customer_id?: string | null
          id?: string
          invoice_id?: string | null
          reason?: string | null
          refund_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          credit_note_number?: string
          currency?: string
          customer_id?: string | null
          id?: string
          invoice_id?: string | null
          reason?: string | null
          refund_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_notes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_notes_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_notes_refund_id_fkey"
            columns: ["refund_id"]
            isOneToOne: false
            referencedRelation: "refunds"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_accounts: {
        Row: {
          created_at: string
          customer_id: string | null
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          email: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          email?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_accounts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_segment_overrides: {
        Row: {
          created_at: string
          created_by: string | null
          customer_id: string
          note: string | null
          segment: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          customer_id: string
          note?: string | null
          segment: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          customer_id?: string
          note?: string | null
          segment?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_segment_overrides_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_segment_overrides_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: true
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          billing_address: string | null
          billing_contact_name: string | null
          billing_email: string | null
          company_name: string | null
          country: string | null
          created_at: string
          created_by: string | null
          credit_limit: number | null
          customer_type: string
          deleted_at: string | null
          email: string | null
          full_name: string
          id: string
          notes: string | null
          opt_out_marketing: boolean
          payment_terms: string | null
          phone: string | null
          tax_vat_number: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          billing_address?: string | null
          billing_contact_name?: string | null
          billing_email?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          credit_limit?: number | null
          customer_type?: string
          deleted_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          opt_out_marketing?: boolean
          payment_terms?: string | null
          phone?: string | null
          tax_vat_number?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          billing_address?: string | null
          billing_contact_name?: string | null
          billing_email?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          credit_limit?: number | null
          customer_type?: string
          deleted_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          opt_out_marketing?: boolean
          payment_terms?: string | null
          phone?: string | null
          tax_vat_number?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      discount_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          discount_amount: number
          discount_percent: number
          entity_id: string
          entity_type: string
          final_price: number
          id: string
          original_price: number
          reason: string
          requested_by: string | null
          status: string
          threshold_percent: number
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          discount_amount?: number
          discount_percent?: number
          entity_id: string
          entity_type: string
          final_price: number
          id?: string
          original_price: number
          reason: string
          requested_by?: string | null
          status?: string
          threshold_percent: number
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          discount_amount?: number
          discount_percent?: number
          entity_id?: string
          entity_type?: string
          final_price?: number
          id?: string
          original_price?: number
          reason?: string
          requested_by?: string | null
          status?: string
          threshold_percent?: number
        }
        Relationships: [
          {
            foreignKeyName: "discount_requests_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discount_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      document_sequences: {
        Row: {
          doc_type: string
          next_number: number
        }
        Insert: {
          doc_type: string
          next_number?: number
        }
        Update: {
          doc_type?: string
          next_number?: number
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          doc_type: Database["public"]["Enums"]["document_kind"]
          document_subtype: string | null
          entity_id: string
          entity_type: string
          expiry_date: string | null
          file_name: string
          id: string
          mime_type: string | null
          size_bytes: number | null
          storage_path: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          doc_type: Database["public"]["Enums"]["document_kind"]
          document_subtype?: string | null
          entity_id: string
          entity_type: string
          expiry_date?: string | null
          file_name: string
          id?: string
          mime_type?: string | null
          size_bytes?: number | null
          storage_path: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          doc_type?: Database["public"]["Enums"]["document_kind"]
          document_subtype?: string | null
          entity_id?: string
          entity_type?: string
          expiry_date?: string | null
          file_name?: string
          id?: string
          mime_type?: string | null
          size_bytes?: number | null
          storage_path?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          booking_id: string
          driver_id: string | null
          id: string
          notes: string | null
          status: string
          unassigned_at: string | null
          vehicle_id: string | null
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          booking_id: string
          driver_id?: string | null
          id?: string
          notes?: string | null
          status?: string
          unassigned_at?: string | null
          vehicle_id?: string | null
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          booking_id?: string
          driver_id?: string | null
          id?: string
          notes?: string | null
          status?: string
          unassigned_at?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_assignments_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_assignments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_assignments_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_assignments_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_earnings: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          booking_id: string | null
          calculation_method: string
          calculation_rate: number | null
          company_share: number
          created_at: string
          currency: string
          driver_earning: number
          driver_id: string
          id: string
          payout_id: string | null
          status: string
          trip_revenue: number
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          booking_id?: string | null
          calculation_method: string
          calculation_rate?: number | null
          company_share: number
          created_at?: string
          currency?: string
          driver_earning: number
          driver_id: string
          id?: string
          payout_id?: string | null
          status?: string
          trip_revenue: number
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          booking_id?: string | null
          calculation_method?: string
          calculation_rate?: number | null
          company_share?: number
          created_at?: string
          currency?: string
          driver_earning?: number
          driver_id?: string
          id?: string
          payout_id?: string | null
          status?: string
          trip_revenue?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "driver_earnings_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_earnings_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_earnings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_earnings_payout_id_fkey"
            columns: ["payout_id"]
            isOneToOne: false
            referencedRelation: "driver_payouts"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_payouts: {
        Row: {
          adjustments: number
          approved_at: string | null
          approved_by: string | null
          created_at: string
          created_by: string | null
          currency: string
          driver_id: string
          expenses: number
          gross_earnings: number
          id: string
          net_payout: number
          notes: string | null
          paid_at: string | null
          payment_reference: string | null
          period_end: string
          period_start: string
          status: string
          updated_at: string
        }
        Insert: {
          adjustments?: number
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          driver_id: string
          expenses?: number
          gross_earnings?: number
          id?: string
          net_payout?: number
          notes?: string | null
          paid_at?: string | null
          payment_reference?: string | null
          period_end: string
          period_start: string
          status?: string
          updated_at?: string
        }
        Update: {
          adjustments?: number
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          driver_id?: string
          expenses?: number
          gross_earnings?: number
          id?: string
          net_payout?: number
          notes?: string | null
          paid_at?: string | null
          payment_reference?: string | null
          period_end?: string
          period_start?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "driver_payouts_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_payouts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_payouts_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          active: boolean
          assigned_vehicle_id: string | null
          availability: Database["public"]["Enums"]["driver_availability"]
          created_at: string
          deleted_at: string | null
          email: string | null
          full_name: string
          id: string
          license_expiry: string | null
          license_number: string | null
          nationality: string | null
          notes: string | null
          pay_currency: string | null
          pay_model: string | null
          pay_rate: number | null
          phone: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          active?: boolean
          assigned_vehicle_id?: string | null
          availability?: Database["public"]["Enums"]["driver_availability"]
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          license_expiry?: string | null
          license_number?: string | null
          nationality?: string | null
          notes?: string | null
          pay_currency?: string | null
          pay_model?: string | null
          pay_rate?: number | null
          phone?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          active?: boolean
          assigned_vehicle_id?: string | null
          availability?: Database["public"]["Enums"]["driver_availability"]
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          license_expiry?: string | null
          license_number?: string | null
          nationality?: string | null
          notes?: string | null
          pay_currency?: string | null
          pay_model?: string | null
          pay_rate?: number | null
          phone?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drivers_assigned_vehicle_id_fkey"
            columns: ["assigned_vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_status_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          expense_id: string
          from_status: string | null
          id: string
          note: string | null
          to_status: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          expense_id: string
          from_status?: string | null
          id?: string
          note?: string | null
          to_status: string
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          expense_id?: string
          from_status?: string | null
          id?: string
          note?: string | null
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "expense_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_status_history_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          booking_id: string | null
          category: Database["public"]["Enums"]["expense_category"]
          created_at: string
          created_by: string | null
          currency: string
          deleted_at: string | null
          description: string | null
          driver_id: string | null
          expense_date: string
          id: string
          paid_at: string | null
          paid_by: string | null
          payment_reference: string | null
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          status: string
          submitted_at: string | null
          submitted_by: string | null
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          booking_id?: string | null
          category: Database["public"]["Enums"]["expense_category"]
          created_at?: string
          created_by?: string | null
          currency?: string
          deleted_at?: string | null
          description?: string | null
          driver_id?: string | null
          expense_date?: string
          id?: string
          paid_at?: string | null
          paid_by?: string | null
          payment_reference?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: string
          submitted_at?: string | null
          submitted_by?: string | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          booking_id?: string | null
          category?: Database["public"]["Enums"]["expense_category"]
          created_at?: string
          created_by?: string | null
          currency?: string
          deleted_at?: string | null
          description?: string | null
          driver_id?: string | null
          expense_date?: string
          id?: string
          paid_at?: string | null
          paid_by?: string | null
          payment_reference?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: string
          submitted_at?: string | null
          submitted_by?: string | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_paid_by_fkey"
            columns: ["paid_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_rejected_by_fkey"
            columns: ["rejected_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      export_logs: {
        Row: {
          created_at: string
          dataset: string
          filters: Json | null
          id: string
          row_count: number
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dataset: string
          filters?: Json | null
          id?: string
          row_count?: number
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          dataset?: string
          filters?: Json | null
          id?: string
          row_count?: number
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "export_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      follow_ups: {
        Row: {
          assigned_to: string | null
          booking_id: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          due_date: string
          id: string
          invoice_id: string | null
          lead_id: string | null
          notes: string | null
          quotation_id: string | null
          status: Database["public"]["Enums"]["follow_up_status"]
          type: Database["public"]["Enums"]["follow_up_type"]
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          booking_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          due_date: string
          id?: string
          invoice_id?: string | null
          lead_id?: string | null
          notes?: string | null
          quotation_id?: string | null
          status?: Database["public"]["Enums"]["follow_up_status"]
          type: Database["public"]["Enums"]["follow_up_type"]
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          booking_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          due_date?: string
          id?: string
          invoice_id?: string | null
          lead_id?: string | null
          notes?: string | null
          quotation_id?: string | null
          status?: Database["public"]["Enums"]["follow_up_status"]
          type?: Database["public"]["Enums"]["follow_up_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "follow_ups_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_ups_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_ups_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_ups_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_ups_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_ups_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_ups_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
        ]
      }
      internal_notes: {
        Row: {
          created_at: string
          created_by: string | null
          entity_id: string
          entity_type: string
          id: string
          note: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          entity_id: string
          entity_type: string
          id?: string
          note: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          note?: string
        }
        Relationships: [
          {
            foreignKeyName: "internal_notes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          amount: number
          description: string
          id: string
          invoice_id: string
          quantity: number
          service_id: string | null
          sort_order: number
          unit_price: number
        }
        Insert: {
          amount?: number
          description: string
          id?: string
          invoice_id: string
          quantity?: number
          service_id?: string | null
          sort_order?: number
          unit_price?: number
        }
        Update: {
          amount?: number
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
          service_id?: string | null
          sort_order?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_status_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          from_status: Database["public"]["Enums"]["invoice_status"] | null
          id: string
          invoice_id: string
          note: string | null
          to_status: Database["public"]["Enums"]["invoice_status"]
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          from_status?: Database["public"]["Enums"]["invoice_status"] | null
          id?: string
          invoice_id: string
          note?: string | null
          to_status: Database["public"]["Enums"]["invoice_status"]
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          from_status?: Database["public"]["Enums"]["invoice_status"] | null
          id?: string
          invoice_id?: string
          note?: string | null
          to_status?: Database["public"]["Enums"]["invoice_status"]
        }
        Relationships: [
          {
            foreignKeyName: "invoice_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_status_history_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount_paid: number
          balance_due: number | null
          booking_id: string | null
          created_at: string
          created_by: string | null
          currency: string
          customer_id: string
          deleted_at: string | null
          discount: number
          due_date: string | null
          id: string
          invoice_number: string
          payment_terms: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["invoice_status"]
          subtotal: number
          tax_amount: number
          tax_rate: number
          terms_and_conditions: string | null
          total: number
          updated_at: string
        }
        Insert: {
          amount_paid?: number
          balance_due?: number | null
          booking_id?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          customer_id: string
          deleted_at?: string | null
          discount?: number
          due_date?: string | null
          id?: string
          invoice_number: string
          payment_terms?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          terms_and_conditions?: string | null
          total?: number
          updated_at?: string
        }
        Update: {
          amount_paid?: number
          balance_due?: number | null
          booking_id?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          customer_id?: string
          deleted_at?: string | null
          discount?: number
          due_date?: string | null
          id?: string
          invoice_number?: string
          payment_terms?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          terms_and_conditions?: string | null
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_status_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          from_status: Database["public"]["Enums"]["lead_status"] | null
          id: string
          lead_id: string
          note: string | null
          to_status: Database["public"]["Enums"]["lead_status"]
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          from_status?: Database["public"]["Enums"]["lead_status"] | null
          id?: string
          lead_id: string
          note?: string | null
          to_status: Database["public"]["Enums"]["lead_status"]
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          from_status?: Database["public"]["Enums"]["lead_status"] | null
          id?: string
          lead_id?: string
          note?: string | null
          to_status?: Database["public"]["Enums"]["lead_status"]
        }
        Relationships: [
          {
            foreignKeyName: "lead_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_status_history_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          created_at: string
          created_by: string | null
          currency: string
          customer_id: string | null
          deleted_at: string | null
          dropoff: string | null
          email: string | null
          estimated_value: number | null
          full_name: string
          id: string
          lead_number: string
          next_follow_up_at: string | null
          notes: string | null
          passengers: number | null
          phone: string | null
          pickup: string | null
          source: string
          status: Database["public"]["Enums"]["lead_status"]
          trip_date: string | null
          trip_time: string | null
          updated_at: string
          vehicle_requested:
            | Database["public"]["Enums"]["vehicle_category"]
            | null
          whatsapp: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          customer_id?: string | null
          deleted_at?: string | null
          dropoff?: string | null
          email?: string | null
          estimated_value?: number | null
          full_name: string
          id?: string
          lead_number: string
          next_follow_up_at?: string | null
          notes?: string | null
          passengers?: number | null
          phone?: string | null
          pickup?: string | null
          source?: string
          status?: Database["public"]["Enums"]["lead_status"]
          trip_date?: string | null
          trip_time?: string | null
          updated_at?: string
          vehicle_requested?:
            | Database["public"]["Enums"]["vehicle_category"]
            | null
          whatsapp?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          customer_id?: string | null
          deleted_at?: string | null
          dropoff?: string | null
          email?: string | null
          estimated_value?: number | null
          full_name?: string
          id?: string
          lead_number?: string
          next_follow_up_at?: string | null
          notes?: string | null
          passengers?: number | null
          phone?: string | null
          pickup?: string | null
          source?: string
          status?: Database["public"]["Enums"]["lead_status"]
          trip_date?: string | null
          trip_time?: string | null
          updated_at?: string
          vehicle_requested?:
            | Database["public"]["Enums"]["vehicle_category"]
            | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_templates: {
        Row: {
          body_template: string
          is_customized: boolean
          key: string
          label: string
          subject_template: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          body_template: string
          is_customized?: boolean
          key: string
          label: string
          subject_template: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          body_template?: string
          is_customized?: boolean
          key?: string
          label?: string
          subject_template?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_templates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          channel: Database["public"]["Enums"]["notification_channel"]
          created_at: string
          error: string | null
          event_type: string
          id: string
          recipient_id: string | null
          recipient_type: string
          related_entity_id: string | null
          related_entity_type: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["notification_status"]
          subject: string | null
        }
        Insert: {
          body?: string | null
          channel?: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          error?: string | null
          event_type: string
          id?: string
          recipient_id?: string | null
          recipient_type: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["notification_status"]
          subject?: string | null
        }
        Update: {
          body?: string | null
          channel?: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          error?: string | null
          event_type?: string
          id?: string
          recipient_id?: string | null
          recipient_type?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["notification_status"]
          subject?: string | null
        }
        Relationships: []
      }
      operational_alerts: {
        Row: {
          alert_type: string
          assigned_to: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          message: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          snoozed_until: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          alert_type: string
          assigned_to?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          message?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          snoozed_until?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          alert_type?: string
          assigned_to?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          message?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          snoozed_until?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "operational_alerts_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operational_alerts_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string
          currency: string
          customer_id: string | null
          deleted_at: string | null
          external_reference: string | null
          id: string
          invoice_id: string
          method: Database["public"]["Enums"]["payment_method"]
          notes: string | null
          payment_date: string
          reconciled_at: string | null
          reconciled_by: string | null
          reconciliation_notes: string | null
          reconciliation_status: string
          recorded_by: string | null
          reference_number: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string
          currency?: string
          customer_id?: string | null
          deleted_at?: string | null
          external_reference?: string | null
          id?: string
          invoice_id: string
          method: Database["public"]["Enums"]["payment_method"]
          notes?: string | null
          payment_date?: string
          reconciled_at?: string | null
          reconciled_by?: string | null
          reconciliation_notes?: string | null
          reconciliation_status?: string
          recorded_by?: string | null
          reference_number?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string
          currency?: string
          customer_id?: string | null
          deleted_at?: string | null
          external_reference?: string | null
          id?: string
          invoice_id?: string
          method?: Database["public"]["Enums"]["payment_method"]
          notes?: string | null
          payment_date?: string
          reconciled_at?: string | null
          reconciled_by?: string | null
          reconciliation_notes?: string | null
          reconciliation_status?: string
          recorded_by?: string | null
          reference_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_reconciled_by_fkey"
            columns: ["reconciled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      price_override_log: {
        Row: {
          changed_at: string
          changed_by: string | null
          entity_id: string
          entity_type: string
          id: string
          new_price: number
          original_price: number
          reason: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          entity_id: string
          entity_type: string
          id?: string
          new_price: number
          original_price: number
          reason: string
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          new_price?: number
          original_price?: number
          reason?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_override_log_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_holiday_dates: {
        Row: {
          created_at: string
          created_by: string | null
          holiday_date: string
          id: string
          label: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          holiday_date: string
          id?: string
          label?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          holiday_date?: string
          id?: string
          label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_holiday_dates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_rate_cards: {
        Row: {
          active: boolean
          base_price: number
          created_at: string
          created_by: string | null
          currency: string
          deleted_at: string | null
          id: string
          label: string
          min_price: number | null
          price_per_km: number | null
          sort_order: number
          updated_at: string
          vehicle_category: Database["public"]["Enums"]["vehicle_category"]
        }
        Insert: {
          active?: boolean
          base_price?: number
          created_at?: string
          created_by?: string | null
          currency: string
          deleted_at?: string | null
          id?: string
          label: string
          min_price?: number | null
          price_per_km?: number | null
          sort_order?: number
          updated_at?: string
          vehicle_category: Database["public"]["Enums"]["vehicle_category"]
        }
        Update: {
          active?: boolean
          base_price?: number
          created_at?: string
          created_by?: string | null
          currency?: string
          deleted_at?: string | null
          id?: string
          label?: string
          min_price?: number | null
          price_per_km?: number | null
          sort_order?: number
          updated_at?: string
          vehicle_category?: Database["public"]["Enums"]["vehicle_category"]
        }
        Relationships: [
          {
            foreignKeyName: "pricing_rate_cards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_route_rates: {
        Row: {
          active: boolean
          created_at: string
          created_by: string | null
          currency: string
          deleted_at: string | null
          dropoff_label: string
          id: string
          pickup_label: string
          price: number
          updated_at: string
          vehicle_category: Database["public"]["Enums"]["vehicle_category"]
        }
        Insert: {
          active?: boolean
          created_at?: string
          created_by?: string | null
          currency: string
          deleted_at?: string | null
          dropoff_label: string
          id?: string
          pickup_label: string
          price: number
          updated_at?: string
          vehicle_category: Database["public"]["Enums"]["vehicle_category"]
        }
        Update: {
          active?: boolean
          created_at?: string
          created_by?: string | null
          currency?: string
          deleted_at?: string | null
          dropoff_label?: string
          id?: string
          pickup_label?: string
          price?: number
          updated_at?: string
          vehicle_category?: Database["public"]["Enums"]["vehicle_category"]
        }
        Relationships: [
          {
            foreignKeyName: "pricing_route_rates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_surcharge_rules: {
        Row: {
          active: boolean
          amount: number
          created_at: string
          created_by: string | null
          currency: string | null
          deleted_at: string | null
          ends_at: string | null
          id: string
          is_percent: boolean
          kind: string
          label: string
          sort_order: number
          starts_at: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          amount?: number
          created_at?: string
          created_by?: string | null
          currency?: string | null
          deleted_at?: string | null
          ends_at?: string | null
          id?: string
          is_percent?: boolean
          kind: string
          label: string
          sort_order?: number
          starts_at?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          amount?: number
          created_at?: string
          created_by?: string | null
          currency?: string | null
          deleted_at?: string | null
          ends_at?: string | null
          id?: string
          is_percent?: boolean
          kind?: string
          label?: string
          sort_order?: number
          starts_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pricing_surcharge_rules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active: boolean
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          email: string
          full_name?: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      quotation_items: {
        Row: {
          amount: number
          description: string
          id: string
          quantity: number
          quotation_id: string
          service_id: string | null
          sort_order: number
          unit_price: number
        }
        Insert: {
          amount?: number
          description: string
          id?: string
          quantity?: number
          quotation_id: string
          service_id?: string | null
          sort_order?: number
          unit_price?: number
        }
        Update: {
          amount?: number
          description?: string
          id?: string
          quantity?: number
          quotation_id?: string
          service_id?: string | null
          sort_order?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quotation_items_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotation_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      quotation_status_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          from_status: Database["public"]["Enums"]["quotation_status"] | null
          id: string
          note: string | null
          quotation_id: string
          to_status: Database["public"]["Enums"]["quotation_status"]
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          from_status?: Database["public"]["Enums"]["quotation_status"] | null
          id?: string
          note?: string | null
          quotation_id: string
          to_status: Database["public"]["Enums"]["quotation_status"]
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          from_status?: Database["public"]["Enums"]["quotation_status"] | null
          id?: string
          note?: string | null
          quotation_id?: string
          to_status?: Database["public"]["Enums"]["quotation_status"]
        }
        Relationships: [
          {
            foreignKeyName: "quotation_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotation_status_history_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
        ]
      }
      quotations: {
        Row: {
          accepted_at: string | null
          converted_booking_id: string | null
          created_at: string
          created_by: string | null
          currency: string
          customer_id: string
          deleted_at: string | null
          discount: number
          distance_km: number | null
          driver_id: string | null
          dropoff: string | null
          id: string
          internal_notes: string | null
          lead_id: string | null
          luggage: number | null
          passengers: number | null
          payment_terms: string | null
          pickup: string | null
          pricing_breakdown: Json | null
          quotation_number: string
          rejected_at: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["quotation_status"]
          subtotal: number
          tax_amount: number
          tax_rate: number
          terms_and_conditions: string | null
          total: number
          trip_date: string | null
          trip_time: string | null
          updated_at: string
          valid_until: string | null
          vehicle_id: string | null
          viewed_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          converted_booking_id?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          customer_id: string
          deleted_at?: string | null
          discount?: number
          distance_km?: number | null
          driver_id?: string | null
          dropoff?: string | null
          id?: string
          internal_notes?: string | null
          lead_id?: string | null
          luggage?: number | null
          passengers?: number | null
          payment_terms?: string | null
          pickup?: string | null
          pricing_breakdown?: Json | null
          quotation_number: string
          rejected_at?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quotation_status"]
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          terms_and_conditions?: string | null
          total?: number
          trip_date?: string | null
          trip_time?: string | null
          updated_at?: string
          valid_until?: string | null
          vehicle_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          converted_booking_id?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          customer_id?: string
          deleted_at?: string | null
          discount?: number
          distance_km?: number | null
          driver_id?: string | null
          dropoff?: string | null
          id?: string
          internal_notes?: string | null
          lead_id?: string | null
          luggage?: number | null
          passengers?: number | null
          payment_terms?: string | null
          pickup?: string | null
          pricing_breakdown?: Json | null
          quotation_number?: string
          rejected_at?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quotation_status"]
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          terms_and_conditions?: string | null
          total?: number
          trip_date?: string | null
          trip_time?: string | null
          updated_at?: string
          valid_until?: string | null
          vehicle_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotations_converted_booking_fk"
            columns: ["converted_booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      receipts: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string
          customer_id: string | null
          id: string
          invoice_id: string | null
          method: Database["public"]["Enums"]["payment_method"]
          payment_date: string
          payment_id: string
          receipt_number: string
          remaining_balance: number
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          invoice_id?: string | null
          method: Database["public"]["Enums"]["payment_method"]
          payment_date: string
          payment_id: string
          receipt_number: string
          remaining_balance?: number
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          invoice_id?: string | null
          method?: Database["public"]["Enums"]["payment_method"]
          payment_date?: string
          payment_id?: string
          receipt_number?: string
          remaining_balance?: number
        }
        Relationships: [
          {
            foreignKeyName: "receipts_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receipts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receipts_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receipts_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: true
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      refunds: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          booking_id: string | null
          created_at: string
          currency: string
          customer_id: string | null
          id: string
          invoice_id: string | null
          payment_id: string
          processed_at: string | null
          reason: string
          refund_reference: string | null
          refund_type: string
          requested_by: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          booking_id?: string | null
          created_at?: string
          currency?: string
          customer_id?: string | null
          id?: string
          invoice_id?: string | null
          payment_id: string
          processed_at?: string | null
          reason: string
          refund_reference?: string | null
          refund_type: string
          requested_by?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          booking_id?: string | null
          created_at?: string
          currency?: string
          customer_id?: string | null
          id?: string
          invoice_id?: string | null
          payment_id?: string
          processed_at?: string | null
          reason?: string
          refund_reference?: string | null
          refund_type?: string
          requested_by?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "refunds_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refunds_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refunds_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refunds_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refunds_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refunds_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          id: string
          is_published: boolean
          rating: number
          source: string
          updated_at: string
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          id?: string
          is_published?: boolean
          rating: number
          source: string
          updated_at?: string
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          id?: string
          is_published?: boolean
          rating?: number
          source?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          permission: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          permission: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          permission?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          created_by: string | null
          currency: string | null
          default_buffer_minutes: number | null
          default_duration_minutes: number | null
          default_price: number | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          pricing_model: string
          sort_order: number
          tax_behavior: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          currency?: string | null
          default_buffer_minutes?: number | null
          default_duration_minutes?: number | null
          default_price?: number | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          pricing_model: string
          sort_order?: number
          tax_behavior?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          currency?: string | null
          default_buffer_minutes?: number | null
          default_duration_minutes?: number | null
          default_price?: number | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          pricing_model?: string
          sort_order?: number
          tax_behavior?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string
          related_entity_id: string | null
          related_entity_type: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_maintenance: {
        Row: {
          cost: number
          created_at: string
          created_by: string | null
          currency: string
          description: string | null
          document_id: string | null
          id: string
          maintenance_type: Database["public"]["Enums"]["maintenance_type"]
          mileage: number | null
          next_service_date: string | null
          next_service_mileage: number | null
          service_date: string
          updated_at: string
          vehicle_id: string
          vendor: string | null
        }
        Insert: {
          cost?: number
          created_at?: string
          created_by?: string | null
          currency?: string
          description?: string | null
          document_id?: string | null
          id?: string
          maintenance_type: Database["public"]["Enums"]["maintenance_type"]
          mileage?: number | null
          next_service_date?: string | null
          next_service_mileage?: number | null
          service_date?: string
          updated_at?: string
          vehicle_id: string
          vendor?: string | null
        }
        Update: {
          cost?: number
          created_at?: string
          created_by?: string | null
          currency?: string
          description?: string | null
          document_id?: string | null
          id?: string
          maintenance_type?: Database["public"]["Enums"]["maintenance_type"]
          mileage?: number | null
          next_service_date?: string | null
          next_service_mileage?: number | null
          service_date?: string
          updated_at?: string
          vehicle_id?: string
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_maintenance_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_maintenance_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_maintenance_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          active: boolean
          category: Database["public"]["Enums"]["vehicle_category"]
          color: string | null
          created_at: string
          current_mileage: number | null
          deleted_at: string | null
          description: string | null
          id: string
          image_url: string | null
          insurance_expiry: string | null
          lease_end_date: string | null
          lease_monthly_amount: number | null
          luggage_capacity: number | null
          make: string | null
          model: string | null
          name: string
          purchase_date: string | null
          purchase_price: number | null
          registration_expiry: string | null
          registration_number: string | null
          seats: number | null
          status: Database["public"]["Enums"]["vehicle_status"]
          updated_at: string
          vin: string | null
          year: number | null
        }
        Insert: {
          active?: boolean
          category?: Database["public"]["Enums"]["vehicle_category"]
          color?: string | null
          created_at?: string
          current_mileage?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          insurance_expiry?: string | null
          lease_end_date?: string | null
          lease_monthly_amount?: number | null
          luggage_capacity?: number | null
          make?: string | null
          model?: string | null
          name: string
          purchase_date?: string | null
          purchase_price?: number | null
          registration_expiry?: string | null
          registration_number?: string | null
          seats?: number | null
          status?: Database["public"]["Enums"]["vehicle_status"]
          updated_at?: string
          vin?: string | null
          year?: number | null
        }
        Update: {
          active?: boolean
          category?: Database["public"]["Enums"]["vehicle_category"]
          color?: string | null
          created_at?: string
          current_mileage?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          insurance_expiry?: string | null
          lease_end_date?: string | null
          lease_monthly_amount?: number | null
          luggage_capacity?: number | null
          make?: string | null
          model?: string | null
          name?: string
          purchase_date?: string | null
          purchase_price?: number | null
          registration_expiry?: string | null
          registration_number?: string | null
          seats?: number | null
          status?: Database["public"]["Enums"]["vehicle_status"]
          updated_at?: string
          vin?: string | null
          year?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      automation_config: { Args: { p_key: string }; Returns: Json }
      automation_is_enabled: { Args: { p_key: string }; Returns: boolean }
      bump_vehicle_mileage: {
        Args: { p_mileage: number; p_vehicle_id: string }
        Returns: undefined
      }
      check_assignment_conflicts: {
        Args: {
          p_booking_id: string
          p_driver_id: string
          p_duration_minutes?: number
          p_trip_date: string
          p_trip_time: string
          p_vehicle_id: string
        }
        Returns: {
          booking_id: string
          booking_reference: string
          conflict_type: string
          status: Database["public"]["Enums"]["booking_status"]
          trip_date: string
          trip_time: string
        }[]
      }
      convert_quotation_to_booking: {
        Args: { p_quotation_id: string }
        Returns: string
      }
      create_upcoming_trip_reminders: {
        Args: { p_days_ahead?: number }
        Returns: number
      }
      current_customer_id: { Args: never; Returns: string }
      current_user_active: { Args: never; Returns: boolean }
      current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      dashboard_crm_kpis: {
        Args: { p_from: string; p_to: string }
        Returns: {
          accepted_quotations: number
          new_customers: number
          new_leads: number
          pending_quotations: number
          sent_quotations: number
        }[]
      }
      dashboard_finance_kpis: {
        Args: { p_from: string; p_to: string; p_today: string }
        Returns: {
          expenses_period: number
          outstanding_invoices: number
          overdue_invoices_amount: number
          overdue_invoices_count: number
          payments_received_period: number
          revenue_period: number
          todays_revenue: number
        }[]
      }
      dashboard_operational_kpis: {
        Args: { p_today: string }
        Returns: {
          cancelled_bookings: number
          completed_bookings: number
          confirmed_bookings: number
          pending_bookings: number
          todays_trips: number
          unassigned_trips: number
          upcoming_trips: number
        }[]
      }
      get_customer_metrics: {
        Args: { p_customer_id: string }
        Returns: {
          avg_booking_value: number
          completed_bookings: number
          days_since_last_booking: number
          first_booking_date: string
          is_corporate: boolean
          last_booking_date: string
          segment: string
          total_bookings: number
          total_revenue: number
        }[]
      }
      get_my_booking: {
        Args: { p_reference: string }
        Returns: {
          booking_reference: string
          cancelled_at: string
          completed_at: string
          confirmed_at: string
          currency: string
          customer_notes: string
          discount: number
          driver_en_route_at: string
          driver_name: string
          driver_phone: string
          dropoff: string
          flight_arrival_time: string
          flight_departure_time: string
          flight_number: string
          flight_terminal: string
          id: string
          is_airport_pickup: boolean
          luggage: number
          meet_and_greet_notes: string
          passengers: number
          payment_status: Database["public"]["Enums"]["payment_status"]
          picked_up_at: string
          pickup: string
          price: number
          special_requests: string
          status: Database["public"]["Enums"]["booking_status"]
          tax_amount: number
          total: number
          trip_date: string
          trip_started_at: string
          trip_time: string
          vehicle_name: string
        }[]
      }
      get_my_booking_review: {
        Args: { p_reference: string }
        Returns: {
          comment: string
          created_at: string
          rating: number
        }[]
      }
      get_my_booking_status_history: {
        Args: { p_reference: string }
        Returns: {
          changed_at: string
          from_status: Database["public"]["Enums"]["booking_status"]
          to_status: Database["public"]["Enums"]["booking_status"]
        }[]
      }
      get_my_bookings: {
        Args: never
        Returns: {
          booking_reference: string
          currency: string
          driver_name: string
          driver_phone: string
          dropoff: string
          flight_number: string
          id: string
          is_airport_pickup: boolean
          payment_status: Database["public"]["Enums"]["payment_status"]
          pickup: string
          status: Database["public"]["Enums"]["booking_status"]
          total: number
          trip_date: string
          trip_time: string
          vehicle_name: string
        }[]
      }
      get_my_customer_profile: {
        Args: never
        Returns: {
          billing_address: string
          country: string
          email: string
          full_name: string
          id: string
          opt_out_marketing: boolean
          phone: string
          whatsapp: string
        }[]
      }
      get_my_invoice: {
        Args: { p_invoice_number: string }
        Returns: {
          amount_paid: number
          balance_due: number
          created_at: string
          currency: string
          discount: number
          due_date: string
          id: string
          invoice_number: string
          payment_terms: string
          status: Database["public"]["Enums"]["invoice_status"]
          subtotal: number
          tax_amount: number
          terms_and_conditions: string
          total: number
        }[]
      }
      get_my_invoice_items: {
        Args: { p_invoice_number: string }
        Returns: {
          amount: number
          description: string
          quantity: number
          sort_order: number
          unit_price: number
        }[]
      }
      get_my_invoice_receipts: {
        Args: { p_invoice_number: string }
        Returns: {
          amount: number
          method: Database["public"]["Enums"]["payment_method"]
          payment_date: string
          receipt_number: string
          remaining_balance: number
        }[]
      }
      get_my_invoices: {
        Args: never
        Returns: {
          amount_paid: number
          balance_due: number
          created_at: string
          currency: string
          due_date: string
          id: string
          invoice_number: string
          status: Database["public"]["Enums"]["invoice_status"]
          total: number
        }[]
      }
      has_permission: { Args: { p_permission: string }; Returns: boolean }
      is_admin: { Args: never; Returns: boolean }
      is_staff_role: {
        Args: { roles: Database["public"]["Enums"]["user_role"][] }
        Returns: boolean
      }
      log_activity: {
        Args: {
          p_action: string
          p_entity_id: string
          p_entity_type: string
          p_metadata?: Json
        }
        Returns: string
      }
      log_automation_run: {
        Args: {
          p_affected_count: number
          p_error_message: string
          p_key: string
          p_metadata?: Json
          p_status: string
          p_triggered_by: string
        }
        Returns: undefined
      }
      mark_overdue_invoices: { Args: never; Returns: number }
      next_document_number: { Args: { p_doc_type: string }; Returns: string }
      recalculate_invoice_financials: {
        Args: { p_invoice_id: string }
        Returns: undefined
      }
      refresh_operational_alerts: { Args: never; Returns: number }
      submit_my_review: {
        Args: { p_comment: string; p_rating: number; p_reference: string }
        Returns: undefined
      }
      update_my_customer_profile: {
        Args: {
          p_billing_address: string
          p_country: string
          p_full_name: string
          p_phone: string
          p_whatsapp: string
        }
        Returns: undefined
      }
      update_my_notification_preferences: {
        Args: { p_opt_out_marketing: boolean }
        Returns: undefined
      }
    }
    Enums: {
      booking_source:
        | "WEBSITE"
        | "ADMIN"
        | "PHONE"
        | "EMAIL"
        | "WHATSAPP"
        | "REPEAT"
      booking_status:
        | "PENDING"
        | "CONFIRMED"
        | "ASSIGNED"
        | "DRIVER_EN_ROUTE"
        | "PASSENGER_PICKED_UP"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "CANCELLED"
        | "NO_SHOW"
      document_kind:
        | "QUOTATION"
        | "INVOICE"
        | "RECEIPT"
        | "BOOKING_CONFIRMATION"
        | "DRIVER_DOCUMENT"
        | "VEHICLE_DOCUMENT"
        | "OTHER"
      driver_availability: "AVAILABLE" | "ON_TRIP" | "OFF_DUTY"
      expense_category:
        | "DRIVER"
        | "FUEL"
        | "TOLL"
        | "PARKING"
        | "MAINTENANCE"
        | "AIRPORT"
        | "COMMISSION"
        | "OTHER"
      follow_up_status: "PENDING" | "COMPLETED" | "CANCELLED"
      follow_up_type:
        | "NEW_LEAD"
        | "QUOTATION_FOLLOWUP"
        | "UNPAID_INVOICE"
        | "UPCOMING_TRIP"
        | "POST_TRIP_FOLLOWUP"
        | "REVIEW_REQUEST"
        | "REPEAT_BOOKING"
        | "CUSTOM"
      invoice_status:
        | "DRAFT"
        | "SENT"
        | "PARTIALLY_PAID"
        | "PAID"
        | "OVERDUE"
        | "VOID"
        | "REFUNDED"
      lead_status:
        | "NEW"
        | "CONTACTED"
        | "QUOTED"
        | "NEGOTIATING"
        | "WON"
        | "LOST"
      maintenance_type:
        | "OIL_SERVICE"
        | "TIRES"
        | "BRAKES"
        | "INSPECTION"
        | "REGISTRATION"
        | "INSURANCE"
        | "GENERAL"
        | "REPAIR"
      notification_channel: "EMAIL" | "WHATSAPP" | "SYSTEM"
      notification_status: "PENDING" | "SENT" | "FAILED"
      payment_method: "CASH" | "BANK_TRANSFER" | "CARD" | "ONLINE" | "OTHER"
      payment_status: "UNPAID" | "PARTIALLY_PAID" | "PAID" | "REFUNDED"
      quotation_status:
        | "DRAFT"
        | "SENT"
        | "VIEWED"
        | "ACCEPTED"
        | "REJECTED"
        | "EXPIRED"
        | "CONVERTED"
      user_role:
        | "SUPER_ADMIN"
        | "ADMIN"
        | "OPERATIONS"
        | "FINANCE"
        | "DISPATCHER"
        | "VIEWER"
      vehicle_category: "SEDAN" | "SUV" | "VAN" | "LUXURY" | "MINIBUS"
      vehicle_status: "ACTIVE" | "MAINTENANCE" | "INACTIVE" | "AVAILABLE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_source: [
        "WEBSITE",
        "ADMIN",
        "PHONE",
        "EMAIL",
        "WHATSAPP",
        "REPEAT",
      ],
      booking_status: [
        "PENDING",
        "CONFIRMED",
        "ASSIGNED",
        "DRIVER_EN_ROUTE",
        "PASSENGER_PICKED_UP",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
        "NO_SHOW",
      ],
      document_kind: [
        "QUOTATION",
        "INVOICE",
        "RECEIPT",
        "BOOKING_CONFIRMATION",
        "DRIVER_DOCUMENT",
        "VEHICLE_DOCUMENT",
        "OTHER",
      ],
      driver_availability: ["AVAILABLE", "ON_TRIP", "OFF_DUTY"],
      expense_category: [
        "DRIVER",
        "FUEL",
        "TOLL",
        "PARKING",
        "MAINTENANCE",
        "AIRPORT",
        "COMMISSION",
        "OTHER",
      ],
      follow_up_status: ["PENDING", "COMPLETED", "CANCELLED"],
      follow_up_type: [
        "NEW_LEAD",
        "QUOTATION_FOLLOWUP",
        "UNPAID_INVOICE",
        "UPCOMING_TRIP",
        "POST_TRIP_FOLLOWUP",
        "REVIEW_REQUEST",
        "REPEAT_BOOKING",
        "CUSTOM",
      ],
      invoice_status: [
        "DRAFT",
        "SENT",
        "PARTIALLY_PAID",
        "PAID",
        "OVERDUE",
        "VOID",
        "REFUNDED",
      ],
      lead_status: ["NEW", "CONTACTED", "QUOTED", "NEGOTIATING", "WON", "LOST"],
      maintenance_type: [
        "OIL_SERVICE",
        "TIRES",
        "BRAKES",
        "INSPECTION",
        "REGISTRATION",
        "INSURANCE",
        "GENERAL",
        "REPAIR",
      ],
      notification_channel: ["EMAIL", "WHATSAPP", "SYSTEM"],
      notification_status: ["PENDING", "SENT", "FAILED"],
      payment_method: ["CASH", "BANK_TRANSFER", "CARD", "ONLINE", "OTHER"],
      payment_status: ["UNPAID", "PARTIALLY_PAID", "PAID", "REFUNDED"],
      quotation_status: [
        "DRAFT",
        "SENT",
        "VIEWED",
        "ACCEPTED",
        "REJECTED",
        "EXPIRED",
        "CONVERTED",
      ],
      user_role: [
        "SUPER_ADMIN",
        "ADMIN",
        "OPERATIONS",
        "FINANCE",
        "DISPATCHER",
        "VIEWER",
      ],
      vehicle_category: ["SEDAN", "SUV", "VAN", "LUXURY", "MINIBUS"],
      vehicle_status: ["ACTIVE", "MAINTENANCE", "INACTIVE", "AVAILABLE"],
    },
  },
} as const
