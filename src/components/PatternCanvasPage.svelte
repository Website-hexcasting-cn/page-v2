<script lang="ts">
  import { t, isLoading } from 'svelte-i18n'
  import PatternCanvas from './PatternCanvas.svelte'
  import FloatingToolbar from './PatternCanvas/FloatingToolbar.svelte'
  import SettingsPanel from './PatternCanvas/SettingsPanel.svelte'

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
    <FloatingToolbar
      {copySuccess}
      on:copy={handleCopy}
      on:export={handleExport}
      on:clear={handleClear}
      on:toggleSettings={() => showSettings = !showSettings}
    />

    {#if showSettings}
      <SettingsPanel bind:config on:close={() => showSettings = false} />
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

  .CanvasContainer {
    flex: 1;
    width: 100%;
    min-height: 0;
  }
</style>
