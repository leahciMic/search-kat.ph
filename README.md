# Search kat.ph [![Build Status](https://travis-ci.org/leahciMic/search-kat.ph.svg?branch=master)](https://travis-ci.org/leahciMic/search-kat.ph)

## Installation

`npm install --save search-kat.ph`

## Usage

```js

var search = require('search-kat.ph');

search('foobar').then(function(results) {
	// results is an array of objects that look like:
	{
		name: String, // Name of torrent,
		category: String, // Category it's in
		size: String, // Size of file
		files: Number, // Number of files
		age: String, // Age of result
		seeds: Number, // Number of seeds
		leech: Number, // Number of leeches
		magnet: String, // Magnet link
		torrent: String // Torrent URL
	}
});
```