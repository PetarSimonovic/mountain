
// variables

let groundLevel = 20;


// BASIC SET UP
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x87ceeb );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer( ); // add { alpha: true } to set background to transparent
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);


// Build World

// radiusTop, radiusBottom, height, radialSegments (faces around circumference), heightSegments( faces along height)

const world_geometry = new THREE.CylinderGeometry( 50, 50, 1, 20 )

const world_material = new THREE.MeshBasicMaterial ( {
  color: 0x136d15,
  side: THREE.DoubleSide
});

const world = new THREE.Mesh (world_geometry, world_material)

scene.add(world)

// plane position
world.position.z = -100
world.position.y = groundLevel

camera.position.z = -10
camera.position.y = 50


// SUN  - is this even doing anything?
const sun = new THREE.DirectionalLight(0xFFFFFF);
sun.castShadow = true
scene.add(sun);

// WORLD BUILDERS

// Mountain



function raiseMountain () {
  let mountainRadius = Math.floor(Math.random() * 10);
  let mountainHeight = Math.floor(Math.random() * 10);
  let planePosition = groundLevel
  createPlane(mountainRadius, mountainHeight, planePosition);
}


// radiusTop, radiusBottom, height, radialSegments (faces around circumference), heightSegments( faces along height)


function createPlane(mountainRadius, mountainHeight, planePosition) {
  let planeCount = 0
  while ( planeCount < mountainHeight && mountainRadius > 1) {
    console.log(mountainRadius)
    let planeGeometry = new THREE.CylinderGeometry( mountainRadius, mountainRadius, 5, 20 )
    let planeMaterial = new THREE.MeshBasicMaterial ( {
      color: 0x7a7372,
      side: THREE.DoubleSide
    });
    let plane  = new THREE.Mesh (planeGeometry, planeMaterial)
    scene.add(plane)
    plane.position.z = -100
    plane.position.y = planePosition += 5
    mountainRadius -= 1
    planeCount += 1
  }
}


raiseMountain()


// CONFIG

function animate() {
  requestAnimationFrame ( animate );
  renderer.render ( scene, camera );

}

animate();


// KEY PRESS DETECTION - update (below is deprecated)

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        camera.position.y += 1;
    }
    else if (e.keyCode == '40') {
      camera.position.y -= 1;
    }
    else if (e.keyCode == '37') {
      camera.position.x += 1;
    }
    else if (e.keyCode == '39') {
      camera.position.x -= 1;
    }

    else if (e.keyCode == '87') {
      camera.position.z -= 1;
    }

    else if (e.keyCode == '83') {
      camera.position.z += 1;
    }

    else if (e.keyCode == '65') {
      camera.rotation.y += 0.05;
    }

     else if (e.keyCode == '68') {
       camera.rotation.y -= 0.05;
      }

}
