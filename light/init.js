 // 渲染器变量
 let renderer;
 // 相机变量
 let camera;
 // 场景变量
 let scene;
 // 存放渲染后场景容器
 let dom = document.getElementById('canvas');
 // 光源变量
 let light;
 // 指示光源位置变量
 let lightSphere;

 // 初始化渲染器
 function initRenderer() {
     renderer = new THREE.WebGLRenderer({
         antialias: true // 开启抗锯齿
     })
     // 使渲染器开启阴影效果，物体才能有阴影
     renderer.shadowMapEnabled = true;
     // 设置窗口尺寸
     renderer.setSize(dom.clientWidth, dom.clientHeight);
     dom.appendChild(renderer.domElement);
 }

 // 初始化场景
 function initScene() {
     scene = new THREE.Scene()
 }

 // 初始化相机
 function initCamera() {
     camera = new THREE.PerspectiveCamera(20, dom.clientWidth / dom.clientHeight, 1, 1000);
     camera.position.set(0, 0, 150);
 }

 // 初始化一个平面承载几个几何体
 function initPlane() {
     var planceGeometry = new THREE.PlaneGeometry(80, 40); // 宽、高 分别在x,y轴上生成的平面
     var planeMaterial = new THREE.MeshLambertMaterial(); // 材质可以用来创建暗淡的并不光亮的表面, 经过照射能反光
     var plane = new THREE.Mesh(planceGeometry, planeMaterial);

     plane.receiveShadow = true; // 平面开启接收阴影
     plane.rotation.x = -0.4 * Math.PI; // 平面逆时针旋转贴合mesh物体底部

     // 将平面添加到场景中
     scene.add(plane);
 }

 // 初始化正方体
 function initCube() {
     var cubeGeometry = new THREE.BoxGeometry(6, 6, 6); // 长、宽、高
     var cubeMaterial = new THREE.MeshLambertMaterial({
         color: '#12b7f5'
     });
     var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
     cube.castShadow = true; // 正方体被光照射到会投放阴影
     cube.position.set(-30, 2.5, 2.5);
     cube.rotation.x = -0.4 * Math.PI;
     // 将正方体添加到场景中
     scene.add(cube);
 }

 var cubeGeometry = new THREE.BoxGeometry(6, 6, 6); // 长、宽、高
 var cubeMaterial = new THREE.MeshLambertMaterial({
     color: '#FF000'
 });
 var cube = new THREE.Mesh(cubeGeometry, cubeMaterial); // 创建一个材质颜色为黄色的正方体


 // 初始化球体
 function initSphere() {
     var geometry = new THREE.SphereGeometry(6, 50, 50); // 半径、经度切片数、维度切片数
     var material = new THREE.MeshLambertMaterial({
         color: '#ffff00'
     });
     var sphere = new THREE.Mesh(geometry, material);
     sphere.castShadow = true;
     sphere.position.set(0, 3.5, 3.5);
     sphere.rotation.x = -0.4 * Math.PI;
     // 将球体添加到场景中
     scene.add(sphere);
 }

 // 初始化圆柱体
 function initCylinder() {
     var cylinder = new THREE.CylinderGeometry(5, 5, 10, 10);
     var material = new THREE.MeshLambertMaterial({
         color: '#ff0000'
     });
     var cylinder = new THREE.Mesh(cylinder, material);
     cylinder.castShadow = true;
     cylinder.position.set(30, 2.5, 2.5);
     cylinder.rotation.x = 0.1 * Math.PI;
     // 将圆柱体添加到场景中
     scene.add(cylinder);
 }

 // 初始化光源
 function initPointLight() {
     // 默认点光源
     light = new THREE.PointLight('#ffffff', 1, 100, 2);
     light.position.set(-40, 18, 11);
     light.castShadow = true;
     scene.add(light);
 }

 // 添加一个光球，用来指代灯光
 function initLightBall() {
     // 添加一个球体，用来指代光源位置
     var lightGeometry = new THREE.SphereGeometry(2, 50, 50);
     var lightMaterial = new THREE.MeshBasicMaterial({ // 这个材质是会把自身颜色反光出来
         color: '#FFFFFF'
     });
     lightSphere = new THREE.Mesh(lightGeometry, lightMaterial);
     lightSphere.position.set(-40, 18, 11);
     scene.add(lightSphere);
 }

 // 开始执行动画
 function animate() {
     //更新控制器
     render();
     controls.update();
     requestAnimationFrame(animate);
 }

 // 用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
 function initControls() {
     controls = new THREE.OrbitControls(camera, renderer.domElement);
 }

 // 渲染生成出canvas
 var lightPositionX = -40;
 var lightDirection = 'left';

 function render() {
     if (lightPositionX <= -40) {
         lightDirection = 'left';
     }
     if (lightPositionX >= 40) {
         lightDirection = 'right';
     }
     if (lightDirection == 'left') {
         lightPositionX += 0.1;
     }
     if (lightDirection == 'right') {
         lightPositionX -= 0.1;
     }
     light.position.x = lightPositionX;
     lightSphere.position.x = lightPositionX;

     renderer.render(scene, camera);
 }

 function initThree() {
     initRenderer();
     initScene();
     initCamera();
     initPlane();
     initCube();
     initSphere();
     initCylinder();
     initPointLight();
     initLightBall();
     initControls();
     animate();

     window.onresize = onWindowResize;
 }
 initThree();

 // 光源切换事件
 $('ul li').click(function () {
     var lightType = $(this).data('type');
     $(this).addClass('on').siblings().removeClass('on');
     scene.remove(light);
     if (lightType == 'PointLight') {
         light = new THREE[lightType]('#ffffff', 1, 100, 2);
     }
     if (lightType == 'AmbientLight') {
         light = new THREE[lightType]('#ffffff', 1);
     }
     if (lightType == 'DirectionalLight') {
         light = new THREE[lightType]('#ffffff', 1);
     }
     if (lightType == 'SpotLight') {
         light = new THREE[lightType]('#ffffff', 1, 100, Math.PI / 4, 0.1, 0.1);
     }
     light.position.set(lightPositionX, 18, 11);
     light.castShadow = true;
     scene.add(light);
 })

 // 窗口变动触发的函数
 function onWindowResize() {
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     render();
     renderer.setSize(window.innerWidth, window.innerHeight);
 }

 // 初始化坐标轴辅助工具
 function initAxesHelper() {
     const AxesHelper = new THREE.AxesHelper(1500); // 1500代表轴线的长度
     scene.add(AxesHelper); // 添加到场景中
 }