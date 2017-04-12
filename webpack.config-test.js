/* eslint-disable */
var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
    target: 'node',
    externals: [
        nodeExternals()
    ]
};