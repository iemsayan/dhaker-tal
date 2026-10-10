'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  Sparkles,
  X,
} from 'lucide-react'
import { DurgaCinematic } from '@/components/durga-cinematic'

const APP_URL = 'https://play.google.com/store/apps/details?id=com.dhakertal.app'
const WEBSITE_URL = 'https://dhakertal.vercel.app/'

// Both countdown sections follow the next major day of Pujo and then rest on
// the farewell message once Vijaya Dashami ends. Times are the exact tithi
// end times in Indian Standard Time (IST), matching the Puja calendar.
const countdownMilestones = [
  { label: 'Maha Panchami', end: '2026-10-16T13:42:00+05:30' },
  { label: 'Maha Shasthi', end: '2026-10-17T05:55:00+05:30' },
  { label: 'Maha Saptami', end: '2026-10-18T08:29:00+05:30' },
  { label: 'Maha Ashtami', end: '2026-10-19T10:51:00+05:30' },
  { label: 'Maha Navami', end: '2026-10-20T12:51:00+05:30' },
  { label: 'Vijaya Dashami', end: '2026-10-21T14:12:00+05:30' },
] as const

const PUJA_FAREWELL = 'আসছে বছর আবার হবে'

/* =========================================================
   HERO
   ========================================================= */

const heroSlides = [
  {
    image: '/images/puja-aarti.jpg',
    eyebrow: 'KOLKATA, IN RHYTHM',
    bengali: 'শুভ দুর্গাপূজা',
    title: (
      <>
        শহর জেগে উঠুক
        <br />
        <em>ঢাকের তালে।</em>
      </>
    ),
    copy:
      'Pandals, rituals and the most beautiful way to move through Kolkata this Pujo.',
  },
  {
    image: '/images/puja-idol-dawn.jpg',
    eyebrow: 'THE FIRST LIGHT',
    bengali: 'আগমনী',
    title: (
      <>
        A city dressed in
        <br />
        <em>golden mornings.</em>
      </>
    ),
    copy:
      'Find the little rituals and landmark pandals that make the season feel like home.',
  },
  {
    image: '/images/puja-darshan.jpg',
    eyebrow: 'A MOMENT OF DARSHAN',
    bengali: 'মায়ের আশীর্বাদ',
    title: (
      <>
        Keep every
        <br />
        <em>beautiful moment.</em>
      </>
    ),
    copy:
      'Plan less, feel more. Dhaker Tal keeps your Pujo close from first stop to last.',
  },
  {
    image: '/images/puja-shubho.jpg',
    eyebrow: 'THE RHYTHM CONTINUES',
    bengali: 'শুভ মহালয়া',
    title: (
      <>
        One city. A thousand
        <br />
        <em>ways to celebrate.</em>
      </>
    ),
    copy:
      'Your personal guide to the places, people and pulse of Pujo.',
  },
  {
    image: '/images/puja-agomoni.jpg',
    eyebrow: 'MAA ASCHHEN',
    bengali: 'মা আসছেন',
    title: (
      <>
        This Pujo, follow
        <br />
        <em>your own beat.</em>
      </>
    ),
    copy:
      'Save the places you love and let the city lead you somewhere unforgettable.',
  },
] as const

/* =========================================================
   PUJA CALENDAR
   ========================================================= */

