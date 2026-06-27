<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let title: string
  export let description: string
  export let icon: string
  export let variant: 'pattern' | 'nbt' = 'pattern'
  export let linkText: string = 'Open'

  const dispatch = createEventDispatcher()
</script>

<div
  class="ToolCard {variant === 'pattern' ? 'PatternToolCard' : 'NbtToolCard'}"
  on:click={() => dispatch('click')}
  role="button"
  tabindex="0"
  on:keydown={(e) => e.key === 'Enter' && dispatch('click')}
>
  <div class="ToolCardHeader">
    <div class="ToolIconPlaceholder">
      <span class="ToolIconText">{icon}</span>
    </div>
    <h2 class="ToolName">{title}</h2>
  </div>
  <p class="ToolDescription">{description}</p>
  <div class="ToolFooter">
    <span class="OpenLink">{linkText}</span>
    <span class="ExternalIcon">→</span>
  </div>
</div>

<style>
  .ToolCard {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .PatternToolCard {
    background: linear-gradient(135deg, rgba(127, 255, 230, 0.1), rgba(254, 203, 230, 0.1));
    border-color: rgba(127, 255, 230, 0.3);
  }

  .NbtToolCard {
    background: linear-gradient(135deg, rgba(255, 200, 100, 0.1), rgba(200, 150, 255, 0.1));
    border-color: rgba(255, 200, 100, 0.3);
  }

  .ToolCard:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: var(--ThemeColorOne);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  .PatternToolCard:hover {
    background: linear-gradient(135deg, rgba(127, 255, 230, 0.2), rgba(254, 203, 230, 0.2));
  }

  .NbtToolCard:hover {
    background: linear-gradient(135deg, rgba(255, 200, 100, 0.2), rgba(200, 150, 255, 0.2));
  }

  .ToolCard:focus {
    outline: 2px solid var(--ThemeColorOne);
    outline-offset: 2px;
  }

  .ToolCardHeader {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .ToolIconPlaceholder {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--ThemeColorOne), var(--ThemeColorTwo));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ToolIconText {
    font-size: 24px;
  }

  .ToolName {
    font-size: 1.3rem;
    color: var(--ThemeColorThree);
    margin: 0;
    flex: 1;
  }

  .ToolDescription {
    font-size: 0.95rem;
    color: var(--ThemeColorThree);
    opacity: 0.7;
    margin: 0;
    line-height: 1.5;
  }

  .ToolFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .OpenLink {
    font-size: 0.9rem;
    color: var(--ThemeColorThree);
    font-weight: 500;
  }

  .ExternalIcon {
    font-size: 1.2rem;
    color: var(--ThemeColorThree);
  }
</style>
