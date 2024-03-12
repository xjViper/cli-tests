#!/bin/bash

npx figlet "Starting CLI..."

if npm run build; then

sudo chmod +x ./dist/main.js
clear
npx figlet "CLI Tests"

read -p "Set the delay (in ms): " delay
read -p "Set the tests frequency: " frequency
read -p "Set the level of verbose logs (0: Only error/Default, 1: Only info, 2: All, 3: Never log/Only result): " verbose
read -p "Set the test cases: " testCase

clear
npx figlet "CLI Tests"
sudo npx tests-cli run -d $delay -f $frequency -v $verbose -tc "$testCase"

else

  echo "Build Failed"
  exit

fi