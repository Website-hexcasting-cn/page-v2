<script lang="ts">
  export let message: string
</script>

{#if message}
  <div class="ErrorMessage">
    <span class="ErrorIcon">⚠️</span>
    {message}
  </div>
{/if}

<style>
  .ErrorMessage {
    background-color: rgba(255, 100, 100, 0.1);
    border: 1px solid rgba(255, 100, 100, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    color: #ff6b6b;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ErrorIcon {
    font-size: 1.2rem;
  }
</style>
