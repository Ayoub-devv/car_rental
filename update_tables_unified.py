import glob
import re

pages = [
    'c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/Cars/Index.vue',
    'c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/Reservations/Index.vue',
    'c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/Payments/Index.vue',
    'c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/Clients/Index.vue',
    'c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/Clients/Show.vue',
    'c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/Reservations/Show.vue',
    'c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/Support/Index.vue',
    'c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Client/Reservations/Index.vue',
    'c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Client/Reservations/Show.vue',
    'c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Client/Support/Index.vue',
]

for p in pages:
    try:
        with open(p, 'r', encoding='utf-8') as f:
            c = f.read()
    except FileNotFoundError:
        print(f"Skipped (not found): {p}")
        continue

    if '<table' not in c:
        print(f"Skipped (no table): {p}")
        continue

    # 1. Table wrapper: dark border/bg -> white
    c = c.replace('overflow-x-auto rounded-md border border-white/20 bg-black', 'overflow-x-auto rounded-lg bg-white border border-gray-200 shadow')
    c = c.replace('overflow-x-auto rounded-md border border-white/20 bg-gray-800', 'overflow-x-auto rounded-lg bg-white border border-gray-200 shadow')

    # 2. Table divider
    c = c.replace('min-w-full divide-y divide-white/10', 'min-w-full divide-y divide-gray-200')
    c = c.replace('min-w-full divide-y divide-white/10 border border-white/10/60 backdrop-blur-xl', 'min-w-full divide-y divide-gray-200')

    # 3. Table header: dark -> light gray
    c = c.replace('<thead class="bg-zinc-900">', '<thead class="bg-gray-50">')

    # 4. Header text: light on dark -> dark on light
    c = c.replace('text-zinc-200 uppercase', 'text-gray-500 uppercase')

    # 5. Empty state text
    c = c.replace('text-center text-zinc-500', 'text-center text-gray-400')

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)

    print(f"Updated: {p}")

print("\nDone! All tables unified.")
