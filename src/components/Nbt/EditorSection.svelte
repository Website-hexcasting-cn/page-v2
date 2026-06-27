<script lang="ts">
  export let title: string
</script>

<div class="EditorSection">
  <div class="SectionHeader">
    <h2 class="SectionTitle">{title}</h2>
    <slot name="header" />
  </div>
  <slot />
</div>

<style>
  .EditorSection {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
  }

  .SectionHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .SectionTitle {
    font-size: 1.3rem;
    color: var(--ThemeColorThree);
    margin: 0;
  }
</style>
