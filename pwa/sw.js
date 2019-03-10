/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.1.0/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "dialog.js",
    "revision": "9143532c55c9cef4fbb449757dd4a97d"
  },
  {
    "url": "images/512-logo.png",
    "revision": "337e1d8c670bc32bba08b8fdbdac6a85"
  },
  {
    "url": "images/android-desktop.png",
    "revision": "60aa56f0b069c8446c3a2857978a2724"
  },
  {
    "url": "images/favicon.png",
    "revision": "680eaca6af54de743d08b413ebb4c4b9"
  },
  {
    "url": "images/ios-desktop.png",
    "revision": "a2cdce82ff3e7af9a0abcd242d3f2ec7"
  },
  {
    "url": "index.html",
    "revision": "dd50c792c0462144f86b5f6264f258eb"
  },
  {
    "url": "lib/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2",
    "revision": "028d9900edc4539c71febbba998c9a8c"
  },
  {
    "url": "lib/fonts.css",
    "revision": "b9ffd1470ae3a31ff0600c57a274a56f"
  },
  {
    "url": "lib/lib.js",
    "revision": "0a00aa0035756470c75ed62a23a10c04"
  },
  {
    "url": "lib/material.cyan-light_blue.min.css",
    "revision": "921f0b910d1f2e21eecf424f072613ca"
  },
  {
    "url": "lib/material.min.js",
    "revision": "e00d1a118138a17cbdbdf58c869f9730"
  },
  {
    "url": "main.css",
    "revision": "74d0852f21c1fa0b4f216240453e905b"
  },
  {
    "url": "main.js",
    "revision": "2618c377b04400d55627d00ec624df8e"
  },
  {
    "url": "manifest.json",
    "revision": "e62867a022bdd6be28e928ad144f490c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
