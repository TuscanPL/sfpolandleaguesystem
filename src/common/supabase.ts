import { createClient } from '@supabase/supabase-js'
import { envConfig } from './envVariables'
import type { Database } from '@/models/types/supabase'

const supabaseUrl = envConfig.supabaseUrl ?? ''
const supaBasePublicKey = envConfig.supabasePublicKey ?? ''

export const supabase = createClient<Database>(supabaseUrl, supaBasePublicKey)
