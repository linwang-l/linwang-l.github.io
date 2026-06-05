<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const track = ref<HTMLElement | null>(null)
const thumbTop = ref(0)
const thumbHeight = ref(72)
const isDragging = ref(false)

let startY = 0
let startScrollTop = 0
let ticking = false
let observer: MutationObserver | null = null

const thumbStyle = computed(() => ({
  height: `${thumbHeight.value}px`,
  transform: `translateY(${thumbTop.value}px)`
}))

function getRoot() {
  return document.documentElement
}

function getScrollMetrics() {
  const root = getRoot()
  const trackHeight = track.value?.clientHeight ?? 0
  const scrollable = root.scrollHeight - root.clientHeight
  const height = trackHeight > 0 && root.scrollHeight > root.clientHeight
    ? Math.max(44, (root.clientHeight / root.scrollHeight) * trackHeight)
    : trackHeight
  const maxThumbTop = Math.max(0, trackHeight - height)
  const top = scrollable > 0
    ? (root.scrollTop / scrollable) * maxThumbTop
    : 0

  return {
    height,
    maxThumbTop,
    scrollable,
    top
  }
}

function updateThumb() {
  const metrics = getScrollMetrics()

  thumbHeight.value = metrics.height
  thumbTop.value = metrics.top
  ticking = false
}

function requestThumbUpdate() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(updateThumb)
}

function scrollToTrackPosition(clientY: number) {
  const root = getRoot()
  const rect = track.value?.getBoundingClientRect()

  if (!rect) return

  const metrics = getScrollMetrics()
  const targetTop = Math.min(
    metrics.maxThumbTop,
    Math.max(0, clientY - rect.top - metrics.height / 2)
  )
  const ratio = metrics.maxThumbTop > 0 ? targetTop / metrics.maxThumbTop : 0

  root.scrollTop = ratio * metrics.scrollable
}

function handleTrackPointerDown(event: PointerEvent) {
  if (event.target !== track.value) return
  scrollToTrackPosition(event.clientY)
}

function handleThumbPointerDown(event: PointerEvent) {
  const metrics = getScrollMetrics()

  if (metrics.scrollable <= 0) return

  event.preventDefault()
  isDragging.value = true
  startY = event.clientY
  startScrollTop = getRoot().scrollTop
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', handlePointerUp, { once: true })
}

function handlePointerMove(event: PointerEvent) {
  if (!isDragging.value) return

  const root = getRoot()
  const metrics = getScrollMetrics()
  const deltaY = event.clientY - startY
  const ratio = metrics.maxThumbTop > 0 ? deltaY / metrics.maxThumbTop : 0

  root.scrollTop = startScrollTop + ratio * metrics.scrollable
}

function handlePointerUp() {
  isDragging.value = false
  window.removeEventListener('pointermove', handlePointerMove)
}

onMounted(() => {
  void nextTick(updateThumb)
  observer = new MutationObserver(requestThumbUpdate)
  observer.observe(document.body, { childList: true, subtree: true })
  window.addEventListener('scroll', requestThumbUpdate, { passive: true })
  window.addEventListener('resize', requestThumbUpdate)
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', requestThumbUpdate)
  window.removeEventListener('resize', requestThumbUpdate)
  window.removeEventListener('pointermove', handlePointerMove)
})
</script>

<template>
  <div
    ref="track"
    class="ice-scrollbar"
    :class="{ dragging: isDragging }"
    aria-hidden="true"
    @pointerdown="handleTrackPointerDown"
  >
    <div
      class="ice-scrollbar-thumb"
      :style="thumbStyle"
      @pointerdown="handleThumbPointerDown"
    ></div>
  </div>
</template>

<style scoped>
.ice-scrollbar {
  position: fixed;
  z-index: 14;
  top: 0;
  right: 0;
  bottom: 0;
  width: 12px;
  border-left: 1px solid rgb(210 244 255 / 30%);
  border-radius: 0;
  background:
    linear-gradient(180deg, rgb(210 244 255 / 30%), rgb(170 222 255 / 14%)),
    linear-gradient(180deg, rgb(179 228 255 / 14%), transparent 48%, rgb(179 228 255 / 12%));
  box-shadow:
    inset 1px 0 0 rgb(210 244 255 / 20%),
    inset 0 0 10px rgb(93 187 255 / 14%),
    0 0 8px rgb(90 190 255 / 14%);
  cursor: pointer;
  user-select: none;
}