const pujaDays = [
  {
    bangla: 'মহালয়া',
    english: 'Mahalaya',
    date: '10 Oct',
    weekday: 'Saturday',
    shortDate: '10',
    isoDate: '2026-10-10',
    note: 'The first call of Pujo',
    start: '2026-10-10T00:00:00+05:30',
    eyebrow: 'THE BEGINNING',
    featured: true,
    timings: ['The beginning of the festive season'],
  },
  {
    bangla: 'মহা পঞ্চমী',
    english: 'Maha Panchami',
    date: '16 Oct',
    weekday: 'Friday',
    shortDate: '16',
    isoDate: '2026-10-16',
    note: 'The city starts glowing',
    start: '2026-10-16T00:00:00+05:30',
    eyebrow: 'THE FESTIVITIES BEGIN',
    featured: true,
    timings: ['Tithi ends: 1:42 PM · 16 Oct (Maha Shasthi begins)'],
  },
  {
    bangla: 'মহা ষষ্ঠী',
    english: 'Maha Shasthi',
    date: '16 Oct',
    weekday: 'Friday',
    shortDate: '16',
    isoDate: '2026-10-16',
    note: 'Bodhon, Adhivas and the welcome of Maa',
    start: '2026-10-16T00:00:00+05:30',
    eyebrow: 'THE WELCOME',
    featured: false,
    timings: [
      'Tithi begins: 1:42 PM · 16 Oct (Maha Panchami ends)',
      'Tithi ends: 5:55 AM · 17 Oct (Maha Saptami begins)',
      'Bodhon / Adhivas: Friday evening',
    ],
  },
  {
    bangla: 'মহা সপ্তমী',
    english: 'Maha Saptami',
    date: '18 Oct',
    weekday: 'Sunday',
    shortDate: '18',
    isoDate: '2026-10-18',
    note: 'Kola Bou Snan and the morning rituals',
    start: '2026-10-18T00:00:00+05:30',
    eyebrow: 'THE CITY AWAKES',
    featured: false,
    timings: [
      'Tithi begins: 5:55 AM · 17 Oct (Maha Shasthi ends)',
      'Tithi ends: 8:29 AM · 18 Oct (Maha Ashtami begins)',
      'Kola Bou Snan: Sunday morning',
    ],
  },
  {
    bangla: 'মহা অষ্টমী',
    english: 'Maha Ashtami',
    date: '19 Oct',
    weekday: 'Monday',
    shortDate: '19',
    isoDate: '2026-10-19',
    note: 'Anjali, Kumari Puja and Sandhi Puja',
    start: '2026-10-19T00:00:00+05:30',
    eyebrow: 'THE HEART OF PUJO',
    featured: true,
    timings: [
      'Tithi begins: 8:29 AM · 18 Oct (Maha Saptami ends)',
      'Tithi ends: 10:51 AM · 19 Oct (Maha Navami begins)',
      'Kumari Puja: 9:00 AM onwards · 19 Oct',
      'Sandhi Puja: 10:27–11:15 AM · 19 Oct',
    ],
  },
  {
    bangla: 'মহা নবমী',
    english: 'Maha Navami',
    date: '20 Oct',
    weekday: 'Tuesday',
    shortDate: '20',
    isoDate: '2026-10-20',
    note: 'The city glows late into the night',
    start: '2026-10-20T00:00:00+05:30',
    eyebrow: 'THE NIGHT',
    featured: false,
    timings: [
      'Tithi begins: 10:51 AM · 19 Oct (Maha Ashtami ends)',
      'Tithi ends: 12:51 PM · 20 Oct (Vijaya Dashami begins)',
    ],
  },
  {
    bangla: 'বিজয়া দশমী',
    english: 'Vijaya Dashami',
    date: '21 Oct',
    weekday: 'Wednesday',
    shortDate: '21',
    isoDate: '2026-10-21',
    note: 'Farewell to Maa; carry the spirit of Bijoya forward',
    start: '2026-10-21T00:00:00+05:30',
    eyebrow: 'THE FAREWELL',
    featured: false,
    timings: [
      'Tithi begins: 12:51 PM · 20 Oct (Maha Navami ends)',
      'Tithi ends: 2:12 PM · 21 Oct',
    ],
  },
] as const

/* =========================================================
   FAQ
   ========================================================= */

const faqs = [
  [
    'What is Dhaker Tal?',
    'A thoughtful guide to experiencing Durga Puja across Kolkata — from landmark pandals and neighbourhood rituals to food, routes and the little moments between them.',
  ],
  [
    'Can I plan a route?',
    'Yes. Save pandals, discover essentials nearby and build a route that works for the way you want to celebrate. Dhaker Tal is designed around how you actually move through the city.',
  ],
  [
    'Is it only for Kolkata?',
    'The first edition is proudly Kolkata-first, made for the city that turns Puja into a living work of art. The experience is built around Kolkata streets, pandals and neighbourhoods.',
  ],
  [
    'Is Dhaker Tal available on the app stores?',
    'Dhaker Tal is available on Google Play. The Apple App Store version is still under development and will be announced when it is ready.',
  ],
] as const

