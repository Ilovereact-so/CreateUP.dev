// Example content for worker-css.js
self.addEventListener('message', function(e) {
    self.postMessage('Worker received: ' + e.data);
  });