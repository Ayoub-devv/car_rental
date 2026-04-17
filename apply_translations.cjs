const fs = require('fs');
const path = require('path');

const pagesDir = path.join(process.cwd(), 'resources/js/pages');
const componentsDir = path.join(process.cwd(), 'resources/js/components');
const layoutsDir = path.join(process.cwd(), 'resources/js/layouts');

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replace] of Object.entries(replacements)) {
        content = content.replaceAll(search, replace);
    }
    fs.writeFileSync(filePath, content);
}

// 1. HomeLayout.vue
replaceInFile(path.join(layoutsDir, 'HomeLayout.vue'), {
    '>\n                            Home\n                        </Link>': '>\n                            {{ $t("nav.home") }}\n                        </Link>',
    '>\n                            Fleet\n                        </Link>': '>\n                            {{ $t("nav.fleet") }}\n                        </Link>',
    '>\n                            About\n                        </Link>': '>\n                            {{ $t("nav.about") }}\n                        </Link>',
    '>\n                            Contact\n                        </Link>': '>\n                            {{ $t("nav.contact") }}\n                        </Link>',
    'Dashboard\n                        </Link>': '{{ $t("nav.dashboard") }}\n                        </Link>',
    'Sign In\n                            </Link>': '{{ $t("nav.login") }}\n                            </Link>',
    'Get Started\n                            </Link>': '{{ $t("nav.register") }}\n                            </Link>',
});

// 2. Welcome.vue
replaceInFile(path.join(pagesDir, 'Welcome.vue'), {
    'The Corporate Standard': '{{ $t("welcome.corporate_standard") }}',
    'Uncompromising<br />\n                                    <span class="text-red-500">Mobility Solutions.</span>': '{{ $t("welcome.title_1") }}<br />\n                                    <span class="text-red-500">{{ $t("welcome.title_2") }}</span>',
    'Engineered for excellence. Experience the definitive class of executive and premium car rentals, tailored for individuals who demand perfection.': '{{ $t("welcome.subtitle") }}',
    'Reserve a Vehicle': '{{ $t("welcome.reserve_btn") }}',
    'Corporate Accounts': '{{ $t("welcome.corporate_btn") }}',
    'Immaculate Fleet': '{{ $t("welcome.pillars.immaculate_title") }}',
    'Every vehicle is rigorously inspected and detailed to absolute perfection prior to deployment.': '{{ $t("welcome.pillars.immaculate_desc") }}',
    'Punctual Delivery': '{{ $t("welcome.pillars.punctual_title") }}',
    'Precision timing. We guarantee your vehicle will be ready and waiting precisely when scheduled.': '{{ $t("welcome.pillars.punctual_desc") }}',
    'Global Network': '{{ $t("welcome.pillars.global_title") }}',
    'Seamless pick-up and drop-off locations strategically positioned across major business hubs.': '{{ $t("welcome.pillars.global_desc") }}',
    'Premium Selection': '{{ $t("welcome.featured.tag") }}',
    'Our Featured Vehicles': '{{ $t("welcome.featured.title") }}',
    'View Entire Fleet': '{{ $t("welcome.featured.view_all") }}',
    'Executive Class': '{{ $t("welcome.elegance.tag") }}',
    'Designed for Leadership.': '{{ $t("welcome.elegance.title") }}',
    'Real Rent provides more than just a car; we provide a statement. Our curated fleet of executive sedans, luxury SUVs, and high-performance vehicles ensures that you make the right impression, every time.': '{{ $t("welcome.elegance.desc") }}',
    'Dedicated Account Management': '{{ $t("welcome.elegance.list_1") }}',
    'Chauffeur Services Available': '{{ $t("welcome.elegance.list_2") }}',
    'Flexible Corporate Leases': '{{ $t("welcome.elegance.list_3") }}',
    'Discover Our Standards': '{{ $t("welcome.elegance.link") }}'
});

// 3. Fleet.vue
replaceInFile(path.join(pagesDir, 'Fleet.vue'), {
    'Our Premium Fleet': '{{ $t("fleet.title") }}',
    'Find the perfect vehicle for your next journey': '{{ $t("fleet.subtitle") }}',
    'Search vehicles by make or model...': '{{ $t("fleet.search") }}',
    'All Transmissions': '{{ $t("fleet.all_transmissions") }}',
    'Automatic': '{{ $t("fleet.automatic") }}',
    'Manual': '{{ $t("fleet.manual") }}',
    'Sort By': '{{ $t("fleet.sort_by") }}',
    'Recommended': '{{ $t("fleet.sort_default") }}',
    'Price: Low to High': '{{ $t("fleet.price_low_high") }}',
    'Price: High to Low': '{{ $t("fleet.price_high_low") }}',
    'No vehicles match your search criteria.': '{{ $t("fleet.no_results") }}'
});

// 4. CarCard.vue
replaceInFile(path.join(componentsDir, 'CarCard.vue'), {
    '/day</span>': '/ {{ $t("fleet.per_day") }}</span>',
    'GPS included': '{{ $t("fleet.gps") }}',
    'Insurance included': '{{ $t("fleet.insurance") }}',
    'Book Now\n            </a>': '{{ $t("fleet.book_now") }}\n            </a>'
});

// 5. Booking.vue
replaceInFile(path.join(pagesDir, 'Booking.vue'), {
    '>Fleet</a\n                        >': '>{{ $t("nav.fleet") }}</a\n                        >',
    'Complete your reservation in just a few steps': '{{ $t("booking.subtitle") }}',
    '>per day</span': '>{{ $t("fleet.per_day") }}</span',
    'Booking Details': '{{ $t("booking.details") }}',
    'Rental Period': '{{ $t("booking.period") }}',
    'Pickup Date *': '{{ $t("booking.pickup_date") }}',
    'Return Date *': '{{ $t("booking.return_date") }}',
    'Pickup & Return Locations': '{{ $t("booking.locations") }}',
    'Pickup Location *': '{{ $t("booking.pickup_loc") }}',
    'Return Location *': '{{ $t("booking.return_loc") }}',
    'Select pickup location': '{{ $t("booking.select_pickup") }}',
    'Select return location': '{{ $t("booking.select_return") }}',
    'Booking Summary': '{{ $t("booking.summary") }}',
    'Daily Rate': '{{ $t("booking.daily_rate") }}',
    '>Subtotal</span': '>{{ $t("booking.subtotal") }}</span',
    '>Tax (7%)</span': '>{{ $t("booking.tax") }}</span',
    '>Total</span': '>{{ $t("booking.total") }}</span',
    'Processing...': '{{ $t("booking.processing") }}',
    'Login to Book': '{{ $t("booking.login_to_book") }}',
    'Book Now\n                                </span>': '{{ $t("fleet.book_now") }}\n                                </span>'
});

console.log("Applied Vue component translations.");
