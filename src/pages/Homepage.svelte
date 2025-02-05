<script>
    // Die Homepage ist die Startseite der WildMap-App und bietet eine kurze Beschreibung der App und einen Button, der zur Weltkarte führt
    import WildMapLogo from "../assets/wildmap-logo.svg";
    import HeroImage from "../assets/heroimage.png";
</script>

<main>
    <div class="layout">
        <div class="sidebar">
            <img src={HeroImage} alt="Hero" class="sidebar-img" />
        </div>

        <div class="content">
            <img src={WildMapLogo} alt="WildMap Logo" class="logo" />

            <h2>Dein interaktiver Tieratlas rund um den Globus!</h2>
            <p>
                Hast du dich schon einmal gefragt, wo Jaguare wirklich leben
                oder warum Eisbären nur in der Arktis vorkommen? Mit WildMap
                kannst du wilde Tiere auf einer interaktiven Weltkarte entdecken
                und spielerisch lernen, in welchen Lebensräumen sie zuhause
                sind.
                <br />
                <br />
                <strong>Erkunde die Karte</strong> und finde heraus, wo Tiere
                auf der Welt leben.
                <br />
                <strong>Lerne spannende Fakten</strong> über ihre Lebensweise,
                Ernährung und Besonderheiten.
                <br />
                <br />
                Ob für den Unterricht, Hausaufgaben oder einfach aus Neugier – WildMap
                macht es leicht, die faszinierende Welt der Tiere zu verstehen!
            </p>

            <a href="#/worldmap" class="explore-link">
                <button class="explore-btn">Entdeckungsreise starten!</button>
            </a>
        </div>
    </div>
</main>

<footer>
    <p class="footer-left">
        Programmiersprachen III | Tier-Svelte-App | Fabian Rauch
    </p>
    <p class="footer-right">© hope sikuade</p>
</footer>

<style>
    .layout {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1300px;
        margin: 0 auto;
        padding: 20px;
        min-height: calc(100vh - 50px);
    }

    .sidebar {
        flex: 1;
        margin-right: 100px;
        padding: 0;
    }

    .sidebar-img {
        width: 100%;
        max-width: 1080px;
        height: auto;
        display: block;
    }

    .content {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        margin-left: 50px;
    }

    .logo {
        width: 400px;
        align-self: flex-start;
        margin-left: -20px;
    }

    h2 {
        font-size: 1.3rem;
        margin-bottom: 10px;
        text-align: left;
        width: 100%;
    }

    p {
        margin: 10px 0;
        text-align: left;
        width: 100%;
        max-width: 600px;
    }

    .explore-link {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin-top: 20px;
        text-decoration: none;
    }

    .explore-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 50px;
        background-color: white;
        color: black;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-decoration: none;
        font-size: 16px;
        font-weight: bold;
        border: none;
        cursor: pointer;
        font-family: inherit;
        transition:
            box-shadow 0.3s ease,
            background-color 0.3s ease,
            color 0.3s ease;
    }

    .explore-btn:hover {
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
        background-color: #1a759f;
        color: white;
    }

    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #386641;
        color: white;
        font-size: 0.7rem;
    }

    .footer-left {
        text-align: left;
    }

    .footer-right {
        text-align: right;
    }

    /* Responsive Anpassungen für Smartphones */
    @media (max-width: 425px) {
        .layout {
            flex-direction: column;
            padding: 10px;
        }

        .sidebar {
            display: none; /* Bild ausblenden */
        }

        .sidebar-img {
            display: none;
        }

        .content {
            margin-left: 0;
            align-items: center;
            text-align: center;
            width: 100%;
        }

        .logo {
            width: 200px;
            margin-left: 10px;
            margin-top: 80px;
        }

        h2 {
            font-size: 1rem;
            margin-left: -70px;
            max-width: 200px;
        }

        p {
            font-size: 0.8rem;
            max-width: 90%;
        }

        .explore-btn {
            width: 200px;
            height: 45px;
            font-size: 0.8rem;
            margin-left: 10px;
        }

        footer {
            display: flex;
            flex-direction: column;
            align-items: center; /* Horizontales Zentrieren */
            justify-content: center; /* Vertikales Zentrieren */
            text-align: center;
            font-size: 0.6rem;
            padding: 10px 15px;
        }

        .footer-left,
        .footer-right {
            width: 100%; /* Volle Breite für gleichmäßige Zentrierung */
            text-align: center;
            margin-bottom: 3px;
        }
    }
</style>
