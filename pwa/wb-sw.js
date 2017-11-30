importScripts('workbox-sw.prod.v2.1.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "dialog.js",
    "revision": "a91890c984b1692bd45ec1b56e2b4c2d"
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
    "url": "images/cal.png",
    "revision": "0c48872cf9b9504e726f98d000d03063"
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
    "revision": "5f0b764318b05b4c90e2708dc8aa2330"
  },
  {
    "url": "key.js",
    "revision": "dfe6e50fb2ac581dfba2e74a7277d53d"
  },
  {
    "url": "lib/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2",
    "revision": "028d9900edc4539c71febbba998c9a8c"
  },
  {
    "url": "lib/dexie.js",
    "revision": "81f6b0173faaab2868cfedbc951b1a22"
  },
  {
    "url": "lib/firebase.js",
    "revision": "bc4d476bb821aea3ae43771a36e00dc6"
  },
  {
    "url": "lib/fonts.css",
    "revision": "b9ffd1470ae3a31ff0600c57a274a56f"
  },
  {
    "url": "lib/lib.js",
    "revision": "494b8230eb8d1c7a7135651bf58cad45"
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
    "revision": "51ef957ecaa0f683adc337523ccf18bf"
  },
  {
    "url": "manifest.json",
    "revision": "e62867a022bdd6be28e928ad144f490c"
  },
  {
    "url": "service-worker.js",
    "revision": "2cb95b9598cc8fb12ea84bda0b836655"
  },
  {
    "url": "sw-src.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "sw.js",
    "revision": "d71ca84f52a591cc49cd19ec1d700352"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
