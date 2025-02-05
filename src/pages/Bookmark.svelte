<script>
    // Die Bookmark Unterseite bietet die Möglichkeit, dass die Kinder sich interessante Tiere merken können, um sie später schneller wiederzufinden.
    import { onMount } from "svelte";
    import { bookmarks } from "../stores/bookmarks.js";
    import saveIcon from "../assets/save-icon.svg";
    import saveFilledIcon from "../assets/save-filled-icon.svg";
    import { getWikiImage } from "../utils/wikiCache.js";

    // Funktion, um ein Lesezeichen hinzuzufügen oder zu entfernen
    function toggleBookmark(b) {
        bookmarks.update((current) => {
            const isBookmarked = current.some((item) => item.name === b.name);
            if (isBookmarked) {
                return current.filter((item) => item.name !== b.name);
            } else {
                return [...current, b];
            }
        });
    }

    // Bei einigen Unterseiten werden die Bilder / Informationen aus der wikiCache.js geladen, um die Anfragen an die Wikipedia-API zu reduzieren und damit die Webseite nicht laggt
    onMount(async () => {
        const current = $bookmarks;
        const updated = [];

        for (const b of current) {
            b.iconUrl = await getWikiImage(b.name);
            updated.push(b);
        }

        bookmarks.set(updated);
    });
</script>

<div class="container">
    <h1>Deine gespeicherten Tiere</h1>

    <ul class="animal-cards">
        {#each $bookmarks as b}
            <li class="animal-card">
                <a
                    class="card-link"
                    href={"./#/animal?" + encodeURIComponent(b.name)}
                >
                    <div class="card-image">
                        <img
                            src={b.iconUrl || "assets/default-animal.png"}
                            alt={b.name}
                        />
                    </div>

                    <div class="card-text">
                        <h3>{b.name}</h3>
                        <p>
                            {b.taxonomy.scientific_name} | {b.characteristics
                                .group}
                        </p>
                    </div>

                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        class="bookmark-icon"
                        on:click|preventDefault|stopPropagation={() =>
                            toggleBookmark(b)}
                    >
                        {#if $bookmarks.some((item) => item.name === b.name)}
                            <img src={saveFilledIcon} alt="Bookmark-filled" />
                        {:else}
                            <img src={saveIcon} alt="Bookmark" />
                        {/if}
                    </div>
                </a>
            </li>
        {/each}
    </ul>
</div>

<style>
    .container {
        padding: 2rem;
        max-width: 1000px;
        margin: 0 auto;
        overflow-y: auto;
        max-height: 100vh;
    }

    .animal-cards {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .animal-card {
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: 12px;
        margin-bottom: 1rem;
        padding: 1rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .card-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
        width: 100%;
    }

    .card-image {
        flex-shrink: 0;
        width: 60px;
        height: 60px;
        margin-right: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card-image img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .card-text {
        display: flex;
        flex-direction: column;
    }

    .card-text h3 {
        margin: 0 0 0.2rem;
        font-size: 1.2rem;
        color: #333;
    }

    .card-text p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
    }

    .bookmark-icon {
        margin-left: auto;
        color: #999;
        cursor: pointer;
    }

    .bookmark-icon:hover {
        color: #333;
    }

    .bookmark-icon img {
        width: 24px;
        height: auto;
    }

    /* Anpassungen für Bildschirmbreiten von 425px oder weniger */
    @media (max-width: 425px) {
        h1 {
            font-size: 1.5rem;
            margin-top: 4rem;
            margin-bottom: 2rem;
        }
    }
</style>
