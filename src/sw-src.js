importScripts('workbox-sw.prod.v2.1.1.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([]);


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

workboxSW.router.registerRoute('https://pwa-snickdx.c9users.io:8081/events', args => {
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

let fun = ()=>{
  console.log("idk why they give me control here and not in the actual damn app.");
}

self.addEventListener('sync', function(event) {
  console.log("general sync event fired");
  if (event.tag == 'eventSync') {
    event.waitUntil(fun());
  }
  if (event.tag == 'test-sync') {
    event.waitUntil(fun());
  }
});