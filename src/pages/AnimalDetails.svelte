<script>
    // Die AnimalDetails Unterseite dient dazu, dass die Kinder tiefergehende Informationen zu den Tieren erhalten und sich durch verschiedene Kategorien durchklicken können
    import { onMount, onDestroy } from "svelte";
    import { animal as allAnimals } from "../scripts/animaldata";
    import { querystring } from "svelte-spa-router";
    import arrowUpIcon from "../assets/arrowup-icon.svg";
    import arrowDownIcon from "../assets/arrowdown-icon.svg";
    import backIcon from "../assets/arrowback-icon.svg";

    let currentAnimal = null;
    let taxonomy, chars, locations;

    let excerpt = "";
    let imageUrl = "";

    // Variable für das Akkordeon des Excerpts in der Mobilversion
    let isExcerptOpen = false;

    // Die Wikipedia API ist dazu da, um einen ersten Einleitungstext und das zum Tier jeweils passende Bild abzurufen
    async function fetchExcerpt(animalName) {
        const response = await fetch(
            `https://de.wikipedia.org/api/rest_v1/page/summary/${animalName}`,
        );
        const data = await response.json();
        return {
            extract: data.extract || "",
            image: data.thumbnail ? data.thumbnail.source : "",
        };
    }

    onMount(async () => {
        document.body.style.overflow = "auto";

        let currentAnimalName = decodeURIComponent($querystring).trim();
        console.log(`Loading details for ${currentAnimalName}`);

        currentAnimal = allAnimals.find((a) => a.name === currentAnimalName);

        if (currentAnimal) {
            taxonomy = currentAnimal.taxonomy;
            chars = currentAnimal.characteristics;
            locations = currentAnimal.locations;

            const wikipediaData = await fetchExcerpt(currentAnimal.name);
            excerpt = wikipediaData.extract;
            imageUrl = wikipediaData.image;
        } else {
            taxonomy = null;
            chars = null;
            locations = [];
        }
    });

    onDestroy(() => {
        document.body.style.overflow = "hidden";
    });

    function goBack() {
        window.history.back();
    }

    let isOpen1 = false;
    let isOpen2 = false;
    let isOpen3 = false;
    let isOpen4 = false;
    let isOpen5 = false;

    function toggleAccordion(accordion) {
        if (accordion === 1) isOpen1 = !isOpen1;
        else if (accordion === 2) isOpen2 = !isOpen2;
        else if (accordion === 3) isOpen3 = !isOpen3;
        else if (accordion === 4) isOpen4 = !isOpen4;
        else if (accordion === 5) isOpen5 = !isOpen5;
    }
</script>

