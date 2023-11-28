import { defineStore } from 'pinia'
import { supabase } from '@/common/supabase'
import { computed, ref } from 'vue'
import { getMappedUserCookie, getUserCookie } from '@/common/cookieHelper'
import { mapUserCookieToUser } from '@/common/mapper'
import type { User } from '@/models/app/userModel'
import { envConfig } from '@/common/envVariables'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User | null>(null)

  const isCookiePresent = computed(() => {
    return getUserCookie() !== null
  })

  function initalizeUser() {
    if (getUserCookie() == null) return setUserNull()

    const data = getMappedUserCookie()
    if (data === null) return setUserNull()

    user.value = mapUserCookieToUser(data)

    function setUserNull() {
      user.value = null
      return
    }
  }

  async function signInWithDiscord() {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: envConfig.loginCallbackUrl
      }
    })

    initalizeUser()
  }

  async function signOut() {
    await supabase.auth.signOut()
    user.value = null
  }

  return {
    signInWithDiscord,
    signOut,
    user,
    initalizeUser,
    isCookiePresent
  }
})
