import { browser } from '$app/environment'
import * as THREE from 'three'
import { OrbitControls, TextGeometry, FontLoader } from 'three/examples/jsm/Addons.js'

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
        if(camera.position.z >= 76) {
            scene.traverse((object) => {
                if(object.name === 'textTyrin' || object.name === 'outlineTextTyrin') {
                    if(object.position.x <= -80) return
                    object.position.x -= 2
                    console.log(object.position)
                }
            })
        }
        scene.traverse((object) => {
            if(object.name === 'textTyrin' || object.name === 'outlineTextTyrin' && camera.position.y === 0) {
                object.rotation.x = 0
            }
        })
        console.log(camera.position)
    }      
      
    document.body.addEventListener('wheel', () => {
        moveCamera()
    }, {passive: false})

    document.body.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();
    
        renderer.setSize(window.innerWidth, window.innerHeight);
    })

    // 3D text

    const fontLoader = new FontLoader()
    fontLoader.load('/Gerhaus_Regular.json', (json) => {

        const text = new THREE.Mesh(
            new TextGeometry('TYRIN', {
                font: json,
                size: 10,
                height: 3,
                curveSegments: 12,
            }),
            new THREE.MeshBasicMaterial({color: 0xffffff})
        )
        const textOutline = new THREE.Mesh(
            new TextGeometry('TYRN', {
                font: json,
                size: 11,
                height: 4,
                curveSegments: 12,
                bevelEnabled: true,
                bevelSize: 1,
                bevelThickness: 1
            }),
            new THREE.MeshBasicMaterial({color: 0x000000})
        )
        text.position.x -= 20
        text.position.z -= 1 
        text.rotation.x = -0.5
        text.name = 'textTyrin'
        textOutline.name = 'outlineTextTyrin'
        textOutline.rotation.x = -0.5
        textOutline.position.x -= 21.5
        textOutline.position.z -= 4
        
        scene.add(...[text, textOutline])
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