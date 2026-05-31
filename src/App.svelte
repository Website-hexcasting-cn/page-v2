<script lang="ts">
  import LogoBackgroundImage from './assets/Img/LogoBackgroundImage.webp'
  import { t, isLoading, locale, json } from 'svelte-i18n'
  import { GetRandom } from './utils/Random'
  import TopMenu from './components/TopMenu.svelte'
  import './i18n'
  
  let randomDescription = ''
  
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
    <div class="IntroductionInformation">
      <img class="LogoBackgroundImage" src={LogoBackgroundImage} alt="LogoBackgroundImage" />
      <h1 class="Title">{$t('welcome')}</h1>
      <p class="Description">{randomDescription}</p>
    </div>
  {/if}
</main>