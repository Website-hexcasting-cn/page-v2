<script lang="ts">
  import { t } from 'svelte-i18n'
  import { nbtStringToJson, jsonToNbtString } from '../lib/HexparseNbt-Str/NBTSTR.js'
  import type { NbtTag } from '../lib/HexparseNbt-Str/NBTSTR.d.ts'
  import ErrorMessage from './Nbt/ErrorMessage.svelte'
  import EditorSection from './Nbt/EditorSection.svelte'
  import JsonEditor from './Nbt/JsonEditor.svelte'

  let nbtInput = ''
  let nbtData: NbtTag | null = null
  let nbtOutput = ''
  let error = ''
  let isConverting = false
  let jsonEditorText = ''

  let jsonEditorRef: JsonEditor

  async function convertNbtToJson() {
    if (!nbtInput.trim()) {
      error = $t('nbtEditor.errors.emptyInput')
      return
    }

    error = ''
    isConverting = true

    try {
      const nbtStr = nbtInput.trim()
      nbtData = await nbtStringToJson(nbtStr)
      jsonEditorText = JSON.stringify(nbtData, null, 2)
    } catch (e) {
      error = $t('nbtEditor.errors.parseError') + ': ' + (e instanceof Error ? e.message : String(e))
      nbtData = null
      jsonEditorText = ''
    } finally {
      isConverting = false
    }
  }

  async function convertJsonToNbt() {
    if (!nbtData) {
      error = $t('nbtEditor.errors.emptyJson')
      return
    }

    error = ''
    isConverting = true

    try {
      nbtOutput = await jsonToNbtString(nbtData)
    } catch (e) {
      error = $t('nbtEditor.errors.jsonParseError') + ': ' + (e instanceof Error ? e.message : String(e))
    } finally {
      isConverting = false
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      // 可以添加一个提示，但为了简单起见，这里省略
    }).catch(err => {
      error = $t('nbtEditor.errors.copyError') + ': ' + err.message
    })
  }

  function clearAll() {
    nbtInput = ''
    nbtData = null
    nbtOutput = ''
    jsonEditorText = ''
    error = ''
  }

  function handleJsonInput(e: InputEvent) {
    const target = e.target as HTMLTextAreaElement
    jsonEditorText = target.value
    try {
      nbtData = JSON.parse(target.value)
    } catch {
      // Invalid JSON, ignore
    }
  }
</script>

<div class="NbtEditor">
  <div class="EditorHeader">
    <h1 class="EditorTitle">{$t('nbtEditor.title')}</h1>
    <p class="EditorDescription">{$t('nbtEditor.description')}</p>
  </div>

  <ErrorMessage message={error} />

  <div class="EditorContainer">
    <EditorSection title={$t('nbtEditor.inputSection')}>
      <button slot="header" class="ClearButton" on:click={clearAll}>{$t('nbtEditor.clearAll')}</button>
      <textarea
        class="NbtInput"
        bind:value={nbtInput}
        placeholder={$t('nbtEditor.inputPlaceholder')}
        rows="6"
      ></textarea>
      <button
        class="ConvertButton"
        on:click={convertNbtToJson}
        disabled={isConverting}
      >
        {isConverting ? $t('nbtEditor.converting') : $t('nbtEditor.convertToJson')}
      </button>
    </EditorSection>

    <EditorSection title={$t('nbtEditor.jsonSection')}>
      <button slot="header" class="CopyButton" on:click={() => copyToClipboard(jsonEditorText)} disabled={!jsonEditorText}>
        {$t('nbtEditor.copy')}
      </button>
      <JsonEditor
        bind:this={jsonEditorRef}
        bind:text={jsonEditorText}
        on:input={handleJsonInput}
        placeholder={$t('nbtEditor.jsonPlaceholder')}
      />
      <button
        class="ConvertButton"
        on:click={convertJsonToNbt}
        disabled={isConverting || !nbtData}
      >
        {isConverting ? $t('nbtEditor.converting') : $t('nbtEditor.convertToNbt')}
      </button>
    </EditorSection>

    <EditorSection title={$t('nbtEditor.outputSection')}>
      <button slot="header" class="CopyButton" on:click={() => copyToClipboard(nbtOutput)} disabled={!nbtOutput}>
        {$t('nbtEditor.copy')}
      </button>
      <textarea
        class="NbtOutput"
        value={nbtOutput}
        readonly
        placeholder={$t('nbtEditor.outputPlaceholder')}
        rows="6"
      ></textarea>
    </EditorSection>
  </div>
</div>

<style>
  .NbtEditor {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .EditorHeader {
    text-align: center;
    margin-bottom: 40px;
  }

  .EditorTitle {
    font-size: 2.5rem;
    color: var(--ThemeColorThree);
    margin-bottom: 10px;
  }

  .EditorDescription {
    font-size: 1.1rem;
    color: var(--ThemeColorThree);
    opacity: 0.8;
  }

  .EditorContainer {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .NbtInput,
  .NbtOutput {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 15px;
    color: var(--ThemeColorThree);
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.9rem;
    resize: vertical;
    transition: border-color 0.3s ease;
  }

  .NbtInput::placeholder,
  .NbtOutput::placeholder {
    color: white;
    opacity: 0.6;
  }

  .NbtInput:focus,
  .NbtOutput:focus {
    outline: none;
    border-color: var(--ThemeColorOne);
  }

  .NbtOutput {
    background-color: rgba(0, 0, 0, 0.4);
    cursor: default;
  }

  .ConvertButton,
  .CopyButton,
  .ClearButton {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    font-weight: 500;
  }

  .ConvertButton {
    width: 100%;
    margin-top: 15px;
    background: linear-gradient(135deg, var(--ThemeColorOne), var(--ThemeColorTwo));
    color: white;
  }

  .ConvertButton:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .ConvertButton:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .CopyButton,
  .ClearButton {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--ThemeColorThree);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .CopyButton:hover:not(:disabled),
  .ClearButton:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .CopyButton:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media screen and (max-width: 768px) {
    .NbtEditor {
      padding: 20px 15px;
    }

    .EditorTitle {
      font-size: 2rem;
    }

    .EditorDescription {
      font-size: 1rem;
    }

    .NbtInput,
    .NbtOutput {
      font-size: 0.85rem;
      padding: 12px;
    }

    .ConvertButton,
    .CopyButton,
    .ClearButton {
      padding: 8px 16px;
      font-size: 0.9rem;
    }
  }
</style>
