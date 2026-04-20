<script setup lang="ts">
import CarCard from '@/components/CarCard.vue';
import HomeLayout from '@/layouts/HomeLayout.vue';
import { router, usePage } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';

const $page = usePage<PageProps>();
const cars = computed(() => $page.props.cars);
const filters = computed(() => $page.props.filters);
const makes = computed(() => $page.props.makes);
const fuelTypes = computed(() => $page.props.fuelTypes);
const years = computed(() => $page.props.years);

// Filter state
const searchQuery = ref(filters.value.search || '');
const selectedMake = ref(filters.value.make || '');
const selectedFuelType = ref(filters.value.fuel_type || '');
const minPrice = ref(filters.value.min_price || '');
const maxPrice = ref(filters.value.max_price || '');
const selectedYear = ref(filters.value.year || '');
const sortBy = ref(filters.value.sort || 'make_asc');

// Show/hide filters on mobile
const showFilters = ref(false);
const isLoading = ref(false);

const applyFilters = () => {
    isLoading.value = true;
    const params: Record<string, any> = {};

    if (searchQuery.value.trim()) params.search = searchQuery.value.trim();
    if (selectedMake.value) params.make = selectedMake.value;
    if (selectedFuelType.value) params.fuel_type = selectedFuelType.value;
    if (minPrice.value) params.min_price = minPrice.value;
    if (maxPrice.value) params.max_price = maxPrice.value;
    if (selectedYear.value) params.year = selectedYear.value;
    if (sortBy.value && sortBy.value !== 'make_asc') params.sort = sortBy.value;

    router.get('/fleet', params, {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => {
            isLoading.value = false;
        },
    });
};

const clearFilters = () => {
    searchQuery.value = '';
    selectedMake.value = '';
    selectedFuelType.value = '';
    minPrice.value = '';
    maxPrice.value = '';
    selectedYear.value = '';
    sortBy.value = 'make_asc';

    isLoading.value = true;
    router.get(
        '/fleet',
        {},
        {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                isLoading.value = false;
            },
        },
    );
};

const handleSearch = (event?: Event) => {
    if (event) {
        event.preventDefault();
    }
    applyFilters();
};

// Watch only for sort changes (immediate feedback)
watch(sortBy, () => {
    applyFilters();
});

const goToPage = (url: string) => {
    if (url) {
        isLoading.value = true;
        router.visit(url, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                isLoading.value = false;
            },
        });
    }
};

const hasActiveFilters = computed(() => {
    return (
        searchQuery.value.trim() ||
        selectedMake.value ||
        selectedFuelType.value ||
        minPrice.value ||
        maxPrice.value ||
        selectedYear.value ||
        (sortBy.value && sortBy.value !== 'make_asc')
    );
});
</script>

