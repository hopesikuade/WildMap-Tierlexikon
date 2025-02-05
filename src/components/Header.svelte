<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    import homeIcon from "../assets/home-icon.svg";
    import mapIcon from "../assets/map-icon.svg";
    import saveIcon from "../assets/save-icon.svg";
    import searchIcon from "../assets/search-icon.svg";

    const currentPage = writable(window.location.hash || "#/");

    function updateActivePage() {
        currentPage.set(window.location.hash || "#/");
    }

    onMount(() => {
        window.addEventListener("hashchange", updateActivePage);
        return () => window.removeEventListener("hashchange", updateActivePage);
    });
</script>

<div class="side-menu">
    <a href="#/" class="menu-item" class:active={$currentPage === "#/"}>
        <img src={homeIcon} alt="Home" />
    </a>
    <a
        href="#/worldmap"
        class="menu-item"
        class:active={$currentPage === "#/worldmap"}
    >
        <img src={mapIcon} alt="World Map" />
    </a>
    <a
        href="#/bookmark"
        class="menu-item"
        class:active={$currentPage === "#/bookmark"}
    >
        <img src={saveIcon} alt="Bookmark" />
    </a>
    <a
        href="#/search"
        class="menu-item"
        class:active={$currentPage === "#/search"}
    >
        <img src={searchIcon} alt="Search" />
    </a>
</div>

<style>
    .side-menu {
        position: fixed;
        top: 20%;
        right: 20px;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 9999;
    }

    .menu-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-decoration: none;
        transition:
            background-color 0.3s ease,
            box-shadow 0.3s ease;
    }

    .menu-item img {
        width: 24px;
        height: 24px;
        transition: filter 0.3s ease;
    }

    .menu-item:hover {
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }

    .menu-item.active {
        background-color: #1a759f;
    }

    .menu-item.active img {
        filter: brightness(0) invert(1);
    }

    /* Anpassungen für Bildschirmbreiten von 425px oder weniger */
    @media (max-width: 425px) {
        .side-menu {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            transform: none;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            height: 60px; /* Höhe des Headers */
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 9999;
        }

        .menu-item {
            width: 40px;
            height: 40px;
            border-radius: 4px;
        }
    }
</style>
