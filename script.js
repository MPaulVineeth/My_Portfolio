// Initialize tsParticles
window.onload = async () => {
  // Check if tsParticles is available
  if (typeof tsParticles !== "undefined") {
    await tsParticles.load("tsparticles", {
      fpsLimit: 60,
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#8b5cf6",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: true,
            speed: 0.5,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#8b5cf6",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5,
            },
          },
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    })
  } else {
    console.error("tsParticles is not defined. Make sure it's properly imported or included in your project.")
  }
}

// Enhanced Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetID = this.getAttribute("href")
    const targetElement = document.querySelector(targetID)
    if (targetElement) {
      const headerOffset = document.querySelector("header")?.offsetHeight || 0
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerOffset - 10
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Close mobile menu if open
      if (document.getElementById("mobile-menu").classList.contains("flex")) {
        document.getElementById("mobile-menu").classList.remove("flex")
        document.getElementById("mobile-menu").classList.add("hidden")
      }
    }
  })
})

// Shrink header on scroll
const header = document.querySelector("header")
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("py-2")
    header.classList.remove("py-3")
  } else {
    header.classList.add("py-3")
    header.classList.remove("py-2")
  }
})

// Active navigation link highlighting
const sections = document.querySelectorAll("section[id]")
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`nav a[href*=${sectionId}]`)?.classList.add("active")
      document.querySelector(`.mobile-nav-link[href*=${sectionId}]`)?.classList.add("active")
    } else {
      document.querySelector(`nav a[href*=${sectionId}]`)?.classList.remove("active")
      document.querySelector(`.mobile-nav-link[href*=${sectionId}]`)?.classList.remove("active")
    }
  })

  // Show/hide back to top button
  const backToTopButton = document.getElementById("back-to-top")
  if (backToTopButton) {
    if (scrollY > 500) {
      backToTopButton.classList.add("visible")
    } else {
      backToTopButton.classList.remove("visible")
    }
  }

  // Animate skill progress bars when in view
  const skillSection = document.getElementById("technical-skills")
  if (skillSection) {
    const sectionTop = skillSection.offsetTop
    const sectionHeight = skillSection.offsetHeight

    if (scrollY > sectionTop - 500 && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".skill-progress-bar").forEach((bar) => {
        const width = bar.style.width
        if (width === "0px" || width === "") {
          // Get the width from the parent element's text
          const percentText = bar.parentElement.previousElementSibling.querySelector(".text-violet-400").textContent
          const percent = percentText.replace("%", "")
          bar.style.width = `${percent}%`
        }
      })
    }
  }
})

// Form validation and submission handling
const contactForm = document.querySelector("#contact form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const nameInput = document.querySelector("#name")
    const emailInput = document.querySelector("#email")
    const messageInput = document.querySelector("#message")
    const subjectInput = document.querySelector("#subject")

    let isValid = true

    if (!nameInput.value.trim()) {
      isValid = false
      nameInput.classList.add("border-red-500")
    } else {
      nameInput.classList.remove("border-red-500")
    }

    if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
      isValid = false
      emailInput.classList.add("border-red-500")
    } else {
      emailInput.classList.remove("border-red-500")
    }

    if (!subjectInput.value.trim()) {
      isValid = false
      subjectInput.classList.add("border-red-500")
    } else {
      subjectInput.classList.remove("border-red-500")
    }

    if (!messageInput.value.trim()) {
      isValid = false
      messageInput.classList.add("border-red-500")
    } else {
      messageInput.classList.remove("border-red-500")
    }

    if (!isValid) {
      e.preventDefault()
      showFormError()
    } else {
      // Show sending indicator
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...'
      submitBtn.disabled = true

      // Re-enable after submission (in case the form submission fails)
      setTimeout(() => {
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 5000)
    }
  })
}

function showFormError() {
  const formError = document.createElement("div")
  formError.className = "bg-red-500/20 text-red-400 p-3 rounded-md mt-4 text-sm"
  formError.innerHTML = "Please fill out all fields correctly."

  const existingError = document.querySelector("#contact form .bg-red-500\\/20")
  if (!existingError && contactForm) {
    contactForm.appendChild(formError)

    setTimeout(() => {
      formError.remove()
    }, 5000)
  }
}

function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Add animation to elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".skill-card, .project-card, .experience-card, .certification-card, .achievement-card, .education-card",
  )

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementPosition < windowHeight - 100) {
      element.style.animationPlayState = "running"
    }
  })
}

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  // Set all animations to paused initially
  const animatedElements = document.querySelectorAll(
    ".skill-card, .project-card, .experience-card, .certification-card, .achievement-card, .education-card",
  )
  animatedElements.forEach((el) => {
    el.style.animationPlayState = "paused"
  })

  // Run animation check on load
  animateOnScroll()

  // Add floating elements animation
  animateFloatingElements()

  // Initialize mobile menu
  initMobileMenu()

  // Initialize project filters
  initProjectFilters()

  // Initialize back to top button
  initBackToTop()

  // Initialize typewriter effect
  initTypewriter()
})

