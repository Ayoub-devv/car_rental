<script setup lang="ts">
import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import HomeLayout from '@/layouts/HomeLayout.vue';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/vue3';
import {
    LoaderCircle,
} from 'lucide-vue-next';
import { ref } from 'vue';

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();
</script>

<template>
    <HomeLayout>
        <Head title="Log in" />

        <div
            class="flex min-h-[90vh] items-center justify-center px-4 sm:px-6 lg:px-8"
        >
            <div class="w-full max-w-md space-y-8">
                <!-- Header -->
                <div class="text-center">
                    <h1 class="mb-2 text-3xl font-bold text-white">
                        Welcome Back
                    </h1>
                    <p class="text-zinc-200">
                        {{ $t("auth.login_title") }} to continue
                    </p>
                </div>

                <!-- Status Message -->
                <div
                    v-if="status"
                    class="rounded-lg border border-green-200 bg-green-50 p-4 text-center"
                >
                    <p class="text-sm font-medium text-green-800">
                        {{ status }}
                    </p>
                </div>

                <!-- Login Form -->
                <div
                    class="rounded-xl border border-white/10 bg-zinc-950 border border-white/10/60 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                >
                    <Form
                        v-bind="AuthenticatedSessionController.store.form()"
                        :reset-on-success="['password']"
                        v-slot="{ errors, processing }"
                        class="space-y-6"
                    >
                        <!-- Email Field -->
                        <div>
                            <Label
                                for="email"
                                class="mb-2 block text-sm font-semibold text-zinc-200"
                            >
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autofocus
                                :tabindex="1"
                                autocomplete="email"
                                placeholder="Enter your email"
                                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 border border-white/5/50 px-4 py-3 text-white transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            />
                            <InputError :message="errors.email" class="mt-1" />
                        </div>

                        <!-- Password Field -->
                        <div>
                            <div class="mb-2 flex items-center justify-between">
                                <Label
                                    for="password"
                                    class="block text-sm font-semibold text-zinc-200"
                                >
                                    Password
                                </Label>
                                <TextLink
                                    v-if="canResetPassword"
                                    :href="request()"
                                    class="text-sm font-medium text-red-500 hover:text-red-400"
                                    :tabindex="5"
                                >
                                    {{ $t("auth.forgot") }}
                                </TextLink>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                                :tabindex="2"
                                autocomplete="current-password"
                                placeholder="Enter your password"
                                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 border border-white/5/50 px-4 py-3 text-white transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            />
                            <InputError
                                :message="errors.password"
                                class="mt-1"
                            />
                        </div>

                        <!-- Remember Me -->
                        <div class="flex items-center">
                            <Label
                                for="remember"
                                class="flex cursor-pointer items-center space-x-3"
                            >
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    :tabindex="3"
                                    class="rounded border-zinc-700 text-red-600 focus:ring-red-500 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                                />
                                <span class="text-sm text-zinc-200"
                                    >{{ $t("auth.remember") }} for 30 days</span
                                >
                            </Label>
                        </div>

                        <!-- Submit Button -->
                        <Button
                            type="submit"
                            class="flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-3 font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all duration-200 hover:bg-red-500 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
                            :tabindex="4"
                            :disabled="processing"
                            data-test="login-button"
                        >
                            <LoaderCircle
                                v-if="processing"
                                class="mr-2 h-5 w-5 animate-spin"
                            />
                            {{ processing ? 'Signing in...' : 'Sign In' }}
                        </Button>

                        <!-- Sign Up Link -->
                        <div class="border-t border-white/10 pt-4 text-center">
                            <p class="text-sm text-zinc-200">
                                {{ $t("auth.no_account") }}
                                <TextLink
                                    :href="register()"
                                    :tabindex="5"
                                    class="ml-1 font-semibold text-red-500 hover:text-red-400"
                                >
                                    Create one here
                                </TextLink>
                            </p>
                        </div>
                    </Form>
                </div>

                <!-- Additional Info -->
                <div class="text-center">
                    <p class="text-xs text-zinc-200">
                        By signing in, you agree to our Terms of Service and
                        Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    </HomeLayout>
</template>
