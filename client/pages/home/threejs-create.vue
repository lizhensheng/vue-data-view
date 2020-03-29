<template>
    <div class="threejs-create">
        <div id="scene-container" class="container"></div>
    </div>
</template>

<script>
import * as THREE from 'three'
export default {
    name: 'ThreejsCreate',
    mounted(){
        this.init()
    },
    methods:{
        init(){
            const container = document.querySelector('#scene-container')

            const scene = new THREE.Scene()
            scene.background = new THREE.Color('skyblue')

            const fov = 35
            const aspect = container.clientWidth / container.clientHeight
            const near = 0.1
            const far = 100

            const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
            camera.position.set(0, 0, 10)

            const geometry = new THREE.BoxBufferGeometry(2, 2, 2)
            const material = new THREE.MeshPhongMaterial({color: 0x44aa88})

            const mesh = new THREE.Mesh(geometry, material)
            scene.add(mesh)

            const color = 0xFFFFFF
            const intensity = 1
            const light = new THREE.DirectionalLight(color, intensity)
            light.position.set(-1,2,4)
            scene.add(light)

            const renderer = new THREE.WebGLRenderer({ antialias: true })
            renderer.setSize(container.clientWidth, container.clientHeight)
            renderer.setPixelRatio(window.devicePixelRatio)

            container.appendChild(renderer.domElement)

            function update(){
                mesh.rotation.z += 0.01
                mesh.rotation.x += 0.01
                mesh.rotation.y += 0.01
            }

            function render(){
                renderer.render(scene, camera)
            }

            renderer.setAnimationLoop(() => {
                update()
                render()
            })

            function onWindowResize(){
                camera.aspect = container.clientWidth / container.clientHeight
                camera.updateProjectionMatrix()
                renderer.setSize(container.clientWidth, container.clientHeight)
            }

            window.addEventListener('resize', onWindowResize)
            // function animate(time){
            //     time *= 0.001
            //     mesh.rotation.x = 0.11 + time
            //     mesh.rotation.y = 0.11 + time
            //     renderer.render(scene, camera)
            //     requestAnimationFrame(animate)
            // }
            // requestAnimationFrame(animate)
        }
    }
}
</script>

<style lang="stylus" scoped>
.threejs-create{
    .container{
        width: 300px;
        height: 300px;
    }
}
</style>