import { browser } from '$app/environment'
import * as THREE from 'three'

if(browser) {
    const canvas = document.getElementById('canvas')

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)

    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    function render() {
        renderer.render(scene, camera)
    }

    function animate() {
        render()
        requestAnimationFrame(animate)
    }
    animate()
}