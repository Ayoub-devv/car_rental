import glob
import sys
import re

paths = glob.glob('c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/**/*.vue', recursive=True) + glob.glob('c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Client/**/*.vue', recursive=True)

for p in paths:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    
    if '<tbody ' in c:
        # replace any empty table text colors
        c = c.replace('class="px-4 py-4 text-center text-zinc-200"', 'class="px-4 py-4 text-center text-zinc-500"')
        c = c.replace('class="px-4 py-6 text-center text-zinc-200"', 'class="px-4 py-6 text-center text-zinc-500"')
        
        with open(p, 'w', encoding='utf-8') as f:
            f.write(c)

print("Updated empty text in Vue files.")
