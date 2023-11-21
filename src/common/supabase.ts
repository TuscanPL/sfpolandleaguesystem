import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://szdfoftdifsvtiacvxuw.supabase.co"
const supaBasePublicKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZGZvZnRkaWZzdnRpYWN2eHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0OTQwOTMsImV4cCI6MjAwOTA3MDA5M30.tu_X6AB2_K8UnFKxUcOs_ksdypkyYOXrnTJyXIBrh4A"

export const supabase = createClient(supabaseUrl, supaBasePublicKey)