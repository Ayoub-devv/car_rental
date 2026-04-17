const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'resources/js/pages/Fleet.vue');
let content = fs.readFileSync(file, 'utf8');

const reps = {
    'Loading premium vehicles...': '{{ $t("fleet.loading") }}',
    'Filters & Search': '{{ $t("fleet.filters_search") }}',
    'placeholder="Search by make, model..."': ':placeholder="$t(\'fleet.search_placeholder\')"',
    'Search Fleet': '{{ $t("fleet.search_btn") }}',
    '>Vehicle Make<': '>{{ $t("fleet.vehicle_make") }}<',
    '>All Makes<': '>{{ $t("fleet.all_makes") }}<',
    '>Fuel Type<': '>{{ $t("fleet.fuel_type_filter") }}<',
    '>All Fuel Types': '>{{ $t("fleet.all_fuel_types") }}',
    '>Model Year<': '>{{ $t("fleet.model_year") }}<',
    '>All Years<': '>{{ $t("fleet.all_years") }}<',
    '>Daily Rate Range<': '>{{ $t("fleet.daily_rate_range") }}<',
    'placeholder="Min"': ':placeholder="$t(\'fleet.min\')"',
    'placeholder="Max"': ':placeholder="$t(\'fleet.max\')"',
    'Apply Filters': '{{ $t("fleet.apply_filters") }}',
    'Clear All Filters': '{{ $t("fleet.clear_filters") }}',
    '{{ cars.total }} Premium Vehicles\n                                        Available': '{{ cars.total }} {{ $t("fleet.premium_available") }}',
    'Showing {{ cars.from }} -': '{{ $t("fleet.showing") }} {{ cars.from }} -',
    '{{ cars.to }} results': '{{ cars.to }} {{ $t("fleet.results") }}',
    'Page {{ cars.current_page }} of\n                                        {{ cars.last_page }}': '{{ $t("fleet.page") }} {{ cars.current_page }} {{ $t("fleet.of") }}\n                                        {{ cars.last_page }}',
    '{{ cars.data.length }} shown': '{{ cars.data.length }} {{ $t("fleet.shown") }}',
    'No vehicles found': '{{ $t("fleet.no_found") }}',
    "We couldn't find any vehicles matching your\n                                criteria. Try adjusting your filters or search\n                                terms to discover more options.": '{{ $t("fleet.no_match") }}',
    'View All Vehicles': '{{ $t("fleet.view_all") }}',
    'Previous\n                                    </button>': '{{ $t("fleet.previous") }}\n                                    </button>',
    'Next\n                                    </button>': '{{ $t("fleet.next") }}\n                                    </button>',
    'Showing\n                                    <span class="font-semibold text-white">{{': '{{ $t("fleet.showing") }}\n                                    <span class="font-semibold text-white">{{',
    'to\n                                    <span class="font-semibold text-white">{{': '{{ $t("fleet.to") }}\n                                    <span class="font-semibold text-white">{{',
    'of\n                                    <span class="font-semibold text-white">{{': '{{ $t("fleet.of") }}\n                                    <span class="font-semibold text-white">{{',
    'results\n                                </div>': '{{ $t("fleet.results") }}\n                                </div>'
};

for(const [k, v] of Object.entries(reps)) {
    content = content.replace(k, v);
}
fs.writeFileSync(file, content);
console.log('Translated Fleet.vue completely');
