<script>
  import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import Homepage from "./pages/Homepage.svelte";
  import WorldMap from "./pages/Worldmap.svelte";
  import Bookmark from "./pages/Bookmark.svelte";
  import Search from "./pages/Search.svelte";
  import { animal } from "./scripts/animaldata.js";
  import AnimalDetails from "./pages/AnimalDetails.svelte";

  console.log(animal);

  const routes = {
    "/": Homepage,
    "/worldmap": WorldMap,
    "/bookmark": Bookmark,
    "/animal": AnimalDetails,
    "/search": Search,
  };

  let currentRoute = window.location.hash;

  function updateRoute() {
    currentRoute = window.location.hash;
  }

  window.addEventListener("hashchange", updateRoute);
</script>

{#if currentRoute !== "#/"}
  <Header />
{/if}

<main>
  <Router {routes} />
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;700&display=swap");

  :global(body) {
    margin: 0;
    font-family: "Albert Sans", sans-serif;
  }
</style>