<div class="container">
    {#if !currentAnimal}
        <h1>Tier nicht gefunden!</h1>
        <p>
            <a href="./#" on:click|preventDefault={goBack}>Zurück</a>
        </p>
    {:else}
        <div class="animal-detail-container">
            <div class="title-row">
                <a
                    href="./#/"
                    class="back-link"
                    on:click|preventDefault={goBack}
                >
                    <img src={backIcon} alt="Zurück" />
                </a>
                <div class="title-text">
                    <h2>{currentAnimal.name}</h2>
                    <p class="subheading">
                        {taxonomy.scientific_name} | {chars.group}
                    </p>
                </div>
            </div>

            <!-- Desktop: Excerpt als normaler Absatz -->
            <div class="excerpt-desktop">
                <p>{excerpt}</p>
            </div>

            <!-- Mobile: Excerpt in einem Akkordeon -->
            <div class="excerpt-mobile">
                <div class="accordion excerpt-accordion">
                    <button
                        class="accordion-header"
                        on:click={() => (isExcerptOpen = !isExcerptOpen)}
                    >
                        Steckbrief
                        <img
                            src={isExcerptOpen ? arrowUpIcon : arrowDownIcon}
                            alt="Toggle Icon"
                            class="accordion-icon"
                        />
                    </button>
                    {#if isExcerptOpen}
                        <div class="accordion-content">
                            {excerpt}
                        </div>
                    {/if}
                </div>
            </div>

            <div class="tags">
                {#each locations as loc}
                    <span class="tag-pill location-tag">{loc}</span>
                {/each}
                <span class="tag-pill habitat-tag">{chars.habitat}</span>
            </div>

            <h3>
                Steckbrief des {currentAnimal.name}: "{chars.slogan}"
            </h3>

            <!-- Akkordeons zum Clustern der Informationen -->
            <div class="side-by-side">
                <div class="accordion-container">
                    <div class="accordion">
                        <button
                            class="accordion-header"
                            on:click={() => toggleAccordion(1)}
                        >
                            Körperliche Merkmale
                            <img
                                src={isOpen1 ? arrowUpIcon : arrowDownIcon}
                                alt="Toggle Icon"
                                class="accordion-icon"
                            />
                        </button>
                        {#if isOpen1}
                            <div class="accordion-content">
                                <p>
                                    <strong>Hauttyp:</strong>
                                    {chars.skin_type}
                                </p>
                                <p><strong>Farbe:</strong> {chars.color}</p>
                                <p><strong>Gewicht:</strong> {chars.weight}</p>
                                <p><strong>Größe:</strong> {chars.height}</p>
                                <p>
                                    <strong>Auffällige Merkmale:</strong>
                                    {chars.most_distinctive_feature}
                                </p>
                            </div>
                        {/if}
                    </div>

                    <div class="accordion">
                        <button
                            class="accordion-header"
                            on:click={() => toggleAccordion(2)}
                        >
                            Verhalten und Lebensweise
                            <img
                                src={isOpen2 ? arrowUpIcon : arrowDownIcon}
                                alt="Toggle Icon"
                                class="accordion-icon"
                            />
                        </button>
                        {#if isOpen2}
                            <div class="accordion-content">
                                <p>
                                    <strong>Sozialverhalten:</strong>
                                    {chars.group_behavior}
                                </p>
                                <p>
                                    <strong>Lebensstil:</strong>
                                    {chars.lifestyle}
                                </p>
                                <p>
                                    <strong>Geschwindigkeit:</strong>
                                    {chars.top_speed}
                                </p>
                            </div>
                        {/if}
                    </div>

                    <div class="accordion">
                        <button
                            class="accordion-header"
                            on:click={() => toggleAccordion(3)}
                        >
                            Ernährung
                            <img
                                src={isOpen3 ? arrowUpIcon : arrowDownIcon}
                                alt="Toggle Icon"
                                class="accordion-icon"
                            />
                        </button>
                        {#if isOpen3}
                            <div class="accordion-content">
                                <p>
                                    <strong>Ernährungstyp:</strong>
                                    {chars.diet}
                                </p>
                                <p><strong>Nahrung:</strong> {chars.prey}</p>
                            </div>
                        {/if}
                    </div>

                    <div class="accordion">
                        <button
                            class="accordion-header"
                            on:click={() => toggleAccordion(4)}
                        >
                            Gefährdung und Population
                            <img
                                src={isOpen4 ? arrowUpIcon : arrowDownIcon}
                                alt="Toggle Icon"
                                class="accordion-icon"
                            />
                        </button>
                        {#if isOpen4}
                            <div class="accordion-content">
                                <p>
                                    <strong>Geschätzte Population:</strong>
                                    {chars.estimated_population_size}
                                </p>
                                <p>
                                    <strong>Größte Bedrohung:</strong>
                                    {chars.biggest_threat}
                                </p>
                            </div>
                        {/if}
                    </div>

                    <div class="accordion">
                        <button
                            class="accordion-header"
                            on:click={() => toggleAccordion(5)}
                        >
                            Fortpflanzung
                            <img
                                src={isOpen5 ? arrowUpIcon : arrowDownIcon}
                                alt="Toggle Icon"
                                class="accordion-icon"
                            />
                        </button>
                        {#if isOpen5}
                            <div class="accordion-content">
                                <p>
                                    <strong>Tragezeit:</strong>
                                    {chars.gestation_period}
                                </p>
                                <p>
                                    <strong>Wurfgröße:</strong>
                                    {chars.average_litter_size}
                                </p>
                                <p>
                                    <strong>Name der Jungtiere:</strong>
                                    {chars.name_of_young}
                                </p>
                                <p>
                                    <strong>Alter der Geschlechtsreife:</strong>
                                    {chars.age_of_sexual_maturity}
                                </p>
                                <p>
                                    <strong>Absetzalter:</strong>
                                    {chars.age_of_weaning}
                                </p>
                            </div>
                        {/if}
                    </div>
                </div>

                <div class="image-column">
                    <img
                        src={imageUrl ? imageUrl : "/assets/elephant.jpg"}
                        alt={currentAnimal.name}
                        class="animal-image"
                    />
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .container {
        padding: 2rem;
        max-width: 1000px;
        margin: 0 auto;
        max-height: 100vh;
    }

    .animal-detail-container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 1rem;
    }

    .title-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .back-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        cursor: pointer;
    }

    .back-link img {
        width: 32px;
        height: 32px;
    }

    .title-text h2 {
        margin: 0;
        font-size: 1.8rem;
    }

    .subheading {
        margin: 0.2rem 0;
        color: #666;
    }

    .tags {
        margin: 0.5rem 0;
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .tag-pill {
        border-radius: 12px;
        padding: 0.3rem 0.7rem;
        font-size: 0.9rem;
        color: white;
    }

    .location-tag {
        background-color: #386641;
    }

    .habitat-tag {
        background-color: #348942;
    }

    .side-by-side {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin-top: 2rem;
    }

    .accordion-container {
        flex: 1;
        min-width: 300px;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .accordion {
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        background-color: white;
    }

    .accordion-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        font-size: 1rem;
        font-weight: bold;
        background-color: white;
        border: none;
        cursor: pointer;
        width: 100%;
        text-align: left;
        transition: background-color 0.3s ease;
    }

    .accordion-header:hover {
        background-color: #f0f0f0;
    }

    .accordion-icon {
        width: 40px;
        height: 40px;
        transition: transform 0.3s ease;
    }

    .accordion-content {
        padding: 1rem;
        border-top: 1px solid #ddd;
        background-color: #fafafa;
    }

    .image-column {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .animal-image {
        width: 300px;
        object-fit: contain;
    }

    /* Excerpt: Desktop- und Mobile-Spezifisch */
    .excerpt-desktop {
        display: block;
    }

    .excerpt-mobile {
        display: none;
    }

    @media (max-width: 425px) {
        .container {
            padding: 1rem;
            margin-top: 4rem;
        }

        h3 {
            font-size: 1rem;
            margin-top: 3rem;
        }

        .animal-detail-container {
            padding: 0.5rem;
        }

        .title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }

        .title-text h2 {
            font-size: 1.5rem;
        }

        .subheading {
            font-size: 0.9rem;
        }

        .tags {
            flex-direction: column;
            gap: 0.3rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        .side-by-side {
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
        }

        .accordion-container {
            min-width: 100%;
        }

        .accordion-header {
            padding: 0.8rem;
            font-size: 0.9rem;
        }

        .accordion-content {
            padding: 0.8rem;
            font-size: 0.9rem;
        }

        .image-column {
            width: 100%;
            justify-content: center;
            margin-top: 1rem;
        }

        .animal-image {
            width: 90%;
            max-width: 250px;
        }

        /* Nur in der mobilen Ansicht den Desktop-Excerpt ausblenden */
        .excerpt-desktop {
            display: none;
        }
        .excerpt-mobile {
            display: block;
            margin-bottom: 1rem;
        }
    }
</style>
