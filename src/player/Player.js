import * as THREE from 'three';

export class Player {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        
        this.position = new THREE.Vector3(0, 2, 0);
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.rotation = new THREE.Euler(0, 0, 0);
        
        this.health = 100;
        this.maxHealth = 100;
        this.stamina = 100;
        this.maxStamina = 100;
        this.speed = 0;
        this.maxSpeed = 15;
        this.runSpeed = 25;
        this.acceleration = 40;
        this.friction = 12;
        this.jumpForce = 18;
        this.gravity = -35;
        
        this.isGrounded = false;
        this.isCrouching = false;
        this.isRunning = false;
        this.isWalking = false;
        this.canJump = true;
        this.jumpCooldown = 0;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseSensitivity = 0.002;
        this.smoothMouseX = 0;
        this.smoothMouseY = 0;
        
        // Camera effects
        this.cameraShake = new THREE.Vector3(0, 0, 0);
        this.headBob = 0;
        this.headBobSpeed = 0;
        this.breathingOffset = 0;
        
        // Footstep system
        this.footstepTimer = 0;
        this.lastFootstepTime = 0;
        
        this.setupControls();
        this.createPlayerModel();
        this.createWeaponModel();
    }
    
    setupControls() {
        document.addEventListener('mousemove', (event) => {
            if (document.pointerLockElement) {
                this.mouseX += event.movementX * this.mouseSensitivity;
                this.mouseY += event.movementY * this.mouseSensitivity;
                this.mouseY = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.mouseY));
            }
        });
        
        document.addEventListener('click', () => {
            if (!document.pointerLockElement) {
                document.body.requestPointerLock();
            }
        });
    }
    
    createPlayerModel() {
        // Enhanced player representation
        const playerGeometry = new THREE.CapsuleGeometry(0.5, 1.5);
        const playerMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4444ff,
            transparent: true,
            opacity: 0.3
        });
        this.playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
        this.playerMesh.castShadow = true;
        this.scene.add(this.playerMesh);
        
        // Add player shadow circle
        const shadowGeometry = new THREE.CircleGeometry(0.8, 16);
        const shadowMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x000000,
            transparent: true,
            opacity: 0.3
        });
        this.shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
        this.shadowMesh.rotation.x = -Math.PI / 2;
        this.shadowMesh.position.y = 0.01;
        this.scene.add(this.shadowMesh);
    }
    
    createWeaponModel() {
        // Simple weapon representation (visible to player)
        const weaponGroup = new THREE.Group();
        
        // Gun barrel
        const barrelGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1);
        const barrelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
        barrel.rotation.z = Math.PI / 2;
        barrel.position.set(0.5, 0, 0);
        weaponGroup.add(barrel);
        
        // Gun handle
        const handleGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.15);
        const handle = new THREE.Mesh(handleGeometry, barrelMaterial);
        handle.position.set(0, -0.15, 0);
        weaponGroup.add(handle);
        
        // Position weapon relative to camera
        weaponGroup.position.set(0.3, -0.2, -0.5);
        weaponGroup.scale.set(0.5, 0.5, 0.5);
        
        this.weaponMesh = weaponGroup;
        this.camera.add(this.weaponMesh);
    }
    
    spawn(x, y, z) {
        this.position.set(x, y, z);
        this.velocity.set(0, 0, 0);
        this.updateCamera();
    }
    
    update(deltaTime, inputManager) {
        this.handleInput(inputManager, deltaTime);
        this.updatePhysics(deltaTime);
        this.updateStamina(deltaTime);
        this.updateCameraEffects(deltaTime);
        this.updateCamera();
        this.updatePlayerMesh();
        this.updateWeapon(deltaTime);
        
        // Calculate speed for UI
        const horizontalVelocity = new THREE.Vector2(this.velocity.x, this.velocity.z);
        this.speed = horizontalVelocity.length() * 3.6; // Convert to km/h
        
        // Update walking state
        this.isWalking = horizontalVelocity.length() > 0.1;
        
        // Update jump cooldown
        if (this.jumpCooldown > 0) {
            this.jumpCooldown -= deltaTime;
        } else {
            this.canJump = true;
        }
    }
    
    handleInput(inputManager, deltaTime) {
        const moveVector = new THREE.Vector3(0, 0, 0);
        let speedMultiplier = 1;
        let maxCurrentSpeed = this.maxSpeed;
        
        // Check if running (only if has stamina)
        this.isRunning = (inputManager.isKeyPressed('ShiftLeft') || inputManager.isKeyPressed('ShiftRight')) && this.stamina > 10;
        
        // Enhanced movement with different speeds
        if (this.isRunning && this.stamina <= 10) {
            console.log('Cannot run - low stamina!');
            this.isRunning = false; // Force stop running
        }
        if (this.isRunning) {
            speedMultiplier = 1.8;
            maxCurrentSpeed = this.runSpeed;
        }
        
        // Check if crouching
        this.isCrouching = inputManager.isKeyPressed('KeyC');
        if (this.isCrouching) {
            speedMultiplier = 0.4;
            maxCurrentSpeed = this.maxSpeed * 0.4;
        }
        
        // Movement input with smooth acceleration
        if (inputManager.isKeyPressed('KeyW')) moveVector.z -= 1;
        if (inputManager.isKeyPressed('KeyS')) moveVector.z += 0.7; // Slower backward movement
        if (inputManager.isKeyPressed('KeyA')) moveVector.x -= 0.8; // Slightly slower strafe
        if (inputManager.isKeyPressed('KeyD')) moveVector.x += 0.8;
        
        // Normalize movement vector
        if (moveVector.length() > 0) {
            moveVector.normalize();
            
            // Apply camera rotation to movement
            const cameraDirection = new THREE.Vector3();
            this.camera.getWorldDirection(cameraDirection);
            cameraDirection.y = 0;
            cameraDirection.normalize();
            
            const cameraRight = new THREE.Vector3();
            cameraRight.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0));
            
            const worldMoveVector = new THREE.Vector3();
            worldMoveVector.addScaledVector(cameraDirection, -moveVector.z);
            worldMoveVector.addScaledVector(cameraRight, moveVector.x);
            
            // Apply movement with improved acceleration
            const moveForce = worldMoveVector.multiplyScalar(this.acceleration * speedMultiplier);
            this.velocity.x += moveForce.x * deltaTime;
            this.velocity.z += moveForce.z * deltaTime;
            
            // Limit speed
            const horizontalSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);
            if (horizontalSpeed > maxCurrentSpeed) {
                const scale = maxCurrentSpeed / horizontalSpeed;
                this.velocity.x *= scale;
                this.velocity.z *= scale;
            }
            
            // Update head bob
            this.headBobSpeed = Math.min(horizontalSpeed / maxCurrentSpeed, 1);
        } else {
            this.headBobSpeed *= 0.9; // Smooth deceleration
        }
        
        // Jumping with cooldown
        if (inputManager.isKeyPressed('Space') && this.isGrounded && this.canJump) {
            this.velocity.y = this.jumpForce;
            this.isGrounded = false;
            this.canJump = false;
            this.jumpCooldown = 0.3; // 300ms cooldown
            this.addCameraShake(2);
        }
    }
    
    updatePhysics(deltaTime) {
        // Apply gravity
        this.velocity.y += this.gravity * deltaTime;
        
        // Apply friction to horizontal movement
        const horizontalFriction = this.friction * deltaTime;
        this.velocity.x *= Math.max(0, 1 - horizontalFriction);
        this.velocity.z *= Math.max(0, 1 - horizontalFriction);
        
        // Limit horizontal speed
        const horizontalSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);
        if (horizontalSpeed > this.maxSpeed) {
            const scale = this.maxSpeed / horizontalSpeed;
            this.velocity.x *= scale;
            this.velocity.z *= scale;
        }
        
        // Update position
        this.position.add(this.velocity.clone().multiplyScalar(deltaTime));
        
        // Ground collision (simple)
        const groundHeight = this.isCrouching ? 1.2 : 1.8;
        if (this.position.y <= groundHeight) {
            this.position.y = groundHeight;
            this.velocity.y = 0;
            this.isGrounded = true;
        } else {
            this.isGrounded = false;
        }
        
        // World boundaries
        this.position.x = Math.max(-490, Math.min(490, this.position.x));
        this.position.z = Math.max(-490, Math.min(490, this.position.z));
    }
    
    updateCamera() {
        // Update camera rotation
        this.camera.rotation.order = 'YXZ';
        this.camera.rotation.y = this.mouseX;
        this.camera.rotation.x = this.mouseY;
        
        // Update camera position
        const cameraHeight = this.isCrouching ? 1.2 : 1.8;
        this.camera.position.copy(this.position);
        this.camera.position.y = this.position.y + cameraHeight - 1.8;
    }
    
    updatePlayerMesh() {
        this.playerMesh.position.copy(this.position);
        this.playerMesh.position.y -= 0.9; // Adjust for capsule center
        
        if (this.isCrouching) {
            this.playerMesh.scale.y = 0.7;
        } else {
            this.playerMesh.scale.y = 1;
        }
    }
    
    getPosition() {
        return this.position.clone();
    }
    
    getHealth() {
        return this.health;
    }
    
    getSpeed() {
        return Math.round(this.speed);
    }
    
    updateStamina(deltaTime) {
        if (this.isRunning && this.isWalking) {
            this.stamina -= 20 * deltaTime; // Drain stamina when running
        } else {
            this.stamina += 15 * deltaTime; // Regenerate stamina
        }
        
        this.stamina = Math.max(0, Math.min(this.maxStamina, this.stamina));
    }
    
    updateCameraEffects(deltaTime) {
        // Head bobbing
        if (this.isWalking && this.isGrounded) {
            this.headBob += deltaTime * this.headBobSpeed * 8;
            const bobAmount = this.isCrouching ? 0.02 : 0.05;
            const bobY = Math.sin(this.headBob) * bobAmount * this.headBobSpeed;
            const bobX = Math.sin(this.headBob * 0.5) * bobAmount * 0.5 * this.headBobSpeed;
            
            this.camera.position.y += bobY;
            this.camera.position.x += bobX;
        }
        
        // Breathing effect when idle
        if (!this.isWalking) {
            this.breathingOffset += deltaTime * 2;
            const breathingY = Math.sin(this.breathingOffset) * 0.01;
            this.camera.position.y += breathingY;
        }
        
        // Camera shake
        if (this.cameraShake.length() > 0.01) {
            this.camera.position.add(this.cameraShake);
            this.cameraShake.multiplyScalar(0.9); // Decay shake
        }
        
        // Smooth mouse movement
        this.smoothMouseX += (this.mouseX - this.smoothMouseX) * deltaTime * 10;
        this.smoothMouseY += (this.mouseY - this.smoothMouseY) * deltaTime * 10;
    }
    
    updateWeapon(deltaTime) {
        if (this.weaponMesh) {
            // Weapon sway based on movement
            const swayAmount = this.headBobSpeed * 0.1;
            this.weaponMesh.rotation.z = Math.sin(this.headBob) * swayAmount;
            this.weaponMesh.rotation.x = Math.sin(this.headBob * 0.5) * swayAmount * 0.5;
            
            // Weapon breathing
            if (!this.isWalking) {
                this.weaponMesh.position.y = -0.2 + Math.sin(this.breathingOffset) * 0.005;
            }
        }
    }
    
    addCameraShake(intensity) {
        this.cameraShake.set(
            (Math.random() - 0.5) * intensity * 0.01,
            (Math.random() - 0.5) * intensity * 0.01,
            (Math.random() - 0.5) * intensity * 0.01
        );
    }
    
    takeDamage(amount) {
        this.health -= amount;
        this.health = Math.max(0, this.health);
        this.addCameraShake(amount);
        
        // Screen flash effect could be added here
    }
    
    heal(amount) {
        this.health += amount;
        this.health = Math.min(this.maxHealth, this.health);
    }
    
    getStamina() {
        return Math.round(this.stamina);
    }
    
    getMaxStamina() {
        return this.maxStamina;
    }
    
    // Enhanced interaction system
    checkInteractions() {
        // Cast ray forward to check for interactable objects
        const raycaster = new THREE.Raycaster();
        const direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction);
        
        raycaster.set(this.position, direction);
        // This would be used for vehicle entry, door opening, etc.
    }
    
    // Enhanced movement with parkour elements
    checkParkourMovement(inputManager, deltaTime) {
        // Wall running detection
        const raycaster = new THREE.Raycaster();
        const rightDirection = new THREE.Vector3();
        this.camera.getWorldDirection(rightDirection);
        rightDirection.cross(new THREE.Vector3(0, 1, 0));
        
        // Check for walls on the right side
        raycaster.set(this.position, rightDirection);
        // Implementation would check for wall collision and enable wall running
    }
    
    // Enhanced weapon handling
    updateWeaponAdvanced(deltaTime) {
        if (this.weaponMesh) {
            // More realistic weapon sway
            const swayAmount = this.headBobSpeed * 0.15;
            const breathingAmount = Math.sin(this.breathingOffset) * 0.01;
            
            // Weapon sway based on movement
            this.weaponMesh.rotation.z = Math.sin(this.headBob) * swayAmount + breathingAmount;
            this.weaponMesh.rotation.x = Math.sin(this.headBob * 0.5) * swayAmount * 0.5;
            this.weaponMesh.rotation.y = Math.sin(this.headBob * 0.3) * swayAmount * 0.3;
            
            // Weapon position adjustments
            if (!this.isWalking) {
                this.weaponMesh.position.y = -0.2 + breathingAmount;
                this.weaponMesh.position.x = 0.3 + breathingAmount * 0.5;
            } else {
                // Add more movement when walking
                this.weaponMesh.position.y = -0.2 + Math.sin(this.headBob * 2) * 0.02;
                this.weaponMesh.position.x = 0.3 + Math.sin(this.headBob) * 0.01;
            }
        }
    }
    
    // Enhanced camera shake with different types
    addAdvancedCameraShake(intensity, type = 'impact') {
        switch (type) {
            case 'impact':
                this.cameraShake.set(
                    (Math.random() - 0.5) * intensity * 0.02,
                    (Math.random() - 0.5) * intensity * 0.02,
                    (Math.random() - 0.5) * intensity * 0.02
                );
                break;
            case 'explosion':
                this.cameraShake.set(
                    (Math.random() - 0.5) * intensity * 0.05,
                    (Math.random() - 0.5) * intensity * 0.03,
                    (Math.random() - 0.5) * intensity * 0.05
                );
                break;
            case 'earthquake':
                this.cameraShake.set(
                    Math.sin(Date.now() * 0.01) * intensity * 0.01,
                    Math.sin(Date.now() * 0.008) * intensity * 0.008,
                    Math.sin(Date.now() * 0.012) * intensity * 0.01
                );
                break;
        }
    }
    
    // Enhanced health system with regeneration
    updateHealthSystem(deltaTime) {
        // Health regeneration when not taking damage
        if (this.health < this.maxHealth && this.health > 0) {
            this.health += 5 * deltaTime; // Slow regeneration
            this.health = Math.min(this.maxHealth, this.health);
        }
        
        // Low health effects
        if (this.health < 30) {
            // Add screen edge darkening effect
            this.addAdvancedCameraShake(1, 'impact');
        }
    }
    
    // Enhanced footstep system
    updateFootsteps(deltaTime) {
        if (this.isWalking && this.isGrounded) {
            this.footstepTimer += deltaTime;
            
            const footstepInterval = this.isRunning ? 0.3 : 0.5;
            
            if (this.footstepTimer >= footstepInterval) {
                // Create footstep particle effect
                // This would integrate with the effects manager
                this.footstepTimer = 0;
                
                // Different footstep sounds based on surface
                // Implementation would check ground material
            }
        }
    }
}