<script setup lang="ts">
import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import HomeLayout from '@/layouts/HomeLayout.vue';
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';
</script>

<template>
    <HomeLayout>
        <Head title="Register" />

        <div
            class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
        >
            <div class="w-full max-w-md space-y-8">
                <!-- Header -->
                <div class="text-center">
                    <h2 class="mb-2 text-3xl font-bold text-white">
                        Create Account
                    </h2>
                    <p class="text-zinc-200">
                        Join us and start your car rental journey
                    </p>
                </div>

                <!-- Form -->
                <div
                    class="rounded-lg border border-white/10 bg-zinc-950 border border-white/10/60 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                >
                    <Form
                        v-bind="RegisteredUserController.store.form()"
                        :reset-on-success="[
                            'password',
                            'password_confirmation',
                        ]"
                        v-slot="{ errors, processing }"
                        class="space-y-6"
                    >
                        <!-- {{ $t("auth.name") }} Field -->
                        <div>
                            <Label
                                for="name"
                                class="mb-2 block text-sm font-semibold text-zinc-200"
                            >
                                Full {{ $t("auth.name") }}
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autofocus
                                :tabindex="1"
                                autocomplete="name"
                                name="name"
                                placeholder="Enter your full name"
                                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 border border-white/5/50 px-4 py-3 text-white transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            />
                            <InputError
                                :message="errors.name"
                                class="mt-1 text-sm text-red-600"
                            />
                        </div>

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
                                required
                                :tabindex="2"
                                autocomplete="email"
                                name="email"
                                placeholder="Enter your email address"
                                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 border border-white/5/50 px-4 py-3 text-white transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            />
                            <InputError
                                :message="errors.email"
                                class="mt-1 text-sm text-red-600"
                            />
                        </div>

                        <!-- Password Field -->
                        <div>
                            <Label
                                for="password"
                                class="mb-2 block text-sm font-semibold text-zinc-200"
                            >
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                :tabindex="3"
                                autocomplete="new-password"
                                name="password"
                                placeholder="Create a password"
                                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 border border-white/5/50 px-4 py-3 text-white transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            />
                            <InputError
                                :message="errors.password"
                                class="mt-1 text-sm text-red-600"
                            />
                        </div>

                        <!-- {{ $t("auth.confirm") }} Field -->
                        <div>
                            <Label
                                for="password_confirmation"
                                class="mb-2 block text-sm font-semibold text-zinc-200"
                            >
                                {{ $t("auth.confirm") }}
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                :tabindex="4"
                                autocomplete="new-password"
                                name="password_confirmation"
                                placeholder="Confirm your password"
                                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 border border-white/5/50 px-4 py-3 text-white transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            />
                            <InputError
                                :message="errors.password_confirmation"
                                class="mt-1 text-sm text-red-600"
                            />
                        </div>

                        <!-- Submit Button -->
                        <Button
                            type="submit"
                            class="flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-3 font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all duration-200 hover:bg-red-500 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
                            tabindex="5"
                            :disabled="processing"
                            data-test="register-user-button"
                        >
                            <LoaderCircle
                                v-if="processing"
                                class="mr-2 h-5 w-5 animate-spin"
                            />
                            Create Account
                        </Button>

                        <!-- Login Link -->
                        <div class="border-t border-white/10 pt-4 text-center">
                            <p class="text-sm text-zinc-200">
                                {{ $t("auth.have_account") }}
                                <TextLink
                                    :href="login()"
                                    class="font-medium text-red-500 transition-colors hover:text-red-400"
                                    :tabindex="6"
                                >
                                    {{ $t("auth.sign_in") }} here
                                </TextLink>
                            </p>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </HomeLayout>
</template>
