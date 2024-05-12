
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fotcxlpibcxnzftqmdfw.supabase.co'
const supabaseKey = process.env.SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)