import glob
import sys

paths = glob.glob('c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/**/*.vue', recursive=True) + glob.glob('c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Client/**/*.vue', recursive=True)

for p in paths:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    
    if '<table ' in c:
        c = c.replace('<tbody class="divide-y divide-white/10 bg-black text-white">', '<tbody class="divide-y divide-gray-200 bg-white text-black">')
        c = c.replace('class="px-4 py-6 text-center text-zinc-200"', 'class="px-4 py-6 text-center text-zinc-500"')
        
        with open(p, 'w', encoding='utf-8') as f:
            f.write(c)

print("Updated tables in Vue files.")
