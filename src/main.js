import * as THREE from 'three';
import { GameWorld } from './world/GameWorld.js';
import { Player } from './player/Player.js';
import { InputManager } from './input/InputManager.js';
import { UI } from './ui/UI.js';
import { EffectsManager } from './effects/EffectsManager.js';

class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
        });
        
        this.setupRenderer();
        this.setupPostProcessing();
        this.setupLighting();
        this.setupFog();
        
        this.world = new GameWorld(this.scene);
        this.player = new Player(this.scene, this.camera);
        this.inputManager = new InputManager();
        this.ui = new UI();
        this.effects = new EffectsManager(this.scene);
        
        this.clock = new THREE.Clock();
        this.timeOfDay = 0.5; // 0 = midnight, 0.5 = noon, 1 = midnight
        
        // FPS tracking
        this.fps = 60;
        this.frameCount = 0;
        this.fpsTimer = 0;
        
        this.init();
    }
    
    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.shadowMap.autoUpdate = true;
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        this.renderer.setClearColor(0x87CEEB, 1);
        document.getElementById('gameContainer').appendChild(this.renderer.domElement);
        
        // Hide loading screen
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
            console.log('Game loaded successfully with enhanced features!');
        }
    }
    
    setupPostProcessing() {
        // Add screen space ambient occlusion and other effects later
        this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            stencilBuffer: false
        });
    }
    
    setupFog() {
        this.scene.fog = new THREE.Fog(0x87CEEB, 100, 800);
    }
    
    setupLighting() {
        // Dynamic ambient light
        this.ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(this.ambientLight);
        
        // Sun (directional light)
        this.sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
        this.sunLight.position.set(100, 100, 50);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.width = 4096;
        this.sunLight.shadow.mapSize.height = 4096;
        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 500;
        this.sunLight.shadow.camera.left = -150;
        this.sunLight.shadow.camera.right = 150;
        this.sunLight.shadow.camera.top = 150;
        this.sunLight.shadow.camera.bottom = -150;
        this.sunLight.shadow.bias = -0.0001;
        this.scene.add(this.sunLight);
        
        // Hemisphere light for more realistic sky lighting
        this.hemisphereLight = new THREE.HemisphereLight(0x87CEEB, 0x3a5f3a, 0.6);
        this.scene.add(this.hemisphereLight);
    }
    
    init() {
        console.log('Initializing enhanced game world...');
        this.world.generate();
        this.player.spawn(0, 5, 0);
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
        console.log('Enhanced features initialized: Day/Night cycle, Particle effects, Advanced UI');
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const deltaTime = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();
        
        // Update FPS counter
        this.frameCount++;
        this.fpsTimer += deltaTime;
        if (this.fpsTimer >= 1) {
            this.fps = this.frameCount / this.fpsTimer;
            this.frameCount = 0;
            this.fpsTimer = 0;
        }
        
        this.updateDayNightCycle(elapsedTime);
        this.player.update(deltaTime, this.inputManager);
        this.world.update(deltaTime, elapsedTime);
        this.effects.update(deltaTime, this.player.getPosition());
        
        // Get weather info from world
        const weather = this.world.weather ? this.world.weather.type : 'clear';
        this.ui.update(this.player, this.timeOfDay, weather, this.fps);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    updateDayNightCycle(elapsedTime) {
        // Cycle through day/night every 2 minutes
        this.timeOfDay = (Math.sin(elapsedTime * 0.05) + 1) * 0.5;
        
        // Update sun position
        const sunAngle = this.timeOfDay * Math.PI * 2 - Math.PI;
        this.sunLight.position.set(
            Math.cos(sunAngle) * 100,
            Math.sin(sunAngle) * 100 + 20,
            50
        );
        
        // Update lighting colors based on time of day
        if (this.timeOfDay < 0.2 || this.timeOfDay > 0.8) {
            // Night
            this.sunLight.color.setHex(0x4444aa);
            this.sunLight.intensity = 0.3;
            this.ambientLight.color.setHex(0x222244);
            this.ambientLight.intensity = 0.4;
            this.hemisphereLight.color.setHex(0x222244);
            this.hemisphereLight.groundColor.setHex(0x111122);
            this.scene.fog.color.setHex(0x222244);
        } else if (this.timeOfDay < 0.3 || this.timeOfDay > 0.7) {
            // Dawn/Dusk
            this.sunLight.color.setHex(0xffaa44);
            this.sunLight.intensity = 0.8;
            this.ambientLight.color.setHex(0x444422);
            this.ambientLight.intensity = 0.5;
            this.hemisphereLight.color.setHex(0xffaa44);
            this.hemisphereLight.groundColor.setHex(0x332211);
            this.scene.fog.color.setHex(0xffaa44);
        } else {
            // Day
            this.sunLight.color.setHex(0xffffff);
            this.sunLight.intensity = 1.5;
            this.ambientLight.color.setHex(0x404040);
            this.ambientLight.intensity = 0.3;
            this.hemisphereLight.color.setHex(0x87CEEB);
            this.hemisphereLight.groundColor.setHex(0x3a5f3a);
            this.scene.fog.color.setHex(0x87CEEB);
        }
        
        this.renderer.setClearColor(this.scene.fog.color);
    }
}

// Start the game
new Game();