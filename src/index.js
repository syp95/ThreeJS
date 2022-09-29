import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x004fff)
  // 카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 3

  // 캔버스
  // const canvas = document.querySelector('#canvas')

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 메쉬
  const geomatry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material01 = new THREE.MeshStandardMaterial({
    color: 0x999999,
  })
  const obj01 = new THREE.Mesh(geomatry01, material01)
  obj01.position.x = -1
  scene.add(obj01)

  const geomatry02 = new THREE.ConeGeometry(0.4, 0.7, 5)
  const material02 = new THREE.MeshStandardMaterial({
    color: 0x999999,
  })
  const obj02 = new THREE.Mesh(geomatry02, material02)
  scene.add(obj02)

  const geomatry03 = new THREE.IcosahedronGeometry(0.4, 0)
  const material03 = new THREE.MeshStandardMaterial({
    color: 0x999999,
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
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