.ice-scrollbar-thumb {
  position: absolute;
  top: 0;
  left: 1px;
  right: 1px;
  min-height: 44px;
  border: 1px solid rgb(210 246 255 / 52%);
  border-radius: 999px;
  overflow: hidden;
  background:
    radial-gradient(circle at 28% 18%, rgb(196 243 255 / 42%) 0 7%, transparent 18%),
    radial-gradient(circle at 72% 62%, rgb(168 225 255 / 24%) 0 5%, transparent 16%),
    linear-gradient(90deg, rgb(184 236 255 / 24%), transparent 24%, rgb(134 204 255 / 12%) 62%, transparent),
    linear-gradient(180deg, #f5feff 0%, #c9f7ff 18%, #74d8ff 48%, #2389e8 100%);
  box-shadow:
    inset 0 0 0 1px rgb(196 243 255 / 34%),
    inset 0 0 10px rgb(156 225 255 / 16%),
    0 0 12px rgb(80 204 255 / 52%),
    0 0 22px rgb(35 123 255 / 28%);
  cursor: grab;
  touch-action: none;
}

.ice-scrollbar-thumb::before,
.ice-scrollbar-thumb::after {
  position: absolute;
  inset: 0;
  content: "";
  pointer-events: none;
}

.ice-scrollbar-thumb::before {
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='160' viewBox='0 0 24 160'%3E%3Cg fill='none' stroke-linecap='round'%3E%3Cpath d='M12 0 10 14 13 27 9 42 14 58 11 73 15 92 10 111 13 130 11 160' stroke='%23ffffff' stroke-opacity='.88' stroke-width='1.5'/%3E%3Cpath d='M12 2 10 15 13 28 9 43 14 59 11 74 15 93 10 112 13 131' stroke='%23002f7a' stroke-opacity='.34' stroke-width='.7'/%3E%3Cpath d='M9 25 3 34M13 27 21 38M10 45 2 53M14 58 22 67M11 75 4 86M15 94 20 106M10 112 2 124M13 132 20 146' stroke='%23ffffff' stroke-opacity='.78' stroke-width='1.2'/%3E%3Cpath d='M7 18 2 20M16 19 22 24M6 65 1 70M17 82 23 86M5 101 1 108M17 122 23 129M7 145 2 151' stroke='%23d8f8ff' stroke-opacity='.7' stroke-width='1'/%3E%3Cpath d='M5 35 10 41M19 39 14 46M4 88 11 95M20 108 15 115M4 126 10 134' stroke='%23004faf' stroke-opacity='.46' stroke-width='.85'/%3E%3C/g%3E%3C/svg%3E") center top / 100% 160px repeat-y;
  opacity: 0.98;
}

.ice-scrollbar-thumb::after {
  background:
    linear-gradient(90deg, rgb(180 235 255 / 22%), transparent 38%, rgb(120 205 255 / 8%) 72%, transparent),
    linear-gradient(180deg, rgb(175 232 255 / 8%), transparent 32%, rgb(120 204 255 / 6%) 68%, transparent);
  mix-blend-mode: screen;
}

.ice-scrollbar.dragging .ice-scrollbar-thumb,
.ice-scrollbar-thumb:active {
  cursor: grabbing;
}

:global(.dark) .ice-scrollbar {
  border-color: rgb(255 255 255 / 32%);
  background:
    linear-gradient(180deg, rgb(255 255 255 / 26%), rgb(255 255 255 / 12%)),
    linear-gradient(180deg, rgb(72 168 255 / 18%), transparent 48%, rgb(72 168 255 / 14%));
}

@media (max-width: 720px) {
  .ice-scrollbar {
    right: 0;
    width: 10px;
  }
}
</style>