/* =========================================================
   APP PREVIEWS
   ========================================================= */

const appPreviews = [
  [
    '/images/app-metro-map.jpg',
    'Move smarter',
    'Metro-aware routes across the city',
  ],
  [
    '/images/app-pandal-map.jpg',
    'Find pandals',
    'Every neighbourhood, at a glance',
  ],
  [
    '/images/app-pandal-map-detail.jpg',
    'See the details',
    'Live map clusters and stops',
  ],
  [
    '/images/app-explore.jpg',
    'Explore nearby',
    'Food, heritage and essentials',
  ],
  [
    '/images/app-route.jpg',
    'Build your route',
    'Your night, planned beautifully',
  ],
  [
    '/images/app-groups.jpg',
    'Celebrate together',
    'Make plans with your Pujo group',
  ],
] as const

/* =========================================================
   PUJO GALLERY
   ========================================================= */

const pujoGallery = [
  {
    image: '/images/pujo1.jpeg',
    number: '01',
    title: 'The quiet before',
    bengali: 'পুজোর আগের মুহূর্ত',
  },
  {
    image: '/images/pujo2.jpeg',
    number: '02',
    title: 'Where the city gathers',
    bengali: 'শহর যেখানে এক হয়',
  },
  {
    image: '/images/pujo3.jpeg',
    number: '03',
    title: 'Sacred details',
    bengali: 'শ্রদ্ধার ছোট ছোট মুহূর্ত',
  },
  {
    image: '/images/pujo4.jpeg',
    number: '04',
    title: 'In the glow',
    bengali: 'আলোর ছোঁয়ায়',
  },
  {
    image: '/images/pujo5.jpeg',
    number: '05',
    title: 'Faces of Pujo',
    bengali: 'পুজোর মুখগুলো',
  },
  {
    image: '/images/pujo6.jpeg',
    number: '06',
    title: 'The rhythm',
    bengali: 'ছন্দের মধ্যে',
  },
  {
    image: '/images/pujo7.jpeg',
    number: '07',
    title: 'A city in celebration',
    bengali: 'উৎসবে শহর',
  },
  {
    image: '/images/pujo8.jpeg',
    number: '08',
    title: 'One beautiful evening',
    bengali: 'একটি সুন্দর সন্ধ্যা',
  },
] as const

/* =========================================================
   TYPES
   ========================================================= */

type Countdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/* =========================================================
   COUNTDOWN
   ========================================================= */

function getCountdown(targetTime: number): Countdown {
  const remaining = Math.max(0, targetTime - Date.now())

  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor(remaining / 3600000) % 24,
    minutes: Math.floor(remaining / 60000) % 60,
    seconds: Math.floor(remaining / 1000) % 60,
  }
}

function getActiveMilestone(now: number) {
  const next = countdownMilestones.find(
    (milestone) =>
      new Date(milestone.end).getTime() > now,
  )

  if (!next) {
    return {
      label: PUJA_FAREWELL,
      targetTime: new Date(
        countdownMilestones[
          countdownMilestones.length - 1
        ].end,
      ).getTime(),
    }
  }

  return {
    label: `Count down to ${next.label}`,
    targetTime: new Date(next.end).getTime(),
  }
}

/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function useReveal() {
  useEffect(() => {
    const elements =
      document.querySelectorAll<HTMLElement>('[data-reveal]')

    if (!elements.length) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) {
      elements.forEach((element) => {
        element.classList.add('is-visible')
      })

      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -70px 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])
}

/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

function useScrollProgress() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) return

    let raf = 0

    const update = () => {
      raf = 0

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight

      if (scrollable <= 0) return

      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / scrollable),
      )

      document.documentElement.style.setProperty(
        '--scroll-progress',
        String(progress),
      )
    }

    const onScroll = () => {
      if (!raf) {
        raf = window.requestAnimationFrame(update)
      }
    }

    update()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)

      if (raf) {
        window.cancelAnimationFrame(raf)
      }
    }
  }, [])
}

