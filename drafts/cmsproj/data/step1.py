"""
This scrapes vehicle pricing data.
"""
import csv

with open("raw/vehicles.csv", "rt") as fin:
    reader = csv.DictReader(fin)
    print(next(reader))
    print(next(reader)["model"])
    print(len([row for row in reader]))
