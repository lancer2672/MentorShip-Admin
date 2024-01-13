navigator.serviceWorker.register("sw.js").then(function (reg) {
  var serviceWorker;
  if (reg.installing) {
    serviceWorker = reg.installing;
  } else if (reg.waiting) {
    serviceWorker = reg.waiting;
  } else if (reg.active) {
    serviceWorker = reg.active;
  }

  if (serviceWorker) {
    console.log("sw current state", serviceWorker.state);
    if (serviceWorker.state == "activated") {
      // If push subscription wasnt done yet have to do here
    }
    serviceWorker.addEventListener("statechange", function (e) {
      console.log("sw statechange : ", e.target.state);
      if (e.target.state == "activated") {
        // use pushManger for subscribing here.
      }
    });
  }
});
