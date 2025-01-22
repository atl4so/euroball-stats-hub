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
      game_play_by_play: {
        Row: {
          created_at: string | null
          game_id: string
          id: number
          period: number | null
          play_info: string
          play_number: number
          play_type: string
          player_name: string | null
          points: number | null
          team_code: string
          timestamp: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          game_id: string
          id?: number
          period?: number | null
          play_info: string
          play_number: number
          play_type: string
          player_name?: string | null
          points?: number | null
          team_code: string
          timestamp?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          game_id?: string
          id?: number
          period?: number | null
          play_info?: string
          play_number?: number
          play_type?: string
          player_name?: string | null
          points?: number | null
          team_code?: string
          timestamp?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      player_advanced: {
        Row: {
          assist_ratio: number | null
          assist_to_turnover_ratio: number | null
          created_at: string | null
          defensive_rebound_percentage: number | null
          effective_fg_percentage: number | null
          free_throw_rate: number | null
          games_played: number | null
          id: number
          minutes: number | null
          offensive_rebound_percentage: number | null
          player_name: string
          possessions: number | null
          season_code: string
          team_code: string
          three_point_attempt_ratio: number | null
          total_rebound_percentage: number | null
          true_shooting_percentage: number | null
          turnover_ratio: number | null
          two_point_attempt_ratio: number | null
          updated_at: string | null
        }
        Insert: {
          assist_ratio?: number | null
          assist_to_turnover_ratio?: number | null
          created_at?: string | null
          defensive_rebound_percentage?: number | null
          effective_fg_percentage?: number | null
          free_throw_rate?: number | null
          games_played?: number | null
          id?: number
          minutes?: number | null
          offensive_rebound_percentage?: number | null
          player_name: string
          possessions?: number | null
          season_code: string
          team_code: string
          three_point_attempt_ratio?: number | null
          total_rebound_percentage?: number | null
          true_shooting_percentage?: number | null
          turnover_ratio?: number | null
          two_point_attempt_ratio?: number | null
          updated_at?: string | null
        }
        Update: {
          assist_ratio?: number | null
          assist_to_turnover_ratio?: number | null
          created_at?: string | null
          defensive_rebound_percentage?: number | null
          effective_fg_percentage?: number | null
          free_throw_rate?: number | null
          games_played?: number | null
          id?: number
          minutes?: number | null
          offensive_rebound_percentage?: number | null
          player_name?: string
          possessions?: number | null
          season_code?: string
          team_code?: string
          three_point_attempt_ratio?: number | null
          total_rebound_percentage?: number | null
          true_shooting_percentage?: number | null
          turnover_ratio?: number | null
          two_point_attempt_ratio?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      player_misc: {
        Row: {
          created_at: string | null
          double_doubles: number | null
          id: number
          player_name: string
          season_code: string
          team_code: string
          triple_doubles: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          double_doubles?: number | null
          id?: number
          player_name: string
          season_code: string
          team_code: string
          triple_doubles?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          double_doubles?: number | null
          id?: number
          player_name?: string
          season_code?: string
          team_code?: string
          triple_doubles?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      player_points: {
        Row: {
          created_at: string | null
          free_throw_attempts_share: number | null
          free_throws_made_share: number | null
          games_played: number | null
          games_started: number | null
          id: number
          player_name: string
          points_from_ft_percentage: number | null
          points_from_three_percentage: number | null
          points_from_two_percentage: number | null
          season_code: string
          team_code: string
          three_point_attempts_share: number | null
          three_points_made_share: number | null
          two_point_attempts_share: number | null
          two_points_made_share: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          free_throw_attempts_share?: number | null
          free_throws_made_share?: number | null
          games_played?: number | null
          games_started?: number | null
          id?: number
          player_name: string
          points_from_ft_percentage?: number | null
          points_from_three_percentage?: number | null
          points_from_two_percentage?: number | null
          season_code: string
          team_code: string
          three_point_attempts_share?: number | null
          three_points_made_share?: number | null
          two_point_attempts_share?: number | null
          two_points_made_share?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          free_throw_attempts_share?: number | null
          free_throws_made_share?: number | null
          games_played?: number | null
          games_started?: number | null
          id?: number
          player_name?: string
          points_from_ft_percentage?: number | null
          points_from_three_percentage?: number | null
          points_from_two_percentage?: number | null
          season_code?: string
          team_code?: string
          three_point_attempts_share?: number | null
          three_points_made_share?: number | null
          two_point_attempts_share?: number | null
          two_points_made_share?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      player_stats: {
        Row: {
          assists: number | null
          blocks: number | null
          blocks_against: number | null
          created_at: string | null
          defensive_rebounds: number | null
          fouls_committed: number | null
          fouls_drawn: number | null
          free_throws_attempted: number | null
          free_throws_made: number | null
          free_throws_percentage: number | null
          games_played: number | null
          games_started: number | null
          id: number
          minutes: number | null
          offensive_rebounds: number | null
          pir: number | null
          player_name: string
          points: number | null
          rebounds: number | null
          season_code: string
          steals: number | null
          team_code: string
          three_points_attempted: number | null
          three_points_made: number | null
          three_points_percentage: number | null
          turnovers: number | null
          two_points_attempted: number | null
          two_points_made: number | null
          two_points_percentage: number | null
          updated_at: string | null
        }
        Insert: {
          assists?: number | null
          blocks?: number | null
          blocks_against?: number | null
          created_at?: string | null
          defensive_rebounds?: number | null
          fouls_committed?: number | null
          fouls_drawn?: number | null
          free_throws_attempted?: number | null
          free_throws_made?: number | null
          free_throws_percentage?: number | null
          games_played?: number | null
          games_started?: number | null
          id?: number
          minutes?: number | null
          offensive_rebounds?: number | null
          pir?: number | null
          player_name: string
          points?: number | null
          rebounds?: number | null
          season_code: string
          steals?: number | null
          team_code: string
          three_points_attempted?: number | null
          three_points_made?: number | null
          three_points_percentage?: number | null
          turnovers?: number | null
          two_points_attempted?: number | null
          two_points_made?: number | null
          two_points_percentage?: number | null
          updated_at?: string | null
        }
        Update: {
          assists?: number | null
          blocks?: number | null
          blocks_against?: number | null
          created_at?: string | null
          defensive_rebounds?: number | null
          fouls_committed?: number | null
          fouls_drawn?: number | null
          free_throws_attempted?: number | null
          free_throws_made?: number | null
          free_throws_percentage?: number | null
          games_played?: number | null
          games_started?: number | null
          id?: number
          minutes?: number | null
          offensive_rebounds?: number | null
          pir?: number | null
          player_name?: string
          points?: number | null
          rebounds?: number | null
          season_code?: string
          steals?: number | null
          team_code?: string
          three_points_attempted?: number | null
          three_points_made?: number | null
          three_points_percentage?: number | null
          turnovers?: number | null
          two_points_attempted?: number | null
          two_points_made?: number | null
          two_points_percentage?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      team_stats: {
        Row: {
          assists: number | null
          blocks: number | null
          blocks_against: number | null
          created_at: string | null
          defensive_rebounds: number | null
          fouls_committed: number | null
          fouls_drawn: number | null
          free_throws_attempted: number | null
          free_throws_made: number | null
          free_throws_percentage: string | null
          games_played: number | null
          games_started: number | null
          id: number
          minutes: number | null
          offensive_rebounds: number | null
          pir: number | null
          points: number | null
          season_code: string
          steals: number | null
          team_code: string
          three_points_attempted: number | null
          three_points_made: number | null
          three_points_percentage: string | null
          total_rebounds: number | null
          turnovers: number | null
          two_points_attempted: number | null
          two_points_made: number | null
          two_points_percentage: string | null
          updated_at: string | null
        }
        Insert: {
          assists?: number | null
          blocks?: number | null
          blocks_against?: number | null
          created_at?: string | null
          defensive_rebounds?: number | null
          fouls_committed?: number | null
          fouls_drawn?: number | null
          free_throws_attempted?: number | null
          free_throws_made?: number | null
          free_throws_percentage?: string | null
          games_played?: number | null
          games_started?: number | null
          id?: number
          minutes?: number | null
          offensive_rebounds?: number | null
          pir?: number | null
          points?: number | null
          season_code: string
          steals?: number | null
          team_code: string
          three_points_attempted?: number | null
          three_points_made?: number | null
          three_points_percentage?: string | null
          total_rebounds?: number | null
          turnovers?: number | null
          two_points_attempted?: number | null
          two_points_made?: number | null
          two_points_percentage?: string | null
          updated_at?: string | null
        }
        Update: {
          assists?: number | null
          blocks?: number | null
          blocks_against?: number | null
          created_at?: string | null
          defensive_rebounds?: number | null
          fouls_committed?: number | null
          fouls_drawn?: number | null
          free_throws_attempted?: number | null
          free_throws_made?: number | null
          free_throws_percentage?: string | null
          games_played?: number | null
          games_started?: number | null
          id?: number
          minutes?: number | null
          offensive_rebounds?: number | null
          pir?: number | null
          points?: number | null
          season_code?: string
          steals?: number | null
          team_code?: string
          three_points_attempted?: number | null
          three_points_made?: number | null
          three_points_percentage?: string | null
          total_rebounds?: number | null
          turnovers?: number | null
          two_points_attempted?: number | null
          two_points_made?: number | null
          two_points_percentage?: string | null
          updated_at?: string | null
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