var container
var scene, camera, renderer

window.onload = function main() {
    //添加一个div元素
    container = document.createElement('div')
    document.body.appendChild(container)

    //创建新场景
    scene = new THREE.Scene()

    //渲染
    //antialias:true增加抗锯齿效果
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(new THREE.Color(0x3399cc)) //设置窗口背景颜色为黑
    renderer.setSize(window.innerWidth, window.innerHeight) //设置窗口尺寸
    //将renderer关联到container，这个过程类似于获取canvas元素
    container.appendChild(renderer.domElement)

    perCamera()
    light()
    myScene()
    render()
}

//创建一个透视相机
function perCamera() {
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )
    camera.position.set(150, 180, 100) //设置相机位置
    camera.lookAt(scene.position) //让相机指向场景中心
}

//创建一个正交投影相机
function orthCamera() {
    camera = new THREE.OrthographicCamera(
        window.innerWidth / -10,
        window.innerWidth / 10,
        window.innerHeight / 10,
        window.innerHeight / -10,
        -100,
        400
    )
    camera.position.set(150, 180, 100) //设置相机坐标
    camera.lookAt(scene.position) //让相机指向场景中心
}
//灯光
function light() {
    //自然光
    var ambientLight = new THREE.AmbientLight(0x606060)
    scene.add(ambientLight)

    //平行光源
    var directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1.75, 0.5).normalize()
    scene.add(directionalLight)
}
//创建一个立体场景
function myScene() {
    //创建平面
    var planeGeo = new THREE.PlaneGeometry(150, 150, 10, 10) //创建平面
    var planeMat = new THREE.MeshLambertMaterial({
        //创建材料
        color: 0x999999,
        wireframe: false,
    })
    var planeMesh = new THREE.Mesh(planeGeo, planeMat) //创建网格模型
    planeMesh.position.set(0, 0, -20) //设置平面的坐标
    planeMesh.rotation.x = -0.5 * Math.PI //将平面绕X轴逆时针旋转90度
    scene.add(planeMesh) //将平面添加到场景中
    //创建立方体
    var cubeGeo1 = new THREE.CubeGeometry(20, 30, 20) //创建立方体
    var cubeMat1 = new THREE.MeshLambertMaterial({
        //创建材料
        color: 0x333333,
        wireframe: false,
    })
    var cubeMesh1 = new THREE.Mesh(cubeGeo1, cubeMat1) //创建立方体网格模型
    cubeMesh1.position.set(55, 20, 35) //设置立方体的坐标
    scene.add(cubeMesh1) //将立方体添加到场景中

    var cubeGeo2 = new THREE.CubeGeometry(20, 30, 20) //创建立方体
    var cubeMat2 = new THREE.MeshLambertMaterial({
        //创建材料
        color: 0x333333,
        wireframe: false,
    })
    var cubeMesh2 = new THREE.Mesh(cubeGeo2, cubeMat2) //创建立方体网格模型
    cubeMesh2.position.set(-5, 20, -15) //设置立方体的坐标
    scene.add(cubeMesh2) //将立方体添加到场景中

    var cubeGeo3 = new THREE.CubeGeometry(20, 30, 20) //创建立方体
    var cubeMat3 = new THREE.MeshLambertMaterial({
        //创建材料
        color: 0x333333,
        wireframe: false,
    })
    var cubeMesh3 = new THREE.Mesh(cubeGeo3, cubeMat3) //创建立方体网格模型
    cubeMesh3.position.set(-50, 20, -60) //设置立方体的坐标
    scene.add(cubeMesh3) //将立方体添加到场景中
}

//添加交互工具条
var controls = new (function () {
    this.相机 = false
})()

var gui = new dat.GUI()
gui.add(controls, '相机', ['透视投影相机', '正交投影相机']).onChange(function (
    e
) {
    switch (e) {
        case '正交投影相机':
            orthCamera()
            break
        case '透视投影相机':
            perCamera()
            break
    }
})

function render() {
    const AxesHelper = new THREE.AxesHelper(1500) // 1500代表轴线的长度
    scene.add(AxesHelper) // 添加到场景中
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
