import * as THREE from "three"

/**********
** SCENE **
***********/

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('pink')
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
const sphereGeometry = new THREE.SphereGeometry()
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

// testCapsule
const capsuleGeometry = new THREE.CapsuleGeometry(0.5, 0.4)
const capsuleMaterial = new THREE.MeshNormalMaterial()
const testCapsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial)


scene.add(testSphere)
scene.add(testCapsule)


/*******************
** ANIMATION LOOP **
********************/

const clock = new THREE.Clock()

const animation = () => {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate testSphere
    testSphere.position.y = Math.sin(elapsedTime)

    // Animate testCapsule
    testCapsule.position.x = Math.cos(elapsedTime) * 2
    testCapsule.position.y = -Math.sin(elapsedTime)

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation();