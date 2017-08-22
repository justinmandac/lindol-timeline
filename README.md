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
Loads data from USGS 952 KM around [121.7740, 12.8797], within the specified dates.

## Road Map
- Load data from last 7 days on page load.
- Add and overlay for Population Density
- Add an overlay for Fault lines
  - ✔️ West Valley Fault
- Heatmap for earthquake frequency. Display highest and average magnitude per area.