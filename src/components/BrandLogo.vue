<template>
  <div class="brand-logo">
    <img
      alt="Snapshot logo"
      src="~@/assets/logo.png"
      class="theme-light max-h-7"
    />
    <img
      alt="Snapshot logo"
      src="~@/assets/logo-white.png"
      class="theme-dark max-h-7"
    />
  </div>
</template>

<style scoped lang="scss">
.brand-logo {
  img {
    @apply inline-block;
  }

  .theme-dark {
    @apply hidden;
  }
}

@media (prefers-color-scheme: dark) {
  .brand-logo {
    .theme-dark {
      @apply inline-block;
    }

    .theme-light {
      @apply hidden;
    }
  }
}
</style>
