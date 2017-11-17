gulp = require('gulp');

gulp.task('generate-service-worker', function(callback) {
	var path = require('path');
	var swPrecache = require('sw-precache');
	var rootDir = 'app-completed';
	
	swPrecache.write(path.join(rootDir, 'service-worker.js'), {
		staticFileGlobs: [rootDir + '/**/*.{json,js,html,css,png,jpg,ttf,woff,woff2,svg}'],
		stripPrefix : rootDir,
		importScripts: [
			'key.js',
			'lib/firebase.js',
			'enableFcm.js',
		],
		runtimeCaching: [{
			urlPattern: /^https:\/\/pwa-snickdx\.c9users\.io:8081\/events/,
			handler: 'networkFirst'
		}]
	}, callback);
});