/* =========================================================
   GALLERY PARALLAX
   ========================================================= */

function useGalleryParallax() {
  useEffect(() => {
    const cards =
      document.querySelectorAll<HTMLElement>(
        '[data-gallery-card]',
      )

    if (!cards.length) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) return

    let raf = 0

    const update = () => {
      raf = 0

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()

        if (
          rect.bottom < -150 ||
          rect.top > window.innerHeight + 150
        ) {
          return
        }

        const center =
          rect.top + rect.height / 2

        const progress =
          (center - window.innerHeight / 2) /
          window.innerHeight

        const amount = Math.max(
          -1,
          Math.min(1, progress),
        )

        card.style.setProperty(
          '--gallery-shift',
          `${amount * -14}px`,
        )
      })
    }

    const onScroll = () => {
      if (!raf) {
        raf = window.requestAnimationFrame(update)
      }
    }

    update()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)

      if (raf) {
        window.cancelAnimationFrame(raf)
      }
    }
  }, [])
}

/* =========================================================
   COUNTDOWN COMPONENT
   ========================================================= */

function CountdownValues({
  timer,
  className = '',
}: {
  timer: Countdown
  className?: string
}) {
  const values = [
    ['days', timer.days],
    ['hours', timer.hours],
    ['minutes', timer.minutes],
    ['seconds', timer.seconds],
  ] as const

  return (
    <div className={className}>
      {values.map(([label, value]) => (
        <div key={label}>
          <strong>
            {String(value).padStart(2, '0')}
          </strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

/* =========================================================
   PAGE
   ========================================================= */

export default function Page() {
  useReveal()
  useGalleryParallax()
  useScrollProgress()

  const [menuOpen, setMenuOpen] = useState(false)
  const [slide, setSlide] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const [timer, setTimer] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [heroTimer, setHeroTimer] =
    useState<Countdown>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })

  const [heroLabel, setHeroLabel] = useState(
    'Count down to Maha Panchami',
  )

  const [bigLabel, setBigLabel] = useState(
    'MAHA PANCHAMI',
  )

  const [now, setNow] = useState(0)

  /* =======================================================
     CLOCK + HERO
     ======================================================= */

  useEffect(() => {
    const update = () => {
      const currentTime = Date.now()
      const active =
        getActiveMilestone(currentTime)

      setTimer(getCountdown(active.targetTime))
      setHeroTimer(
        getCountdown(active.targetTime),
      )
      setHeroLabel(active.label)
      setBigLabel(
        active.label === PUJA_FAREWELL
          ? 'VIJAYA DASHAMI'
          : active.label.toUpperCase(),
      )
      setNow(currentTime)
    }

    update()

    const clock = window.setInterval(
      update,
      1000,
    )

    const rotation = window.setInterval(() => {
      setSlide(
        (current) =>
          (current + 1) % heroSlides.length,
      )
    }, 6500)

    return () => {
      window.clearInterval(clock)
      window.clearInterval(rotation)
    }
  }, [])

  /* =======================================================
     MOBILE MENU
     ======================================================= */

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      document.body.style.overflow = ''

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [menuOpen])

  const currentSlide = heroSlides[slide]

  return (
    <main className="site">

      {/* =================================================
          GLOBAL SCROLL PROGRESS
          ================================================= */}

      <div
        className="scroll-progress"
        aria-hidden="true"
      />

      {/* =================================================
          NAVIGATION
          ================================================= */}

      <header className="nav-shell">
        <a
          className="brand"
          href="#top"
          aria-label="Dhaker Tal home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-bengali">
            ঢাকের তাল
          </span>

          <span className="brand-english">
            DHAKER TAL
          </span>
        </a>

        <nav
          id="main-navigation"
          className={
            menuOpen
              ? 'nav-links nav-links-open'
              : 'nav-links'
          }
          aria-label="Main navigation"
          onClick={(event) => {
            const target =
              event.target as HTMLElement

            if (target.closest('a')) {
              setMenuOpen(false)
            }
          }}
        >
          <a href="#app">The app</a>
          <a href="#calendar">Puja calendar</a>
          <a href="#gallery">Gallery</a>
          <a href="#discover">Discover</a>
          <a href="#faq">FAQ</a>

          <a
            className="nav-cta"
            href={APP_URL}
          >
            Open Dhaker Tal
            <ArrowUpRight />
          </a>
        </nav>

        <button
          className="menu-button"
          type="button"
          onClick={() =>
            setMenuOpen(
              (value) => !value,
            )
          }
          aria-label={
            menuOpen
              ? 'Close navigation'
              : 'Open navigation'
          }
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* =================================================
          HERO
          ================================================= */}

      <section
        className="hero"
        id="top"
      >
        <div
          className="hero-slides"
          aria-hidden="true"
        >
          {heroSlides.map(
            (item, index) => (
              <div
                key={item.image}
                className={
                  index === slide
                    ? 'hero-background is-active'
                    : 'hero-background'
                }
                style={{
                  backgroundImage:
                    `url("${item.image}")`,
                }}
              />
            ),
          )}
        </div>

        <div className="hero-overlay" />
        <div className="hero-grain" />

        <div className="hero-content page-width">
          <div
            className="hero-copy"
            key={currentSlide.image}
          >
            <p className="eyebrow">
              <span />
              {currentSlide.eyebrow}
            </p>

            <p className="greeting">
              {currentSlide.bengali}
            </p>

            <h1>
              {currentSlide.title}
            </h1>

            <p className="hero-description">
              {currentSlide.copy}
            </p>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href={APP_URL}
              >
                Explore the app
                <ArrowRight />
              </a>

              <a
                className="text-link"
                href="#calendar"
              >
                Puja 2026
                <ArrowDown />
              </a>
            </div>

            <div
              className="hero-countdown"
              aria-label={heroLabel}
            >
              <p>{heroLabel}</p>

              <span>
                <strong>
                  {String(
                    heroTimer.days,
                  ).padStart(2, '0')}
                </strong>
                <small>days</small>
              </span>

              <span>
                <strong>
                  {String(
                    heroTimer.hours,
                  ).padStart(2, '0')}
                </strong>
                <small>hours</small>
              </span>

              <span>
                <strong>
                  {String(
                    heroTimer.minutes,
                  ).padStart(2, '0')}
                </strong>
                <small>minutes</small>
              </span>

              <span>
                <strong>
                  {String(
                    heroTimer.seconds,
                  ).padStart(2, '0')}
                </strong>
                <small>seconds</small>
              </span>
            </div>
          </div>
        </div>

        <div
          className="hero-progress"
          aria-hidden="true"
        >
          {heroSlides.map(
            (item, index) => (
              <span
                key={item.image}
                className={
                  index === slide
                    ? 'active'
                    : ''
                }
              />
            ),
          )}
        </div>
      </section>

      {/* =================================================
          COUNTDOWN
          ================================================= */}

      <section className="countdown-section">
        <div
          className="countdown-inner page-width"
          data-reveal
        >
          <div>
            <p className="section-kicker">
              COUNTDOWN TO {bigLabel}
            </p>

            <h2>
              আগমনের অপেক্ষা।
            </h2>
          </div>

          <CountdownValues
            timer={timer}
            className="countdown"
          />
        </div>
      </section>

      {/* =================================================
          APP
          ================================================= */}

      <section
        className="app-section section-pad"
        id="app"
      >
        <div className="app-layout page-width">

          <div
            className="app-intro"
            data-reveal
          >
            <p className="section-kicker">
              01 / THE DHAKER TAL APP
            </p>

            <h2>
              পুজো এবার
              <br />
              <em>
                আপনার পকেটে।
              </em>
            </h2>

            <p>
              Save pandals, find essentials,
              and never lose the beat. Made
              for your best Pujo day yet.
            </p>

            <a
              className="button button-primary"
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Dhaker Tal
              <ArrowUpRight />
            </a>

            <small className="app-note">
              Available on Google Play
            </small>
            <span className="app-note" aria-label="Apple App Store coming soon">
              Apple App Store · Coming soon
            </span>
            <a
              className="text-link"
              href={WEBSITE_URL}
              target="_blank"
              rel="noreferrer"
            >
              Visit the website
              <ArrowUpRight />
            </a>
          </div>

          <div
            className="app-gallery"
            data-reveal
            aria-label="Dhaker Tal app previews"
          >
            {appPreviews.map(
              (
                [src, title, detail],
                index,
              ) => (
                <article
                  className="app-preview"
                  key={src}
                >
                  <div className="app-screen">
                    <Image
                      src={src}
                      alt={`${title}: ${detail}`}
                      width={582}
                      height={1214}
                      sizes="
                        (max-width: 600px) 72vw,
                        (max-width: 900px) 31vw,
                        245px
                      "
                      priority={index === 0}
                    />
                  </div>

                  <div className="preview-caption">
                    <span>
                      {String(
                        index + 1,
                      ).padStart(2, '0')}
                    </span>

                    <strong>
                      {title}
                    </strong>

                    <small>
                      {detail}
                    </small>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          DISCOVER
          ================================================= */}

      <section
        className="intro section-pad"
        id="discover"
      >
        <div className="page-width">

          <p
            className="section-kicker"
            data-reveal
          >
            02 / THE CITY, IN RHYTHM
          </p>

          <div
            className="intro-grid"
            data-reveal
          >
            <h2>
              Every lane has a story.
              <br />
              <em>
                Every beat leads somewhere.
              </em>
            </h2>

            <div>
              <p className="large-copy">
                Dhaker Tal is your pocket
                guide to the pandals,
                people, rituals and happy
                detours that make Kolkata
                come alive.
              </p>

              <a
                className="text-link"
                href={APP_URL}
              >
                Discover the app
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          PREMIUM PUJA CALENDAR
          ================================================= */}

      <section
        className="calendar-section section-pad"
        id="calendar"
      >
        <div className="page-width">

          <div
            className="section-heading calendar-heading"
            data-reveal
          >
            <div>
              <p className="section-kicker">
                03 / THE DAYS THAT MAKE THE SEASON
              </p>

              <h2>
                দশটি দিন।
                <br />
                <em>
                  একটাই ছন্দ।
                </em>
              </h2>
            </div>

            <p>
              From Mahalaya to Vijaya Dashami, explore each important date,
              tithi end time and key ritual in one carefully organised guide.
            </p>
          </div>

          <div
            className="premium-calendar"
            data-reveal
          >
            {/* CALENDAR HEADER */}

            <div className="calendar-topline">
              <div>
                <span>
                  THE PUJA EDITION
                </span>

                <strong>
                  10—21 OCT
                </strong>

                <small>
                  2026 / KOLKATA
                </small>
              </div>

              <div className="calendar-mark">
                <span />
                <span />
                <span />
              </div>
            </div>

            <p className="calendar-timings-note">
              All ritual timings are shown in Indian Standard Time (IST).
              Tithi boundaries can differ slightly by panjika tradition;
              follow your family or puja committee's local almanac for rituals.
            </p>

            {/* TIMELINE */}

            <div className="calendar-timeline" />

            {/* DAYS */}

            <div className="premium-calendar-grid">
              {pujaDays.map(
                (
                  day,
                  index,
                ) => {
                  // Calendar dates and event statuses are based on Kolkata time (IST).
                  const kolkataDate = new Intl.DateTimeFormat('en-CA', {
                    timeZone: 'Asia/Kolkata',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }).format(new Date(now))
                  const started = kolkataDate >= day.isoDate
                  const active = kolkataDate === day.isoDate

                  return (
                    <a
                      href={APP_URL}
                      key={day.english}
                      className={[
                        'calendar-card',
                        day.featured
                          ? 'calendar-card-featured'
                          : '',
                        !started
                          ? 'calendar-card-upcoming'
                          : '',
                        active
                          ? 'calendar-card-current'
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <div className="calendar-card-top">
                        <span>
                          {String(
                            index + 1,
                          ).padStart(2, '0')}
                        </span>

                        <span className="calendar-status">
                          {active
                            ? 'NOW'
                            : day.english}
                        </span>
                      </div>

                      <div className="calendar-date-orb">
                        <strong>
                          {day.shortDate}
                        </strong>

                        <small>
                          OCT
                        </small>
                      </div>

                      <div className="calendar-card-copy">
                        <small>
                          {day.eyebrow}
                        </small>

                        <h3>
                          {day.bangla}
                        </h3>

                        <strong>
                          {day.english}
                        </strong>

                        <p>
                          {day.note}
                        </p>

                        <ul className="calendar-timings">
                          {day.timings.map((timing) => (
                            <li key={timing}>{timing}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="calendar-card-footer">
                        <time dateTime={day.isoDate}>
                          <span>{day.weekday}</span> · {day.date}
                        </time>

                        <span className="calendar-arrow">
                          <ArrowUpRight />
                        </span>
                      </div>
                    </a>
                  )
                },
              )}
            </div>

            {/* FEATURED MESSAGE */}

            <a
              className="calendar-spotlight"
              href={APP_URL}
            >
              <div className="spotlight-symbol">
                <span />
                <span />
                <span />
              </div>

              <div className="spotlight-content">
                <p className="section-kicker">
                  THE HEART OF THE FESTIVAL
                </p>

                <h3>
                  অষ্টমীর সকাল,
                  <br />
                  <em>
                    শহর জুড়ে অঞ্জলি।
                  </em>
                </h3>
              </div>

              <span className="spotlight-link">
                Explore the calendar
                <ArrowRight />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* =================================================
          PUJO GALLERY
          ================================================= */}

      <section
        className="pujo-gallery-section section-pad"
        id="gallery"
      >
        <div className="gallery-orb gallery-orb-one" />
        <div className="gallery-orb gallery-orb-two" />

        <div className="page-width">

          <div
            className="gallery-heading"
            data-reveal
          >
            <div>
              <p className="section-kicker">
                04 / MOMENTS OF PUJO
              </p>

              <p className="gallery-bengali">
                শহরের আলো, মানুষের মুখ,
                <br />
                পুজোর সেই মুহূর্তগুলো।
              </p>

              <h2>
                Pujo,
                <br />
                <em>
                  as it feels.
                </em>
              </h2>
            </div>

            <div className="gallery-intro-copy">
              <p>
                Eight frames from the rhythm
                of Kolkata — the lights, the
                people and the quiet moments
                between the crowds.
              </p>

              <div className="gallery-credit">
                <span>
                  PHOTOGRAPHY
                </span>

                <strong>
                  SHREEDYUTI
                </strong>
              </div>
            </div>
          </div>

          <div
            className="pujo-gallery"
            data-reveal
          >
            {pujoGallery.map(
              (
                {
                  image,
                  number,
                  title,
                  bengali,
                },
                index,
              ) => (
                <article
                  className={`pujo-card pujo-card-${index + 1}`}
                  key={image}
                  data-gallery-card
                >
                  <div className="pujo-card-image">

                    <Image
                      src={image}
                      alt={`${title} — ${bengali}. Photography by Shreedyuti.`}
                      width={1200}
                      height={1600}
                      sizes="
                        (max-width: 600px) 92vw,
                        (max-width: 900px) 45vw,
                        30vw
                      "
                      loading={
                        index === 0
                          ? 'eager'
                          : 'lazy'
                      }
                    />

                    <div className="pujo-card-wash" />
                    <div className="pujo-card-glow" />

                    <div className="pujo-glass">
                      <span>
                        {number}
                      </span>

                      <ArrowUpRight />
                    </div>

                    <div className="pujo-card-copy">
                      <small>
                        {bengali}
                      </small>

                      <strong>
                        {title}
                      </strong>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>

          <div
            className="gallery-footer"
            data-reveal
          >
            <span>
              08 MOMENTS
            </span>

            <p>
              Captured in Kolkata
            </p>

            <strong>
              Photography by Shreedyuti
            </strong>
          </div>
        </div>
      </section>

      {/* =================================================
          CINEMATIC
          ================================================= */}

      <DurgaCinematic />

      {/* =================================================
          FAQ
          ================================================= */}

      <section
        className="faq-section section-pad page-width"
        id="faq"
      >
        <div
          className="faq-intro"
          data-reveal
        >
          <p className="section-kicker">
            06 / GOOD TO KNOW
          </p>

          <div className="faq-intro-line">
            <span />
            <span>
              BEFORE YOU BEGIN
            </span>
          </div>

          <p className="faq-bengali">
            পুজোর আগে, সব উত্তর এক জায়গায়।
          </p>

          <h2>
            Questions,
            <br />
            <em>
              answered simply.
            </em>
          </h2>

          <p className="faq-note">
            Everything you need to begin
            your Pujo with Dhaker Tal.
          </p>

          <div className="faq-decoration">
            <span>ঢ</span>
            <i />
            <span>ত</span>
          </div>
        </div>

        <div
          className="faq-list"
          data-reveal
        >
          {faqs.map(
            ([question, answer], index) => {
              const isOpen =
                openFaq === index

              const answerId =
                `faq-answer-${index}`

              return (
                <div
                  className={
                    isOpen
                      ? 'faq-item active'
                      : 'faq-item'
                  }
                  key={question}
                >
                  <button
                    type="button"
                    className="faq-trigger"
                    onClick={() =>
                      setOpenFaq(
                        (value) =>
                          value === index
                            ? null
                            : index,
                      )
                    }
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className="faq-number">
                      {String(
                        index + 1,
                      ).padStart(2, '0')}
                    </span>

                    <span className="faq-question">
                      {question}
                    </span>

                    <span className="faq-toggle">
                      <ChevronDown />
                    </span>
                  </button>

                  <div
                    className="faq-answer"
                    id={answerId}
                  >
                    <div className="faq-answer-inner">
                      <span className="faq-answer-rule" />

                      <p>
                        {answer}
                      </p>

                      <a
                        href={APP_URL}
                        className="faq-answer-link"
                      >
                        Discover Dhaker Tal
                        <ArrowUpRight />
                      </a>
                    </div>
                  </div>
                </div>
              )
            },
          )}
        </div>
      </section>

      {/* =================================================
          FINAL CTA
          ================================================= */}

      <section
        className="final-cta section-pad"
        data-reveal
      >
        <div className="cta-glow" />

        <div className="cta-orbit cta-orbit-one" />
        <div className="cta-orbit cta-orbit-two" />

        <Sparkles />

        <p className="greeting">
          এবার পুজো হোক নিজের মতো
        </p>

        <h2>
          Follow the beat.
        </h2>

        <p>
          Step into Kolkata’s biggest
          celebration with Dhaker Tal.
        </p>

        <a
          className="button button-light"
          href={APP_URL}
        >
          Open the app
          <ArrowUpRight />
        </a>
      </section>

      {/* =================================================
          FOOTER
          ================================================= */}

      <footer className="site-footer">
        <div className="footer-inner page-width">

          <a
            className="footer-brand"
            href="#top"
            aria-label="Back to top"
          >
            <span className="logo-glass">
              <Image
                src="/images/dhaker-tal-logo.png"
                alt="Dhaker Tal dhak player logo"
                width={80}
                height={80}
              />
            </span>

            <span className="brand">
              <span className="brand-bengali">
                ঢাকের তাল
              </span>

              <span className="brand-english">
                DHAKER TAL
              </span>
            </span>
          </a>

          <div className="contributors">
            <p>
              MADE BY THE PEOPLE OF
              DHAKER TAL
            </p>

            <a
              href="/team"
              className="text-link"
            >
              Meet the team
              <ArrowUpRight />
            </a>
          </div>

          <a
            className="text-link footer-top"
            href="#top"
          >
            Back to top
            <ArrowUpRight />
          </a>
        </div>
      </footer>
    </main>
  )
}
