const fs = require('fs');
const path = require('path');

const pagesDir = path.join(process.cwd(), 'resources/js/pages');

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replace] of Object.entries(replacements)) {
        content = content.replaceAll(search, replace);
    }
    fs.writeFileSync(filePath, content);
}

// 1. About.vue
replaceInFile(path.join(pagesDir, 'About.vue'), {
    'About Real Rent Car': '{{ $t("about.title") }}',
    'Your trusted partner in premium car rental services, providing reliable transportation solutions since 2015.': '{{ $t("about.subtitle") }}',
    'Our Story': '{{ $t("about.story_title") }}',
    'Founded in 2015, Real Rent Car began with a simple mission: to provide reliable, affordable, and convenient car rental services to travelers and locals alike. What started as a small fleet of 10 vehicles has grown into a comprehensive rental service with over 200 premium vehicles.': '{{ $t("about.story_1") }}',
    "We understand that every journey is important, whether it's a business trip, family vacation, or daily commute. That's why we've built our reputation on trust, quality, and exceptional customer service.": '{{ $t("about.story_2") }}',
    '>Vehicles</p>': '>{{ $t("about.stats.vehicles") }}</p>',
    '>Happy Customers</p>': '>{{ $t("about.stats.customers") }}</p>',
    '>Locations</p>': '>{{ $t("about.stats.locations") }}</p>',
    '>Years Experience</p>': '>{{ $t("about.stats.experience") }}</p>',
    'Our Mission & Values': '{{ $t("about.mission_title") }}',
    "We're committed to providing exceptional car rental experiences while maintaining the highest standards of service and integrity.": '{{ $t("about.mission_sub") }}',
    '>Reliability</h3>': '>{{ $t("about.values.rel_title") }}</h3>',
    'Every vehicle in our fleet is regularly maintained and inspected to ensure your safety and peace of mind.': '{{ $t("about.values.rel_desc") }}',
    '>Transparency</h3>': '>{{ $t("about.values.trans_title") }}</h3>',
    'No hidden fees, no surprises. We believe in clear, upfront pricing and honest communication.': '{{ $t("about.values.trans_desc") }}',
    '>Excellence</h3>': '>{{ $t("about.values.exc_title") }}</h3>',
    'We continuously strive to exceed expectations through superior service, quality vehicles, and innovative solutions.': '{{ $t("about.values.exc_desc") }}',
    'Why Choose Real Rent Car?': '{{ $t("about.choose_title") }}',
    '>Premium Fleet</h3>': '>{{ $t("about.choose.fleet_t") }}</h3>',
    'Modern, well-maintained vehicles from top manufacturers': '{{ $t("about.choose.fleet_d") }}',
    '>24/7 Support</h3>': '>{{ $t("about.choose.support_t") }}</h3>',
    'Round-the-clock customer service and roadside assistance': '{{ $t("about.choose.support_d") }}',
    '>Flexible Booking</h3>': '>{{ $t("about.choose.booking_t") }}</h3>',
    'Easy online booking with flexible pickup and return options': '{{ $t("about.choose.booking_d") }}',
    '>Competitive Pricing</h3>': '>{{ $t("about.choose.price_t") }}</h3>',
    'Best rates in the market with no hidden fees': '{{ $t("about.choose.price_d") }}',
    '>Multiple Locations</h3>': '>{{ $t("about.choose.loc_t") }}</h3>',
    'Convenient pickup points across the city': '{{ $t("about.choose.loc_d") }}',
    '>Safety First</h3>': '>{{ $t("about.choose.safety_t") }}</h3>',
    'All vehicles undergo rigorous safety inspections': '{{ $t("about.choose.safety_d") }}',
    'Our Leadership Team': '{{ $t("about.team_title") }}',
    'Meet the experienced professionals who drive our company forward.': '{{ $t("about.team_sub") }}',
    'Ready to Get Started?': '{{ $t("about.ready_title") }}',
    'Experience the Real Rent Car difference today. Browse our fleet and book your perfect vehicle in just a few clicks.': '{{ $t("about.ready_sub") }}'
});

// 2. Contact.vue
replaceInFile(path.join(pagesDir, 'Contact.vue'), {
    '>Contact Us</h1>': '>{{ $t("contact.title") }}</h1>',
    "Have questions about our car rental services? We're here to help. Send us a message and we'll get back to you as soon as possible.": '{{ $t("contact.subtitle") }}',
    'Send us a Message': '{{ $t("contact.form_title") }}',
    'Full Name': '{{ $t("contact.name") }}',
    'Email Address': '{{ $t("contact.email") }}',
    '>Subject</label>': '>{{ $t("contact.subject") }}</label>',
    '>Message</label>': '>{{ $t("contact.message") }}</label>',
    'Send Message\n                                </span>': '{{ $t("contact.send") }}\n                                </span>',
    'Get in Touch': '{{ $t("contact.get_in_touch") }}',
    '>Phone</h3>': '>{{ $t("contact.phone") }}</h3>',
    '>Address</h3>': '>{{ $t("contact.address") }}</h3>',
    'Business Hours': '{{ $t("contact.hours") }}',
    'Quick Links': '{{ $t("contact.quick_links") }}',
    'Processing...': '{{ $t("booking.processing") }}'
});

console.log("Applied About and Contact translations.");
