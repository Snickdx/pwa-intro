importScripts('workbox-sw.prod.v2.1.1.js');

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
    "url": "images/android-desktop.png",
    "revision": "60aa56f0b069c8446c3a2857978a2724"
  },
  {
    "url": "images/dog.png",
    "revision": "27d1121826606d32e7d7acca687fdcef"
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
    "url": "images/user.jpg",
    "revision": "01b46903dd0c2cb3b0abc908f3095d93"
  },
  {
    "url": "index.html",
    "revision": "b3deb65ce5c2162b5abda1aa7971cb3c"
  },
  {
    "url": "lib/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2",
    "revision": "028d9900edc4539c71febbba998c9a8c"
  },
  {
    "url": "lib/fonts.css",
    "revision": "8af0e4570de9ac8dd45c82eed3fa4508"
  },
  {
    "url": "lib/material.cyan-light_blue.min.css",
    "revision": "522c918f3dde44b5018e9425cfe84db4"
  },
  {
    "url": "lib/material.min.js",
    "revision": "83d27f27926fd149244b14ad33913ef4"
  },
  {
    "url": "main.js",
    "revision": "7ea0719a759c75610b99e5b6692ba985"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
