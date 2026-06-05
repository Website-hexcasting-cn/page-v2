<script lang="ts">
  import LogoBackgroundImage from './assets/Img/LogoBackgroundImage.webp'
  import { t, isLoading, locale, json } from 'svelte-i18n'
  import { GetRandom } from './utils/Random'
  import { onMount } from 'svelte'
  import TopMenu from './components/TopMenu.svelte'
  import ToolsPage from './components/ToolsPage.svelte'
  import './i18n'
  
  let randomDescription = ''
  let currentRoute = '/'
  
  onMount(() => {
    currentRoute = window.location.pathname
  })
  
  $: if (!$isLoading && $locale) {
    const descriptions = $json('description') as string[]
    if (Array.isArray(descriptions) && descriptions.length > 0) {
      randomDescription = descriptions[GetRandom(0, descriptions.length - 1)]
    }
  }
</script>

<main>
  <TopMenu />
  {#if !$isLoading}
    {#if currentRoute === '/tools'}
      <ToolsPage />
    {:else}
      <div class="IntroductionInformation">
        <img class="LogoBackgroundImage" src={LogoBackgroundImage} alt="LogoBackgroundImage" />
        <h1 class="Title">{$t('welcome')}</h1>
        <p class="Description">{randomDescription}</p>
      </div>
    {/if}
  {/if}
</main>

<style>
  .IntroductionInformation{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(0%, 30vh);
}

@media screen and (max-width: 767px) {
  .IntroductionInformation{
    transform: translate(0, 0);
  }
  .IntroductionInformation .Description{
    display: none;
  }
}
.IntroductionInformation .Title{
  color: var(--ThemeColorThree);
}
.IntroductionInformation .Description{
  color: var(--ThemeColorThree);
  text-align: center;
  padding: 0 20px;
  margin-top: 20px;
  font-size: clamp(14px, 2.5vw, 24px);
  max-width: 80vw;
}
.LogoBackgroundImage{
  width: 80vw;
  height: auto;
  aspect-ratio: attr(width) / attr(height);
}

@media screen and (max-width: 768px) {
  .IntroductionInformation .LogoBackgroundImage{
    width: 100vw;
  }
}

@media screen and (min-width: 1024px) {
  .IntroductionInformation .LogoBackgroundImage{
    width: auto;
    max-width: 100%;
  }
}
</style>