
class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = "!<>-_\\/[]{}—=+*^?#"
      this.update = this.update.bind(this)
    }
  
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => (this.resolve = resolve))
      this.queue = []
  
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ""
        const to = newText[i] || ""
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
  
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
  
    update() {
      let output = ""
      let complete = 0
  
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.chars[Math.floor(Math.random() * this.chars.length)]
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
  
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
  }
  
  class RainingLetters {
    constructor() {
      this.container = document.getElementById("raining-letters-container")
      this.titleElement = document.getElementById("scrambled-title")
      this.characters = []
      this.activeIndices = new Set()
      this.createCharacters()
      this.animateCharacters()
      this.flickerCharacters()
      this.initScrambledTitle()
    }
  
    createCharacters() {
      const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
      const charCount = 300
  
      for (let i = 0; i < charCount; i++) {
        const char = document.createElement("span")
        char.className = "raining-char"
        char.textContent = allChars[Math.floor(Math.random() * allChars.length)]
        char.style.left = `${Math.random() * 100}%`
        char.style.top = `${Math.random() * 100}%`
        this.characters.push({
          element: char,
          speed: 0.1 + Math.random() * 0.3,
          y: Number.parseFloat(char.style.top),
        })
        this.container.appendChild(char)
      }
    }
  
    animateCharacters() {
      const updatePositions = () => {
        this.characters.forEach((char) => {
          char.y += char.speed
          if (char.y >= 100) {
            char.y = -5
            char.element.style.left = `${Math.random() * 100}%`
            char.element.textContent = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"[
              Math.floor(Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?".length)
            ]
          }
          char.element.style.top = `${char.y}%`
        })
        requestAnimationFrame(updatePositions)
      }
      requestAnimationFrame(updatePositions)
    }
  
    flickerCharacters() {
      setInterval(() => {
        this.activeIndices.clear()
        const numActive = Math.floor(Math.random() * 3) + 3
        for (let i = 0; i < numActive; i++) {
          this.activeIndices.add(Math.floor(Math.random() * this.characters.length))
        }
        this.characters.forEach((char, index) => {
          if (this.activeIndices.has(index)) {
            char.element.classList.add("active")
          } else {
            char.element.classList.remove("active")
          }
        })
      }, 50)
    }
  
    initScrambledTitle() {
      const scrambler = new TextScramble(this.titleElement)
      const phrases = [
        "hello there",
        "I'm Sridharan,",
        "python developer",
        "web designer",
        "c# developer",
        "you can call me sri",
        "hello there",
      ]
      let counter = 0
      const next = () => {
        scrambler.setText(phrases[counter]).then(() => {
          setTimeout(next, 2000)
        })
        counter = (counter + 1) % phrases.length
      }
      next()
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    new RainingLetters()
  })
  
  
  