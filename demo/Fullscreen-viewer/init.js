// 变量
let renderer
let scene
let camera, camera2
let controls
let stats
let mesh
let cameraHelper

let fov = 45,
    aspect = window.innerWidth / window.innerHeight,
    near = 0.1,
    far = 1000,
    zPos = 500

// 初始化渲染器
function initRenderer() {
    renderer = new THREE.WebGLRenderer({
        antialias: true, // antialias属性：抗锯齿效果为设置有效
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight) // canvas 的大小
    document.body.appendChild(renderer.domElement)
}

// 初始化场景
function initScene() {
    scene = new THREE.Scene()
    scene.background = new THREE.Color('#000')
}

// 初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(-0.5, 0, 0)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
}

// 初始化光源
function initLight() {
    // 环境光
    scene.add(new THREE.AmbientLight(0xffffff, 1))

    light = new THREE.SpotLight(0xffffff, 1)
    light.position.set(15, 109, 50)
    light.shadow.camera.near = 10
    light.shadow.camera.far = 250

    // 告诉平行光需要开启阴影投射
    light.castShadow = true
    scene.add(light)
}

// 为球体添加图片
function addImg(url) {
    const texture = THREE.ImageUtils.loadTexture(url) // 将图像加载为纹理，然后将纹理赋给材质的map属性，
    const material = new THREE.MeshLambertMaterial({ map: texture })
    material.side = THREE.DoubleSide
    const geometry = new THREE.SphereGeometry(3, 25, 25)
    geometry.scale(-1, 1, 1) // 翻转重合面朝内
    return new THREE.Mesh(geometry, material)
}

// 初始化模型
function initModal() {
    // 球体带材质
    mesh = addImg('./1.jpg')
    scene.add(mesh)
}

function changeFullImg(type) {
    scene.remove(mesh)
    mesh = addImg(`./${type}.jpg`)
    scene.add(mesh)
}

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement)
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true
    //是否自动旋转
    controls.autoRotate = false
    //缩放最小值
    controls.minDistance = 0
    //缩放最大值
    controls.maxDistance = 1000
    //是否开启右键拖拽
    controls.enablePan = true
}

// 渲染生成出canvas
function render() {
    renderer.render(scene, camera)
}

// 窗口变动触发的函数
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

// 开始执行动画
function animate() {
    //更新控制器
    render()
    //更新性能插件
    stats.update()
    controls.update()
    requestAnimationFrame(animate)
}

// 初始化性能插件
function initStats() {
    stats = new Stats()
    document.body.appendChild(stats.dom)
}

// 初始化Threejs
function initThree() {
    initRenderer()
    initScene()
    initCamera()
    initLight()
    initControls()
    initModal()
    initStats()
    animate()

    window.onresize = onWindowResize
}
