export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          created_at: string;
          username: string;
          password: string; // Note: In a real app, passwords should be hashed
          role: "student" | "supervisor" | "admin";
          full_name: string | null;
          email: string | null;
          phone: string | null;
          address: string | null;
          student_id: string | null;
          major: string | null;
          semester: number | null;
          emergency_contact: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          username: string;
          password: string;
          role: "student" | "supervisor" | "admin";
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          student_id?: string | null;
          major?: string | null;
          semester?: number | null;
          emergency_contact?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          username?: string;
          password?: string;
          role?: "student" | "supervisor" | "admin";
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          student_id?: string | null;
          major?: string | null;
          semester?: number | null;
          emergency_contact?: string | null;
        };
      };
      locations: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          address: string;
          capacity: number;
          contact_person: string;
          contact_email: string;
          contact_phone: string;
          status: "active" | "inactive";
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          address: string;
          capacity: number;
          contact_person: string;
          contact_email: string;
          contact_phone: string;
          status?: "active" | "inactive";
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          address?: string;
          capacity?: number;
          contact_person?: string;
          contact_email?: string;
          contact_phone?: string;
          status?: "active" | "inactive";
          notes?: string | null;
        };
      };
      supervisors: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          specialization: string;
          max_students: number;
          location_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          specialization: string;
          max_students: number;
          location_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          specialization?: string;
          max_students?: number;
          location_id?: string | null;
        };
      };
      ppl_periods: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          start_date: string;
          end_date: string;
          status: "upcoming" | "active" | "completed";
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          start_date: string;
          end_date: string;
          status?: "upcoming" | "active" | "completed";
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          start_date?: string;
          end_date?: string;
          status?: "upcoming" | "active" | "completed";
        };
      };
      student_registrations: {
        Row: {
          id: string;
          created_at: string;
          student_id: string;
          period_id: string;
          status: "pending" | "approved" | "rejected";
          transcript_uploaded: boolean;
          id_card_uploaded: boolean;
          photo_uploaded: boolean;
          recommendation_uploaded: boolean;
          agreement_accepted: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          student_id: string;
          period_id: string;
          status?: "pending" | "approved" | "rejected";
          transcript_uploaded?: boolean;
          id_card_uploaded?: boolean;
          photo_uploaded?: boolean;
          recommendation_uploaded?: boolean;
          agreement_accepted?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          student_id?: string;
          period_id?: string;
          status?: "pending" | "approved" | "rejected";
          transcript_uploaded?: boolean;
          id_card_uploaded?: boolean;
          photo_uploaded?: boolean;
          recommendation_uploaded?: boolean;
          agreement_accepted?: boolean;
        };
      };
      placements: {
        Row: {
          id: string;
          created_at: string;
          registration_id: string;
          location_id: string;
          supervisor_id: string;
          status: "pending" | "approved" | "rejected" | "completed";
          start_date: string | null;
          end_date: string | null;
          progress: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          registration_id: string;
          location_id: string;
          supervisor_id: string;
          status?: "pending" | "approved" | "rejected" | "completed";
          start_date?: string | null;
          end_date?: string | null;
          progress?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          registration_id?: string;
          location_id?: string;
          supervisor_id?: string;
          status?: "pending" | "approved" | "rejected" | "completed";
          start_date?: string | null;
          end_date?: string | null;
          progress?: number;
        };
      };
      assessments: {
        Row: {
          id: string;
          created_at: string;
          placement_id: string;
          supervisor_id: string;
          type: "midterm" | "final";
          teaching_skills: number;
          classroom_management: number;
          lesson_planning: number;
          student_engagement: number;
          professional_conduct: number;
          overall_performance: string;
          strengths: string;
          areas_for_improvement: string;
          recommendations: string;
          additional_comments: string | null;
          status: "draft" | "submitted";
        };
        Insert: {
          id?: string;
          created_at?: string;
          placement_id: string;
          supervisor_id: string;
          type: "midterm" | "final";
          teaching_skills: number;
          classroom_management: number;
          lesson_planning: number;
          student_engagement: number;
          professional_conduct: number;
          overall_performance: string;
          strengths: string;
          areas_for_improvement: string;
          recommendations: string;
          additional_comments?: string | null;
          status?: "draft" | "submitted";
        };
        Update: {
          id?: string;
          created_at?: string;
          placement_id?: string;
          supervisor_id?: string;
          type?: "midterm" | "final";
          teaching_skills?: number;
          classroom_management?: number;
          lesson_planning?: number;
          student_engagement?: number;
          professional_conduct?: number;
          overall_performance?: string;
          strengths?: string;
          areas_for_improvement?: string;
          recommendations?: string;
          additional_comments?: string | null;
          status?: "draft" | "submitted";
        };
      };
      certificates: {
        Row: {
          id: string;
          created_at: string;
          placement_id: string;
          certificate_number: string;
          issue_date: string;
          status: "pending" | "issued";
          download_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          placement_id: string;
          certificate_number: string;
          issue_date: string;
          status?: "pending" | "issued";
          download_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          placement_id?: string;
          certificate_number?: string;
          issue_date?: string;
          status?: "pending" | "issued";
          download_url?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
