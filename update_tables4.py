import glob
import sys
import re

paths = glob.glob('c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/**/*.vue', recursive=True) + glob.glob('c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Client/**/*.vue', recursive=True)

for p in paths:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    
    if '<tbody ' in c:
        # replace any tbody class to bg-white text-black
        c = re.sub(r'<tbody class="[^"]+">', '<tbody class="divide-y divide-gray-200 bg-white text-black">', c)
        
        # fix hover effects
        c = c.replace('hover:bg-zinc-900', 'hover:bg-gray-100')
        c = c.replace('hover:bg-zinc-950', 'hover:bg-gray-100')
        c = c.replace('hover:bg-black', 'hover:bg-gray-100')
        
        with open(p, 'w', encoding='utf-8') as f:
            f.write(c)

print("Updated tbody class in Vue files.")
