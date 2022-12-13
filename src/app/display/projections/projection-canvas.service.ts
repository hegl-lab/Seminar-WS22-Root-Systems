import { ElementRef, Injectable, Input, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { Mesh, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Colors } from '../values/colors';

@Injectable({
  providedIn: 'root'
})
export class ProjectionCanvasService {
  canvas!: HTMLElement;

  scene!: THREE.Scene;
  camera!: THREE.Camera;
  renderer!: THREE.WebGLRenderer;
  pointGroup: THREE.Group = new THREE.Group();
  otherObjectsGroup: THREE.Group = new THREE.Group();

  initalizeScene(canvas: HTMLElement){
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 50, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize( this.canvas.clientWidth, this.canvas.clientHeight );
    this.canvas.appendChild( this.renderer.domElement);
    this.renderer.setClearColor( Colors.purple800);
    this.camera.position.z = 20;
    this.camera.position.y = 0;
    this.camera.updateMatrix();
    this.addOrbitControls();
    this.addLight();
    this.displayScene();
    this.scene.add(this.pointGroup);
    this.scene.add(this.otherObjectsGroup);

  }
  reinitializePoints(){
    this.pointGroup.removeFromParent();
    this.pointGroup = new THREE.Group();
    this.scene.add(this.pointGroup);
  }
  reinitializeObjects(){
    this.otherObjectsGroup.removeFromParent();
    this.otherObjectsGroup = new THREE.Group();
    this.scene.add(this.otherObjectsGroup);
  }
  addOrbitControls(){
      let orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
      // orbitControls.enabled = false;
  }
  displayScene(){
    requestAnimationFrame( () => this.displayScene() );
	  this.renderer.render( this.scene, this.camera );
  }
  addLight(){
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.7);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0,30,0)
    this.scene.add( ambientLight );
    this.scene.add(directionalLight);
  }
  drawToPointGroup(mesh: Mesh<any, any>){
    this.pointGroup.add(mesh);
  }
  drawToObjectGroup(mesh: Mesh<any, any>){
    this.otherObjectsGroup.add(mesh);
  }
}
