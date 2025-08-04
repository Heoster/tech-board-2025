import * as THREE from 'three';

export class EffectsManager {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
        this.footstepTimer = 0;
        this.windParticles = [];
        
        this.createWindEffect();
        this.createFootstepSystem();
    }
    
    createWindEffect() {
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 1000;
            positions[i + 1] = Math.random() * 50 + 10;
            positions[i + 2] = (Math.random() - 0.5) * 1000;
            
            velocities[i] = (Math.random() - 0.5) * 2;
            velocities[i + 1] = Math.random() * 0.5;
            velocities[i + 2] = (Math.random() - 0.5) * 2;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.5,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        
        this.windSystem = new THREE.Points(geometry, material);
        this.scene.add(this.windSystem);
    }
    
    createFootstepSystem() {
        this.footstepGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(50 * 3);
        const colors = new Float32Array(50 * 3);
        const sizes = new Float32Array(50);
        
        this.footstepGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.footstepGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        this.footstepGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                varying float vSize;
                
                void main() {
                    vColor = color;
                    vSize = size;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vSize;
                
                void main() {
                    float distance = length(gl_PointCoord - vec2(0.5));
                    if (distance > 0.5) discard;
                    
                    float alpha = 1.0 - (distance * 2.0);
                    gl_FragColor = vec4(vColor, alpha * 0.6);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        this.footstepSystem = new THREE.Points(this.footstepGeometry, material);
        this.scene.add(this.footstepSystem);
    }
    
    update(deltaTime, playerPosition) {
        this.updateWindEffect(deltaTime);
        this.updateFootsteps(deltaTime, playerPosition);
    }
    
    updateWindEffect(deltaTime) {
        const positions = this.windSystem.geometry.attributes.position.array;
        const velocities = this.windSystem.geometry.attributes.velocity.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i] * deltaTime * 10;
            positions[i + 1] += velocities[i + 1] * deltaTime * 5;
            positions[i + 2] += velocities[i + 2] * deltaTime * 10;
            
            // Reset particles that go too far
            if (positions[i] > 500) positions[i] = -500;
            if (positions[i] < -500) positions[i] = 500;
            if (positions[i + 2] > 500) positions[i + 2] = -500;
            if (positions[i + 2] < -500) positions[i + 2] = 500;
            if (positions[i + 1] > 60) positions[i + 1] = 10;
        }
        
        this.windSystem.geometry.attributes.position.needsUpdate = true;
    }
    
    updateFootsteps(deltaTime, playerPosition) {
        this.footstepTimer += deltaTime;
        
        // Update existing particles
        const positions = this.footstepGeometry.attributes.position.array;
        const colors = this.footstepGeometry.attributes.color.array;
        const sizes = this.footstepGeometry.attributes.size.array;
        
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            particle.life -= deltaTime;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                i--;
                continue;
            }
            
            const index = i * 3;
            positions[index] = particle.position.x;
            positions[index + 1] = particle.position.y;
            positions[index + 2] = particle.position.z;
            
            const alpha = particle.life / particle.maxLife;
            colors[index] = 0.6 * alpha;
            colors[index + 1] = 0.4 * alpha;
            colors[index + 2] = 0.2 * alpha;
            
            sizes[i] = particle.size * alpha;
        }
        
        this.footstepGeometry.attributes.position.needsUpdate = true;
        this.footstepGeometry.attributes.color.needsUpdate = true;
        this.footstepGeometry.attributes.size.needsUpdate = true;
    }
    
    createFootstepParticle(position) {
        if (this.particles.length < 50) {
            for (let i = 0; i < 5; i++) {
                this.particles.push({
                    position: new THREE.Vector3(
                        position.x + (Math.random() - 0.5) * 2,
                        position.y - 1.5,
                        position.z + (Math.random() - 0.5) * 2
                    ),
                    life: 2.0,
                    maxLife: 2.0,
                    size: Math.random() * 3 + 1
                });
            }
        }
    }
    
    createExplosion(position, color = 0xff4444) {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = {
                position: position.clone(),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 20,
                    Math.random() * 15 + 5,
                    (Math.random() - 0.5) * 20
                ),
                life: 3.0,
                maxLife: 3.0,
                size: Math.random() * 5 + 2,
                color: new THREE.Color(color)
            };
            
            this.particles.push(particle);
        }
    }
}