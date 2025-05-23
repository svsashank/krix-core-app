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
      api_keys: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          revoked_at: string | null
          usage_count: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          revoked_at?: string | null
          usage_count?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          revoked_at?: string | null
          usage_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      chats: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      compute_points_config: {
        Row: {
          model: string
          points_per_token: number
        }
        Insert: {
          model: string
          points_per_token: number
        }
        Update: {
          model?: string
          points_per_token?: number
        }
        Relationships: []
      }
      compute_usage: {
        Row: {
          compute_points: number
          created_at: string
          id: string
          model: string
          tokens_consumed: number
          user_id: string
        }
        Insert: {
          compute_points: number
          created_at?: string
          id?: string
          model: string
          tokens_consumed: number
          user_id: string
        }
        Update: {
          compute_points?: number
          created_at?: string
          id?: string
          model?: string
          tokens_consumed?: number
          user_id?: string
        }
        Relationships: []
      }
      conversation_messages: {
        Row: {
          compute_credits: number | null
          content: string
          conversation_id: string
          created_at: string
          file_search_results: Json | null
          files: Json | null
          id: string
          image_url: string | null
          images: string[] | null
          input_tokens: number | null
          model_id: string | null
          model_provider: string | null
          output_tokens: number | null
          revised_prompt: string | null
          role: string
          web_search_results: Json | null
        }
        Insert: {
          compute_credits?: number | null
          content: string
          conversation_id: string
          created_at?: string
          file_search_results?: Json | null
          files?: Json | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          input_tokens?: number | null
          model_id?: string | null
          model_provider?: string | null
          output_tokens?: number | null
          revised_prompt?: string | null
          role: string
          web_search_results?: Json | null
        }
        Update: {
          compute_credits?: number | null
          content?: string
          conversation_id?: string
          created_at?: string
          file_search_results?: Json | null
          files?: Json | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          input_tokens?: number | null
          model_id?: string | null
          model_provider?: string | null
          output_tokens?: number | null
          revised_prompt?: string | null
          role?: string
          web_search_results?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      corporate_leads: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          status: string | null
          team_size: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          name?: string | null
          status?: string | null
          team_size?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          status?: string | null
          team_size?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          display_order: number
          id: string
          question: string
        }
        Insert: {
          answer: string
          display_order?: number
          id?: string
          question: string
        }
        Update: {
          answer?: string
          display_order?: number
          id?: string
          question?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          discount_eligible: boolean
          email: string
          has_registered: boolean
          id: string
          name: string | null
          offer_type: string | null
          subscribed_at: string
        }
        Insert: {
          discount_eligible?: boolean
          email: string
          has_registered?: boolean
          id?: string
          name?: string | null
          offer_type?: string | null
          subscribed_at?: string
        }
        Update: {
          discount_eligible?: boolean
          email?: string
          has_registered?: boolean
          id?: string
          name?: string | null
          offer_type?: string | null
          subscribed_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_id: string
          content: string
          created_at: string
          id: string
          model_id: string | null
          model_name: string | null
          role: string
        }
        Insert: {
          chat_id: string
          content: string
          created_at?: string
          id?: string
          model_id?: string | null
          model_name?: string | null
          role: string
        }
        Update: {
          chat_id?: string
          content?: string
          created_at?: string
          id?: string
          model_id?: string | null
          model_name?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_orders: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          id: string
          order_id: string
          payment_details: Json | null
          payment_id: string | null
          payment_method: string | null
          product_name: string | null
          status: string | null
          updated_at: string | null
          user_email: string
          user_id: string | null
          user_name: string | null
          user_phone: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string
          id?: string
          order_id: string
          payment_details?: Json | null
          payment_id?: string | null
          payment_method?: string | null
          product_name?: string | null
          status?: string | null
          updated_at?: string | null
          user_email: string
          user_id?: string | null
          user_name?: string | null
          user_phone?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          id?: string
          order_id?: string
          payment_details?: Json | null
          payment_id?: string | null
          payment_method?: string | null
          product_name?: string | null
          status?: string | null
          updated_at?: string | null
          user_email?: string
          user_id?: string | null
          user_name?: string | null
          user_phone?: string | null
        }
        Relationships: []
      }
      plan_models: {
        Row: {
          basic: boolean
          id: string
          model_name: string
          professional: boolean
          starter: boolean
        }
        Insert: {
          basic?: boolean
          id?: string
          model_name: string
          professional?: boolean
          starter?: boolean
        }
        Update: {
          basic?: boolean
          id?: string
          model_name?: string
          professional?: boolean
          starter?: boolean
        }
        Relationships: []
      }
      plans: {
        Row: {
          badge: string | null
          compute_credits: number | null
          created_at: string
          description: string
          discount_percentage: number | null
          features: Json
          highlight: boolean
          id: string
          monthly_amount: number
          original_price: string
          plan_id: string
          price: string
          price_detail: string
          title: string
          updated_at: string
        }
        Insert: {
          badge?: string | null
          compute_credits?: number | null
          created_at?: string
          description: string
          discount_percentage?: number | null
          features: Json
          highlight?: boolean
          id?: string
          monthly_amount: number
          original_price: string
          plan_id: string
          price: string
          price_detail: string
          title: string
          updated_at?: string
        }
        Update: {
          badge?: string | null
          compute_credits?: number | null
          created_at?: string
          description?: string
          discount_percentage?: number | null
          features?: Json
          highlight?: boolean
          id?: string
          monthly_amount?: number
          original_price?: string
          plan_id?: string
          price?: string
          price_detail?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          compute_points: number | null
          created_at: string | null
          discount_eligible: boolean | null
          email: string
          id: string
          is_admin: boolean | null
          is_subscribed: boolean | null
          name: string
          photo_url: string | null
        }
        Insert: {
          compute_points?: number | null
          created_at?: string | null
          discount_eligible?: boolean | null
          email: string
          id?: string
          is_admin?: boolean | null
          is_subscribed?: boolean | null
          name: string
          photo_url?: string | null
        }
        Update: {
          compute_points?: number | null
          created_at?: string | null
          discount_eligible?: boolean | null
          email?: string
          id?: string
          is_admin?: boolean | null
          is_subscribed?: boolean | null
          name?: string
          photo_url?: string | null
        }
        Relationships: []
      }
      user_compute_credits: {
        Row: {
          created_at: string
          id: string
          total_credits: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          total_credits?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          total_credits?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_profile_exists: {
        Args: { user_email: string }
        Returns: boolean
      }
      create_or_update_profile: {
        Args: {
          user_email: string
          user_name?: string
          user_is_subscribed?: boolean
          user_compute_points?: number
        }
        Returns: {
          success: boolean
          message: string
          profile_id: string
        }[]
      }
      generate_api_key: {
        Args: { p_user_id: string; p_name: string }
        Returns: {
          api_key: string
          key_prefix: string
        }[]
      }
      get_profile_attribute: {
        Args: { user_id: string; attribute: string }
        Returns: string
      }
      get_profile_role: {
        Args: { user_id: string }
        Returns: string
      }
      get_user_is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      update_api_key_usage: {
        Args: { p_key_hash: string }
        Returns: undefined
      }
      update_user_compute_credits: {
        Args: { p_user_id: string; p_credits: number }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
