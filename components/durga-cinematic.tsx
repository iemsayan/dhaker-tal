'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// One self-contained sequence: the scroll position is the camera position.
export function DurgaCinematic() {
  const rootRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = rootRef.current; const canvas = canvasRef.current
    if (!root || !canvas) return
    const compact = window.matchMedia('(max-width: 720px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x17070b, .11)
    const camera = new THREE.PerspectiveCamera(compact ? 42 : 34, 1, .1, 30)
    camera.position.set(.15, 0, 7.8)
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !compact, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.25 : 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const world = new THREE.Group(); scene.add(world)
    scene.add(new THREE.AmbientLight(0xffd6a4, 1.15))
    const warmKey = new THREE.PointLight(0xffa548, 5.5, 12); warmKey.position.set(-2.7, 2.6, 3.5); scene.add(warmKey)
    const redRim = new THREE.PointLight(0xca2f27, 4.5, 10); redRim.position.set(3, -.5, 2); scene.add(redRim)

    const loader = new THREE.TextureLoader()
    const texture = loader.load('/images/puja-cinematic.jpg')
    texture.colorSpace = THREE.SRGBColorSpace
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: .92 })
    const image = new THREE.Mesh(new THREE.PlaneGeometry(8.3, 4.67), material)
    image.position.set(.32, 0, 0); world.add(image)
    // A second, closer composition gives the camera a foreground detail to travel through.
    const focusMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 })
    const focus = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 3.26), focusMaterial)
    focus.position.set(-.58, .12, 1.15); focus.scale.set(1.7, 1.7, 1); world.add(focus)

    const count = compact ? 75 : 210; const particles = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) { particles[i * 3] = (Math.random() - .5) * 8; particles[i * 3 + 1] = (Math.random() - .5) * 5; particles[i * 3 + 2] = Math.random() * 4 - 1 }
    const dustGeometry = new THREE.BufferGeometry(); dustGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3))
    const dustMaterial = new THREE.PointsMaterial({ color: 0xffbd68, size: compact ? .027 : .035, transparent: true, opacity: .75, depthWrite: false })
    const dust = new THREE.Points(dustGeometry, dustMaterial); scene.add(dust)

    const resize = () => {
      const width = Math.max(1, root.clientWidth)
      const height = Math.max(1, root.clientHeight)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      ScrollTrigger.refresh()
    }
    resize(); const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(root)
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'none' } })
        .to(camera.position, { x: -.5, y: .14, z: 5.65, duration: 1 })
        .to(world.rotation, { y: .08, duration: 1 }, 0)
        .to('.cinema-copy--one', { opacity: 0, y: -32, duration: .35 }, .65)
        .to('.cinema-copy--two', { opacity: 1, y: 0, duration: .35 }, .65)
        .to(focusMaterial, { opacity: .82, duration: .45 }, 1.15)
        .to(material, { opacity: .28, duration: .45 }, 1.15)
        .to(camera.position, { x: .12, y: .32, z: 3.35, duration: 1.1 })
        .to(focus.scale, { x: 2.15, y: 2.15, duration: 1.1 }, 1.35)
        .to('.cinema-copy--two', { opacity: 0, y: -32, duration: .3 }, 1.65)
        .to('.cinema-copy--three', { opacity: 1, y: 0, duration: .4 }, 1.75)
        .to(dustMaterial, { opacity: 1, size: compact ? .05 : .07, duration: .85 }, 1.8)
        .to(camera.position, { x: .32, y: .48, z: 2.3, duration: .85 })
        .to(focusMaterial, { opacity: 0, duration: .45 }, 2.5)
        .to('.cinema-copy--three', { opacity: 0, y: -26, duration: .35 }, 2.55)
      if (!reduced) ScrollTrigger.create({ trigger: root, start: 'top top', end: compact ? '+=1800' : '+=2800', pin: true, scrub: .7, animation: timeline, invalidateOnRefresh: true })
      else timeline.progress(.12)
    }, root)
    let frame = 0
    const render = (time: number) => { frame = requestAnimationFrame(render); dust.rotation.y = time * .00003; dust.position.y = Math.sin(time * .00025) * .08; renderer.render(scene, camera) }
    render(0)
    return () => { cancelAnimationFrame(frame); context.revert(); resizeObserver.disconnect(); texture.dispose(); image.geometry.dispose(); focus.geometry.dispose(); material.dispose(); focusMaterial.dispose(); dustGeometry.dispose(); dustMaterial.dispose(); renderer.dispose() }
  }, [])

  return <section className="durga-cinematic" ref={rootRef} aria-label="A scroll-controlled Durga Puja cinematic scene"><canvas ref={canvasRef} /><div className="cinema-vignette" /><div className="cinema-copy cinema-copy--one"><p className="section-kicker">04 / THE ARRIVAL</p><h2>মা আসছেন।</h2><span>SCROLL TO ENTER THE SCENE</span></div><div className="cinema-copy cinema-copy--two"><p className="section-kicker">THE RHYTHM GETS CLOSER</p><h2>আলো, ঢাক,<br /><em>আর আশীর্বাদ।</em></h2></div><div className="cinema-copy cinema-copy--three"><p className="section-kicker">A MOMENT OF DARSHAN</p><h2>Keep the feeling<br /><em>close.</em></h2></div></section>
}
