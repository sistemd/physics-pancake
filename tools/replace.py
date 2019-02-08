#!/usr/bin/env python3

from sys import argv
from glob import glob
from subprocess import run


original = argv[1]
new = argv[2]

src_files = glob('src/**', recursive=True)
for filename in src_files:
    run('sed' f's/{original}/{new}/g', filename, check=True)
