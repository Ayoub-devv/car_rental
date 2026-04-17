<template>
    <footer class="bg-black border-t border-white/5 py-16 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent pointer-events-none"></div>
        <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
            <div class="grid gap-12 md:grid-cols-4">
                <div class="space-y-6">
                    <div class="flex items-center space-x-4">
                        <img src="/images/logo.svg" alt="Moataz Location Logo" class="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                        <div>
                            <h3 class="text-xl font-bold tracking-widest text-white leading-none">MOATAZ<span class="text-red-500">LOCATION</span></h3>
                            <p class="text-xs font-medium text-zinc-400 tracking-wider mt-1">
                                PREMIUM CARS
                            </p>
                        </div>
                    </div>
                    <p class="leading-relaxed text-gray-400">
                        Premium car rental service providing luxury and
                        reliable vehicles for all your transportation needs
                        with exceptional customer service.
                    </p>
                </div>

                <div class="space-y-6">
                    <h4 class="text-lg font-semibold text-white">Services</h4>
                    <ul class="space-y-3 text-zinc-400">
                        <li>
                            <Link :href="fleet.url()" class="transition-colors hover:text-red-500">Luxury Car Rental</Link>
                        </li>
                        <li>
                            <Link :href="fleet.url()" class="transition-colors hover:text-red-500">Long Term Rental</Link>
                        </li>
                        <li>
                            <Link :href="contact.url()" class="transition-colors hover:text-red-500">Corporate Solutions</Link>
                        </li>
                        <li>
                            <Link :href="contact.url()" class="transition-colors hover:text-red-500">Airport Transfers</Link>
                        </li>
                    </ul>
                </div>

                <div class="space-y-6">
                    <h4 class="text-lg font-semibold text-white">Support</h4>
                    <ul class="space-y-3 text-zinc-400">
                        <li>
                            <Link :href="contact.url()" class="transition-colors hover:text-red-500">Contact Us</Link>
                        </li>
                        <li>
                            <Link v-if="$page.props.auth.user?.role === 'client'" :href="clientSupportIndex.url()" class="transition-colors hover:text-red-500">Help Center</Link>
                            <Link v-else :href="login.url()" class="transition-colors hover:text-red-500">Help Center</Link>
                        </li>
                        <li>
                            <Link :href="about.url()" class="transition-colors hover:text-red-500">Terms & Conditions</Link>
                        </li>
                        <li>
                            <Link :href="about.url()" class="transition-colors hover:text-red-500">Privacy Policy</Link>
                        </li>
                    </ul>
                </div>

                <div class="space-y-6">
                    <h4 class="text-lg font-semibold text-white">Contact Info</h4>
                    <div class="space-y-3 text-zinc-400">
                        <div class="flex items-center space-x-3">
                            <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span>+212 661-472362</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span>hello@Moataz Location.com</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>Casablanca, Morocco</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-2 border-t border-white/5 pt-8">
                <p class="text-slate-500 text-center">
                    &copy; 2025 Moataz Location. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { fleet, contact, about, login } from '@/routes';
import { index as clientSupportIndex } from '@/routes/client/support/index';

const $page = usePage();
</script>
