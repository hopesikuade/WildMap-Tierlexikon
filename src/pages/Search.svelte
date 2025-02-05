<script>
    // Die Search Unterseite bietet den Kindern die Möglichkeit, direkt nach Tieren zu suchen / filtern und sie dann als Lesezeichen zu speichern
    import { onMount, onDestroy } from "svelte";
    import { animal } from "../scripts/animaldata";
    import searchIcon from "../assets/search-icon.svg";
    import { getWikiImage } from "../utils/wikiCache.js";
    import { bookmarks } from "../stores/bookmarks.js";
    import saveIcon from "../assets/save-icon.svg";
    import saveFilledIcon from "../assets/save-filled-icon.svg";

    let searchTerm = "";
    let selectedCategory = null;

    const categories = [
        "Amphibie",
        "Säugetier",
        "Reptil",
        "Vogel",
        "Krebstier",
    ];

    let topClickedAnimals = [
        {
            name: "Giraffe",
            taxonomy: { scientific_name: "Giraffa" },
            characteristics: { group: "Säugetier" },
        },
        {
            name: "Capybara",
            taxonomy: { scientific_name: "Hydrochoerus hydrochaeris" },
            characteristics: { group: "Säugetier" },
        },
        {
            name: "Kaiserpinguin",
            taxonomy: { scientific_name: "Aptenodytes forsteri" },
            characteristics: { group: "Vogel" },
        },
    ];

    $: filteredAnimals = animal
        .filter((a) => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(
            (a) =>
                !selectedCategory ||
                a.characteristics.group === selectedCategory,
        );

    function toggleBookmark(a) {
        bookmarks.update((current) => {
            const isBookmarked = current.some((item) => item.name === a.name);
            if (isBookmarked) {
                return current.filter((item) => item.name !== a.name);
            } else {
                return [...current, a];
            }
        });
    }

    onMount(async () => {
        for (const a of animal) {
            a.imageUrl = await getWikiImage(a.name);
        }

        for (const t of topClickedAnimals) {
            t.imageUrl = await getWikiImage(t.name);
        }
        topClickedAnimals = [...topClickedAnimals];
    });

    onMount(() => {
        document.body.style.overflow = "auto";
    });

    onDestroy(() => {
        document.body.style.overflow = "hidden";
    });
</script>

<div class="container">
    <h1>Suche nach Tieren</h1>
    <div class="search-bar">
        <input
            type="text"
            placeholder="Suche nach einem Tier"
            bind:value={searchTerm}
        />
        <button class="search-button">
            <img src={searchIcon} alt="Suche" />
        </button>
    </div>

    <div class="category-chips">
        {#each categories as cat}
            <button
                class:active={selectedCategory === cat}
                on:click={() =>
                    (selectedCategory = selectedCategory === cat ? null : cat)}
            >
                {cat}
            </button>
        {/each}
    </div>

    {#if searchTerm || selectedCategory}
        {#if filteredAnimals.length > 0}
            <h3>Suchergebnisse</h3>
            <ul class="animal-cards">
                {#each filteredAnimals as a}
                    <li class="animal-card">
                        <a
                            class="card-link"
                            href={"#/animal?" + encodeURIComponent(a.name)}
                        >
                            <div class="card-image">
                                <img
                                    src={a.imageUrl ||
                                        "/assets/default-animal.png"}
                                    alt={a.name}
                                />
                            </div>
                            <div class="card-text">
                                <h3>{a.name}</h3>
                                <p>
                                    {a.taxonomy.scientific_name} |
                                    {a.characteristics.group}
                                </p>
                            </div>
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div
                                class="bookmark-icon"
                                on:click|preventDefault|stopPropagation={() =>
                                    toggleBookmark(a)}
                            >
                                {#if $bookmarks.some((item) => item.name === a.name)}
                                    <img
                                        src={saveFilledIcon}
                                        alt="Bookmark-filled"
                                        style="width: 24px"
                                    />
                                {:else}
                                    <img src={saveIcon} alt="Bookmark" />
                                {/if}
                            </div>
                        </a>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>Keine Tiere gefunden.</p>
        {/if}
    {:else}
        <h3>Meistgeklickte Tiere</h3>
        <ul class="animal-cards">
            {#each topClickedAnimals as a}
                <li class="animal-card">
                    <a
                        class="card-link"
                        href={"#/animal?" + encodeURIComponent(a.name)}
                    >
                        <div class="card-image">
                            <img
                                src={a.imageUrl || "/assets/default-animal.png"}
                                alt={a.name}
                            />
                        </div>
                        <div class="card-text">
                            <h3>{a.name}</h3>
                            <p>
                                {a.taxonomy.scientific_name} |
                                {a.characteristics.group}
                            </p>
                        </div>
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div
                            class="bookmark-icon"
                            on:click|preventDefault|stopPropagation={() =>
                                toggleBookmark(a)}
                        >
                            {#if $bookmarks.some((item) => item.name === a.name)}
                                <img
                                    src={saveFilledIcon}
                                    alt="Bookmark-filled"
                                    style="width: 24px"
                                />
                            {:else}
                                <img src={saveIcon} alt="Bookmark" />
                            {/if}
                        </div>
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .container {
        padding: 2rem;
        max-width: 1000px;
        margin: 0 auto;
    }

    .search-bar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .search-bar input[type="text"] {
        flex: 1;
        padding: 0.6rem;
        border: 1px solid #ccc;
        border-radius: 0.4rem;
        font-size: 1rem;
        font-family: inherit;
    }

    .search-button {
        background: #eee;
        border: none;
        padding: 0.6rem 1rem;
        border-radius: 0.4rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-button:hover {
        background: #1a759f;
    }

    .search-button img {
        width: 20px;
        height: 20px;
    }

    .category-chips {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .category-chips button {
        background-color: #f0f0f0;
        border: none;
        border-radius: 1rem;
        padding: 0.3rem 0.8rem;
        cursor: pointer;
        font-family: inherit;
        font-weight: 500;
        margin-bottom: 20px;
    }

    .category-chips button.active {
        background-color: #1a759f;
        color: white;
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

    /* Responsive Anpassungen für schmale Bildschirme (max-width: 425px) */
    @media (max-width: 425px) {
        .container {
            padding: 1rem;
        }

        h1 {
            font-size: 1.5rem;
            margin-top: 4rem;
            margin-bottom: 2rem;
            text-align: center;
        }

        .search-bar {
            flex-direction: column;
            gap: 0.5rem;
        }

        .search-bar input[type="text"] {
            width: 100%;
            font-size: 1rem;
            padding: 0.5rem;
        }

        .search-button {
            width: 100%;
            padding: 0.5rem;
        }

        .category-chips {
            flex-wrap: wrap;
            justify-content: center;
        }

        .category-chips button {
            padding: 0.3rem 0.5rem;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
    }
</style>
