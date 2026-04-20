<script setup lang="ts">
import { login, register } from '@/routes';
import { index as adminCarsIndex } from '@/routes/admin/cars/index';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { index as clientReservationsIndex } from '@/routes/client/reservations/index';
// ... (rest of imports)
import { index as clientSupportIndex } from '@/routes/client/support/index';
import AppFooter from '@/components/AppFooter.vue';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-vue-next';
import { Link } from '@inertiajs/vue3';
import { usePage } from '@inertiajs/vue3';
import { home } from '@/routes';
import { fleet } from '@/routes';
import { about } from '@/routes';
import { contact } from '@/routes';

const $page = usePage();

const role = $page.props.auth.user?.role;

const dashboardLink = role === 'admin' ? adminCarsIndex() : clientReservationsIndex();
</script>

<template>
    <div>
        <header
            class="sticky top-0 z-50 border-b border-border bg-background/80 shadow-sm backdrop-blur-xl"
        >
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <nav class="flex h-16 items-center justify-between">
                    <!--  Logo -->
                    <div class="flex flex-col items-center space-x-2">
                        <Link :href="home()" class="flex items-center space-x-2">
                            <img src="/images/logo.svg" alt="Moataz Location Logo" class="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                            <p class="font-bold text-foreground tracking-wider text-xl hidden sm:block">MOATAZ<span class="text-red-500">LOCATION</span></p>
                        </Link>
                    </div>

                    <!--  Navigation -->
                    <div class="hidden items-center space-x-8 md:flex">
                        <Link 
                            :href="home()" 
                            :class="{ 'text-red-500': $page.url === home().url, 'text-muted-foreground': $page.url !== home().url }" 
                            class="font-medium transition-colors hover:text-red-500"
                        >
                            {{ $t("nav.home") }}
                        </Link>
                        <Link 
                            :href="fleet()" 
                            :class="{ 'text-red-500': $page.url.startsWith('/fleet'), 'text-muted-foreground': !$page.url.startsWith('/fleet') }" 
                            class="font-medium transition-colors hover:text-red-500"
                        >
                            {{ $t("nav.fleet") }}
                        </Link>
                        <Link 
                            :href="about()" 
                            :class="{ 'text-red-500': $page.url === '/about', 'text-muted-foreground': $page.url !== '/about' }" 
                            class="font-medium transition-colors hover:text-red-500"
                        >
                            {{ $t("nav.about") }}
                        </Link>
                        <Link 
                            :href="contact()" 
                            :class="{ 'text-red-500': $page.url === '/contact', 'text-muted-foreground': $page.url !== '/contact' }" 
                            class="font-medium transition-colors hover:text-red-500"
                        >
                            {{ $t("nav.contact") }}
                        </Link>
                    </div>

                    <!-- Desktop Auth Buttons -->
                    <div class="hidden items-center space-x-3 md:flex">
                        <LanguageSwitcher />
                        <ThemeToggle />
                        <Link
                            v-if="$page.props.auth.user"
                            :href="dashboardLink"
                            class="inline-flex items-center rounded-xl bg-accent border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-accent/80 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                        >
                            <svg
                                class="mr-2 h-4 w-4 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                ></path>
                            </svg>
                            {{ $t("nav.dashboard") }}
                        </Link>
                        <template v-else>
                            <Link
                                :href="login()"
                                class="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
                            >
                                {{ $t("nav.login") }}
                            </Link>
                            <Link
                                :href="register()"
                                class="inline-flex items-center rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-200 hover:scale-105 hover:bg-red-500 hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]"
                            >
                                {{ $t("nav.register") }}
                            </Link>
                        </template>
                    </div>

                    <!-- Mobile Menu Trigger -->
                    <div class="flex items-center space-x-3 md:hidden">
                        <LanguageSwitcher />
                        <ThemeToggle />
                        <Sheet>
                            <SheetTrigger class="text-foreground hover:text-red-500 p-1">
                                <Menu class="h-6 w-6" />
                            </SheetTrigger>
                            <SheetContent side="right" class="bg-background/95 backdrop-blur-xl border-l border-border w-[300px] p-6 text-foreground overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle class="flex items-center space-x-2 mb-6 text-left">
                                        <img src="/images/logo.svg" alt="Moataz Location Logo" class="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                                        <p class="font-bold text-foreground tracking-wider text-lg">MOATAZ<span class="text-red-500">LOCATION</span></p>
                                    </SheetTitle>
                                </SheetHeader>
                                
                                <div class="flex flex-col space-y-6 mt-4">
                                    <nav class="flex flex-col space-y-4">
                                        <Link :href="home()" class="font-medium hover:text-red-500 transition-colors">{{ $t("nav.home") }}</Link>
                                        <Link :href="fleet()" class="font-medium hover:text-red-500 transition-colors">{{ $t("nav.fleet") }}</Link>
                                        <Link :href="about()" class="font-medium hover:text-red-500 transition-colors">{{ $t("nav.about") }}</Link>
                                        <Link :href="contact()" class="font-medium hover:text-red-500 transition-colors">{{ $t("nav.contact") }}</Link>
                                    </nav>
                                    
                                    <div class="h-px bg-border w-full my-4"></div>
                                    
                                    <div class="flex flex-col space-y-4">
                                        <Link v-if="$page.props.auth.user" :href="dashboardLink" class="w-full inline-flex justify-center items-center rounded-xl bg-accent border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-accent/80">
                                            {{ $t("nav.dashboard") }}
                                        </Link>
                                        <template v-else>
                                            <Link :href="login()" class="w-full text-center font-medium text-muted-foreground hover:text-foreground transition-colors">
                                                {{ $t("nav.login") }}
                                            </Link>
                                            <Link :href="register()" class="w-full text-center inline-flex justify-center items-center rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all hover:bg-red-500">
                                                {{ $t("nav.register") }}
                                            </Link>
                                        </template>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </div>
        </header>

        <slot />

        <AppFooter />
    </div>
</template>
