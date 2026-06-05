import DefaultTheme from 'vitepress/theme'
import { inBrowser, useData } from 'vitepress'
import { defineComponent, h, nextTick, onMounted, onUnmounted, provide, ref } from 'vue'
import ArticleNavDropdown from './components/ArticleNavDropdown.vue'
import ClickPrismEffect from './components/ClickPrismEffect.vue'
import DocOutlineCard from './components/DocOutlineCard.vue'
import IceScrollbar from './components/IceScrollbar.vue'
import './custom.css'

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>
  }
}

const Layout = defineComponent({
  name: 'ThemeTransitionLayout',
  setup(_, { slots }) {
    const { isDark } = useData()
    const isBooting = ref(true)
    const bootStartedAt = Date.now()
    const minBootDuration = 1000
    let animationFrame = 0
    let bootTimer = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    provide('toggle-appearance', () => {
      const root = document.documentElement
      const nextModeClass = isDark.value ? 'theme-wipe-to-light' : 'theme-wipe-to-dark'
      const doc = document as ViewTransitionDocument
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const toggle = async () => {
        isDark.value = !isDark.value
        await nextTick()
      }

      root.classList.remove('theme-wipe-to-dark', 'theme-wipe-to-light')

      if (!inBrowser || reduceMotion || !doc.startViewTransition) {
        void toggle()
        return
      }

      root.classList.add(nextModeClass)
      const transition = doc.startViewTransition(toggle)

      transition.finished.finally(() => {
        root.classList.remove('theme-wipe-to-dark', 'theme-wipe-to-light')
      })
    })

    onMounted(() => {
      const root = document.documentElement
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const finishBoot = () => {
        const elapsed = Date.now() - bootStartedAt
        const delay = Math.max(0, minBootDuration - elapsed)

        window.clearTimeout(bootTimer)
        bootTimer = window.setTimeout(() => {
          isBooting.value = false
        }, delay)
      }

      if (document.readyState === 'complete') {
        finishBoot()
      } else {
        window.addEventListener('load', finishBoot, { once: true })
      }

      const updateTarget = (event: PointerEvent) => {
        targetX = (event.clientX / window.innerWidth - 0.5) * 18
        targetY = (event.clientY / window.innerHeight - 0.5) * 12
      }

      const animateBackground = () => {
        currentX += (targetX - currentX) * 0.08
        currentY += (targetY - currentY) * 0.08

        root.style.setProperty('--bg-shift-x', `${currentX.toFixed(2)}px`)
        root.style.setProperty('--bg-shift-y', `${currentY.toFixed(2)}px`)
        root.style.setProperty('--bg-rotate', `${(currentX * 0.018).toFixed(3)}deg`)

        animationFrame = window.requestAnimationFrame(animateBackground)
      }

      onUnmounted(() => {
        window.removeEventListener('load', finishBoot)
        window.removeEventListener('pointermove', updateTarget)
        window.clearTimeout(bootTimer)
        window.cancelAnimationFrame(animationFrame)
        root.style.removeProperty('--bg-shift-x')
        root.style.removeProperty('--bg-shift-y')
        root.style.removeProperty('--bg-rotate')
      })

      if (reduceMotion) return

      window.addEventListener('pointermove', updateTarget, { passive: true })
      animationFrame = window.requestAnimationFrame(animateBackground)
    })

    return () => {
      const asideOutlineBefore = slots['aside-outline-before']?.() ?? []
      const navBarContentBefore = slots['nav-bar-content-before']?.() ?? []

      return (
        h('div', { class: 'site-shell' }, [
          h('div', { class: 'site-bg', 'aria-hidden': 'true' }),
          h('div', { class: 'rain-layer', 'aria-hidden': 'true' }),
          h('div', { class: ['site-content', { 'is-booting': isBooting.value }] }, [
            h(DefaultTheme.Layout!, null, {
              ...slots,
              'nav-bar-content-before': () => [
                ...navBarContentBefore,
                h(ArticleNavDropdown)
              ],
              'aside-outline-before': () => [
                ...asideOutlineBefore,
                h(DocOutlineCard)
              ]
            })
          ]),
          isBooting.value
            ? h('div', { class: 'site-loading', role: 'status', 'aria-live': 'polite' }, [
                h('div', { class: 'site-loading-card' }, [
                  h('div', { class: 'site-loading-spinner', 'aria-hidden': 'true' }),
                  h('p', null, 'Loading')
                ])
              ])
            : null,
          h(IceScrollbar),
          h(ClickPrismEffect)
        ])
      )
    }
  }
})

export default {
  extends: DefaultTheme,
  Layout
}
