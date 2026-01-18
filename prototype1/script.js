import * as THREE from "three"

/**********
** SCENE **
***********/

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('lightBlue')
// Camera
const camera = new THREE.PerspectiveCamera(
    75, //field of view
    window.innerWidth / window.innerHeight, //aspect ratio
    0.1, //how close you (the camera) can see
    100 //how far you (the camera) can see
)
scene.add(camera)
camera.position.set(0, 0, 5) //x, y, z

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

/***********
** MESHES **
************/

// testSphere
const sphereGeometry = new THREE.SphereGeometry(1) //1 is the radius
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)


/*******************
** ANIMATION LOOP **
********************/

const clock = new THREE.Clock()

const animation = () => {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate testSphere
    testSphere.position.y = Math.sin(elapsedTime)

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation();