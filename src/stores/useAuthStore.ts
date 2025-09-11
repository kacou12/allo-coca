import { MerchantStatusEnum } from '@/constants/constant.enum'
import type { AuthResponse } from '@/services/auth/auth-type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<AuthResponse | null>(null)
    const emailToResetingPassword = ref<string | null>(null)

    const setUser = (userData: AuthResponse) => {
      user.value = userData
    }

    const isActiveAccount = computed(() => user.value?.merchant?.status === MerchantStatusEnum.active )
    
    const setEmailToResetingPassword = (email: string) => {
      emailToResetingPassword.value = email;
    }
    const fullName = () => {
      return `${user.value?.first_name} ${user.value?.last_name}`
    }

    const logout = () => {
      user.value = null
      //   t    oken.value = null
    }

    return {
      setUser,
      logout,
      fullName,
      user,
      isActiveAccount,
      setEmailToResetingPassword,
      emailToResetingPassword
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)
