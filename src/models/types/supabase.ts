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
      characters: {
        Row: {
          character_id: number
          character_name: string
        }
        Insert: {
          character_id?: number
          character_name: string
        }
        Update: {
          character_id?: number
          character_name?: string
        }
        Relationships: []
      }
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
        }
        Insert: {
          created_at?: string
          id?: number
          league_end_date?: string | null
          league_name?: string | null
          league_start_date?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          league_end_date?: string | null
          league_name?: string | null
          league_start_date?: string | null
        }
        Relationships: []
      }
      matchdetails: {
        Row: {
          created_at: string | null
          detail_id: number
          match_id: number | null
          player1_character_id: number | null
          player1_score: number | null
          player2_character_id: number | null
          player2_score: number | null
          replay_id: string
        }
        Insert: {
          created_at?: string | null
          detail_id?: number
          match_id?: number | null
          player1_character_id?: number | null
          player1_score?: number | null
          player2_character_id?: number | null
          player2_score?: number | null
          replay_id: string
        }
        Update: {
          created_at?: string | null
          detail_id?: number
          match_id?: number | null
          player1_character_id?: number | null
          player1_score?: number | null
          player2_character_id?: number | null
          player2_score?: number | null
          replay_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matchdetails_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["match_id"]
          },
          {
            foreignKeyName: "matchdetails_player1_character_id_fkey"
            columns: ["player1_character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["character_id"]
          },
          {
            foreignKeyName: "matchdetails_player2_character_id_fkey"
            columns: ["player2_character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["character_id"]
          }
        ]
      }
      matches: {
        Row: {
          created_at: string | null
          match_id: number
          player1_id: number | null
          player2_id: number | null
          scheduled_time: string
          status: Database["public"]["Enums"]["match_status"]
        }
        Insert: {
          created_at?: string | null
          match_id?: number
          player1_id?: number | null
          player2_id?: number | null
          scheduled_time: string
          status?: Database["public"]["Enums"]["match_status"]
        }
        Update: {
          created_at?: string | null
          match_id?: number
          player1_id?: number | null
          player2_id?: number | null
          scheduled_time?: string
          status?: Database["public"]["Enums"]["match_status"]
        }
        Relationships: [
          {
            foreignKeyName: "matches_player1_id_fkey"
            columns: ["player1_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "matches_player2_id_fkey"
            columns: ["player2_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          user_id: number
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          user_id?: number
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          user_id?: number
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
      match_status: "Upcoming" | "Completed" | "Cancelled"
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

