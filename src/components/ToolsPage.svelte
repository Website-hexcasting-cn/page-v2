<script lang="ts">
  import { t, isLoading } from 'svelte-i18n'
  import toolsConfig from '../config/ToolsConfig.json'
  
  function openTool(url: string) {
    window.open(url, '_blank')
  }
</script>

{#if !$isLoading}
  <div class="ToolsPage">
    <h1 class="PageTitle">{$t('tools.title')}</h1>
    <p class="PageDescription">{$t('tools.description')}</p>
    
    <div class="ToolsGrid">
      {#each toolsConfig.tools as tool}
        <div class="ToolCard" on:click={() => openTool(tool.url)} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && openTool(tool.url)}>
          <div class="ToolCardHeader">
            {#if tool.icon}
              <img src={tool.icon} alt={$t(`tools.${tool.id}.name`)} class="ToolIcon" />
            {:else}
              <div class="ToolIconPlaceholder">
                <span class="ToolIconText">🛠️</span>
              </div>
            {/if}
            <h2 class="ToolName">{$t(`tools.${tool.id}.name`)}</h2>
          </div>
          <p class="ToolDescription">{$t(`tools.${tool.id}.description`)}</p>
          <div class="ToolFooter">
            <span class="OpenLink">{$t('tools.openLink')}</span>
            <span class="ExternalIcon">↗</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .ToolsPage {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  
  .PageTitle {
    font-size: 2.5rem;
    color: var(--ThemeColorThree);
    text-align: center;
    margin-bottom: 10px;
  }
  
  .PageDescription {
    font-size: 1.1rem;
    color: var(--ThemeColorThree);
    text-align: center;
    margin-bottom: 40px;
    opacity: 0.8;
  }
  
  .ToolsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
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
  
  .ToolCard:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: var(--ThemeColorOne);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
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
  
  .ToolIcon {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    object-fit: cover;
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
    color: var(--ThemeColorOne);
    font-weight: 500;
  }
  
  .ExternalIcon {
    font-size: 1.2rem;
    color: var(--ThemeColorOne);
  }
  
  @media screen and (max-width: 768px) {
    .ToolsPage {
      padding: 20px 15px;
    }
    
    .PageTitle {
      font-size: 2rem;
    }
    
    .PageDescription {
      font-size: 1rem;
      margin-bottom: 30px;
    }
    
    .ToolsGrid {
      grid-template-columns: 1fr;
      gap: 15px;
    }
  }
</style>
