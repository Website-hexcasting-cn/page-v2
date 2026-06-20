<script lang="ts">
  import { t, isLoading } from 'svelte-i18n'
  import PatternCanvasPage from './PatternCanvasPage.svelte'

  let showPatternCanvas = false

  function openPatternCanvas() {
    window.location.href = '/tool/pattern-canvas'
  }

  function openNbtEditor() {
    window.location.href = '/tool/nbt-editor'
  }

  function closePatternCanvas() {
    showPatternCanvas = false
  }
</script>

{#if !$isLoading}
  {#if showPatternCanvas}
    <PatternCanvasPage />
    <button class="ClosePatternCanvas" on:click={closePatternCanvas} title="Close">
      <span>✕</span>
    </button>
  {:else}
    <div class="ToolsPage">
      <h1 class="PageTitle">{$t('tools.title')}</h1>
      <p class="PageDescription">{$t('tools.description')}</p>

      <div class="ToolsGrid">
        <div class="ToolCard PatternToolCard" on:click={openPatternCanvas} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && openPatternCanvas()}>
          <div class="ToolCardHeader">
            <div class="ToolIconPlaceholder">
              <span class="ToolIconText">🎨</span>
            </div>
            <h2 class="ToolName">{$t('patternCanvas.title')}</h2>
          </div>
          <p class="ToolDescription">{$t('patternCanvas.description')}</p>
          <div class="ToolFooter">
            <span class="OpenLink">{$t('tools.openLink')}</span>
            <span class="ExternalIcon">→</span>
          </div>
        </div>

        <div class="ToolCard NbtToolCard" on:click={openNbtEditor} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && openNbtEditor()}>
          <div class="ToolCardHeader">
            <div class="ToolIconPlaceholder">
              <span class="ToolIconText">📝</span>
            </div>
            <h2 class="ToolName">{$t('nbtEditor.title')}</h2>
          </div>
          <p class="ToolDescription">{$t('nbtEditor.description')}</p>
          <div class="ToolFooter">
            <span class="OpenLink">{$t('tools.openLink')}</span>
            <span class="ExternalIcon">→</span>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/if}

<style>
  .ClosePatternCanvas {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 44px;
    height: 44px;
    background: rgba(20, 20, 30, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: var(--ThemeColorThree);
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1003;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .ClosePatternCanvas:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  .ToolsPage {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .PageTitle {
    font-size: 2.5rem;
    color: var(--ThemeColorThree);
    text-align: center;
    margin-bottom: 10px;
  }

  .PageDescription {
    font-size: 1.1rem;
    color: var(--ThemeColorThree);
    text-align: center;
    margin-bottom: 40px;
    opacity: 0.8;
  }

  .ToolsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .ToolCard {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .PatternToolCard {
    background: linear-gradient(135deg, rgba(127, 255, 230, 0.1), rgba(254, 203, 230, 0.1));
    border-color: rgba(127, 255, 230, 0.3);
  }

  .NbtToolCard {
    background: linear-gradient(135deg, rgba(255, 200, 100, 0.1), rgba(200, 150, 255, 0.1));
    border-color: rgba(255, 200, 100, 0.3);
  }

  .ToolCard:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: var(--ThemeColorOne);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  .PatternToolCard:hover {
    background: linear-gradient(135deg, rgba(127, 255, 230, 0.2), rgba(254, 203, 230, 0.2));
  }

  .NbtToolCard:hover {
    background: linear-gradient(135deg, rgba(255, 200, 100, 0.2), rgba(200, 150, 255, 0.2));
  }

  .ToolCard:focus {
    outline: 2px solid var(--ThemeColorOne);
    outline-offset: 2px;
  }

  .ToolCardHeader {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .ToolIconPlaceholder {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--ThemeColorOne), var(--ThemeColorTwo));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ToolIconText {
    font-size: 24px;
  }

  .ToolName {
    font-size: 1.3rem;
    color: var(--ThemeColorThree);
    margin: 0;
    flex: 1;
  }

  .ToolDescription {
    font-size: 0.95rem;
    color: var(--ThemeColorThree);
    opacity: 0.7;
    margin: 0;
    line-height: 1.5;
  }

  .ToolFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .OpenLink {
    font-size: 0.9rem;
    color: var(--ThemeColorThree);
    font-weight: 500;
  }

  .ExternalIcon {
    font-size: 1.2rem;
    color: var(--ThemeColorThree);
  }

  @media screen and (max-width: 768px) {
    .ToolsPage {
      padding: 20px 15px;
    }

    .PageTitle {
      font-size: 2rem;
    }

    .PageDescription {
      font-size: 1rem;
      margin-bottom: 30px;
    }

    .ToolsGrid {
      grid-template-columns: 1fr;
      gap: 15px;
    }

    .ClosePatternCanvas {
      top: 10px;
      left: 10px;
      width: 40px;
      height: 40px;
    }
  }
</style>
