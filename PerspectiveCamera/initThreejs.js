
// 变量
let renderer;
let scene; 
let camera, camera2;
let controls;
let stats;
let cube;
let cameraHelper;


// 初始化渲染器
function initRenderer() {
    renderer = new THREE.WebGLRenderer({
        antialias: true // antialias属性：抗锯齿效果为设置有效
    });
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight); // canvas 的大小
    document.body.appendChild(renderer.domElement);
}

// 初始化场景
function initScene() {
    scene = new THREE.Scene()
    scene.background = new THREE.Color('#000');
}

// 初始化相机
function initCamera() {
    const fov = 75;                                         // 相机视角度数45度视角    默认值：45
    const aspect = window.innerWidth / window.innerHeight;  // 渲染区域长宽比          默认值：window.innerWidth / window.innerHeight
    const near = 0.1;                                       // 相机看得最近的地方      默认值：0.1
    const far = 500;                                       // 相机看得最远的地方      默认值：1000

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(100, 50, 200);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //正交投影照相机
    camera2 = new THREE.OrthographicCamera(-10, 10, 10, -10, 10, 60);
    camera2.position.set(0, 0, 30);
    camera2.lookAt(new THREE.Vector3(0, 0, 0));

    // 照相机位置显示器
    const cameraHelper = new THREE.CameraHelper(camera2);
    scene.add(cameraHelper);
}

// 初始化光源
function initLight() {
    // 环境光
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));

    light = new THREE.SpotLight(0xffffff, 1);
    light.position.set(15, 109, 50);
    light.shadow.camera.near = 10;
    light.shadow.camera.far = 250;

    // 告诉平行光需要开启阴影投射
    light.castShadow = true;
    scene.add(light);

    // 聚光灯显示助手SpotLightHelper( light:灯光, color：颜色 )
    const lightHelper = new THREE.SpotLightHelper(light, 0xdfdfdf);
    // scene.add(lightHelper)
}

// 初始化模型
function initModal() {
    // 正方体
    const cubeGeometry = new THREE.CubeGeometry(10,10,10);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color:0x00ffff });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0, -1.5);
    cube.castShadow = true;

    scene.add(cube);

}

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = true;
    //缩放最小值
    controls.minDistance = 30;
    //缩放最大值
    controls.maxDistance = 100;
    //是否开启右键拖拽
    controls.enablePan = true;
}

// 渲染生成出canvas
function render() {
    renderer.render(scene, camera);
}

// 窗口变动触发的函数
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

// 开始执行动画
function animate() {
    //更新控制器
    render();

    //更新性能插件
    stats.update();

    controls.update();

    // cube.rotation.y -= 0.01;

    requestAnimationFrame(animate);
}

// 初始化dat.Gui参数配置调优
function initGui() {
    const gui = new dat.GUI();
    const cameraControls = new function () {
        this.left = -10;
        this.right = 10;
        this.top = 10;
        this.bottom = -10;
    };
    gui.add(cameraControls, 'left', -10, 0).onChange(function(e) {
        camera2.left = e;
    });
    gui.add(cameraControls, 'right', 10, 0).onChange(function(e) {
        camera2.right = e;
    });
    gui.add(cameraControls, 'top', 10, 0).onChange(function(e) {
        camera2.top = e;
    });
    gui.add(cameraControls, 'bottom', -10, 0).onChange(function(e) {
        camera2.bottom = e;
    });
}

// 初始化坐标轴辅助工具
function initAxesHelper() {
    const AxesHelper = new THREE.AxesHelper(150); // 150代表轴线的长度
    scene.add(AxesHelper);  // 添加到场景中
}

// 初始化性能插件
function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

// 初始化Threejs
function initThree() {
    initRenderer();
    initScene();
    initCamera();
    initLight();
    initControls();
    initModal();
    initStats();
    initGui();
    initAxesHelper();
    animate();

    window.onresize = onWindowResize;
}