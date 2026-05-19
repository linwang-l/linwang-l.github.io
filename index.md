---
layout: home
lastUpdated: true

hero:
  name: "Linwang-l"
  text: "乘上风，用白之羽翼与君同行，青色缝隙间的常夏之岛"
  tagline: 寻找着理由迷失了方向，在梦的渊底徘徊不前。
  actions:
    - theme: brand
      text: 有关我的
      link: /markdown-examples
    - theme: alt
      text: 我都做什么
      link: /api-examples

features:
  - title: Feature A
    details: 支持ustc的特教手语团谢谢喵。
  - title: Feature B
    details: 喜欢听日文歌，但是有时候总会感觉很吵闹。
  - title: Feature C
    details: 不喜欢独自一个人但是社恐。
  - title: Feature D
    details: 支持ustc的Linux协会谢谢喵。
---

<script setup>
import { ref } from 'vue'

const likes = ref(0)
const liked = ref(false)

function toggleLike() {
  if (liked.value) {
    likes.value--
  } else {
    likes.value++
  }
  liked.value = !liked.value
}
</script>

<button @click="toggleLike" :class="liked ? 'liked-btn' : 'like-btn'">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :fill="liked ? 'currentColor' : 'none'"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
    />
  </svg>
  <span>{{ liked ? '感谢您的认可' : '请为我的网页点赞' }}</span>
</button>

<style scoped>
.like-btn,
.liked-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 12px;
  padding: 10px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.like-btn {
  background: #f97316;
  color: white;
}

.liked-btn {
  background: #3b82f6;
  color: white;
}

.icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
</style>