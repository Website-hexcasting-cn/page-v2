<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'

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

  interface PatternCanvasInstance {
    Function: {
      SetCanvasWidthAndHeight: (Width?: number, Height?: number) => void
      Rendering: (HighlightPoint?: { x: number; y: number }) => void
      GetCanvasElement: () => HTMLCanvasElement
      SetCanvasElement: (NewCanvasElement: HTMLCanvasElement) => void
      SetConfig: (NewConfig: PatternCanvasConfig) => void
      VirtualToReal: (Point: { x: number; y: number }) => { x: number; y: number }
      RealToVirtual: (RealX: number, RealY: number) => { x: number; y: number }
      GetGridRange: () => { StartI: number; EndI: number; StartJ: number; EndJ: number }
      IsAdjacentPoint: (MouseMovePoint: { x: number; y: number }) => boolean
      IsMouseOverPoint: (e: MouseEvent | TouchEvent) => { x: number; y: number } | null
      IsStrokeOverlap: (FromPoint: { x: number; y: number }, ToPoint: { x: number; y: number }) => boolean
      GetHexPath: (FromPoint: { x: number; y: number }, ToPoint: { x: number; y: number }) => { x: number; y: number }[]
      CalculateRelativeDirectionCode: (FromPoint: { x: number; y: number }, ToPoint: { x: number; y: number }, PreviousDirectionIndex: number) => { DirectionCode: string; CurrentDirectionIndex: number }
      VirtualToPatternList: () => [number, number, string][]
      Destroy: () => void
    }
    Modifiable: {
      Config: PatternCanvasConfig
      VirtualCanvas: { X: number; Y: number; Patterns: { StrokeOrder: { x: number; y: number }[]; StartingPointX: number; StartingPointY: number }[] }
      Path: { x: number; y: number }[]
    }
    ReadOnly: {
      CanvasElement: HTMLCanvasElement
    }
  }

  export let config: PatternCanvasConfig = {}
  export let width: number | undefined = undefined
  export let height: number | undefined = undefined

  const dispatch = createEventDispatcher()

  let canvas: HTMLCanvasElement
  let instance: PatternCanvasInstance | null = null
  let CreatePatternCanvas: (canvas: HTMLCanvasElement, config: PatternCanvasConfig) => PatternCanvasInstance

  onMount(async () => {
    const module = await import('.src/lib/PatternDrawing/PatternDrawing.js')
    CreatePatternCanvas = module.CreatePatternCanvas

    if (canvas) {
      instance = CreatePatternCanvas(canvas, config)
      dispatch('ready', instance)

      if (width !== undefined || height !== undefined) {
        instance.Function.SetCanvasWidthAndHeight(width, height)
      }
    }
  })

  onDestroy(() => {
    if (instance) {
      instance.Function.Destroy()
    }
  })

  $: if (instance && config) {
    instance.Function.SetConfig(config)
  }

  $: if (instance && (width !== undefined || height !== undefined)) {
    instance.Function.SetCanvasWidthAndHeight(width, height)
  }

  export function getInstance(): PatternCanvasInstance | null {
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

<canvas bind:this={canvas} class="pattern-canvas"></canvas>

<style>
  .pattern-canvas {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none;
  }
</style>
