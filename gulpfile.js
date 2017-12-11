const gulp = require('gulp');
const wbBuild = require('workbox-build');

gulp.task('generate-service-worker', function(callback) {
	var path = require('path');
	var swPrecache = require('sw-precache');
	var rootDir = 'pwa';
	
	swPrecache.write(path.join(rootDir, 'service-worker.js'), {
		staticFileGlobs: [rootDir + '/**/*.{json,js,html,css,png,jpg,ttf,woff,woff2,svg}'],
		stripPrefix : rootDir,
		importScripts: [
			'key.js',
			'lib/firebase.js',
			'lib/dexie.js',
			'lib/lib.js',
			'sw.js',
		],
		runtimeCaching: [{
			urlPattern: /^https:\/\/snickdx\.me:3001\/events/,
			handler: 'networkFirst'
		}]
	}, callback);
});

gulp.task('service-worker', () => {
	return wbBuild.injectManifest({
		swSrc: 'pwa/sw-src.js',
		swDest: 'pwa/wb-sw.js',
		globDirectory: 'pwa',
		staticFileGlobs: [
			'*'
		]
	})
		.catch((err) => {
			console.log('[ERROR] This happened: ' + err);
		});
});
