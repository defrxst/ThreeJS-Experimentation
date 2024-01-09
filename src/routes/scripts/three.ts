import { browser } from '$app/environment'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

if(browser) {
    const canvas = document.getElementById('canvas')

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({antialias: true})
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.enableDamping = true
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableRotate = false

    camera.position.z = 40
    camera.position.y = 30

    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    
    const grid = new THREE.GridHelper(999, 40)
    scene.add(grid)

    function moveCamera() {
        if(camera.position.y <= 5) {
            camera.position.z += 3
        } else {
            camera.position.y -= 2
        }
    }      
      
    document.body.addEventListener('wheel', moveCamera, {passive: false})

    document.body.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();
    
        renderer.setSize(window.innerWidth, window.innerHeight);
    })

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