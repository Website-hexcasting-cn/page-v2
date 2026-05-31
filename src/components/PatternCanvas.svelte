<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

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

  export let config: PatternCanvasConfig = {}

  let canvas: HTMLCanvasElement
  let container: HTMLDivElement
  let instance: any = null
  let CreatePatternCanvas: any
  let resizeObserver: ResizeObserver

  onMount(async () => {
    const module = await import('../lib/PatternDrawing/PatternDrawing.js')
    CreatePatternCanvas = module.CreatePatternCanvas

    if (canvas && container) {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      instance = CreatePatternCanvas(canvas, config)

      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width
          const height = entry.contentRect.height
          
          canvas.width = width
          canvas.height = height
          
          if (instance) {
            instance.Function.SetCanvasWidthAndHeight(width, height)
          }
        }
      })
      
      resizeObserver.observe(container)
    }
  })

  onDestroy(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
    }
    if (instance) {
      instance.Function.Destroy()
    }
  })

  $: if (instance && config) {
    instance.Function.SetConfig(config)
  }

  export function getInstance() {
    return instance
  }

  export function getPatterns(): [number, number, string][] {
    if (!instance) return []
    return instance.Function.VirtualToPatternList()
  }

  export function clearPatterns() {
    if (!instance) return
    instance.Modifiable.VirtualCanvas.Patterns = []
    instance.Function.Rendering()
  }

  export function setConfig(newConfig: PatternCanvasConfig) {
    config = newConfig
  }
</script>

<div class="canvas-container" bind:this={container}>
  <canvas bind:this={canvas} class="pattern-canvas"></canvas>
</div>

<style>
  .canvas-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .pattern-canvas {
    display: block;
    touch-action: none;
  }
</style>
