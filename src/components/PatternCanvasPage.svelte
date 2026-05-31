<script lang="ts">
  import { t, isLoading } from 'svelte-i18n'
  import PatternCanvas from './PatternCanvas.svelte'
  import { onMount } from 'svelte'

  let patternCanvasRef: PatternCanvas
  let patterns: [number, number, string][] = []

  let config = {
    Point: {
      Color: '#7fffe6',
      MinColor: '#66ccc8',
      Size: 5
    },
    Grid: {
      Spacing: 80
    },
    Line: {
      TailColor: '#64c8ff',
      HeadColor: '#fecbe6',
      Width: 5,
      StrokeWidth: 2,
      UseGradient: true
    },
    Mouse: {
      Range: 1.5,
      FadeRate: 0.7
    },
    Mode: {
      FreePainting: false,
      ShowNearMouse: true,
      FadeWithDistance: true,
      AllowOverlap: false,
      EnableZappy: false,
      ZappyVariance: 2.5,
      DragToDraw: true
    }
  }

  let showSettings = false

  function handleReady(instance: any) {
    console.log('PatternCanvas ready:', instance)
  }

  function handleGetPatterns() {
    if (patternCanvasRef) {
      patterns = patternCanvasRef.getPatterns()
      console.log('Patterns:', patterns)
    }
  }

  function handleClearPatterns() {
    if (patternCanvasRef) {
      patternCanvasRef.clearPatterns()
      patterns = []
    }
  }

  function toggleZappy() {
    config = {
      ...config,
      Mode: {
        ...config.Mode,
        EnableZappy: !config.Mode?.EnableZappy
      }
    }
  }

  function toggleOverlap() {
    config = {
      ...config,
      Mode: {
        ...config.Mode,
        AllowOverlap: !config.Mode?.AllowOverlap
      }
    }
  }

  function toggleDragMode() {
    config = {
      ...config,
      Mode: {
        ...config.Mode,
        DragToDraw: !config.Mode?.DragToDraw
      }
    }
  }
</script>

{#if !$isLoading}
  <div class="PatternCanvasPage">
    <div class="PageHeader">
      <h1 class="PageTitle">{$t('patternCanvas.title')}</h1>
      <p class="PageDescription">{$t('patternCanvas.description')}</p>
    </div>

    <div class="Controls">
      <button class="ControlButton" on:click={handleGetPatterns}>
        {$t('patternCanvas.getPatterns')}
      </button>
      <button class="ControlButton" on:click={handleClearPatterns}>
        {$t('patternCanvas.clearPatterns')}
      </button>
      <button class="ControlButton" on:click={() => showSettings = !showSettings}>
        {$t('patternCanvas.settings')}
      </button>
    </div>

    {#if showSettings}
      <div class="SettingsPanel">
        <div class="SettingItem">
          <label>
            <input type="checkbox" checked={config.Mode?.EnableZappy} on:change={toggleZappy} />
            {$t('patternCanvas.enableZappy')}
          </label>
        </div>
        <div class="SettingItem">
          <label>
            <input type="checkbox" checked={config.Mode?.AllowOverlap} on:change={toggleOverlap} />
            {$t('patternCanvas.allowOverlap')}
          </label>
        </div>
        <div class="SettingItem">
          <label>
            <input type="checkbox" checked={config.Mode?.DragToDraw} on:change={toggleDragMode} />
            {$t('patternCanvas.dragToDraw')}
          </label>
        </div>
        <div class="SettingItem">
          <label>
            {$t('patternCanvas.gridSpacing')}: {config.Grid?.Spacing}
            <input type="range" min="40" max="120" step="10" bind:value={config.Grid.Spacing} />
          </label>
        </div>
      </div>
    {/if}

    <div class="CanvasContainer">
      <PatternCanvas bind:this={patternCanvasRef} {config} on:ready={handleReady} />
    </div>

    {#if patterns.length > 0}
      <div class="PatternsList">
        <h3>{$t('patternCanvas.patternsList')}</h3>
        <ul>
          {#each patterns as pattern, i}
            <li>
              {$t('patternCanvas.pattern')} {i + 1}: ({pattern[0].toFixed(1)}, {pattern[1].toFixed(1)}) - {pattern[2]}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
{/if}

<style>
  .PatternCanvasPage {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
    box-sizing: border-box;
  }

  .PageHeader {
    text-align: center;
  }

  .PageTitle {
    font-size: 2rem;
    color: var(--ThemeColorThree);
    margin-bottom: 10px;
  }

  .PageDescription {
    font-size: 1rem;
    color: var(--ThemeColorThree);
    opacity: 0.8;
  }

  .Controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .ControlButton {
    padding: 10px 20px;
    background: linear-gradient(135deg, var(--ThemeColorOne), var(--ThemeColorTwo));
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .ControlButton:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .SettingsPanel {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .SettingItem {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .SettingItem label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--ThemeColorThree);
    cursor: pointer;
  }

  .SettingItem input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .SettingItem input[type="range"] {
    width: 100px;
    cursor: pointer;
  }

  .CanvasContainer {
    flex: 1;
    min-height: 400px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }

  .PatternsList {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 15px;
    max-height: 150px;
    overflow-y: auto;
  }

  .PatternsList h3 {
    color: var(--ThemeColorThree);
    margin: 0 0 10px 0;
  }

  .PatternsList ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .PatternsList li {
    color: var(--ThemeColorThree);
    opacity: 0.8;
    padding: 5px 0;
    font-family: monospace;
  }

  @media screen and (max-width: 768px) {
    .PatternCanvasPage {
      padding: 15px;
    }

    .PageTitle {
      font-size: 1.5rem;
    }

    .Controls {
      flex-direction: column;
      align-items: stretch;
    }

    .ControlButton {
      width: 100%;
    }

    .SettingsPanel {
      flex-direction: column;
    }

    .CanvasContainer {
      min-height: 300px;
    }
  }
</style>
