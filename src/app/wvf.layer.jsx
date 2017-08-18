import * as d3 from 'd3';

export default class WVFLayer  {
  constructor() {
    /** @type {!Object} */
    this.leaflet_ = {};
    /** @type {!Object} */
    this.map_ = {};
    /** @type {!Object} */
    this.data = {};
    /** @type {?Object} */
    this.feature_ = {};
    /** @type {?Object} */
    this.path_ = {};
    /** @type {?Element} */
    this.g_ = {};
    /** @type {?Element} */
    this.svg_ = null;
    /** @type {boolean} */
    this.isHidden_ = false;
    /** @type {string} */
    this.dataUrl_ = '';
  }

  init(leaflet, map, dataUrl = 'data/west-valley-fault.geojson') {
    // Get dependency references.
    this.leaflet_ = leaflet;
    this.map_ = map;
    this.dataUrl_ = dataUrl;

    this.svg_ =
    d3.select(this.map_.getPanes().overlayPane)
      .append('svg');
    this.g_ =
      this.svg_.append('g').attr('class', 'leaflet-zoom-hide wvf-layer');

    this.map_.on('zoomend', () => this.reset());
    return this;
  }


  toggle() {}

  load() {
    return new Promise((resolve, reject) => {
      d3.request(this.dataUrl_, (err, {response}) => {
        if (!!err) {
          reject(err);
          return;
        }

        this.data = JSON.parse(response);
        const map_ = this.map_;
        const L_ = this.leaflet_;
        const transform = d3.geoTransform({
          point(x, y) {
            const point = map_.latLngToLayerPoint(new L_.LatLng(y, x));
            this.stream.point(point.x, point.y);
          },
        });
        this.path_ = d3.geoPath(transform);
        this.feature_ =
        this.g_.selectAll('path')
          .data(this.data.features)
          .enter()
          .append('path')
          .attr("d", this.path_) //fill="orange" stroke="black" stroke-width="3"
          .attr("stroke-width", '2')
          .attr("stroke", 'orange');

        this.reset();
        resolve();
      });
    });
  }

  reset() {
    const bounds = this.path_.bounds(this.data);
    const topLeft = bounds[0];
    const bottomRight = bounds[1];

    this.svg_.attr("width", bottomRight[0] - topLeft[0])
      .attr("height", bottomRight[1] - topLeft[1])
      .style("left", topLeft[0] + "px")
      .style("top", topLeft[1] + "px");

    this.g_.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
    this.feature_.attr('d', this.path_);
  }
}