npx figlet "Starting CLI..."

if (npm run build){
cls
npx figlet "CLI Tests"

[int]$delay = Read-Host "Set the delay (in ms) " 
[int]$frequency = Read-Host "Set the tests frequency " 
[int]$verbose = Read-Host "Set the level of verbose logs (0: Only error/Default, 1: Only info, 2: All, 3: Never log/Only result) " 
[String]$testCase = Read-Host "Set the test cases " 

if($testCase -eq ''){
  $testCase = ' '
}

cls
npx figlet "CLI Tests"
npx tests-cli run -d $delay -f $frequency -v $verbose -tc "$testCase"}

else{
  "Build Failed"
  Exit}
