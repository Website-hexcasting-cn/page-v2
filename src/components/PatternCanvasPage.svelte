<script lang="ts">
  import { t, isLoading } from 'svelte-i18n'
  import PatternCanvas from './PatternCanvas.svelte'

  let patternCanvasRef: PatternCanvas
  let patterns: [number, number, string][] = []
  let patternCode = ''
  let patternCount = 0
  let pointCount = 0
  let copySuccess = false

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
      DebugMode: false,
      AllowOverlap: false,
      EnableZappy: false,
      ZappyVariance: 2.5,
      DragToDraw: true
    }
  }

  let showSettings = false

  function updatePatternData() {
    if (patternCanvasRef) {
      patterns = patternCanvasRef.getPatterns()
      patternCode = patterns.map(p => '_' + (p[2] || '')).join(',')
      patternCount = patterns.length
      pointCount = patterns.reduce((sum, p) => sum + (p[2]?.length || 0), 0)
    }
  }

  function handleCopy() {
    updatePatternData()
    if (patternCode) {
      navigator.clipboard.writeText(patternCode).then(() => {
        copySuccess = true
        setTimeout(() => copySuccess = false, 1500)
      })
    }
  }

  function handleExport() {
    updatePatternData()
    if (patternCode) {
      const blob = new Blob([patternCode], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `patterns_${Date.now()}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  function handleClear() {
    if (patternCanvasRef) {
      patternCanvasRef.clearPatterns()
      patterns = []
      patternCode = ''
      patternCount = 0
      pointCount = 0
    }
  }

  $: if (patternCanvasRef) {
    updatePatternData()
  }
</script>

{#if !$isLoading}
  <div class="PatternCanvasPage">
    <div class="FloatingToolbar">
      <button class="ToolButton" on:click={handleCopy} title={$t('patternCanvas.copy')}>
        <span class="Icon">{copySuccess ? '✅' : '📋'}</span>
      </button>
      <button class="ToolButton" on:click={handleExport} title={$t('patternCanvas.export')}>
        <span class="Icon">📄</span>
      </button>
      <button class="ToolButton" on:click={handleClear} title={$t('patternCanvas.clearPatterns')}>
        <span class="Icon">🗑️</span>
      </button>
      <button class="ToolButton" on:click={() => showSettings = !showSettings} title={$t('patternCanvas.settings')}>
        <span class="Icon">⚙️</span>
      </button>
    </div>

    {#if showSettings}
      <div class="FloatingSettingsPanel">
        <div class="SettingsHeader">
          <h3>🎨 {$t('patternCanvas.settings')}</h3>
          <button class="CloseButton" on:click={() => showSettings = false}>✕</button>
        </div>
        <div class="SettingsContent">
          <div class="Section">
            <div class="SectionTitle">{$t('patternCanvas.basicSettings')}</div>
            <div class="ControlRow">
              <label for="pointSize">{$t('patternCanvas.pointSize')}</label>
              <div class="InputGroup">
                <input id="pointSize" type="range" min="2" max="20" step="1" bind:value={config.Point.Size} />
                <input type="number" min="2" max="20" bind:value={config.Point.Size} />
              </div>
            </div>
            <div class="ControlRow">
              <label for="gridSpacing">{$t('patternCanvas.gridSpacing')}</label>
              <div class="InputGroup">
                <input id="gridSpacing" type="range" min="40" max="200" step="10" bind:value={config.Grid.Spacing} />
                <input type="number" min="40" max="200" bind:value={config.Grid.Spacing} />
              </div>
            </div>
            <div class="ControlRow">
              <label for="lineWidth">{$t('patternCanvas.lineWidth')}</label>
              <div class="InputGroup">
                <input id="lineWidth" type="range" min="1" max="20" step="1" bind:value={config.Line.Width} />
                <input type="number" min="1" max="20" bind:value={config.Line.Width} />
              </div>
            </div>
          </div>

          <div class="Section">
            <div class="SectionTitle">{$t('patternCanvas.colorSettings')}</div>
            <div class="ControlRow">
              <label for="pointInnerColor">{$t('patternCanvas.pointInnerColor')}</label>
              <input id="pointInnerColor" type="color" bind:value={config.Point.Color} />
            </div>
            <div class="ControlRow">
              <label for="pointOuterColor">{$t('patternCanvas.pointOuterColor')}</label>
              <input id="pointOuterColor" type="color" bind:value={config.Point.MinColor} />
            </div>
            <div class="ControlRow">
              <label for="lineTailColor">{$t('patternCanvas.lineTailColor')}</label>
              <input id="lineTailColor" type="color" bind:value={config.Line.TailColor} />
            </div>
            <div class="ControlRow">
              <label for="lineHeadColor">{$t('patternCanvas.lineHeadColor')}</label>
              <input id="lineHeadColor" type="color" bind:value={config.Line.HeadColor} />
            </div>
            <div class="ControlRow Checkbox">
              <label>
                <input type="checkbox" bind:checked={config.Line.UseGradient} />
                <span>{$t('patternCanvas.useGradient')}</span>
              </label>
            </div>
          </div>

          <div class="Section">
            <div class="SectionTitle">{$t('patternCanvas.renderMode')}</div>
            <div class="ControlRow Checkbox">
              <label>
                <input type="checkbox" bind:checked={config.Mode.ShowNearMouse} />
                <span>{$t('patternCanvas.showNearMouse')}</span>
              </label>
            </div>
            <div class="ControlRow Checkbox">
              <label>
                <input type="checkbox" bind:checked={config.Mode.FadeWithDistance} />
                <span>{$t('patternCanvas.fadeWithDistance')}</span>
              </label>
            </div>
            <div class="ControlRow Checkbox">
              <label>
                <input type="checkbox" bind:checked={config.Mode.FreePainting} />
                <span>{$t('patternCanvas.freePainting')}</span>
              </label>
            </div>
            <div class="ControlRow Checkbox">
              <label>
                <input type="checkbox" bind:checked={config.Mode.AllowOverlap} />
                <span>{$t('patternCanvas.allowOverlap')}</span>
              </label>
            </div>
            <div class="ControlRow Checkbox">
              <label>
                <input type="checkbox" bind:checked={config.Mode.DragToDraw} />
                <span>{$t('patternCanvas.dragToDraw')}</span>
              </label>
            </div>
            <div class="ControlRow Checkbox">
              <label>
                <input type="checkbox" bind:checked={config.Mode.EnableZappy} />
                <span>{$t('patternCanvas.enableZappy')}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <div class="CanvasContainer">
      <PatternCanvas bind:this={patternCanvasRef} {config} />
    </div>
  </div>
{/if}

<style>
  .PatternCanvasPage {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background: var(--ThemeColorOne);
    display: flex;
    flex-direction: column;
  }

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

  .FloatingSettingsPanel {
    position: fixed;
    top: 80px;
    right: 20px;
    width: 320px;
    max-height: calc(100vh - 100px);
    background: rgba(20, 20, 30, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    z-index: 1002;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    overflow-y: auto;
  }

  .SettingsHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: sticky;
    top: 0;
    background: rgba(20, 20, 30, 0.95);
  }

  .SettingsHeader h3 {
    color: var(--ThemeColorThree);
    margin: 0;
    font-size: 1rem;
  }

  .CloseButton {
    background: none;
    border: none;
    color: var(--ThemeColorThree);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 5px;
    opacity: 0.7;
    transition: opacity 0.3s;
  }

  .CloseButton:hover {
    opacity: 1;
  }

  .SettingsContent {
    padding: 15px;
  }

  .Section {
    margin-bottom: 20px;
  }

  .Section:last-child {
    margin-bottom: 0;
  }

  .SectionTitle {
    color: var(--ThemeColorThree);
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ControlRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    gap: 10px;
  }

  .ControlRow label {
    color: var(--ThemeColorThree);
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  .ControlRow.Checkbox {
    justify-content: flex-start;
  }

  .ControlRow.Checkbox label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .InputGroup {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .InputGroup input[type="range"] {
    width: 80px;
    accent-color: var(--ThemeColorTwo);
  }

  .InputGroup input[type="number"] {
    width: 50px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: var(--ThemeColorThree);
    padding: 4px 6px;
    font-size: 0.8rem;
    text-align: center;
  }

  .ControlRow input[type="color"] {
    width: 40px;
    height: 28px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: transparent;
  }

  .ControlRow input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: var(--ThemeColorOne);
  }

  .CanvasContainer {
    flex: 1;
    width: 100%;
    min-height: 0;
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

    .FloatingSettingsPanel {
      top: 70px;
      right: 10px;
      width: calc(100vw - 20px);
      max-width: 320px;
      max-height: calc(100vh - 90px);
    }
  }
</style>
