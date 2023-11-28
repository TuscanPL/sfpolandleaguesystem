import { createClient } from '@supabase/supabase-js'
import { envConfig } from './envVariables'

const supabaseUrl = envConfig.supabaseUrl ?? ''
const supaBasePublicKey = envConfig.supabasePublicKey ?? ''

export const supabase = createClient(supabaseUrl, supaBasePublicKey)
