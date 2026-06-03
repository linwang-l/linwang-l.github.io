<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const progress = ref(0)
const canTeleport = ref(false)

const progressText = computed(() => Math.round(progress.value))

function updateProgress() {
  const root = document.documentElement
  const scrollable = root.scrollHeight - root.clientHeight

  progress.value = scrollable > 0
    ? Math.min(100, Math.max(0, (root.scrollTop / scrollable) * 100))
    : 100
}

onMounted(() => {
  updateProgress()
  void nextTick(() => {
    canTeleport.value = Boolean(document.querySelector('.VPDocAsideOutline .outline-title'))
  })
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>

<template>
  <Teleport v-if="canTeleport" to=".VPDocAsideOutline .outline-title">
    <span class="reading-progress-card" aria-label="页面查看进度">
      {{ progressText }}
    </span>
  </Teleport>
</template>

<style scoped>
.reading-progress-card {
  display: grid;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  margin-left: auto;
  place-items: center;
  border: 4px solid rgb(207 231 255 / 82%);
  border-radius: 999px;
  color: #5da8ff;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
  pointer-events: none;
}

:global(.dark) .reading-progress-card {
  border-color: rgb(94 156 232 / 34%);
  color: #85bdff;
}
</style>
