<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Prism from 'prismjs'
  import 'prismjs/components/prism-json'
  import 'prismjs/themes/prism-tomorrow.css'

  export let text: string = ''
  export let placeholder: string = ''

  const dispatch = createEventDispatcher()

  export function getValue(): string {
    return text
  }

  $: highlightedJson = (() => {
    const displayText = text || ''
    if (!displayText) return ''
    try {
      return Prism.highlight(displayText, Prism.languages.json, 'json')
    } catch {
      return displayText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
  })()

  function handleInput(e: InputEvent) {
    const target = e.target as HTMLTextAreaElement
    text = target.value
    dispatch('input', e)
  }
</script>

<div class="JsonEditorWrapper">
  <div class="JsonEditorContent">
    <pre class="JsonHighlight" aria-hidden="true"><code>{@html highlightedJson}</code></pre>
    <textarea
      class="JsonEditor"
      {placeholder}
      bind:value={text}
      on:input={handleInput}
      spellcheck="false"
    ></textarea>
  </div>
</div>

<style>
  .JsonEditorWrapper {
    position: relative;
    width: 100%;
    height: 450px;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
  }

  .JsonEditorWrapper:focus-within {
    border-color: var(--ThemeColorOne);
  }

  .JsonEditorContent {
    position: relative;
    min-height: 100%;
  }

  .JsonHighlight {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 15px;
    color: white;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
    pointer-events: none;
    z-index: 1;
  }

  .JsonHighlight code {
    font-family: inherit;
    font-size: inherit;
    background: transparent !important;
  }

  .JsonEditor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 15px;
    background: transparent;
    color: transparent;
    caret-color: var(--ThemeColorThree);
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
    border: none;
    resize: none;
    outline: none;
    z-index: 2;
  }

  .JsonEditor::placeholder {
    color: white;
    opacity: 0.6;
  }

  .JsonEditor::selection {
    background-color: rgba(100, 150, 255, 0.4);
    color: white;
  }
</style>
