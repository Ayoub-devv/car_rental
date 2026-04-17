<script setup lang="ts">
import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import HomeLayout from '@/layouts/HomeLayout.vue';
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';

defineProps<{
    status?: string;
}>();
</script>

<template>
    <HomeLayout>
        <Head title="Forgot password" />

        <div class="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md space-y-8">
                <!-- Header -->
                <div class="text-center">
                    <h2 class="mb-2 text-3xl font-bold text-white">
                        Reset Password
                    </h2>
                    <p class="text-zinc-200">
                        Enter your email to receive a reset link
                    </p>
                </div>
    
                <!-- Form -->
                <div class="rounded-xl border border-white/10 bg-zinc-950 border border-white/10/60 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                    <Form
                        v-bind="PasswordResetLinkController.store.form()"
                        v-slot="{ errors, processing }"
                        class="space-y-6"
                    >
                        <div>
                            <Label for="email" class="mb-2 block text-sm font-semibold text-zinc-200">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autocomplete="off"
                                autofocus
                                placeholder="Enter your email"
                                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 border border-white/5/50 px-4 py-3 text-white transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            />
                            <InputError :message="errors.email" class="mt-1" />
                        </div>
    
                        <Button
                            type="submit"
                            class="flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-3 font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all duration-200 hover:bg-red-500 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
                            :disabled="processing"
                            data-test="email-password-reset-link-button"
                        >
                            <LoaderCircle
                                v-if="processing"
                                class="mr-2 h-5 w-5 animate-spin"
                            />
                            Send Reset Link
                        </Button>
                    </Form>
        
                    <!-- Login Link -->
                    <div class="border-t border-white/10 mt-6 pt-6 text-center">
                        <p class="text-sm text-zinc-200">
                            Or, return to
                            <TextLink
                                :href="login()"
                                class="font-medium text-red-500 transition-colors hover:text-red-400"
                            >
                                log in
                            </TextLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </HomeLayout>
</template>
