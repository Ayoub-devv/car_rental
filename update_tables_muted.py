import glob
import sys
import re

paths = glob.glob('c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Admin/**/*.vue', recursive=True) + glob.glob('c:/xampp/htdocs/carrent/real-rent-car/resources/js/pages/Client/**/*.vue', recursive=True)

for p in paths:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    
    if '<table ' in c:
        # We only want to replace it inside the file if there's a table.
        # It's safe to just replace 'text-muted-foreground' with 'text-zinc-500' in table cells.
        # But a global replace inside these files for text-muted-foreground inside table bodies is tricky to do with regex.
        # Actually, let's just replace 'text-muted-foreground' with 'text-zinc-500' if it's inside a <td>.
        # For simplicity, let's replace all 'text-muted-foreground' that comes after '<td' with 'text-zinc-500' (naive approach).
        
        c = c.replace('class="text-xs text-muted-foreground"', 'class="text-xs text-zinc-500"')
        
        with open(p, 'w', encoding='utf-8') as f:
            f.write(c)

print("Updated muted text in Vue files.")
