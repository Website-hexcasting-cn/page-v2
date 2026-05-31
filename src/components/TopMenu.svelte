<script lang="ts">
  import { t, locale, isLoading } from 'svelte-i18n'
  import { onMount } from 'svelte'
  import HexcastingLogo from '../assets/Img/HexcastingLogo.png'
  import menuConfig from '../config/TopMenuConfig.json'
  
  let menuOpen = false
  let langMenuOpen = false
  let currentPath = '/'
  
  onMount(() => {
    currentPath = window.location.pathname
  })
  
  function toggleMenu() {
    menuOpen = !menuOpen
  }
  
  function toggleLangMenu() {
    langMenuOpen = !langMenuOpen
  }
  
  function switchLanguage(lang: string) {
    locale.set(lang)
    langMenuOpen = false
  }
</script>

{#if !$isLoading}
  <nav class="TopMenu">
    <div class="MenuContainer">
      <div class="Logo">
        <a href="/">
          <img src={HexcastingLogo} alt="Hexcasting" class="LogoImage" />
        </a>
      </div>
      
      <button class="MenuToggle" on:click={toggleMenu} aria-label="Toggle menu">
        <span class="MenuIcon"></span>
      </button>
      
      <div class="MenuItems" class:open={menuOpen}>
        {#each menuConfig.menu as item}
          {#if item.path !== currentPath}
            <a href={item.path} class="MenuItem">{$t(`menu.${item.id}`)}</a>
          {/if}
        {/each}
        
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
      </div>
    </div>
  </nav>
{/if}

<style>
  :root {
    --TopMenuHeight: 30px;
    --TopMenuLogoHeight: calc(var(--TopMenuHeight) * 0.8);
    --TopMenuLogoHoverScale: 1.05;
    --TopMenuItemGap: calc(var(--TopMenuHeight) * 0.5);
    --TopMenuItemFontSize: 1rem;
    --TopMenuItemHoverColor: #9775fa;
    --TopMenuLangButtonPadding: calc(var(--TopMenuHeight) * 0.1) calc(var(--TopMenuHeight) * 0.3);
    --TopMenuLangButtonBorderRadius: calc(var(--TopMenuHeight) * 0.1);
    --TopMenuLangButtonFontSize: 0.9rem;
    --TopMenuDropdownArrowFontSize: 0.7rem;
    --TopMenuLangOptionPadding: calc(var(--TopMenuHeight) * 0.17) calc(var(--TopMenuHeight) * 0.4);
    --TopMenuMobileBreakpoint: 1024px;
    --TopMenuMobilePadding: calc(var(--TopMenuHeight) * 0.5);
    --TopMenuMobileGap: calc(var(--TopMenuHeight) * 0.5);
    --TopMenuTransitionDuration: 0.3s;
  }
  
  .TopMenu {
    background-color: var(--ThemeColorTwo);
    width: 100%;
  }
  
  .MenuContainer {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 calc(var(--TopMenuHeight) * 0.33);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--TopMenuHeight);
  }
  
  .Logo a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  
  .LogoImage {
    height: var(--TopMenuLogoHeight);
    width: auto;
    transition: transform var(--TopMenuTransitionDuration);
  }
  
  .LogoImage:hover {
    transform: scale(var(--TopMenuLogoHoverScale));
  }
  
  .MenuToggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
  }
  
  .MenuIcon {
    display: block;
    width: 25px;
    height: 3px;
    background-color: var(--ThemeColorThree);
    position: relative;
  }
  
  .MenuIcon::before,
  .MenuIcon::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 3px;
    background-color: var(--ThemeColorThree);
    left: 0;
  }
  
  .MenuIcon::before {
    top: -8px;
  }
  
  .MenuIcon::after {
    top: 8px;
  }
  
  .MenuItems {
    display: flex;
    align-items: center;
    gap: var(--TopMenuItemGap);
  }
  
  .MenuItem {
    color: var(--ThemeColorThree);
    text-decoration: none;
    font-size: var(--TopMenuItemFontSize);
    transition: color var(--TopMenuTransitionDuration);
    position: relative;
  }
  
  .MenuItem:hover {
    color: var(--TopMenuItemHoverColor);
  }
  
  .MenuItem::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--TopMenuItemHoverColor);
    transition: width var(--TopMenuTransitionDuration);
  }
  
  .MenuItem:hover::after {
    width: 100%;
  }
  
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
    .MenuToggle {
      display: block;
    }
    
    .MenuItems {
      position: absolute;
      top: var(--TopMenuHeight);
      right: calc(var(--TopMenuHeight) * 0.33);
      background-color: var(--ThemeColorTwo);
      flex-direction: column;
      padding: var(--TopMenuMobilePadding);
      gap: var(--TopMenuMobileGap);
      display: none;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
      border-radius: var(--TopMenuLangButtonBorderRadius);
      width: max-content;
      z-index: 1000;
    }
    
    .MenuItems.open {
      display: flex;
    }
    
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
