#!/usr/bin/env python3

from sys import argv
from glob import glob
from subprocess import run


original = argv[1]
new = argv[2]

src_files = glob('src/**/*.js', recursive=True) + glob('src/**.vue', recursive=True)

for filename in src_files:
    print(filename)
    run(['sed', '-i', f's/{original}/{new}/g', filename], check=True)
