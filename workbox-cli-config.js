module.exports = {
  "globDirectory": "src/",
  "globPatterns": [
    "**/*.{png,jpg,html,woff2,css,js,json,map}"
  ],
  "swSrc": "src/sw-src.js",
  "swDest": "src/sw.js",
  "globIgnores": [
    "../workbox-cli-config.js"
  ]
};
