import { browser } from '$app/environment'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'

if(browser) {
    const canvas = document.getElementById('canvas')

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    
    camera.position.z = 20
    camera.position.y = 5

    renderer.setSize(window.innerWidth, window.innerHeight)

    const controls = new OrbitControls(camera, renderer.domElement)

    controls.enablePan = false
    controls.maxDistance = 100
    controls.minDistance = 40
    controls.enableDamping = true

    document.body.appendChild(renderer.domElement)


    const grid = new THREE.GridHelper(500, 20)
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