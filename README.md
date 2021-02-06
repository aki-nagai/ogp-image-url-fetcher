# OGP Image URL Fetcher
## Requirements
- node.js
- npm or yarn

## Build Setup
1. Clone this repository
2. Install modules
   ```
   $ yarn install # or npm install
   ```

## Usage
1. Create or Export CSV file named `urls.csv` in project root directory.
2. Run following command
   ```
   $ node app.js
   ```
3. :coffee:  Drink a cup of coffee untile the running command is finished.
4. Finally, run a printed command like this.
   ```
   $ cat /YOUR-FILE-PATH/results/20201013000151.csv | pbcopy
   ```

### CSV(urls.csv) file format
```
url
```
Example:
```
https://kaizen-penguin.com/man-hour-management-2318/
https://octpath.com
https://kaizen-penguin.com/visualization-2597/
```
※ If ogp image meta tag is not set, empty string is outputed as the ogp image url.
