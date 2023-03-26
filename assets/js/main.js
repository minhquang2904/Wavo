window.addEventListener("DOMContentLoaded", () => {
  const $ = document.querySelector.bind(document)
  const $$ = document.querySelectorAll.bind(document)

  const scrollTop = $(".scroll__top")
  const scrollDown = $(".scroll__down")

  const header = $(".header")
  const banner = $(".banner")
  const about = $(".about")
  const skill = $(".skill")
  const project = $(".project")
  const contact = $(".contact")

  const navLink = $$(".nav__link")
  const navAbout = $(".nav__about")
  const navHome = $(".nav__home")
  const navSkill = $(".nav__skill")
  const navProject = $(".nav__project")
  const navContact = $(".nav__contact")
  const elementVisible = 96

  const activeNumber = $$(".active__number")
  const activeNumber1 = $(".active__number--1")
  const activeNumber2 = $(".active__number--2")
  const activeNumber3 = $(".active__number--3")
  const activeNumber4 = $(".active__number--4")

  // Menu tablet and mobile
  const navMenu = $(".header__nav--menu")
  const navActive = $(".header__nav--right")

  // Message
  const messageNonfiction = $(".nofication__sendmail")

  // Form
  const btnSubmit = $("#submit")
  let formName = $("#fname")
  let formEmail = $("#femail")
  let formSubject = $("#fsubject")
  let formMessage = $("#fmessage")

  if (scrollDown) {
    scrollDown.addEventListener("click", () => {
      window.scrollTo({ top: about.offsetTop, behavior: "smooth" })
    })
  }
  // tabel - mobile
  if (navMenu) {
    navMenu.addEventListener("click", () => {
      handlerToggleClassList(navMenu, "active")
      handlerToggleClassList(navActive, "nav__active")
    })
  }
  window.addEventListener("scroll", () => {
    const windowScrollY = window.scrollY

    if (windowScrollY > 800) {
      scrollTop.classList.add("active")
      scrollTop.addEventListener("click", () => {
        handlerScrollTo(0, "smooth")
      })
    } else {
      scrollTop.classList.remove("active")
    }

    if (windowScrollY > contact.offsetTop - elementVisible) {
      checkAttributeNav(navLink)
      checkAttributeNav(activeNumber)
      setAttributeCurrent(navContact)
      setAttributeCurrent(activeNumber4)
    } else if (windowScrollY > project.offsetTop - elementVisible) {
      checkAttributeNav(navLink)
      checkAttributeNav(activeNumber)
      setAttributeCurrent(navProject)
      setAttributeCurrent(activeNumber3)
    } else if (windowScrollY > skill.offsetTop - elementVisible) {
      checkAttributeNav(navLink)
      checkAttributeNav(activeNumber)
      setAttributeCurrent(navSkill)
      setAttributeCurrent(activeNumber2)
    } else if (windowScrollY > about.offsetTop - elementVisible) {
      checkAttributeNav(navLink)
      checkAttributeNav(activeNumber)
      setAttributeCurrent(navAbout)
      setAttributeCurrent(activeNumber1)
    } else if (windowScrollY > banner.offsetTop) {
      checkAttributeNav(navLink)
      checkAttributeNav(activeNumber)
      setAttributeCurrent(navHome)
    }
    reveals()
  })

  function handlerScrollTo(to, animation) {
    window.scrollTo({ top: to, behavior: animation })
  }

  function reveals() {
    const reveals = $$(".reveals")
    for (var i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight
      const elementTop = reveals[i].getBoundingClientRect().top
      if (elementTop < windowHeight + 50) {
        handlerAddClassList(reveals[i], "active")
      }
    }
  }

  function checkAttributeNav(name) {
    name.forEach((item) => {
      if (item.hasAttribute("aria-current")) {
        item.removeAttribute("aria-current")
      }
    })
  }

  function setAttributeCurrent(name) {
    name["setAttribute"]("aria-current", "page")
  }

  function handlerToggleClassList(name, nameClass) {
    name.classList.toggle(nameClass)
  }

  function handlerAddClassList(name, nameClass) {
    name.classList.add(`${nameClass}`)
  }

  function handlerRemoveClassList(name, nameClass) {
    name.classList.remove(nameClass)
  }

  function createMessage(name, message) {
    let div = document.createElement("div")
    div.className = "nofication__sendmail--item"
    div.style.animation = "0.8s ease showMessage forwards, 0.8s ease 3s hideMessage forwards"
    if (message == "success") {
      let html = `${name}`
      div.style.color = "#155776"
      div.style.background = "#D4EDDA"
      div.innerText = html
      messageNonfiction.insertBefore(div, messageNonfiction.children[0])
      setTimeout(() => {
        div.remove(div)
      }, 3800)
    }

    if (message == "warning") {
      let html = `${name}`
      div.style.color = "#856404"
      div.style.background = "#FFF3CD"
      div.innerText = html
      messageNonfiction.insertBefore(div, messageNonfiction.children[0])
      setTimeout(() => {
        div.remove(div)
      }, 3800)
    }
  }

  if (btnSubmit) {
    btnSubmit.addEventListener("click", (e) => {
      let form = `
        <b>Name :</b> ${formName.value}
        <br>
        <b>Email :</b> ${formEmail.value}
        <br>
        <b>Message :</b> ${formMessage.value}
      `
      if (formName.value == "" || formEmail.value == "" || formSubject.value == "" || formMessage.value == "") {
        createMessage("form is empty", "warning")
        e.preventDefault()
      } else {
        Email.send({
          SecureToken: "cafbb54f-3417-4fb6-80fb-e9f75f4c1b3b",
          To: "minhquangnthq@gmail.com",
          From: "minhquangnthq@gmail.com",
          Subject: formSubject.value,
          Body: form,
        }).then(() => {
          formName.value = ""
          formEmail.value = ""
          formSubject.value = ""
          formMessage.value = ""
          createMessage("message sent!", "success")
        })
        e.preventDefault()
      }
    })
  }
})
