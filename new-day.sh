#!/bin/bash

# Store the current day of the month in a variable
day=$(date +%d)

# Create a directory with the name "day-<day of the month>"
mkdir "day-$day"

cd "day-$day"

touch p1.py p2.py input.txt example.txt