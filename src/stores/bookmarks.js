// Die Datei ist ein LocalStorage, der die Bookmarks speichert
import { writable } from 'svelte/store';

function createPersistedStore(key, startValue) {
    let storedValue;
    if (typeof localStorage !== 'undefined') {
        storedValue = localStorage.getItem(key);
    }

    const parsed = storedValue ? JSON.parse(storedValue) : startValue;

    const store = writable(parsed);

    store.subscribe((value) => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    });

    return store;
}

export const bookmarks = createPersistedStore('bookmarks', []);
