import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://vgnoqawnpgthnvqhgbub.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnbm9xYXducGd0aG52cWhnYnViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5Mjc3MzQsImV4cCI6MjA0NzUwMzczNH0.YRZD1-HgWw9Vng96Wu4AvxncYMj7_AwNNcJKg2LevWs"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;