
// 变量
let renderer;
let scene; 
let camera, camera2;
let controls;
let stats;
let cube, cube2, cube3, cube5, cube6;
let cameraHelper;


// 初始化渲染器
function initRenderer() {
    renderer = new THREE.WebGLRenderer({
        antialias: true // antialias属性：抗锯齿效果为设置有效
    });
    renderer.setPixelRatio(window.devicePixelRatio); // 避免canvas的物理像素和css设置的逻辑像素不一样导致场景拉伸
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
    const left = -1 * (window.innerWidth / 20);
    const right = 1 * (window.innerWidth / 20);
    const top = 1 * (window.innerHeight / 20);
    const bottom = -1 * (window.innerHeight / 20);
    const near = 1;
    const far = 1000;

    camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    camera.position.set(0, 100, 200);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera2.position.set(0, 200, 500);
    // camera2.lookAt(new THREE.Vector3(0, 0, 0));

    // 照相机位置显示器
    // const cameraHelper = new THREE.CameraHelper(camera);
    // scene.add(cameraHelper);
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
    const cubeGeometry = new THREE.CubeGeometry(10,10,10);  // 创建的立方体
    const cubeMaterial = new THREE.MeshLambertMaterial({ color:0x00ffff }); // 上色的材质
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0, 30);
    cube.castShadow = true;

    const cubeGeometry2 = new THREE.CubeGeometry(10,10,10);
    const cubeMaterial2 = new THREE.MeshLambertMaterial({ color:0x00ffff }); // 上色的材质
    cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);
    cube2.position.set(0, 0, 10);
    cube2.castShadow = true;

    const cubeGeometry3 = new THREE.CubeGeometry(10,10,10);
    const cubeMaterial3 = new THREE.MeshLambertMaterial({ color:0x00ffff }); // 上色的材质
    cube3 = new THREE.Mesh(cubeGeometry3, cubeMaterial3);
    cube3.position.set(0, 0, -10);
    cube3.castShadow = true;

    const cubeGeometry5 = new THREE.CubeGeometry(10,10,10);
    const cubeMaterial5 = new THREE.MeshLambertMaterial({ color:0x00ffff }); // 上色的材质
    cube5 = new THREE.Mesh(cubeGeometry5, cubeMaterial5);
    cube5.position.set(0, 0, -30);
    cube5.castShadow = true;

    const cubeGeometry6 = new THREE.CubeGeometry(10,10,10);
    const cubeMaterial6 = new THREE.MeshLambertMaterial({ color:0x00ffff }); // 上色的材质
    cube6 = new THREE.Mesh(cubeGeometry6, cubeMaterial6);
    cube6.position.set(0, 0, -50);
    cube6.castShadow = true;

    scene.add(cube);
    scene.add(cube2);
    scene.add(cube3);
    scene.add(cube5);
    scene.add(cube6);
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
    controls.autoRotate = false;
    //缩放最小值
    controls.minDistance = 0;
    //缩放最大值
    controls.maxDistance = 500;
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

    requestAnimationFrame(animate);
}

// 初始化dat.Gui参数配置调优
function initGui() {
    const gui = new dat.GUI();
    const cameraControls = new function () {
        this.zPos = 200;
        this.near = 0.1;
        this.far = 1000;
    };

    gui.add(cameraControls, 'near', 0.1, 100).onChange(function(e) {
        camera.near = e;
        camera.updateProjectionMatrix();
    });
    gui.add(cameraControls, 'far', 0, 1000).onChange(function(e) {
        camera.far = e;
        camera.updateProjectionMatrix();
    });
    gui.add(cameraControls, 'zPos', 200, 500).onChange(function(e) {
        camera.position.set(0, 100, e);
        camera.lookAt(new THREE.Vector3(0,0,0));
        console.log(e)
    });
}

// 初始化坐标轴辅助工具
function initAxesHelper() {
    const AxesHelper = new THREE.AxesHelper(1500); // 150代表轴线的长度
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