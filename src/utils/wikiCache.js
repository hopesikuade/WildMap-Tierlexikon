// Diese Datei ist dafür da, dass die Bilder von Wikipedia für ein Tier abgerufen und zwischenspeichert werden, damit sie auf anderen Seiten schneller laden
let wikiImageCache = {};

export async function getWikiImage(animalName) {
    if (wikiImageCache[animalName]) {
        return wikiImageCache[animalName];
    }

    try {
        const response = await fetch(
            `https://de.wikipedia.org/api/rest_v1/page/summary/${animalName}`
        );
        const data = await response.json();
        const imageUrl = data.thumbnail ? data.thumbnail.source : "/assets/default-animal.png";
        wikiImageCache[animalName] = imageUrl;
        return imageUrl;
    } catch (error) {
        console.error("Fehler beim Abrufen von Wikipedia-Daten:", error);
        return "/assets/default-animal.png";
    }
}
