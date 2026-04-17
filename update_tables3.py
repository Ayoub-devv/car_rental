import glob
import sys

paths = glob.glob('c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/**/*.vue', recursive=True) + glob.glob('c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Client/**/*.vue', recursive=True)

for p in paths:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    
    if '<table ' in c:
        c = c.replace('class="cursor-pointer transition-colors hover:bg-zinc-900"', 'class="cursor-pointer transition-colors hover:bg-gray-100"')
        c = c.replace('class="hover:bg-zinc-900 transition-colors"', 'class="hover:bg-gray-100 transition-colors"')
        
        with open(p, 'w', encoding='utf-8') as f:
            f.write(c)

print("Updated hover effects in Vue files.")
