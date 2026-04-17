<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { show } from '@/routes/fleet';

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
    car: Car;
}

const bookCar = (carId: number) => {
    router.get(show(carId).url);
};

defineProps<Props>();
</script>

<template>
    <div
        class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(220,38,38,0.2)] hover:border-red-500/30"
    >
        <!-- Car Image -->
        <div
            class="relative h-56 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900"
        >
            <img
                :src="car.image_url"
                :alt="`${car.make} ${car.model}`"
                class="h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.05]"
            />

            <!-- Price Badge -->
            <div
                class="absolute top-4 right-4 rounded-xl bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 shadow-lg shadow-red-900/50 border border-red-400/20"
            >
                <span class="text-sm font-bold text-white"
                    >{{ car.price_per_day }} DH</span
                >
                <span class="text-xs text-red-100">/ {{ $t("fleet.per_day") }}</span>
            </div>

            <!-- Gradient Overlay -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            ></div>
        </div>

        <!--  Car Details -->
        <div class=" space-y-4 p-4">
            <!-- Header -->
            <div class="space-y-2">
                <h3
                    class="text-xl font-bold text-white transition-colors group-hover:text-red-500"
                >
                    {{ car.make }} {{ car.model }} - {{ car.year }} - {{ car.id }}
                </h3>

                <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1 capitalize text-zinc-300">
                        <svg
                            class="h-4 w-4 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                        </svg>
                        <span class="font-medium">{{ car.fuel_type }}</span>
                    </div>
                    <div class="text-xs bg-zinc-800 px-2 py-1 rounded-md text-zinc-300 border border-white/5">
                        <p>{{ $t("fleet.gps") }}</p>
                    </div>
                    <div class="text-xs bg-zinc-800 px-2 py-1 rounded-md text-zinc-300 border border-white/5">
                        <p>{{ $t("fleet.insurance") }}</p>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <p class="line-clamp-2 text-sm leading-relaxed text-zinc-400">
                {{ car.description }}
            </p>
        </div>
        <!--  Book Button -->
        <div class=" p-4">
            <button
                @click="bookCar(car.id)"
                class="group/btn w-full cursor-pointer rounded-xl bg-red-600/10 border border-red-500/30 px-6 py-3.5 font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all duration-300 hover:bg-red-600 hover:border-red-400 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:outline-none"
            >
                <span
                    class="flex items-center justify-center gap-2 text-red-500 group-hover:text-white"
                >
                    <svg
                        class="h-5 w-5 transition-transform group-hover/btn:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                    </svg>
                    {{ $t("fleet.book_now") }}
                </span>
            </button>
        </div>
    </div>
</template>
