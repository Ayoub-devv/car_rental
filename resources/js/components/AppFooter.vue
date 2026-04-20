<template>
    <footer class="bg-background border-t border-border py-16 text-foreground relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent pointer-events-none dark:opacity-100 opacity-5"></div>
        <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
            <div class="grid gap-12 md:grid-cols-4">
                <div class="space-y-6">
                    <div class="flex items-center space-x-4">
                        <img src="/images/logo.svg" alt="Moataz Location Logo" class="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                        <div>
                            <h3 class="text-xl font-bold tracking-widest text-foreground leading-none">MOATAZ<span class="text-red-500">LOCATION</span></h3>
                            <p class="text-xs font-medium text-muted-foreground tracking-wider mt-1">
                                PREMIUM CARS
                            </p>
                        </div>
                    </div>
                    <p class="leading-relaxed text-muted-foreground">
                        {{ $t("footer.desc") }}
                    </p>
                </div>

                <div class="space-y-6">
                    <h4 class="text-lg font-semibold text-foreground">{{ $t("footer.services") }}</h4>
                    <ul class="space-y-3 text-muted-foreground">
                        <li>
                            <Link :href="fleet.url()" class="transition-colors hover:text-red-500">{{ $t("footer.luxury_rental") }}</Link>
                        </li>
                        <li>
                            <Link :href="fleet.url()" class="transition-colors hover:text-red-500">{{ $t("footer.long_term_rental") }}</Link>
                        </li>
                        <li>
                            <Link :href="contact.url()" class="transition-colors hover:text-red-500">{{ $t("footer.corporate_solutions") }}</Link>
                        </li>
                        <li>
                            <Link :href="contact.url()" class="transition-colors hover:text-red-500">{{ $t("footer.airport_transfers") }}</Link>
                        </li>
                    </ul>
                </div>

                <div class="space-y-6">
                    <h4 class="text-lg font-semibold text-foreground">{{ $t("footer.support") }}</h4>
                    <ul class="space-y-3 text-muted-foreground">
                        <li>
                            <Link :href="contact.url()" class="transition-colors hover:text-red-500">{{ $t("nav.contact") }}</Link>
                        </li>
                        <li>
                            <Link v-if="$page.props.auth.user?.role === 'client'" :href="clientSupportIndex.url()" class="transition-colors hover:text-red-500">{{ $t("footer.help_center") }}</Link>
                            <Link v-else :href="login.url()" class="transition-colors hover:text-red-500">{{ $t("footer.help_center") }}</Link>
                        </li>
                        <li>
                            <Link :href="about.url()" class="transition-colors hover:text-red-500">{{ $t("footer.terms") }}</Link>
                        </li>
                        <li>
                            <Link :href="about.url()" class="transition-colors hover:text-red-500">{{ $t("footer.privacy") }}</Link>
                        </li>
                    </ul>
                </div>

                <div class="space-y-6">
                    <h4 class="text-lg font-semibold text-foreground">{{ $t("footer.contact_info") }}</h4>
                    <div class="space-y-3 text-muted-foreground">
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
                            <span>{{ $t("footer.location") }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-2 border-t border-border pt-8">
                <p class="text-muted-foreground text-center">
                    &copy; 2025 Moataz Location. {{ $t("footer.rights") }}
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
