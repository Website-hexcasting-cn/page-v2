<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { t } from 'svelte-i18n'

  export let copySuccess: boolean = false

  const dispatch = createEventDispatcher()
</script>

<div class="FloatingToolbar">
  <button class="ToolButton" on:click={() => dispatch('copy')} title={$t('patternCanvas.copy')}>
    <span class="Icon">{copySuccess ? '✅' : '📋'}</span>
  </button>
  <button class="ToolButton" on:click={() => dispatch('export')} title={$t('patternCanvas.export')}>
    <span class="Icon">📄</span>
  </button>
  <button class="ToolButton" on:click={() => dispatch('clear')} title={$t('patternCanvas.clearPatterns')}>
    <span class="Icon">🗑️</span>
  </button>
  <button class="ToolButton" on:click={() => dispatch('toggleSettings')} title={$t('patternCanvas.settings')}>
    <span class="Icon">⚙️</span>
  </button>
</div>

<style>
  .FloatingToolbar {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
    z-index: 1001;
    background: rgba(20, 20, 30, 0.9);
    padding: 10px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .ToolButton {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, var(--ThemeColorOne), var(--ThemeColorTwo));
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .ToolButton:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }

  .ToolButton .Icon {
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
    .FloatingToolbar {
      top: 10px;
      right: 10px;
      padding: 8px;
    }

    .ToolButton {
      width: 40px;
      height: 40px;
    }
  }
</style>
