// var store = require("store");

class Storage {
  constructor(namespace) {
    this.namespace = namespace;
  }

  set(key, val, expInSeconds, onQuotaExceeded) {
    if (!store.enabled) return; // Probably in private mode. Don't run to avoid JS errors.
    
    this.removeExpiredKeys();

    if (key && val !== undefined) {
      // Try to store string for DOM objects (e.g., XML result) to avoid circular reference errors.
      if (val.documentElement) {
        val = new XMLSerializer().serializeToString(val.documentElement);
      }

      try {
        store.set(key, {
          namespace: this.namespace,
          val: val,
          exp: expInSeconds,
          time: new Date().getTime() / 1000,
        });
      } catch (e) {
        if (e instanceof Error) {
          const quotaExceededError = e;
          quotaExceededError.quotaExceeded = isQuotaExceeded(e);
          if (quotaExceededError.quotaExceeded && onQuotaExceeded) {
            onQuotaExceeded(e);
          } else {
            throw quotaExceededError;
          }
        }
        throw e;
      }
    }
  }

  remove(key) {
    if (!store.enabled) return; // Probably in private mode. Don't run to avoid JS errors.
    if (key) store.remove(key);
  }

  removeExpiredKeys() {
    if (!store.enabled) return;

    store.each((value, key) => {
      if (value && value.exp && new Date().getTime() / 1000 - value.time > value.exp) {
        this.remove(key);
      }
    });
  }

  removeAll() {
    if (!store.enabled) return; // Probably in private mode. Don't run to avoid JS errors.
    store.clearAll();
  }

  removeNamespace() {
    store.each((value, key) => {
      if (value.namespace && value.namespace === this.namespace) {
        this.remove(key);
      }
    });
  }

  get(key) {
    if (!store.enabled) return; // Probably in private mode. Don't run to avoid JS errors.
    
    if (!key) return;
    
    this.removeExpiredKeys();

    if (key) {
      var info = store.get(key);
      if (!info) {
        return;
      }
      return info.val;
    }
  }
}

function isQuotaExceeded(e) {
  var quotaExceeded = false;

  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22: // Quota exceeded error in most browsers.
          quotaExceeded = true;
          break;
        case 1014: // Quota error in Firefox.
          if (e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
            quotaExceeded = true;
          }
          break;
      }
    } else if (e.number === -2147024882) {
      // Quota error in Internet Explorer 8.
      quotaExceeded = true;
    }
  }

  return quotaExceeded;
}

// module.exports = Storage;
