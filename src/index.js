import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  // 카메라
  const fov = 60
  const aspect = window.innerWidth / window.innerHeight
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.x = 2
  camera.position.y = 5
  camera.position.z = 3
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  // 캔버스
  // const canvas = document.querySelector('#canvas')

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  const ambientLight = new THREE.AmbientLight(0xffa500, 0.1)
  // scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(-1, 1, 1)
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  )
  scene.add(dlHelper)
  scene.add(directionalLight)

  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1)
  scene.add(hemisphereLight)

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.2
  scene.add(plane)

  // 재질
  const textureLoader = new THREE.TextureLoader()
  const textureBaseColor = textureLoader.load(
    '../static/images/Stone_Path_008_basecolor.jpg'
  )
  const textureNormal = textureLoader.load(
    '../static/images/Stone_Path_008_normal.jpg'
  )
  const textureHeight = textureLoader.load(
    '../static/images/Stone_Path_008_height.png'
  )
  const textureRoughness = textureLoader.load(
    '../static/images/Stone_Path_008_roughness.jpg'
  )
  // 메쉬
  const geomatry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material01 = new THREE.MeshStandardMaterial({
    // color: 0x999999,
    map: textureBaseColor,
    normalMap: textureNormal,
    displacementMap: textureHeight,
    displacementScale: 0.03,
    roughnessMap: textureRoughness,
    roughness: 0.5,
  })
  const obj01 = new THREE.Mesh(geomatry01, material01)
  obj01.position.x = -1
  scene.add(obj01)

  const geomatry02 = new THREE.ConeGeometry(0.4, 0.7, 5)
  const material02 = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
    metalness: 0.9,
    roughness: 0.5,

    transparent: true,
    opacity: 0.5,
  })
  const obj02 = new THREE.Mesh(geomatry02, material02)
  scene.add(obj02)

  const geomatry03 = new THREE.IcosahedronGeometry(0.4, 0)
  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormal,
    displacementMap: textureHeight,
    displacementScale: 0.03,
    roughnessMap: textureRoughness,
    roughness: 0.8,
  })
  const obj03 = new THREE.Mesh(geomatry03, material03)
  scene.add(obj03)
  obj03.position.x = 1

  document.body.appendChild(renderer.domElement)

  function render(time) {
    time *= 0.0005 // convert time to seconds

    obj01.rotation.y = time

    obj02.rotation.y = time

    obj03.rotation.y = time
    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  // 반응형

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)
} else {
  let warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