window.addEventListener("scroll", animateOnScroll)

// Animate floating elements
function animateFloatingElements() {
  const floatingElements = document.querySelectorAll(".floating-element")
  floatingElements.forEach((el) => {
    // Random initial position
    const randomX = Math.random() * 20 - 10
    const randomY = Math.random() * 20 - 10
    el.style.transform = `translate(${randomX}px, ${randomY}px)`
  })
}

// Initialize mobile menu
function initMobileMenu() {
  const menuButton = document.getElementById("menu-button")
  const closeButton = document.getElementById("close-menu")
  const mobileMenu = document.getElementById("mobile-menu")
  const mobileLinks = document.querySelectorAll(".mobile-nav-link")

  if (menuButton && closeButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden")
      mobileMenu.classList.add("flex")
      document.body.style.overflow = "hidden" // Prevent scrolling
    })

    closeButton.addEventListener("click", () => {
      mobileMenu.classList.remove("flex")
      mobileMenu.classList.add("hidden")
      document.body.style.overflow = "" // Re-enable scrolling
    })

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("flex")
        mobileMenu.classList.add("hidden")
        document.body.style.overflow = "" // Re-enable scrolling
      })
    })
  }
}

// Initialize project filters
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".project-filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        button.classList.add("active")

        // Get filter value
        const filter = button.getAttribute("data-filter")

        // Filter projects
        projectCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "flex"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  }
}

// Initialize back to top button
function initBackToTop() {
  const backToTopButton = document.getElementById("back-to-top")

  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Typing effect for hero section
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector("#home h1 span")
  const originalText = heroTitle.textContent
  heroTitle.textContent = ""

  let i = 0
  const typeWriter = () => {
    if (i < originalText.length) {
      heroTitle.textContent += originalText.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }

  // Start the typing effect after a short delay
  setTimeout(typeWriter, 500)
})

// Initialize typewriter effect
function initTypewriter() {
  const typewriterElement = document.getElementById("typewriter")

  if (typewriterElement) {
    const phrases = ["Computer Science Engineer", "Full Stack Developer", "AI/ML Enthusiast", "Problem Solver"]

    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    function type() {
      const currentPhrase = phrases[phraseIndex]

      if (isDeleting) {
        // Deleting text
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50 // Faster when deleting
      } else {
        // Typing text
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 100 // Normal speed when typing
      }

      // If finished typing the phrase
      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at the end of the phrase
        typingSpeed = 1500
        isDeleting = true
      }
      // If finished deleting the phrase
      else if (isDeleting && charIndex === 0) {
        isDeleting = false
        // Move to the next phrase
        phraseIndex = (phraseIndex + 1) % phrases.length
        // Pause before typing the next phrase
        typingSpeed = 500
      }

      setTimeout(type, typingSpeed)
    }

    // Start the typing effect
    setTimeout(type, 3000)
  }
}

// Fix for contact form and social icons
document.addEventListener("DOMContentLoaded", () => {
  // Ensure all links in the footer are clickable
  const footerLinks = document.querySelectorAll("footer a")
  footerLinks.forEach((link) => {
    link.style.position = "relative"
    link.style.zIndex = "10"
  })

  // Make sure form elements are interactive
  const formElements = document.querySelectorAll("#contact form input, #contact form textarea, #contact form button")
  formElements.forEach((el) => {
    el.style.position = "relative"
    el.style.zIndex = "5"
  })

  // Add hover effects to skill items
  const skillItems = document.querySelectorAll(".skill-item")
  skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`
    item.style.opacity = "0"
    item.style.animation = "fadeInUp 0.5s ease forwards"
    item.style.animationDelay = `${index * 0.1}s`
  })

  // Add moving wave effect to section titles
  const sectionTitles = document.querySelectorAll(".section-title")
  sectionTitles.forEach((title) => {
    title.addEventListener("mouseover", function () {
      this.style.transform = "translateY(-5px)"
      this.style.transition = "transform 0.3s ease"
    })

    title.addEventListener("mouseout", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Fix broken list item in footer
  const brokenListItem = document.querySelector('footer li="text-gray-400 hover:text-violet-400 transition-colors"')
  if (brokenListItem) {
    const parent = brokenListItem.parentNode
    const newListItem = document.createElement("li")
    const anchor = document.createElement("a")
    anchor.href = "#projects"
    anchor.className = "text-gray-400 hover:text-violet-400 transition-colors"
    anchor.textContent = "Projects"
    newListItem.appendChild(anchor)
    parent.replaceChild(newListItem, brokenListItem)
  }
})

