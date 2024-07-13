self.addEventListener('message', (event) => {
    console.log('Message from main script', event.data);
    self.postMessage('Hello from worker!');
  });