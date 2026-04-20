<script setup lang="ts">
import HomeLayout from '@/layouts/HomeLayout.vue';
import CarCard from '@/components/CarCard.vue';
import { Head } from '@inertiajs/vue3';
import { fleet } from '@/routes';
import { about } from '@/routes';
import { ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-vue-next';

interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    price_per_day: string;
    description: string;
    fuel_type: string;
    image_url: string;
}

interface Props {
    homeCars: Car[];
}

defineProps<Props>();
</script>

<template>
    <HomeLayout>
        <Head title="Premium Car Rental | Moataz Location" />
        
        <div class="min-h-screen bg-background text-foreground selection:bg-red-600 selection:text-white">
            
            <!-- Ultra Luxury Corporate Hero -->
            <section class="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-background">
                <!-- Subtle grid / pattern -->
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNDBoNDBWMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWMHptNDAgMHYtNDBoLjV2NDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9zdmc+')] opacity-30 z-0 dark:opacity-30 opacity-10"></div>
                
                <!-- MOBILE BACKGROUND IMAGE -->
                <div class="absolute inset-0 z-0 block lg:hidden">
                    <img src="/images/luxury_car_hero.png" class="w-full h-full object-cover opacity-40 object-center" alt="Executive Car Background" />
                    <div class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40"></div>
                </div>
                
                <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 flex flex-col lg:flex-row items-center justify-between gap-12">
                    
                    <div class="w-full lg:w-1/2 flex flex-col items-start text-left relative z-20 bg-background/40 lg:bg-transparent p-6 sm:p-8 lg:p-0 rounded-2xl lg:rounded-none backdrop-blur-md lg:backdrop-blur-none border border-border lg:border-none shadow-2xl lg:shadow-none mt-10 lg:mt-0">
                        <div class="inline-flex items-center space-x-3 mb-8">
                            <span class="h-[2px] w-10 bg-red-600"></span>
                            <span class="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">{{ $t("welcome.corporate_standard") }}</span>
                        </div>
                        
                        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]">
                            Uncompromising <br />
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-muted-foreground to-zinc-600">Mobility Solutions.</span>
                        </h1>
                        
                        <p class="text-lg sm:text-xl text-muted-foreground font-medium mb-12 max-w-xl leading-relaxed">
                            {{ $t("welcome.subtitle") }}
                        </p>
                        
                        <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <a :href="fleet.url()" class="w-full sm:w-auto inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-colors duration-300">
                                {{ $t("welcome.reserve_btn") }}
                                <ArrowRight class="ml-2 h-4 w-4" />
                            </a>
                            <a :href="about.url()" class="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-border text-foreground px-8 py-4 text-sm font-bold uppercase tracking-wider hover:border-foreground transition-colors duration-300">
                                {{ $t("welcome.corporate_btn") }}
                            </a>
                        </div>
                    </div>

                    <div class="w-full lg:w-1/2 relative hidden lg:flex justify-end z-10">
                        <div class="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10 hidden lg:block"></div>
                        <img src="/images/luxury_car_hero.png" class="w-full max-w-[800px] h-auto object-contain relative z-0 opacity-95 hover:opacity-100 transition-opacity duration-700" alt="Executive Car" />
                        <!-- Minimal accent line under car -->
                        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 h-px w-3/4 max-w-[600px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent"></div>
                    </div>
                </div>
            </section>

            <!-- Featured Fleet Section -->
            <section class="py-24 bg-background">
                <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div class="inline-flex items-center space-x-3 mb-6">
                                <span class="h-[2px] w-6 bg-red-600"></span>
                                <span class="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{{ $t("welcome.featured.tag") }}</span>
                            </div>
                            <h2 class="text-3xl sm:text-4xl font-bold text-foreground leading-tight">{{ $t("welcome.featured.title") }}</h2>
                        </div>
                        <a :href="fleet.url()" class="inline-flex items-center text-red-500 hover:text-red-400 font-bold uppercase tracking-wider text-sm transition-colors">
                            {{ $t("welcome.featured.view_all") }}
                            <ArrowRight class="ml-2 h-4 w-4" />
                        </a>
                    </div>
                    
                    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <CarCard
                            v-for="car in homeCars"
                            :key="car.id"
                            :car="car"
                        />
                    </div>
                </div>
            </section>

            <!-- Corporate Stats & Pillars -->
            <section class="border-y border-border bg-background">
                <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
                        <div class="flex flex-col items-center text-center p-6 group">
                            <ShieldCheck class="h-8 w-8 text-zinc-600 group-hover:text-red-600 transition-colors duration-300 mb-6" />
                            <h3 class="text-xl font-bold text-foreground mb-3">{{ $t("welcome.pillars.immaculate_title") }}</h3>
                            <p class="text-muted-foreground text-sm leading-relaxed max-w-xs">{{ $t("welcome.pillars.immaculate_desc") }}</p>
                        </div>
                        <div class="flex flex-col items-center text-center p-6 group">
                            <Clock class="h-8 w-8 text-muted-foreground group-hover:text-red-600 transition-colors duration-300 mb-6" />
                            <h3 class="text-xl font-bold text-foreground mb-3">{{ $t("welcome.pillars.punctual_title") }}</h3>
                            <p class="text-muted-foreground text-sm leading-relaxed max-w-xs">{{ $t("welcome.pillars.punctual_desc") }}</p>
                        </div>
                        <div class="flex flex-col items-center text-center p-6 group">
                            <MapPin class="h-8 w-8 text-muted-foreground group-hover:text-red-600 transition-colors duration-300 mb-6" />
                            <h3 class="text-xl font-bold text-foreground mb-3">{{ $t("welcome.pillars.global_title") }}</h3>
                            <p class="text-muted-foreground text-sm leading-relaxed max-w-xs">{{ $t("welcome.pillars.global_desc") }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Elegance Showcase -->
            <section class="py-24 bg-background">
                <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col md:flex-row items-center gap-16">
                        <div class="w-full md:w-1/2">
                            <div class="aspect-[4/3] bg-accent border border-border overflow-hidden relative group flex items-center justify-center">
                                <div class="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                <img src="/images/executive_fleet_showcase.png" class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 grayscale group-hover:grayscale-0" alt="Corporate Fleet" />
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 flex flex-col items-start">
                            <div class="inline-flex items-center space-x-3 mb-6">
                                <span class="h-[2px] w-6 bg-red-600"></span>
                                <span class="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{{ $t("welcome.elegance.tag") }}</span>
                            </div>
                            <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">Designed for <br/> Leadership.</h2>
                            <p class="text-muted-foreground mb-8 leading-relaxed max-w-lg">
                                {{ $t("welcome.elegance.desc") }}
                            </p>
                            <ul class="space-y-5 mb-12">
                                <li class="flex items-center text-foreground text-sm font-medium tracking-wide uppercase">
                                    <span class="w-1.5 h-1.5 bg-red-600 mr-4"></span>
                                    {{ $t("welcome.elegance.list_1") }}
                                </li>
                                <li class="flex items-center text-foreground text-sm font-medium tracking-wide uppercase">
                                    <span class="w-1.5 h-1.5 bg-red-600 mr-4"></span>
                                    {{ $t("welcome.elegance.list_2") }}
                                </li>
                                <li class="flex items-center text-foreground text-sm font-medium tracking-wide uppercase">
                                    <span class="w-1.5 h-1.5 bg-red-600 mr-4"></span>
                                    {{ $t("welcome.elegance.list_3") }}
                                </li>
                            </ul>
                            <a :href="about.url()" class="text-foreground text-sm font-bold uppercase tracking-wider border-b-2 border-red-600 pb-1 hover:text-red-500 transition-colors">
                                {{ $t("welcome.elegance.link") }}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </HomeLayout>
</template>
