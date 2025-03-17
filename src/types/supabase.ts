export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assessments: {
        Row: {
          additional_comments: string | null
          areas_for_improvement: string
          classroom_management: number
          created_at: string | null
          id: string
          lesson_planning: number
          overall_performance: string
          placement_id: string
          professional_conduct: number
          recommendations: string
          status: string
          strengths: string
          student_engagement: number
          supervisor_id: string
          teaching_skills: number
          type: string
        }
        Insert: {
          additional_comments?: string | null
          areas_for_improvement: string
          classroom_management: number
          created_at?: string | null
          id?: string
          lesson_planning: number
          overall_performance: string
          placement_id: string
          professional_conduct: number
          recommendations: string
          status?: string
          strengths: string
          student_engagement: number
          supervisor_id: string
          teaching_skills: number
          type: string
        }
        Update: {
          additional_comments?: string | null
          areas_for_improvement?: string
          classroom_management?: number
          created_at?: string | null
          id?: string
          lesson_planning?: number
          overall_performance?: string
          placement_id?: string
          professional_conduct?: number
          recommendations?: string
          status?: string
          strengths?: string
          student_engagement?: number
          supervisor_id?: string
          teaching_skills?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessments_placement_id_fkey"
            columns: ["placement_id"]
            isOneToOne: false
            referencedRelation: "placements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "supervisors"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          certificate_number: string
          created_at: string | null
          download_url: string | null
          id: string
          issue_date: string
          placement_id: string
          status: string
        }
        Insert: {
          certificate_number: string
          created_at?: string | null
          download_url?: string | null
          id?: string
          issue_date: string
          placement_id: string
          status?: string
        }
        Update: {
          certificate_number?: string
          created_at?: string | null
          download_url?: string | null
          id?: string
          issue_date?: string
          placement_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_placement_id_fkey"
            columns: ["placement_id"]
            isOneToOne: false
            referencedRelation: "placements"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string
          capacity: number
          contact_email: string
          contact_person: string
          contact_phone: string
          created_at: string | null
          id: string
          name: string
          notes: string | null
          status: string
        }
        Insert: {
          address: string
          capacity: number
          contact_email: string
          contact_person: string
          contact_phone: string
          created_at?: string | null
          id?: string
          name: string
          notes?: string | null
          status?: string
        }
        Update: {
          address?: string
          capacity?: number
          contact_email?: string
          contact_person?: string
          contact_phone?: string
          created_at?: string | null
          id?: string
          name?: string
          notes?: string | null
          status?: string
        }
        Relationships: []
      }
      placements: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          location_id: string
          progress: number
          registration_id: string
          start_date: string | null
          status: string
          supervisor_id: string
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          location_id: string
          progress?: number
          registration_id: string
          start_date?: string | null
          status?: string
          supervisor_id: string
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          location_id?: string
          progress?: number
          registration_id?: string
          start_date?: string | null
          status?: string
          supervisor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "placements_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "placements_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "student_registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "placements_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "supervisors"
            referencedColumns: ["id"]
          },
        ]
      }
      ppl_periods: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          name: string
          start_date: string
          status: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          name: string
          start_date: string
          status?: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          name?: string
          start_date?: string
          status?: string
        }
        Relationships: []
      }
      student_registrations: {
        Row: {
          agreement_accepted: boolean
          created_at: string | null
          id: string
          id_card_uploaded: boolean
          period_id: string
          photo_uploaded: boolean
          recommendation_uploaded: boolean
          status: string
          student_id: string
          transcript_uploaded: boolean
        }
        Insert: {
          agreement_accepted?: boolean
          created_at?: string | null
          id?: string
          id_card_uploaded?: boolean
          period_id: string
          photo_uploaded?: boolean
          recommendation_uploaded?: boolean
          status?: string
          student_id: string
          transcript_uploaded?: boolean
        }
        Update: {
          agreement_accepted?: boolean
          created_at?: string | null
          id?: string
          id_card_uploaded?: boolean
          period_id?: string
          photo_uploaded?: boolean
          recommendation_uploaded?: boolean
          status?: string
          student_id?: string
          transcript_uploaded?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "student_registrations_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "ppl_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_registrations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      supervisors: {
        Row: {
          created_at: string | null
          id: string
          location_id: string | null
          max_students: number
          specialization: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          location_id?: string | null
          max_students: number
          specialization: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          location_id?: string | null
          max_students?: number
          specialization?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supervisors_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supervisors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          emergency_contact: string | null
          full_name: string | null
          id: string
          major: string | null
          password: string
          phone: string | null
          role: string
          semester: number | null
          student_id: string | null
          username: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: string | null
          full_name?: string | null
          id?: string
          major?: string | null
          password: string
          phone?: string | null
          role: string
          semester?: number | null
          student_id?: string | null
          username: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: string | null
          full_name?: string | null
          id?: string
          major?: string | null
          password?: string
          phone?: string | null
          role?: string
          semester?: number | null
          student_id?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
