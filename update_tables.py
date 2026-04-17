import glob
import sys

paths = glob.glob('c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/**/*.vue', recursive=True) + glob.glob('c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Client/**/*.vue', recursive=True)

for p in paths:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    
    if '<table ' in c:
        c = c.replace('<div class="overflow-x-auto rounded-md border border-gray-200 bg-black">', '<div class="overflow-x-auto rounded-md border border-white/20 bg-black">')
        c = c.replace('<div class="overflow-x-auto rounded-md border">', '<div class="overflow-x-auto rounded-md border border-white/20 bg-black">')
        
        c = c.replace('<thead class="bg-black">', '<thead class="bg-zinc-900">')
        c = c.replace('<thead class="bg-gray-100">', '<thead class="bg-zinc-900">')
        
        c = c.replace('<tbody class="bg-zinc-950 border border-white/10/60 backdrop-blur-xl divide-y divide-white/10">', '<tbody class="divide-y divide-white/10 bg-black text-white">')
        c = c.replace('<tbody class="divide-y divide-gray-200 bg-white">', '<tbody class="divide-y divide-white/10 bg-black text-white">')
        
        c = c.replace('class="cursor-pointer hover:bg-black transition-colors"', 'class="cursor-pointer transition-colors hover:bg-zinc-900"')
        c = c.replace('class="cursor-pointer transition-colors hover:bg-gray-50"', 'class="cursor-pointer transition-colors hover:bg-zinc-900"')
        c = c.replace('class="hover:bg-zinc-950 transition-colors"', 'class="hover:bg-zinc-900 transition-colors"')
        
        with open(p, 'w', encoding='utf-8') as f:
            f.write(c)

print("Updated tables in Vue files.")
