<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { t } from 'svelte-i18n'

  interface PatternCanvasConfig {
    Point?: {
      Color?: string
      MinColor?: string
      Size?: number
    }
    Grid?: {
      Spacing?: number
    }
    Line?: {
      TailColor?: string
      HeadColor?: string
      Width?: number
      StrokeWidth?: number
      UseGradient?: boolean
    }
    Mouse?: {
      Range?: number
      FadeRate?: number
    }
    Mode?: {
      FreePainting?: boolean
      ShowNearMouse?: boolean
      FadeWithDistance?: boolean
      AllowOverlap?: boolean
      EnableZappy?: boolean
      ZappyVariance?: number
      DragToDraw?: boolean
    }
  }

  export let config: PatternCanvasConfig

  const dispatch = createEventDispatcher()
</script>

<div class="FloatingSettingsPanel">
  <div class="SettingsHeader">
    <h3>🎨 {$t('patternCanvas.settings')}</h3>
    <button class="CloseButton" on:click={() => dispatch('close')}>✕</button>
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

<style>
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

  @media screen and (max-width: 768px) {
    .FloatingSettingsPanel {
      top: 70px;
      right: 10px;
      width: calc(100vw - 20px);
      max-width: 320px;
      max-height: calc(100vh - 90px);
    }
  }
</style>
