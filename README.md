# Philippine Seismic Timeline

## Build

`npm run build`

## Run Devserver

`npm run devserver`

## Build for Github Pages
Run the following command to push updates to the page's Github Page. 

`npm run build:gh-pages`

This updates your local copy of `dist/`, copies the contents to `doc/` then commits and pushes updates to `master`.

## Data Source
Loads data from USGS. The application acquires events that have occured in the last 100 days from the time the user accesses the page.

## Road Map
- Add and overlay for Population Density
- Add an overlay for Fault lines
- Heatmap for earthquake frequency. Display highest and average magnitude per area.
- Content for sidebar. 