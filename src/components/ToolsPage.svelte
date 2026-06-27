<script lang="ts">
  import { t, isLoading } from 'svelte-i18n'
  import PatternCanvasPage from './PatternCanvasPage.svelte'
  import ToolCard from './Tools/ToolCard.svelte'

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
        <ToolCard
          title={$t('patternCanvas.title')}
          description={$t('patternCanvas.description')}
          icon="🎨"
          variant="pattern"
          linkText={$t('tools.openLink')}
          on:click={openPatternCanvas}
        />

        <ToolCard
          title={$t('nbtEditor.title')}
          description={$t('nbtEditor.description')}
          icon="📝"
          variant="nbt"
          linkText={$t('tools.openLink')}
          on:click={openNbtEditor}
        />
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
