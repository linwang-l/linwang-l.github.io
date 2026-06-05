import DefaultTheme from 'vitepress/theme'
import { inBrowser, useData } from 'vitepress'
import { defineComponent, h, nextTick, onMounted, onUnmounted, provide } from 'vue'
import ArticleNavDropdown from './components/ArticleNavDropdown.vue'
import ClickPrismEffect from './components/ClickPrismEffect.vue'
import DocOutlineCard from './components/DocOutlineCard.vue'
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
    let animationFrame = 0
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

      if (reduceMotion) return

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

      window.addEventListener('pointermove', updateTarget, { passive: true })
      animationFrame = window.requestAnimationFrame(animateBackground)

      onUnmounted(() => {
        window.removeEventListener('pointermove', updateTarget)
        window.cancelAnimationFrame(animationFrame)
        root.style.removeProperty('--bg-shift-x')
        root.style.removeProperty('--bg-shift-y')
        root.style.removeProperty('--bg-rotate')
      })
    })

    return () => {
      const asideOutlineBefore = slots['aside-outline-before']?.() ?? []
      const navBarContentBefore = slots['nav-bar-content-before']?.() ?? []

      return (
      h('div', { class: 'site-shell' }, [
        h('div', { class: 'site-bg', 'aria-hidden': 'true' }),
        h('div', { class: 'rain-layer', 'aria-hidden': 'true' }),
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
        }),
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
