export type Database = {
  public: {
    Tables: {
      menu_categories: {
        Row: {
          id: string
          name: string
          order_position: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          order_position?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          order_position?: number
          created_at?: string
          updated_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          category_id: string
          name: string
          description: string | null
          price: number
          is_available: boolean
          order_position: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          description?: string | null
          price: number
          is_available?: boolean
          order_position?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          description?: string | null
          price?: number
          is_available?: boolean
          order_position?: number
          created_at?: string
          updated_at?: string
        }
      }
      restaurant_info: {
        Row: {
          id: string
          name: string
          description: string | null
          address: string | null
          phone: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
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
  }
}