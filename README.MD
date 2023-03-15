Automated Sprintax filler with robinhood cvs data

1. download the robinhood cvs data
2. remove every line except for 1099-B (this auto filler only supports 1099-B from robinhood)
3. use the converter.py to generate the json data
4. install the temper_monkey.js to your browser through the extension temper monkey
5. replace the data in temper_monkey.js with the content in the generated json file
6. enjoy :)