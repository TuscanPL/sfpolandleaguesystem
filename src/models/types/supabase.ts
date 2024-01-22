export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      configuration: {
        Row: {
          configurationKey: string | null
          configurationValue: string | null
          created_at: string
          id: number
        }
        Insert: {
          configurationKey?: string | null
          configurationValue?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          configurationKey?: string | null
          configurationValue?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      league_admins: {
        Row: {
          admin_userid: string
          created_at: string
          id: number
        }
        Insert: {
          admin_userid: string
          created_at?: string
          id?: number
        }
        Update: {
          admin_userid?: string
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "league_admins_admin_userid_fkey"
            columns: ["admin_userid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      league_matches: {
        Row: {
          created_at: string
          id: number
          league_id: number | null
          match_status: Database["public"]["Enums"]["match_status"]
          player1_discordid: string | null
          player1_score: number
          player2_discordid: string | null
          player2_score: number
          replay_ids: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          league_id?: number | null
          match_status?: Database["public"]["Enums"]["match_status"]
          player1_discordid?: string | null
          player1_score?: number
          player2_discordid?: string | null
          player2_score?: number
          replay_ids?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          league_id?: number | null
          match_status?: Database["public"]["Enums"]["match_status"]
          player1_discordid?: string | null
          player1_score?: number
          player2_discordid?: string | null
          player2_score?: number
          replay_ids?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "league_matches_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          }
        ]
      }
      league_sign_ups: {
        Row: {
          avatar_url: string | null
          created_at: string
          discord_name: string | null
          id: number
          league_id: number | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          discord_name?: string | null
          id?: number
          league_id?: number | null
          user_id?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          discord_name?: string | null
          id?: number
          league_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "league_sign_ups_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          }
        ]
      }
      leagues: {
        Row: {
          created_at: string
          id: number
          league_end_date: string | null
          league_name: string | null
          league_start_date: string | null
          status: Database["public"]["Enums"]["league_status"]
        }
        Insert: {
          created_at?: string
          id?: number
          league_end_date?: string | null
          league_name?: string | null
          league_start_date?: string | null
          status?: Database["public"]["Enums"]["league_status"]
        }
        Update: {
          created_at?: string
          id?: number
          league_end_date?: string | null
          league_name?: string | null
          league_start_date?: string | null
          status?: Database["public"]["Enums"]["league_status"]
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
      league_status: "draft" | "started" | "completed"
      match_status: "upcoming" | "completed" | "canceled" | "in_progress"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

