import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

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
    sizes.aspectRatio,
    0.1, //how close you (the camera) can see
    100 //how far you (the camera) can see
)
scene.add(camera)
camera.position.set(0, 3, -5) //x, y, z
//orbit controls wont work if camera is at 0,0,0

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
// Icosahedron
const icoGeometry = new THREE.IcosahedronGeometry(1) //1 is the radius
const icoMaterial = new THREE.MeshNormalMaterial()
const ico = new THREE.Mesh(icoGeometry, icoMaterial)

scene.add(ico)

// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI * 0.5

scene.add(plane);

/*******
** UI **
********/
// UI
const ui = new dat.GUI()

// UI Object
const uiObject = {
    speed: 1,
    distance: 1,
    rotationSpeed: 1
}

// plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder
    .add(planeMaterial, 'wireframe')
    .name("Toggle Wireframe")

// Icosahedron UI
const icoFolder = ui.addFolder('Icosahedron')

icoFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name("Speed")

icoFolder
    .add(uiObject, 'distance')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name("Distance")

icoFolder
    .add(uiObject, 'rotationSpeed')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name("Rotation")

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Icosahedron
    ico.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance //vertical position

    ico.rotation.y = elapsedTime * uiObject.rotationSpeed
    ico.rotation.x = elapsedTime * uiObject.rotationSpeed

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation();