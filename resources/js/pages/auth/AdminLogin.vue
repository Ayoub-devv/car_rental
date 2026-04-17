<script setup lang="ts">
import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, Head } from '@inertiajs/vue3';
import { LoaderCircle, Lock, Shield } from 'lucide-vue-next';

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();
</script>

<template>
    <div>
        <Head title="Admin Access" />

        <div
            class="flex min-h-screen items-center justify-center bg-black px-4 sm:px-6 lg:px-8"
        >
            <div class="w-full max-w-md">
                <!-- Background Pattern -->
                <div
                    class="pointer-events-none absolute inset-0 overflow-hidden"
                >
                    <div
                        class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-red-600/10 blur-3xl"
                    ></div>
                    <div
                        class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-red-500/10 blur-3xl"
                    ></div>
                </div>

                <div class="relative space-y-8">
                    <!-- Header -->
                    <div class="text-center">
                        <div
                            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-zinc-950 border border-white/10"
                        >
                            <Shield class="h-8 w-8 text-red-500" />
                        </div>
                        <h1 class="mb-2 text-2xl font-bold text-white">
                            Administrative Access
                        </h1>
                    </div>

                    <!-- Login Form -->
                    <div
                        class="rounded-xl border border-white/10 bg-zinc-950 border border-white/10/60 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                    >
                        <Form
                            v-bind="AuthenticatedSessionController.storeAdminLogin.form()"
                            :reset-on-success="['password']"
                            v-slot="{ errors, processing }"
                            class="space-y-6"
                        >
                            <!-- Email Field -->
                            <div>
                                <Label
                                    for="email"
                                    class="mb-2 block text-sm font-semibold text-white"
                                >
                                    Administrator Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autofocus
                                    :tabindex="1"
                                    autocomplete="email"
                                    placeholder="admin@domain.com"
                                    class="w-full rounded-lg border border-zinc-700 bg-zinc-950 border border-white/5/50 px-4 py-3 text-white placeholder-zinc-500 transition-colors focus:border-red-500 focus:bg-zinc-950 border border-white/5 focus:ring-2 focus:ring-red-500/20"
                                />
                                <InputError
                                    :message="errors.email"
                                    class="mt-1"
                                />
                            </div>

                            <!-- Password Field -->
                            <div>
                                <div
                                    class="mb-2 flex items-center justify-between"
                                >
                                    <Label
                                        for="password"
                                        class="block text-sm font-semibold text-white"
                                    >
                                        <div
                                            class="flex items-center space-x-2"
                                        >
                                            <Lock class="h-4 w-4" />
                                            <span>Secure Password</span>
                                        </div>
                                    </Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    :tabindex="2"
                                    autocomplete="current-password"
                                    placeholder="Enter secure password"
                                    class="w-full rounded-lg border border-zinc-700 bg-zinc-950 border border-white/5/50 px-4 py-3 text-white placeholder-zinc-500 transition-colors focus:border-red-500 focus:bg-zinc-950 border border-white/5 focus:ring-2 focus:ring-red-500/20"
                                />
                                <InputError
                                    :message="errors.password"
                                    class="mt-1"
                                />
                            </div>

                            <!-- Submit Button -->
                            <Button
                                type="submit"
                                class="flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-red-500 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
                                :tabindex="4"
                                :disabled="processing"
                                data-test="admin-login-button"
                            >
                                <LoaderCircle
                                    v-if="processing"
                                    class="mr-2 h-5 w-5 animate-spin"
                                />
                                {{
                                    processing
                                        ? 'Authenticating...'
                                        : 'Access System'
                                }}
                            </Button>

                            <!-- Security Notice -->
                            <div
                                class="border-t border-zinc-700 pt-6 text-center"
                            >
                                <div
                                    class="flex items-center justify-center space-x-2 text-zinc-200"
                                >
                                    <Shield class="h-4 w-4" />
                                    <p class="text-xs">
                                        Secure connection established
                                    </p>
                                </div>
                                <p class="mt-2 text-xs text-zinc-200">
                                    All administrative actions are logged and
                                    monitored
                                </p>
                            </div>
                        </Form>
                    </div>

                    <!-- Footer Warning -->
                    <div class="text-center">
                        <div
                            class="inline-flex items-center space-x-2 rounded-lg border border-red-500/30 bg-red-900/20 px-4 py-2 backdrop-blur-sm"
                        >
                            <div
                                class="h-2 w-2 animate-pulse rounded-full bg-red-500"
                            ></div>
                            <p class="text-xs text-red-300">
                                Unauthorized access is strictly prohibited
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
