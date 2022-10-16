const checkWindow = typeof window !== "undefined";

export const setStorage = (key, value, type) => {
    if (checkWindow) {
        if (type === "session") {
            sessionStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
};

export const getStorage = (key, type) => {
    let storage;
    if (checkWindow) {
        if (type === "session") {
            storage = JSON.parse(sessionStorage.getItem(key));
        } else {
            storage = JSON.parse(localStorage.getItem(key));
        }
    }
    return storage;
};

export const removeStorage = (key, type) => {
    if (checkWindow) {
        if (type === "session") {
            sessionStorage.removeItem(key);
        } else {
            localStorage.removeItem(key);
        }
    }
}