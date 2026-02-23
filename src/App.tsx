import { createGlobalStyle } from 'styled-components';
import { SiteBackgroundImage } from './components/SiteBackgroundImage';
import { SocialsBlock } from './components/SocialsBlock';
import { SocialLink } from './components/SocialLink';
import { GalleryBox } from './components/GalleryBox';
import { CarouselBox } from './components/CarouselBox';
import { TIKTOK_URL, INSTAGRAM_URL, TELEGRAM_URL } from './constants';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'BraindGyumri';
    src: url('/fonts/BraindGyumri.otf') format('opentype');
  }

  @font-face {
    font-family: 'Monoton';
    src: url('/fonts/Monoton-Regular.ttf') format('truetype');
  }

  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #311442;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  a:hover {
    color: #535bf2;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }

  h1 {
    font-family: 'Monoton';
    font-size: 3.2em;
    line-height: 1.1;

    @media (max-width: 640px) {
      font-size: 2em;
    }
  }

  h2 {
    font-family: 'BraindGyumri';
    font-size: 1.5em;
    margin-top: -0.4em;
    margin-bottom: 1.5em;

    @media (max-width: 640px) {
      font-size: 1.1em;
    }
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <SiteBackgroundImage />
      
      <h1>Aida Prime</h1>
      <h2>Art Creator | Gaming & Movies</h2>
      <CarouselBox />
      <GalleryBox />
      <SocialsBlock>
        <SocialLink icon="/socials/tiktok.svg" alt="TikTok" href={TIKTOK_URL} />
        <SocialLink icon="/socials/instagram.svg" alt="Instagram" href={INSTAGRAM_URL} />
        <SocialLink icon="/socials/telegram.svg" alt="Telegram" href={TELEGRAM_URL} />
      </SocialsBlock>
      <div>
      </div>
    </>
  )
}

export default App
