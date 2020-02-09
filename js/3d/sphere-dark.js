(function() {
	"use strict";
	
	// console.warn = function() {}


    var SCREEN_WIDTH = window.innerWidth,
			SCREEN_HEIGHT = window.innerHeight,

			mouseX = 0, mouseY = 0,

			windowHalfX = window.innerWidth / 2,
			windowHalfY = window.innerHeight / 2,

			SEPARATION = 200,
			AMOUNTX = 10,
			AMOUNTY = 10,

			camera, scene, renderer;

			init();
			animate();

			function init() {

				var container, separation = 100, amountX = 50, amountY = 50,
				particles, particle;

				var hero = document.getElementById("hero");
        var container = document.createElement("div");
        container.className = "hero__three-container";
        hero.appendChild( container );

				camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.z = 1000;

				scene = new THREE.Scene();

				// renderer = new THREE.CanvasRenderer({ alpha: true });
				renderer = new THREE.CanvasRenderer({ alpha: true });
				// renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				container.appendChild( renderer.domElement );




				// FBX => Working but too slow
			// var loader = new THREE.FBXLoader();
            // loader.setPath("../../3d/dark-astronaut/source/");
            // loader.load('SpaceGirl_pose.fbx', function ( object ) {
            // 	object.traverse( function ( child ) {
            // 		if ( child.isMesh ) {
            // 			child.castShadow = true;
			// 			child.receiveShadow = true;
			// 			// console.log(child);
            // 		}
			// 	} );
			// 	// console.log(object.position);
			// 	object.scale.set(1, 1, 1);
			// 	object.position.set(0, -8, 0);
			// 	console.log(object);
			// 	scene.add(object);
			// } );
			
			// var light;

			// light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
			// light.position.set( 0, 1000, 0 );
			// scene.add( light );

			// light = new THREE.DirectionalLight( 0xffffff );
			// light.position.set( 0, 200, 100 );
			// light.castShadow = true;
			// light.shadow.camera.top = 180;
			// light.shadow.camera.bottom = - 100;
			// light.shadow.camera.left = - 120;
			// light.shadow.camera.right = 120;
			// scene.add( light );



			// var loader = new THREE.GLTFLoader().setPath( '../../3d/ufo/' );
			var loader = new THREE.GLTFLoader();
			loader.load( '../../3d/ufo/scene.gltf', function ( gltf ) {
				gltf.scene.traverse( function ( child ) {
					if ( child.isMesh ) {
						child.castShadow = true;
						child.receiveShadow = true;
						child.material.overdraw = true;
						child.material.transparent = false;
						// child.material.opacity = 0;
						console.log(child.material);
					}
				} );

				gltf.scene.scale.set(400, 400, 400);
				gltf.scene.position.set(0, 0, 0);
				gltf.scene.rotation.set(gltf.scene.rotation.x-50, gltf.scene.rotation.y, gltf.scene.rotation.z);
				scene.add( gltf.scene );
				// gltf.scene.lookAt( camera.position );
				
			} );

			
				// Instantiate a loader
				// var loader = new THREE.GLTFLoader();
				// loader.setPath('../../3d/dark_astronaut/');
				// new GLTFLoader().setPath( '../../3d/dark_astronaut/' );
				// Optional: Provide a DRACOLoader instance to decode compressed mesh data
				// var dracoLoader = new THREE.DRACOLoader();
				// dracoLoader.setDecoderPath( '../../3d/dark_astronaut/' );
				// loader.setDRACOLoader( dracoLoader );

				// Load a glTF resource
				// loader.load('../../3d/_dark_astronaut/scene.gltf',
				// 	function ( gltf ) {
				// 		console.log(gltf.scene);
				// 		scene.add( gltf.scene );
				// 	},
				// 	// called while loading is progressing
				// 	function ( xhr ) {

				// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

				// 	},
				// 	// called when loading has errors
				// 	function ( error ) {

				// 		console.log( 'An error happened' );
				// 		console.log( error );

				// 	}
				// );





				// // particles

				// var PI2 = Math.PI * 2;
				// var material = new THREE.SpriteCanvasMaterial( {

				// 	color: 0xD9E1E9,
				// 	program: function ( context ) {

				// 		context.beginPath();
				// 		context.arc( 0, 0, 0.5, 0, PI2, true );
				// 		context.fill();

				// 	}

				// } );

				// for ( var i = 0; i < 1000; i ++ ) {

				// 	particle = new THREE.Sprite( material );
				// 	particle.position.x = Math.random() * 2 - 1;
				// 	particle.position.y = Math.random() * 2 - 1;
				// 	particle.position.z = Math.random() * 2 - 1;
				// 	particle.position.normalize();
				// 	particle.position.multiplyScalar( Math.random() * 10 + 450 );
				// 	particle.scale.multiplyScalar( 2 );
				// 	scene.add( particle );

				// }

				// // lines

				// for (var i = 0; i < 300; i++) {

				// 	var geometry = new THREE.Geometry();

				// 	var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
				// 	vertex.normalize();
				// 	vertex.multiplyScalar( 450 );

				// 	geometry.vertices.push( vertex );

				// 	var vertex2 = vertex.clone();
				// 	vertex2.multiplyScalar( Math.random() * 0.3 + 1 );

				// 	geometry.vertices.push( vertex2 );

				// 	var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xD9E1E9, opacity: Math.random() } ) );
				// 	scene.add( line );
				// }

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function onDocumentMouseMove(event) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
				// camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
				camera.lookAt( scene.position );
				// console.log(camera.position);
				// console.log(scene.position);

				renderer.setClearColor( 0x000000, 0 );
				renderer.render( scene, camera );

			}

})();
