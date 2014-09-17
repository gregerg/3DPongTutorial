var scene, camera, renderer;
var WIDTH, HEIGHT;
var ball, paddle1, paddle2;

init();
animate();

function init() {
  WIDTH = 640;
  HEIGHT = 360;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    WIDTH / HEIGHT,
    1,
    800);

  scene.add(camera);

  camera.position.z = 520;

      // playing surface plane
  var planeMat = new THREE.MeshLambertMaterial({
    color: 0x4BD121
  });

  var planeGeo = new THREE.PlaneGeometry(WIDTH * 0.95, HEIGHT);

  var plane = new THREE.Mesh(planeGeo, planeMat, 32, 32);
  scene.add(plane);

  var radius = 10,
  segments = 32,
  rings = 32;

  var sphereMaterial = new THREE.MeshLambertMaterial(
  {
      color: 0xD43001
  })

  ball = new THREE.Mesh(
    new THREE.SphereGeometry(radius,
      segments,
      rings),
    sphereMaterial);

  scene.add(ball);

  ball.position.z = 20;
  ball.position.x = -(WIDTH/2) + 100;
  ball.position.z = 50;

  light = new THREE.PointLight(0xFFFFFF);
  light.position.x = -1000;
  light.position.y = 0;
  light.position.z = 1000;
  light.intensity = 2.9;
  light.distance = 10000;
  scene.add(light);

  // paddles
  paddleWidth = 10;
  paddleHeight = 30;
  paddleDepth = 10;
  paddleQuality = 1;

  // paddle1
  paddle1 = new THREE.Mesh(
    new THREE.CubeGeometry(
      paddleWidth,
      paddleHeight,
      paddleDepth,
      paddleQuality,
      paddleQuality),
    new THREE.MeshLambertMaterial(
      {
        color: 0xD43001
      })
    );

  scene.add(paddle1);

  paddle1.position.x = -WIDTH/2 + paddleWidth;
  paddle1.position.z = paddleDepth;

    // paddle2
  paddle2 = new THREE.Mesh(
    new THREE.CubeGeometry(
      paddleWidth,
      paddleHeight,
      paddleDepth,
      paddleQuality,
      paddleQuality),
    new THREE.MeshLambertMaterial(
      {
        color: 0xD43001
      })
    );

  scene.add(paddle2);

  paddle2.position.x = WIDTH/2 - paddleWidth;
  paddle2.position.z = paddleDepth;

  renderer = new THREE.CanvasRenderer();

  renderer.setSize(WIDTH, HEIGHT);

  var c = document.getElementById("gameCanvas");
  c.appendChild(renderer.domElement);
}

function animate() {

  renderer.render( scene, camera );
  requestAnimationFrame( animate );

  ballPhysics();
  // camera.position.x = paddle1.position.x - 100;
  // camera.position.z = paddle1.position.z + 100;
  // camera.rotation.z = -50 * Math.PI/100;
  // camera.rotation.y = -35 * Math.PI/100;

}

function ballPhysics() {
  // ball's x-direction, y-direction, and speed per frame
  var ballDirX = 1, ballDirY = 1, ballSpeed = 2;

  ball.position.x += ballDirX * ballSpeed;
  ball.position.y += ballDirY * ballSpeed;

  if (ballDirY > ballSpeed * 2) {
    ballDirY - ballSpeed * 2;
  } else if (ballDirY < -ballSpeed * 2) {
    ballDirY = -ballSpeed * 2;
  }

  if (ball.position.y <= -HEIGHT/2) {
    ballDirY = -ballDirY;
  }

  if (ball.position.y >= HEIGHT/2) {
    ballDirY = -ballDirY;
  }
}