<template>
    <HomeLayout>
        <div class="min-h-screen bg-background">
            <!-- Loading Overlay -->
            <div
                v-if="isLoading"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
            >
                <div
                    class="flex items-center space-x-4 rounded-2xl bg-background border border-border p-8 shadow-[0_0_40px_rgba(220,38,38,0.2)]"
                >
                    <div class="relative">
                        <div
                            class="h-8 w-8 animate-spin rounded-full border-4 border-red-500/20 border-t-red-600"
                        ></div>
                    </div>
                    <span class="text-lg font-medium text-foreground"
                        >{{ $t("fleet.loading") }}</span
                    >
                </div>
            </div>

            <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                

                <div class="flex flex-col gap-8 lg:flex-row">
                    <!--  Filters Sidebar -->
                    <div class="lg:w-1/4">
                        <!-- Mobile Filter Toggle -->
                        <div class="mb-6 lg:hidden">
                            <button
                                @click="showFilters = !showFilters"
                                class="group flex w-full items-center justify-between rounded-2xl border border-border bg-background backdrop-blur-md px-6 py-4 text-left font-semibold text-muted-foreground shadow-sm transition-all duration-200 hover:border-red-500/30 hover:shadow-[0_0_20px_rgba(220,38,38,0.1)]"
                            >
                                <span class="flex items-center">
                                    <div
                                        class="mr-3 rounded-lg bg-red-600/10 p-2 transition-colors group-hover:bg-red-600/20"
                                    >
                                        <svg
                                            class="h-5 w-5 text-red-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                            ></path>
                                        </svg>
                                    </div>
                                    {{ $t("fleet.filters_search") }}
                                    <span
                                        v-if="hasActiveFilters"
                                        class="ml-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white"
                                        >{{
                                            Object.values({
                                                searchQuery: searchQuery.trim(),
                                                selectedMake,
                                                selectedFuelType,
                                                minPrice,
                                                maxPrice,
                                                selectedYear,
                                            }).filter(Boolean).length
                                        }}</span
                                    >
                                </span>
                                <svg
                                    class="h-5 w-5 transition-transform duration-200"
                                    :class="{ 'rotate-180': showFilters }"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        <!--  Filters Panel -->
                        <div
                            :class="{ hidden: !showFilters }"
                            class="sticky top-20 space-y-6 rounded-2xl border border-border bg-background backdrop-blur-xl p-6 shadow-2xl lg:block"
                        >
                            <!-- Search Form -->
                            <div>
                                
                                <form @submit="handleSearch" class="space-y-4">
                                    <div class="relative">
                                        <input
                                            v-model="searchQuery"
                                            type="text"
                                            :placeholder="$t('fleet.search_placeholder')"
                                            class="w-full rounded-xl border border-border bg-background py-3 pr-4 pl-12 text-foreground placeholder-muted-foreground transition-all duration-200 focus:border-red-500 focus:bg-background focus:ring-4 focus:ring-red-500/20"
                                            @keydown.enter="handleSearch"
                                        />
                                        <svg
                                            class="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-muted-foreground"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <button
                                        type="submit"
                                        class="w-full rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all duration-200 hover:bg-red-500 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                                    >
                                        {{ $t("fleet.search_btn") }}
                                    </button>
                                </form>
                            </div>

                            <div class="border-t border-white/10 pt-6">
                                <div class="space-y-4">
                                    <!-- Make Filter -->
                                    <div>
                                        <label
                                            class="mb-2 block text-sm font-semibold text-foreground"
                                            >{{ $t("fleet.vehicle_make") }}</label
                                        >
                                        <select
                                            v-model="selectedMake"
                                            class="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-all duration-200 focus:border-red-500 focus:bg-background focus:ring-4 focus:ring-red-500/20"
                                        >
                                            <option value="" class="bg-background text-foreground">{{ $t("fleet.all_makes") }}</option>
                                            <option
                                                v-for="make in makes"
                                                :key="make"
                                                :value="make"
                                                class="bg-zinc-950 border border-white/5 text-white"
                                            >
                                                {{ make }}
                                            </option>
                                        </select>
                                    </div>

                                    <!-- Fuel Type Filter -->
                                    <div>
                                        <label
                                            class="mb-2 block text-sm font-semibold text-foreground"
                                            >{{ $t("fleet.fuel_type_filter") }}</label
                                        >
                                        <select
                                            v-model="selectedFuelType"
                                            class="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-all duration-200 focus:border-red-500 focus:bg-background focus:ring-4 focus:ring-red-500/20"
                                        >
                                            <option value="" class="bg-zinc-950 border border-white/5 text-white">
                                                All Fuel Types
                                            </option>
                                            <option
                                                v-for="fuelType in fuelTypes"
                                                :key="fuelType"
                                                :value="fuelType"
                                                class="bg-zinc-950 border border-white/5 text-white"
                                            >
                                                {{
                                                    fuelType
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    fuelType.slice(1)
                                                }}
                                            </option>
                                        </select>
                                    </div>

                                    <!-- Year Filter -->
                                    <div>
                                        <label
                                            class="mb-2 block text-sm font-semibold text-foreground"
                                            >{{ $t("fleet.model_year") }}</label
                                        >
                                        <select
                                            v-model="selectedYear"
                                            class="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-all duration-200 focus:border-red-500 focus:bg-background focus:ring-4 focus:ring-red-500/20"
                                        >
                                            <option value="" class="bg-zinc-950 border border-white/5 text-white">{{ $t("fleet.all_years") }}</option>
                                            <option
                                                v-for="year in years"
                                                :key="year"
                                                :value="year"
                                                class="bg-zinc-950 border border-white/5 text-white"
                                            >
                                                {{ year }}
                                            </option>
                                        </select>
                                    </div>

                                    <!-- Price Range -->
                                    <div>
                                        <label
                                            class="mb-2 block text-sm font-semibold text-foreground"
                                            >{{ $t("fleet.daily_rate_range") }}</label
                                        >
                                        <div class="grid grid-cols-2 gap-3">
                                            <div class="relative">
                                                <span
                                                    class="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-200"
                                                    >$</span
                                                >
                                                <input
                                                    v-model="minPrice"
                                                    type="number"
                                                    :placeholder="$t('fleet.min')"
                                                    class="w-full rounded-xl border border-border bg-background py-3 pr-4 pl-8 text-foreground transition-all duration-200 focus:border-red-500 focus:bg-background focus:ring-4 focus:ring-red-500/20"
                                                />
                                            </div>
                                            <div class="relative">
                                                <span
                                                    class="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                                                    >$</span
                                                >
                                                <input
                                                    v-model="maxPrice"
                                                    type="number"
                                                    :placeholder="$t('fleet.max')"
                                                    class="w-full rounded-xl border border-border bg-background py-3 pr-4 pl-8 text-foreground transition-all duration-200 focus:border-red-500 focus:bg-background focus:ring-4 focus:ring-red-500/20"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div
                                class="space-y-3 border-t border-white/10 pt-6"
                            >
                                <button
                                    @click="applyFilters"
                                    class="w-full rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all duration-200 hover:bg-red-500 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                                >
                                    {{ $t("fleet.apply_filters") }}
                                </button>

                                <button
                                    @click="clearFilters"
                                    class="w-full rounded-xl border border-border bg-background px-4 py-3 font-medium text-muted-foreground transition-all duration-200 hover:border-foreground hover:bg-accent hover:text-foreground"
                                >
                                    {{ $t("fleet.clear_filters") }}
                                </button>
                            </div>

                        </div>
                    </div>

                    <!--  Cars Grid -->
                    <div class="lg:w-3/4">
                        <!--  Results Summary -->
                        <div
                            class="mb-8 rounded-2xl border border-border bg-background backdrop-blur-xl p-6 shadow-sm"
                        >
                            <div
                                class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
                            >
                                <div>
                                    <h2
                                        class="text-xl font-semibold text-foreground"
                                    >
                                        {{ cars.total }} {{ $t("fleet.premium_available") }}
                                    </h2>
                                    <p class="text-sm text-muted-foreground mt-1">
                                        {{ $t("fleet.showing") }} {{ cars.from }} -
                                        {{ cars.to }} {{ $t("fleet.results") }}
                                    </p>
                                </div>
                                <div
                                    class="flex items-center space-x-3 text-sm text-muted-foreground"
                                >
                                    <span
                                        >{{ $t("fleet.page") }} {{ cars.current_page }} {{ $t("fleet.of") }}
                                        {{ cars.last_page }}</span
                                    >
                                    <div class="h-4 w-px bg-border"></div>
                                    <span
                                        class="rounded-full bg-red-600/20 border border-red-500/30 px-3 py-1 font-medium text-red-400"
                                    >
                                        {{ cars.data.length }} {{ $t("fleet.shown") }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Cars Grid -->
                        <div
                            v-if="cars.data.length > 0"
                            class="grid gap-8 md:grid-cols-1 xl:grid-cols-2"
                        >
                            <CarCard
                                v-for="car in cars.data"
                                :key="car.id"
                                :car="car"
                            />
                        </div>

                        <!--  No Results -->
                        <div
                            v-else
                            class="rounded-2xl border border-border bg-background backdrop-blur-xl p-16 text-center shadow-sm"
                        >
                            <div
                                class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-600/10 border border-red-500/30"
                            >
                                <svg
                                    class="h-10 w-10 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.058 0-3.9.785-5.293 2.071A8.003 8.003 0 014 12C4 7.582 7.582 4 12 4s8 3.582 8 8c0 1.996-.732 3.82-1.945 5.224L16 19l-4-4z"
                                    ></path>
                                </svg>
                            </div>
                            <h3
                                class="mb-3 text-2xl font-semibold text-foreground"
                            >
                                {{ $t("fleet.no_found") }}
                            </h3>
                            <p
                                class="mx-auto mb-8 max-w-md leading-relaxed text-muted-foreground"
                            >
                                {{ $t("fleet.no_match") }}
                            </p>
                            <button
                                @click="clearFilters"
                                class="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all duration-200 hover:bg-red-500 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                            >
                                {{ $t("fleet.view_all") }}
                            </button>
                        </div>

                        <!--  Pagination -->
                        <div
                            v-if="cars.data.length > 0 && cars.last_page > 1"
                            class="mt-12 rounded-2xl border border-border bg-background backdrop-blur-xl p-6 shadow-sm"
                        >
                            <div
                                class="flex flex-col items-center justify-between gap-6 sm:flex-row"
                            >
                                <!-- Mobile pagination -->
                                <div
                                    class="flex w-full justify-between sm:hidden"
                                >
                                    <button
                                        v-if="cars.current_page > 1"
                                        @click="goToPage(cars.links[0].url)"
                                        class="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all duration-200 hover:bg-red-500"
                                    >
                                        {{ $t("fleet.previous") }}
                                    </button>
                                    <span
                                        class="flex items-center rounded-xl bg-background border border-border px-4 py-3 text-sm font-medium text-foreground"
                                    >
                                        Page {{ cars.current_page }} of
                                        {{ cars.last_page }}
                                    </span>
                                    <button
                                        v-if="
                                            cars.current_page < cars.last_page
                                        "
                                        @click="
                                            goToPage(
                                                cars.links[
                                                    cars.links.length - 1
                                                ].url,
                                            )
                                        "
                                        class="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all duration-200 hover:bg-red-500"
                                    >
                                        {{ $t("fleet.next") }}
                                    </button>
                                </div>

                                <!-- Desktop pagination -->
                                <div
                                    class="hidden items-center space-x-2 sm:flex"
                                >
                                    <button
                                        v-for="(link, index) in cars.links"
                                        :key="index"
                                        @click="goToPage(link.url)"
                                        :disabled="!link.url"
                                        :class="{
                                            'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]':
                                                link.active,
                                            'border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground':
                                                !link.active && link.url,
                                            'cursor-not-allowed border-border bg-background text-muted-foreground/50':
                                                !link.url,
                                        }"
                                        class="rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200"
                                        v-html="link.label"
                                    ></button>
                                </div>

                                <!-- Results info -->
                                <div class="text-sm text-muted-foreground">
                                    {{ $t("fleet.showing") }}
                                    <span class="font-semibold text-foreground">{{
                                        cars.from
                                    }}</span>
                                    {{ $t("fleet.to") }}
                                    <span class="font-semibold text-foreground">{{
                                        cars.to
                                    }}</span>
                                    {{ $t("fleet.of") }}
                                    <span class="font-semibold text-foreground">{{
                                        cars.total
                                    }}</span>
                                    {{ $t("fleet.results") }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </HomeLayout>
</template>
<style scoped>
    button:hover {
        cursor: pointer;
    }
</style>
