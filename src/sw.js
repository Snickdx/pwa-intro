importScripts('workbox-sw.prod.v2.1.1.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    "url": "404.html",
    "revision": "56a524cef205f3a3a6e143654054a1d4"
  },
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
    "url": "main.css",
    "revision": "0d33e0b65de991c0d0d9af23942284bd"
  },
  {
    "url": "main.js",
    "revision": "7ea0719a759c75610b99e5b6692ba985"
  },
  {
    "url": "manifest.json",
    "revision": "991a49da086a635583c1798288a9c98c"
  },
  {
    "url": "offline.html",
    "revision": "d39891f6a1d6b76a62031add2a54ab2e"
  },
  {
    "url": "sw-src.js",
    "revision": "824c62fe423866fc5b237ac3c367f76e"
  },
  {
    "url": "sw.js",
    "revision": "366e786a937e4fd8241f3abf2fd33f47"
  },
  {
    "url": "workbox-sw.prod.v2.1.1.js",
    "revision": "2a5638f9e33d09efc487b96804a0aa11"
  },
  {
    "url": "workbox-sw.prod.v2.1.1.js.map",
    "revision": "50032bbb3a40ae0047a5a44cd95ff06c"
  }
]);


// let bgQueue = workboxSW.backgroundSync.QueuePlugin({
//   callbacks: {
//     replayDidSucceed: async(hash, res) => {
//         console.log("Event Created");
//       self.registration.showNotification('Jammers Cal', {
//         body: 'Event Created!',
//         icon: '/images/android-desktop.png',
//       });
//     },
//     replayDidFail: (hash) => {},
//     requestWillEnqueue: (reqData) => {},
//     requestWillDequeue: (reqData) => {},
//   },
// });


workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'images-cache',
    cacheExpiration: {
      maxEntries: 50
    }
  })
);

var jamEventHandler = workboxSW.strategies.networkFirst({
  cacheName: 'jammers-events-cache',
  cacheExpiration: {
    maxEntries: 50
  }
});

workboxSW.router.registerRoute('https://pwa-snickdx.c9users.io/api/events.json', args => {
  return jamEventHandler.handle(args).then(response => {
    if (!response) {
      return caches.match('pages/offline.html');
    } else if (response.status === 404) {
      return caches.match('pages/404.html');
    }
    return response;
  });;
});

// const requestWrapper = new workbox.runtimeCaching.RequestWrapper({
//   plugins: [bgQueue],
// });

// const route = new workbox.routing.RegExpRoute({
//   regExp: new RegExp('^https://pwa-snickdx.c9users.io/api/events.json'),
//   handler: new workbox.runtimeCaching.NetworkFirst({requestWrapper}),
// });

// const router = new workbox.routing.Router();
// router.registerRoute({route});