import { defineStore } from 'pinia'
import { supabase } from '@/common/supabase'
import { computed, ref } from 'vue'
import { getMappedUserCookie, getUserCookie } from '@/common/cookieHelper'
import { mapUserCookieToUser } from '@/common/mapper'
import type { User } from '@/models/app/userModel'
import { envConfig } from '@/common/envVariables'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User | null>(null)
  const isAdmin = ref(false)

  const isCookiePresent = computed(() => {
    return getUserCookie() !== null
  })

  async function initalizeUser(): Promise<void> {
    if (getUserCookie() == null) return setUserNull()

    const data = getMappedUserCookie()
    if (data === null) return setUserNull()

    user.value = mapUserCookieToUser(data)

    return Promise.resolve()

    function setUserNull() {
      user.value = null
      return Promise.reject()
    }
  }

  async function setAdminStatus(): Promise<void> {
    const { data, error } = await supabase.from('league_admins').select()

    if (error) {
      console.error(error)
      isAdmin.value = false
      return
    }

    isAdmin.value = data.length > 0
    return
  }

  async function signInWithDiscord(): Promise<void> {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: envConfig.loginCallbackUrl
      }
    })

    initalizeUser()
  }

  async function signOut(): Promise<void> {
    await supabase.auth.signOut()
    user.value = null
  }

  return {
    signInWithDiscord,
    signOut,
    setAdminStatus,
    isAdmin,
    user,
    initalizeUser,
    isCookiePresent
  }
})
