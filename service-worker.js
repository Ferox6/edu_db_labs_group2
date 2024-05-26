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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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
    "url": "404.html",
    "revision": "a661944c8bf376872c9640640c15d63f"
  },
  {
    "url": "assets/css/0.styles.79226024.css",
    "revision": "1d2dd05b9a3f5b2a2ce69130b9945c46"
  },
  {
    "url": "assets/img/relationalSchema.4d0bdb0b.png",
    "revision": "4d0bdb0b4bb3551211c4ab0253c38a6c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.30b887d3.js",
    "revision": "9861f1acd35b8cdae58c97c641a020c0"
  },
  {
    "url": "assets/js/11.c1b62882.js",
    "revision": "7d264acc88202f94eeaff5d87f12b22b"
  },
  {
    "url": "assets/js/12.489bfcea.js",
    "revision": "310834ea3f1fb7c2c8efbf4112d172a4"
  },
  {
    "url": "assets/js/13.e56cff29.js",
    "revision": "329392e254b7c42877bdd9be0419daf3"
  },
  {
    "url": "assets/js/14.e77244b9.js",
    "revision": "7e6e78346124412195991dd1ef11bfae"
  },
  {
    "url": "assets/js/15.5c650a86.js",
    "revision": "21e30b797528e6510270412867bde0ba"
  },
  {
    "url": "assets/js/16.3e14c07c.js",
    "revision": "84fb8c823bfc75849e0c5904d63514db"
  },
  {
    "url": "assets/js/17.dcce01a8.js",
    "revision": "88f269e7b2a2872d3c150d3a886bdf46"
  },
  {
    "url": "assets/js/18.524e919c.js",
    "revision": "3bd8e8ee9e47b2cbfac958109b34dead"
  },
  {
    "url": "assets/js/19.7835ae59.js",
    "revision": "374df65b9b682f8b352e4cde19517798"
  },
  {
    "url": "assets/js/2.db44d39d.js",
    "revision": "daa6b6ed292696bf0a2e3aa0e1b1153a"
  },
  {
    "url": "assets/js/20.16282e7a.js",
    "revision": "7d179806b577bf90d674dffdcfd70463"
  },
  {
    "url": "assets/js/21.3fb0b42e.js",
    "revision": "bc2359780af2dc607bb462eeed4d8f35"
  },
  {
    "url": "assets/js/22.c83b3a58.js",
    "revision": "30df70f2813c4d1301060ab25c7d3f76"
  },
  {
    "url": "assets/js/23.543310cf.js",
    "revision": "c2df611bb35103e68415e12db6ba2a8e"
  },
  {
    "url": "assets/js/24.b8a7d074.js",
    "revision": "bdaaa7345f89d2917f4d071a9a1764b0"
  },
  {
    "url": "assets/js/26.a388051f.js",
    "revision": "9052f0ce80ac768f33661d8b7dc67bcd"
  },
  {
    "url": "assets/js/3.11bf8a91.js",
    "revision": "9d2b51430537848cac2ea5124482a938"
  },
  {
    "url": "assets/js/4.be72248a.js",
    "revision": "668bc91fb4500762c33bec844d358f72"
  },
  {
    "url": "assets/js/5.01993805.js",
    "revision": "6d5176ba3b4c2fa125c6a9aeb57b6aa7"
  },
  {
    "url": "assets/js/6.c2160e41.js",
    "revision": "52d18539e934aaf4d345354d67942f01"
  },
  {
    "url": "assets/js/7.1f827184.js",
    "revision": "bdfef6f12cfe483be868002afeba6c65"
  },
  {
    "url": "assets/js/8.ecbf9340.js",
    "revision": "a323d6e61a5078e66e9a97db0719672c"
  },
  {
    "url": "assets/js/9.a50bcd73.js",
    "revision": "8d744c4bc62ac7fd91f68755a0f6239d"
  },
  {
    "url": "assets/js/app.62654ed7.js",
    "revision": "faf07fef126c96a17c073e7901b003fe"
  },
  {
    "url": "conclusion/index.html",
    "revision": "cc2d08b037f9be8a279590414f10b64e"
  },
  {
    "url": "design/index.html",
    "revision": "01e7af0128ac5c168c0871dbc2ce3926"
  },
  {
    "url": "index.html",
    "revision": "5d7b1a0d860aef5a80cc8f2694b6c980"
  },
  {
    "url": "intro/index.html",
    "revision": "774e1fe8eb986a47e66665947168d08b"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "2812f5126c9206d98c5d322b5259b09c"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "7bc03cd11f0cce9f622164eb1c569dd5"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "5d15ea67fd660f442b3fa441b1bf3424"
  },
  {
    "url": "software/index.html",
    "revision": "12e234ad50342b1f13e952ce92ab43bb"
  },
  {
    "url": "test/index.html",
    "revision": "76e976eaab50ccda26656ffdbac259a9"
  },
  {
    "url": "use cases/index.html",
    "revision": "ae92e9ae49f632e218fdfba1bf01afca"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
