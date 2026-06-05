<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

type Ripple = {
  id: number
  x: number
  y: number
  size: number
}

const ripples = ref<Ripple[]>([])
let nextId = 0
let reduceMotion = false
const cleanupTimers = new Set<number>()

function removeRipple(id: number) {
  ripples.value = ripples.value.filter((ripple) => ripple.id !== id)
}

function spawnRipples(event: PointerEvent) {
  if (reduceMotion || event.button !== 0) return

  const created: Ripple = {
    id: nextId++,
    x: event.clientX,
    y: event.clientY,
    size: 176
  }

  ripples.value = [...ripples.value.slice(-12), created]

  const cleanupTimer = window.setTimeout(() => {
    removeRipple(created.id)
    cleanupTimers.delete(cleanupTimer)
  }, 3400)

  cleanupTimers.add(cleanupTimer)
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.addEventListener('pointerdown', spawnRipples, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('pointerdown', spawnRipples)
  cleanupTimers.forEach((timer) => window.clearTimeout(timer))
  cleanupTimers.clear()
})
</script>

<template>
  <div class="click-ripple-layer" aria-hidden="true">
    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      class="click-ripple"
      :style="{
        left: `${ripple.x}px`,
        top: `${ripple.y}px`,
        width: `${ripple.size}px`,
        height: `${ripple.size}px`
      }"
    />
  </div>
</template>

<style scoped>
.click-ripple-layer {
  position: fixed;
  z-index: 2147483647;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.click-ripple {
  position: absolute;
  display: block;
  border: 0;
  border-radius: 50%;
  background:
    radial-gradient(ellipse at center, rgb(5 73 124 / 0.10) 0 9%, transparent 20%),
    radial-gradient(ellipse at center, transparent 39%, rgb(26 125 196 / 0.20) 46%, rgb(226 247 255 / 0.12) 50%, transparent 62%);
  box-shadow: inset 0 0 34px rgb(27 136 205 / 0.14);
  backdrop-filter: blur(7px) contrast(1.26) saturate(1.36);
  -webkit-backdrop-filter: blur(7px) contrast(1.26) saturate(1.36);
  opacity: 0;
  transform: translate(-50%, -50%) scaleX(0.12) scaleY(0.04);
  animation: click-water-ripple 3000ms cubic-bezier(0.19, 1, 0.22, 1) both;
  will-change: transform, opacity;
}

.click-ripple::before,
.click-ripple::after {
  position: absolute;
  content: "";
}

.click-ripple::before {
  top: 50%;
  left: 50%;
  width: 34px;
  height: 22px;
  border-radius: 50%;
  background:
    radial-gradient(ellipse at center, rgb(4 61 105 / 0.26) 0 18%, rgb(28 128 198 / 0.12) 44%, transparent 76%);
  backdrop-filter: blur(8px) contrast(1.32);
  -webkit-backdrop-filter: blur(8px) contrast(1.32);
  transform: translate(-50%, -50%) scale(0.42);
  animation: click-water-drop 1200ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.click-ripple::after {
  inset: 31%;
  border: 1px solid rgb(18 116 184 / 0.32);
  border-radius: 50%;
  box-shadow: 0 0 18px rgb(43 154 220 / 0.16);
  backdrop-filter: blur(5px) contrast(1.22) saturate(1.24);
  -webkit-backdrop-filter: blur(5px) contrast(1.22) saturate(1.24);
  transform: scaleX(0.28) scaleY(0.12);
  animation: click-water-inner 2800ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

@keyframes click-water-ripple {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scaleX(0.12) scaleY(0.04);
  }

  10% {
    opacity: 0.78;
    transform: translate(-50%, -50%) scaleX(0.34) scaleY(0.12);
  }

  38% {
    opacity: 0.52;
  }

  66% {
    opacity: 0.24;
  }

  84% {
    opacity: 0.1;
  }

  96% {
    opacity: 0.02;
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scaleX(1.16) scaleY(0.54);
  }
}

@keyframes click-water-drop {
  0% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(0.42);
  }

  38% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }

  72% {
    opacity: 0.12;
  }

  92% {
    opacity: 0.02;
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.2);
  }
}

@keyframes click-water-inner {
  0% {
    opacity: 0.64;
    transform: scaleX(0.28) scaleY(0.12);
  }

  42% {
    opacity: 0.36;
  }

  74% {
    opacity: 0.14;
  }

  94% {
    opacity: 0.02;
  }

  100% {
    opacity: 0;
    transform: scaleX(1.36) scaleY(0.62);
  }
}
</style>
