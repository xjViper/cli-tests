#!/bin/bash

npx figlet "Starting CLI..."
npm run build
sudo chmod +x ./dist/main.js
clear
npx figlet "CLI Tests"

read -p "Set the delay (in ms): " delay
read -p "Set the tests frequency: " frequency
read -p "Set the test cases: " testCase

clear
npx figlet "CLI Tests"
sudo npx tests-cli run -d $delay -f $frequency -tc "$testCase"
