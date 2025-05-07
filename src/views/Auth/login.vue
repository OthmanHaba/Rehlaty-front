<script setup lang="ts">
import FormWrapper from '@/components/Shared/From/FormWrapper.vue'
import FormInput from '@/components/Shared/From/FormInput.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const email = ref('')
const password = ref('')

</script>

<template>
    <div class="flex min-h-screen overflow-y-hidden">
        <!-- Left side - Image -->
        <div class="hidden lg:block lg:w-1/2 bg-primary">
            <div class="h-full flex items-center justify-center">
                <img src="../../assets/appLogo.svg" alt="Login" class="w-full h-full object-cover" />
            </div>
        </div>

        <!-- Right side - Login Form -->
        <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div class="w-full max-w-md">
                <FormWrapper :title="t('auth.login.title')" :description="t('auth.login.description')">
                    <FormInput v-model="email" type="email" :label="t('auth.login.email_or_username')"
                        :placeholder="t('auth.login.emailPlaceholder')" required autocomplete="email" />

                    <FormInput v-model="password" type="password" :label="t('auth.login.password')"
                        :placeholder="t('auth.login.passwordPlaceholder')" required autocomplete="current-password" />

                    <template #actions>
                        <button
                            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                            {{ t('auth.login.signIn') }}
                        </button>
                    </template>
                </FormWrapper>
            </div>
        </div>
    </div>
</template>