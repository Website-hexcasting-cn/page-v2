<script lang="ts">
  import { locale } from 'svelte-i18n'

  export let langMenuOpen: boolean = false

  function toggleLangMenu() {
    langMenuOpen = !langMenuOpen
  }

  function switchLanguage(lang: string) {
    locale.set(lang)
    langMenuOpen = false
  }
</script>

<div class="LanguageDropdown">
  <button
    class="LangToggle"
    on:click={toggleLangMenu}
    aria-label="Language selector"
  >
    {#if $locale === 'zh'}
      中文
    {:else}
      EN
    {/if}
    <span class="DropdownArrow" class:open={langMenuOpen}>▼</span>
  </button>

  {#if langMenuOpen}
    <div class="LanguageOptions">
      <button
        class="LangOption"
        class:active={$locale === 'zh'}
        on:click={() => switchLanguage('zh')}
      >
        中文
      </button>
      <button
        class="LangOption"
        class:active={$locale === 'en'}
        on:click={() => switchLanguage('en')}
      >
        EN
      </button>
    </div>
  {/if}
</div>

<style>
  .LanguageDropdown {
    position: relative;
    margin-left: 20px;
  }

  .LangToggle {
    background: none;
    border: 1px solid var(--ThemeColorThree);
    color: var(--ThemeColorThree);
    padding: var(--TopMenuLangButtonPadding);
    border-radius: var(--TopMenuLangButtonBorderRadius);
    cursor: pointer;
    transition: all var(--TopMenuTransitionDuration);
    font-size: var(--TopMenuLangButtonFontSize);
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .LangToggle:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .DropdownArrow {
    font-size: var(--TopMenuDropdownArrowFontSize);
    transition: transform var(--TopMenuTransitionDuration);
  }

  .DropdownArrow.open {
    transform: rotate(180deg);
  }

  .LanguageOptions {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 5px;
    background-color: var(--ThemeColorTwo);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--TopMenuLangButtonBorderRadius);
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .LangOption {
    display: block;
    width: 100%;
    background: none;
    border: none;
    color: var(--ThemeColorThree);
    padding: var(--TopMenuLangOptionPadding);
    cursor: pointer;
    transition: all var(--TopMenuTransitionDuration);
    font-size: var(--TopMenuLangButtonFontSize);
    text-align: left;
  }

  .LangOption:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .LangOption.active {
    background-color: var(--TopMenuItemHoverColor);
  }

  @media screen and (max-width: 768px) {
    .LanguageDropdown {
      margin-left: 0;
      width: 100%;
    }

    .LangToggle {
      width: 100%;
      justify-content: center;
    }

    .LanguageOptions {
      position: static;
      margin-top: 10px;
      width: 100%;
    }
  }
</style>
