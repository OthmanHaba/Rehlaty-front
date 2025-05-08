<script setup lang="ts">
import FormWrapper from '@/components/Shared/From/FormWrapper.vue'
import FormInput from '@/components/Shared/From/FormInput.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { LoginRequest } from '@/types/Auth'
import { authService } from '@/services/auth.ts'
import { useRouter } from 'vue-router'
import { Import } from 'lucide-vue-next'
import type { ApiError } from '@/lib/api/helpers/ApiError.ts'
import { useToast } from '@/composables/useToast.ts'
import { useFeedbackMessage } from '@/composables/useFeedbackMessage.ts'

const { t } = useI18n()
const router = useRouter()
const data = ref<LoginRequest>({
    username: '',
    password: '',
})
const errors = ref<{
    username?: string[]
    password?: string[]
}>({
    username: [],
    password: [],
})

const handleSubmit = async () => {
    try {
        await authService.login(data.value)
        await router.push('/')
    } catch (err: ApiError) {
        errors.value.username = err.data.errors.username
        errors.value.password = err.data.errors.password
    }
}
</script>

<template>
    <div class="flex min-h-screen overflow-y-hidden">
        <!-- Left side - Image -->
        <div class="hidden lg:block lg:w-1/2 bg-primary">
            <div class="h-full flex items-center justify-center">
                <img src="@/assets/appLogo.svg" alt="Login" class="w-full h-full object-cover" />
            </div>
        </div>

        <!-- Right side - Login Form -->
        <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div class="w-full max-w-md">
                <FormWrapper
                    @submit.prevent="handleSubmit"
                    :title="t('auth.login.title')"
                    :description="t('auth.login.description')"
                >
                    <FormInput
                        v-model="data.username"
                        type="text"
                        :label="t('auth.login.email_or_username')"
                        :placeholder="t('auth.login.emailPlaceholder')"
                        :error="errors.username[0]"
                        required
                        autocomplete="email"
                    />

                    <FormInput
                        v-model="data.password"
                        type="password"
                        :label="t('auth.login.password')"
                        :placeholder="t('auth.login.passwordPlaceholder')"
                        :error="errors.password[0]"
                        required
                        autocomplete="current-password"
                    />

                    <template #actions>
                        <button
                            type="submit"
                            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                        >
                            {{ t('auth.login.signIn') }}
                        </button>
                    </template>
                </FormWrapper>
            </div>
        </div>
    </div>
</template>
