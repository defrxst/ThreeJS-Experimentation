import { browser } from '$app/environment'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

if(browser) {
    const canvas = document.getElementById('canvas')

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.enableDamping = true
    controls.enableZoom = false
    controls.enablePan = false

    camera.position.setZ(30)
    camera.position.setY(40)

    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    function moveCamera() {
        camera.position.y -= 1
      }      

    document.body.addEventListener('scroll', moveCamera)
      

    const grid = new THREE.GridHelper(5000, 200)
    scene.add(grid)

    function render() {
        renderer.render(scene, camera)
        controls.update()
    }

    function animate() {
        render()
        requestAnimationFrame(animate)
    }
    animate()
}  