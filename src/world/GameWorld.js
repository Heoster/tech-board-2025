import * as THREE from 'three';

export class GameWorld {
    constructor(scene) {
        this.scene = scene;
        this.buildings = [];
        this.roads = [];
        this.vehicles = [];
        this.streetLights = [];
        this.trees = [];
        this.animatedObjects = [];

        // Texture loader for enhanced graphics
        this.textureLoader = new THREE.TextureLoader();
        this.setupMaterials();
    }

    setupMaterials() {
        // Create procedural textures for better visuals
        this.createProceduralTextures();

        // Enhanced materials with procedural textures
        this.materials = {
            grass: new THREE.MeshStandardMaterial({
                color: 0x3a5f3a,
                roughness: 0.8,
                metalness: 0.1,
                map: this.textures.grass,
                normalMap: this.textures.grassNormal
            }),
            road: new THREE.MeshStandardMaterial({
                color: 0x333333,
                roughness: 0.9,
                metalness: 0.1,
                map: this.textures.asphalt,
                normalMap: this.textures.asphaltNormal
            }),
            concrete: new THREE.MeshStandardMaterial({
                color: 0x888888,
                roughness: 0.7,
                metalness: 0.2,
                map: this.textures.concrete,
                normalMap: this.textures.concreteNormal
            }),
            glass: new THREE.MeshPhysicalMaterial({
                color: 0x88ccff,
                transparent: true,
                opacity: 0.3,
                roughness: 0.05,
                metalness: 0.0,
                transmission: 0.95,
                thickness: 0.5,
                ior: 1.5
            }),
            metal: new THREE.MeshStandardMaterial({
                color: 0x666666,
                roughness: 0.3,
                metalness: 0.9,
                envMapIntensity: 1.0
            }),
            brick: new THREE.MeshStandardMaterial({
                color: 0x8B4513,
                roughness: 0.8,
                metalness: 0.1,
                map: this.textures.brick,
                normalMap: this.textures.brickNormal
            }),
            neon: new THREE.MeshStandardMaterial({
                color: 0xff00ff,
                emissive: 0xff00ff,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.8
            })
        };
    }

    createProceduralTextures() {
        this.textures = {};

        // Create grass texture
        const grassCanvas = document.createElement('canvas');
        grassCanvas.width = grassCanvas.height = 256;
        const grassCtx = grassCanvas.getContext('2d');

        // Grass base
        grassCtx.fillStyle = '#2d4a2d';
        grassCtx.fillRect(0, 0, 256, 256);

        // Add grass blades
        for (let i = 0; i < 1000; i++) {
            grassCtx.fillStyle = `hsl(${90 + Math.random() * 30}, 60%, ${20 + Math.random() * 20}%)`;
            grassCtx.fillRect(Math.random() * 256, Math.random() * 256, 1, Math.random() * 3 + 1);
        }

        this.textures.grass = new THREE.CanvasTexture(grassCanvas);
        this.textures.grass.wrapS = this.textures.grass.wrapT = THREE.RepeatWrapping;
        this.textures.grass.repeat.set(50, 50);

        // Create asphalt texture
        const asphaltCanvas = document.createElement('canvas');
        asphaltCanvas.width = asphaltCanvas.height = 256;
        const asphaltCtx = asphaltCanvas.getContext('2d');

        asphaltCtx.fillStyle = '#2a2a2a';
        asphaltCtx.fillRect(0, 0, 256, 256);

        // Add asphalt grain
        for (let i = 0; i < 2000; i++) {
            asphaltCtx.fillStyle = `rgb(${40 + Math.random() * 20}, ${40 + Math.random() * 20}, ${40 + Math.random() * 20})`;
            asphaltCtx.fillRect(Math.random() * 256, Math.random() * 256, 1, 1);
        }

        this.textures.asphalt = new THREE.CanvasTexture(asphaltCanvas);
        this.textures.asphalt.wrapS = this.textures.asphalt.wrapT = THREE.RepeatWrapping;
        this.textures.asphalt.repeat.set(20, 20);

        // Create concrete texture
        const concreteCanvas = document.createElement('canvas');
        concreteCanvas.width = concreteCanvas.height = 256;
        const concreteCtx = concreteCanvas.getContext('2d');

        concreteCtx.fillStyle = '#888888';
        concreteCtx.fillRect(0, 0, 256, 256);

        // Add concrete texture
        for (let i = 0; i < 500; i++) {
            concreteCtx.fillStyle = `rgb(${120 + Math.random() * 40}, ${120 + Math.random() * 40}, ${120 + Math.random() * 40})`;
            concreteCtx.fillRect(Math.random() * 256, Math.random() * 256, Math.random() * 3, Math.random() * 3);
        }

        this.textures.concrete = new THREE.CanvasTexture(concreteCanvas);
        this.textures.concrete.wrapS = this.textures.concrete.wrapT = THREE.RepeatWrapping;
        this.textures.concrete.repeat.set(10, 10);

        // Create brick texture
        const brickCanvas = document.createElement('canvas');
        brickCanvas.width = brickCanvas.height = 256;
        const brickCtx = brickCanvas.getContext('2d');

        brickCtx.fillStyle = '#8B4513';
        brickCtx.fillRect(0, 0, 256, 256);

        // Draw brick pattern
        brickCtx.strokeStyle = '#654321';
        brickCtx.lineWidth = 2;
        for (let y = 0; y < 256; y += 32) {
            for (let x = 0; x < 256; x += 64) {
                const offset = (y / 32) % 2 === 0 ? 0 : 32;
                brickCtx.strokeRect(x + offset, y, 64, 32);
            }
        }

        this.textures.brick = new THREE.CanvasTexture(brickCanvas);
        this.textures.brick.wrapS = this.textures.brick.wrapT = THREE.RepeatWrapping;
        this.textures.brick.repeat.set(5, 5);

        // Create simple normal maps
        this.createNormalMaps();
    }

    createNormalMaps() {
        // Simple normal map creation
        const createNormalMap = (size = 256) => {
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = size;
            const ctx = canvas.getContext('2d');

            const imageData = ctx.createImageData(size, size);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                data[i] = 128 + Math.random() * 20 - 10;     // R (X normal)
                data[i + 1] = 128 + Math.random() * 20 - 10; // G (Y normal)
                data[i + 2] = 255;                           // B (Z normal)
                data[i + 3] = 255;                           // A
            }

            ctx.putImageData(imageData, 0, 0);
            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            return texture;
        };

        this.textures.grassNormal = createNormalMap();
        this.textures.grassNormal.repeat.set(50, 50);

        this.textures.asphaltNormal = createNormalMap();
        this.textures.asphaltNormal.repeat.set(20, 20);

        this.textures.concreteNormal = createNormalMap();
        this.textures.concreteNormal.repeat.set(10, 10);

        this.textures.brickNormal = createNormalMap();
        this.textures.brickNormal.repeat.set(5, 5);
    }

    generate() {
        console.log('Generating enhanced world with advanced features...');
        this.createTerrain();
        this.createRoads();
        this.createBuildings();
        this.createAdvancedVehicles();
        this.createProps();
        this.createTrafficLights();
        this.createBillboards();
        this.createNeonSigns();
        this.createWeatherSystem();
        console.log(`Enhanced world generated: ${this.buildings.length} buildings, ${this.vehicles.length} vehicles, ${this.animatedObjects.length} animated objects`);
    }

    update(deltaTime, elapsedTime) {
        this.updateAnimatedObjects(deltaTime, elapsedTime);
        this.updateAdvancedVehicles(deltaTime);
        this.updateStreetLights(elapsedTime);
        this.updateWeather(deltaTime, elapsedTime);
    }

    createTerrain() {
        // Enhanced ground with multiple segments for better lighting
        const segments = 20;
        const groundGeometry = new THREE.PlaneGeometry(1000, 1000, segments, segments);
        const ground = new THREE.Mesh(groundGeometry, this.materials.grass);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Add varied terrain features
        for (let i = 0; i < 15; i++) {
            const hillGeometry = new THREE.SphereGeometry(
                Math.random() * 25 + 15,
                32,
                16
            );
            const hill = new THREE.Mesh(hillGeometry, this.materials.grass);
            hill.position.set(
                (Math.random() - 0.5) * 700,
                -12,
                (Math.random() - 0.5) * 700
            );
            hill.receiveShadow = true;
            hill.castShadow = true;
            this.scene.add(hill);
        }

        // Add rock formations
        for (let i = 0; i < 8; i++) {
            const rockGeometry = new THREE.DodecahedronGeometry(Math.random() * 8 + 4);
            const rock = new THREE.Mesh(rockGeometry, this.materials.concrete);
            rock.position.set(
                (Math.random() - 0.5) * 900,
                2,
                (Math.random() - 0.5) * 900
            );
            rock.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            rock.castShadow = true;
            rock.receiveShadow = true;
            this.scene.add(rock);
        }
    }

    createRoads() {
        // Main roads
        const roadMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });

        // Horizontal road
        const roadH = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 20),
            roadMaterial
        );
        roadH.rotation.x = -Math.PI / 2;
        roadH.position.y = 0.1;
        roadH.receiveShadow = true;
        this.scene.add(roadH);

        // Vertical road
        const roadV = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 1000),
            roadMaterial
        );
        roadV.rotation.x = -Math.PI / 2;
        roadV.position.y = 0.1;
        roadV.receiveShadow = true;
        this.scene.add(roadV);

        // Road markings
        this.createRoadMarkings();
    }

    createRoadMarkings() {
        const markingMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

        // Center line markings
        for (let i = -500; i < 500; i += 40) {
            const marking = new THREE.Mesh(
                new THREE.PlaneGeometry(20, 2),
                markingMaterial
            );
            marking.rotation.x = -Math.PI / 2;
            marking.position.set(i, 0.2, 0);
            this.scene.add(marking);

            const markingV = new THREE.Mesh(
                new THREE.PlaneGeometry(2, 20),
                markingMaterial
            );
            markingV.rotation.x = -Math.PI / 2;
            markingV.position.set(0, 0.2, i);
            this.scene.add(markingV);
        }
    }

    createBuildings() {
        const buildingTypes = [
            { material: this.materials.brick, type: 'residential' },
            { material: this.materials.concrete, type: 'office' },
            { material: this.materials.metal, type: 'industrial' }
        ];

        for (let i = 0; i < 60; i++) {
            const buildingType = buildingTypes[Math.floor(Math.random() * buildingTypes.length)];
            const width = Math.random() * 25 + 15;
            const height = Math.random() * 60 + 30;
            const depth = Math.random() * 25 + 15;

            // Create building with multiple sections for variety
            const buildingGroup = new THREE.Group();

            // Main building
            const mainGeometry = new THREE.BoxGeometry(width, height, depth);
            const mainBuilding = new THREE.Mesh(mainGeometry, buildingType.material);
            mainBuilding.castShadow = true;
            mainBuilding.receiveShadow = true;
            buildingGroup.add(mainBuilding);

            // Add architectural details
            this.addBuildingDetails(buildingGroup, width, height, depth, buildingType.type);

            // Position buildings away from roads
            let x, z;
            do {
                x = (Math.random() - 0.5) * 800;
                z = (Math.random() - 0.5) * 800;
            } while (Math.abs(x) < 40 || Math.abs(z) < 40);

            buildingGroup.position.set(x, height / 2, z);
            this.scene.add(buildingGroup);
            this.buildings.push(buildingGroup);

            // Add enhanced windows
            this.addEnhancedWindows(buildingGroup, width, height, depth, buildingType.type);

            // Add rooftop details
            this.addRooftopDetails(buildingGroup, width, height, depth);
        }
    }

    addBuildingDetails(buildingGroup, width, height, depth, type) {
        // Add entrance
        const entranceGeometry = new THREE.BoxGeometry(width * 0.3, height * 0.1, 2);
        const entrance = new THREE.Mesh(entranceGeometry, this.materials.glass);
        entrance.position.set(0, -height * 0.45, depth / 2 + 1);
        entrance.castShadow = true;
        buildingGroup.add(entrance);

        // Add architectural elements based on type
        if (type === 'office') {
            // Add glass facade sections
            for (let i = 0; i < 3; i++) {
                const glassGeometry = new THREE.PlaneGeometry(width * 0.8, height * 0.2);
                const glass = new THREE.Mesh(glassGeometry, this.materials.glass);
                glass.position.set(0, height * 0.3 - i * height * 0.25, depth / 2 + 0.1);
                buildingGroup.add(glass);
            }
        } else if (type === 'residential') {
            // Add balconies
            for (let floor = 2; floor < height / 4; floor += 2) {
                const balconyGeometry = new THREE.BoxGeometry(width * 0.6, 0.5, 3);
                const balcony = new THREE.Mesh(balconyGeometry, this.materials.concrete);
                balcony.position.set(0, -height / 2 + floor * 4, depth / 2 + 1.5);
                balcony.castShadow = true;
                buildingGroup.add(balcony);
            }
        }
    }

    addRooftopDetails(buildingGroup, width, height, depth) {
        // Add rooftop equipment
        const equipmentCount = Math.floor(Math.random() * 5) + 2;

        for (let i = 0; i < equipmentCount; i++) {
            const equipGeometry = new THREE.BoxGeometry(
                Math.random() * 3 + 1,
                Math.random() * 2 + 1,
                Math.random() * 3 + 1
            );
            const equipment = new THREE.Mesh(equipGeometry, this.materials.metal);
            equipment.position.set(
                (Math.random() - 0.5) * width * 0.6,
                height / 2 + 1,
                (Math.random() - 0.5) * depth * 0.6
            );
            equipment.castShadow = true;
            buildingGroup.add(equipment);
        }

        // Add antenna
        if (Math.random() > 0.7) {
            const antennaGeometry = new THREE.CylinderGeometry(0.1, 0.1, 8);
            const antenna = new THREE.Mesh(antennaGeometry, this.materials.metal);
            antenna.position.set(0, height / 2 + 4, 0);
            antenna.castShadow = true;
            buildingGroup.add(antenna);

            // Add blinking light
            const lightGeometry = new THREE.SphereGeometry(0.3);
            const lightMaterial = new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0xff0000,
                emissiveIntensity: 0.5
            });
            const light = new THREE.Mesh(lightGeometry, lightMaterial);
            light.position.set(0, height / 2 + 8, 0);
            buildingGroup.add(light);

            // Add to animated objects for blinking
            this.animatedObjects.push({
                type: 'antennaLight',
                light: light,
                timer: Math.random() * 2
            });
        }
    }

    addEnhancedWindows(buildingGroup, width, height, depth, type) {
        const windowsPerFloor = Math.floor(width / 3);
        const floors = Math.floor(height / 4);

        // Different window styles based on building type
        const windowConfigs = {
            residential: { size: 1.5, spacing: 3, lightChance: 0.6 },
            office: { size: 2.5, spacing: 3.5, lightChance: 0.8 },
            industrial: { size: 1, spacing: 4, lightChance: 0.3 }
        };

        const config = windowConfigs[type] || windowConfigs.residential;

        // Front face windows
        for (let floor = 1; floor < floors; floor++) {
            for (let win = 0; win < windowsPerFloor; win++) {
                const isLit = Math.random() < config.lightChance;

                // Window frame
                const frameGeometry = new THREE.PlaneGeometry(config.size + 0.2, config.size + 0.2);
                const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
                const frame = new THREE.Mesh(frameGeometry, frameMaterial);

                // Window glass
                const glassGeometry = new THREE.PlaneGeometry(config.size, config.size);
                const glassMaterial = new THREE.MeshPhysicalMaterial({
                    color: isLit ? 0xffff99 : 0x88ccff,
                    transparent: true,
                    opacity: 0.7,
                    transmission: 0.8,
                    emissive: isLit ? 0x444422 : 0x000000,
                    emissiveIntensity: isLit ? 0.3 : 0
                });
                const glass = new THREE.Mesh(glassGeometry, glassMaterial);

                const windowGroup = new THREE.Group();
                windowGroup.add(frame);
                windowGroup.add(glass);

                windowGroup.position.set(
                    -width / 2 + (win + 0.5) * config.spacing,
                    -height / 2 + floor * 4,
                    depth / 2 + 0.1
                );

                buildingGroup.add(windowGroup);

                // Add window to animated objects for random light changes
                if (isLit) {
                    this.animatedObjects.push({
                        type: 'window',
                        material: glassMaterial,
                        timer: Math.random() * 30,
                        isLit: true
                    });
                }
            }
        }

        // Side windows
        for (let side = 0; side < 2; side++) {
            const sideWindowsPerFloor = Math.floor(depth / 4);
            for (let floor = 1; floor < floors; floor++) {
                for (let win = 0; win < sideWindowsPerFloor; win++) {
                    const isLit = Math.random() < config.lightChance * 0.7;

                    const windowGroup = new THREE.Group();

                    const frameGeometry = new THREE.PlaneGeometry(config.size, config.size);
                    const frame = new THREE.Mesh(frameGeometry, new THREE.MeshStandardMaterial({ color: 0x444444 }));

                    const glassGeometry = new THREE.PlaneGeometry(config.size * 0.9, config.size * 0.9);
                    const glass = new THREE.Mesh(glassGeometry, new THREE.MeshPhysicalMaterial({
                        color: isLit ? 0xffff99 : 0x88ccff,
                        transparent: true,
                        opacity: 0.7,
                        transmission: 0.8,
                        emissive: isLit ? 0x444422 : 0x000000,
                        emissiveIntensity: isLit ? 0.2 : 0
                    }));

                    windowGroup.add(frame);
                    windowGroup.add(glass);

                    windowGroup.position.set(
                        side === 0 ? -width / 2 - 0.1 : width / 2 + 0.1,
                        -height / 2 + floor * 4,
                        -depth / 2 + (win + 0.5) * (depth / sideWindowsPerFloor)
                    );

                    windowGroup.rotation.y = side === 0 ? Math.PI / 2 : -Math.PI / 2;
                    buildingGroup.add(windowGroup);
                }
            }
        }
    }

    createVehicles() {
        const vehicleColors = [0xff0000, 0x0000ff, 0x00ff00, 0xffff00, 0xff00ff, 0x00ffff, 0xffffff, 0x000000];

        for (let i = 0; i < 20; i++) {
            const vehicle = this.createVehicle(vehicleColors[Math.floor(Math.random() * vehicleColors.length)]);

            // Position on roads
            if (Math.random() > 0.5) {
                vehicle.position.set(
                    (Math.random() - 0.5) * 900,
                    1,
                    (Math.random() - 0.5) * 15
                );
            } else {
                vehicle.position.set(
                    (Math.random() - 0.5) * 15,
                    1,
                    (Math.random() - 0.5) * 900
                );
            }

            this.scene.add(vehicle);
            this.vehicles.push(vehicle);
        }
    }

    createVehicle(color) {
        const vehicleGroup = new THREE.Group();

        // Car body
        const bodyGeometry = new THREE.BoxGeometry(4, 1.5, 8);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 1;
        body.castShadow = true;
        vehicleGroup.add(body);

        // Car roof
        const roofGeometry = new THREE.BoxGeometry(3, 1, 4);
        const roof = new THREE.Mesh(roofGeometry, bodyMaterial);
        roof.position.set(0, 2, -1);
        roof.castShadow = true;
        vehicleGroup.add(roof);

        // Wheels
        const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 8);
        const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });

        const wheelPositions = [
            [-1.8, 0.5, 2.5],
            [1.8, 0.5, 2.5],
            [-1.8, 0.5, -2.5],
            [1.8, 0.5, -2.5]
        ];

        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.position.set(...pos);
            wheel.rotation.z = Math.PI / 2;
            wheel.castShadow = true;
            vehicleGroup.add(wheel);
        });

        return vehicleGroup;
    }

    createProps() {
        // Street lights
        for (let i = -400; i < 400; i += 80) {
            this.createStreetLight(i, 0, 15);
            this.createStreetLight(i, 0, -15);
            this.createStreetLight(15, 0, i);
            this.createStreetLight(-15, 0, i);
        }

        // Trees
        for (let i = 0; i < 100; i++) {
            let x, z;
            do {
                x = (Math.random() - 0.5) * 900;
                z = (Math.random() - 0.5) * 900;
            } while (Math.abs(x) < 40 || Math.abs(z) < 40);

            this.createTree(x, z);
        }
    }

    createStreetLight(x, y, z) {
        const poleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 8);
        const poleMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
        const pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.position.set(x, y + 4, z);
        pole.castShadow = true;
        this.scene.add(pole);

        const lightGeometry = new THREE.SphereGeometry(0.5);
        const lightMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffaa,
            emissive: 0x444422
        });
        const light = new THREE.Mesh(lightGeometry, lightMaterial);
        light.position.set(x, y + 8, z);
        this.scene.add(light);
        this.streetLights.push(light);
    }

    createTree(x, z) {
        const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.8, 6);
        const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(x, 3, z);
        trunk.castShadow = true;
        this.scene.add(trunk);

        const leavesGeometry = new THREE.SphereGeometry(4);
        const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.set(x, 8, z);
        leaves.castShadow = true;
        this.scene.add(leaves);
    }

    createTrafficLights() {
        const intersections = [
            { x: 0, z: 0 },
            { x: 200, z: 0 },
            { x: -200, z: 0 },
            { x: 0, z: 200 },
            { x: 0, z: -200 }
        ];

        intersections.forEach(pos => {
            this.createTrafficLight(pos.x + 15, pos.z + 15);
            this.createTrafficLight(pos.x - 15, pos.z - 15);
        });
    }

    createTrafficLight(x, z) {
        const poleGeometry = new THREE.CylinderGeometry(0.15, 0.15, 6);
        const pole = new THREE.Mesh(poleGeometry, this.materials.metal);
        pole.position.set(x, 3, z);
        pole.castShadow = true;
        this.scene.add(pole);

        // Traffic light box
        const boxGeometry = new THREE.BoxGeometry(0.8, 2, 0.4);
        const box = new THREE.Mesh(boxGeometry, new THREE.MeshLambertMaterial({ color: 0x222222 }));
        box.position.set(x, 6.5, z);
        box.castShadow = true;
        this.scene.add(box);

        // Lights
        const lights = [];
        const colors = [0xff0000, 0xffff00, 0x00ff00]; // Red, Yellow, Green

        for (let i = 0; i < 3; i++) {
            const lightGeometry = new THREE.CircleGeometry(0.15, 16);
            const lightMaterial = new THREE.MeshLambertMaterial({
                color: colors[i],
                transparent: true,
                opacity: 0.3,
                emissive: 0x000000
            });
            const light = new THREE.Mesh(lightGeometry, lightMaterial);
            light.position.set(x, 7.2 - i * 0.6, z + 0.21);
            this.scene.add(light);
            lights.push({ mesh: light, color: colors[i], active: i === 2 });
        }

        this.animatedObjects.push({
            type: 'trafficLight',
            lights: lights,
            timer: Math.random() * 10,
            currentLight: 2
        });
    }

    createBillboards() {
        for (let i = 0; i < 10; i++) {
            let x, z;
            do {
                x = (Math.random() - 0.5) * 800;
                z = (Math.random() - 0.5) * 800;
            } while (Math.abs(x) < 50 || Math.abs(z) < 50);

            // Billboard pole
            const poleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 12);
            const pole = new THREE.Mesh(poleGeometry, this.materials.metal);
            pole.position.set(x, 6, z);
            pole.castShadow = true;
            this.scene.add(pole);

            // Billboard board
            const boardGeometry = new THREE.PlaneGeometry(8, 4);
            const boardMaterial = new THREE.MeshLambertMaterial({
                color: Math.random() * 0xffffff
            });
            const board = new THREE.Mesh(boardGeometry, boardMaterial);
            board.position.set(x, 10, z);
            board.castShadow = true;
            this.scene.add(board);
        }
    }

    updateAnimatedObjects(deltaTime, elapsedTime) {
        this.animatedObjects.forEach((obj, index) => {
            obj.timer += deltaTime;

            switch (obj.type) {
                case 'trafficLight':
                    if (obj.timer > 5) { // Change every 5 seconds
                        // Turn off current light
                        obj.lights[obj.currentLight].mesh.material.opacity = 0.3;
                        if (obj.lights[obj.currentLight].mesh.material.emissive) {
                            obj.lights[obj.currentLight].mesh.material.emissive.setHex(0x000000);
                        }

                        // Move to next light
                        obj.currentLight = (obj.currentLight + 1) % 3;

                        // Turn on new light
                        obj.lights[obj.currentLight].mesh.material.opacity = 1.0;
                        if (obj.lights[obj.currentLight].mesh.material.emissive) {
                            obj.lights[obj.currentLight].mesh.material.emissive.setHex(obj.lights[obj.currentLight].color);
                        }

                        obj.timer = 0;
                    }
                    break;

                case 'antennaLight':
                    if (obj.timer > 1) { // Blink every second
                        const intensity = obj.light.material.emissiveIntensity > 0 ? 0 : 0.8;
                        obj.light.material.emissiveIntensity = intensity;
                        obj.timer = 0;
                    }
                    break;

                case 'window':
                    if (obj.timer > 20 + Math.random() * 20) { // Random light changes
                        obj.isLit = !obj.isLit;
                        obj.material.emissive.setHex(obj.isLit ? 0x444422 : 0x000000);
                        obj.material.emissiveIntensity = obj.isLit ? 0.3 : 0;
                        obj.material.color.setHex(obj.isLit ? 0xffff99 : 0x88ccff);
                        obj.timer = 0;
                    }
                    break;

                case 'neonSign':
                    // Flickering neon effect
                    const flicker = Math.sin(elapsedTime * 20 + index) * 0.3 + 0.7;
                    obj.material.emissiveIntensity = flicker * 0.8;
                    break;
            }
        });
    }

    updateAdvancedVehicles(deltaTime) {
        this.vehicles.forEach(vehicle => {
            if (vehicle.userData && vehicle.userData.direction && vehicle.userData.speed) {
                // Move vehicle in its direction
                const movement = vehicle.userData.direction.clone().multiplyScalar(vehicle.userData.speed * deltaTime);
                vehicle.position.add(movement);

                // Wrap around world boundaries
                if (vehicle.position.x > 500) vehicle.position.x = -500;
                if (vehicle.position.x < -500) vehicle.position.x = 500;
                if (vehicle.position.z > 500) vehicle.position.z = -500;
                if (vehicle.position.z < -500) vehicle.position.z = 500;

                // Add slight random movement for realism
                vehicle.position.x += (Math.random() - 0.5) * 0.5 * deltaTime;
                vehicle.position.z += (Math.random() - 0.5) * 0.5 * deltaTime;

                // Rotate wheels (find wheel groups and rotate them)
                vehicle.children.forEach(child => {
                    if (child.children && child.children.length > 0) {
                        // This is likely a wheel group
                        child.rotation.x += vehicle.userData.speed * deltaTime * 0.5;
                    }
                });
            }
        });
    }

    updateStreetLights(elapsedTime) {
        // Flickering effect for some street lights
        this.streetLights.forEach((light, index) => {
            if (index % 5 === 0 && light.material && light.material.emissive) { // Every 5th light flickers
                const flicker = Math.sin(elapsedTime * 10 + index) * 0.1 + 0.9;
                light.material.emissive.setScalar(flicker * 0.2);
            }
        });
    }
    
    createWeatherSystem() {
    this.weather = {
        type: 'clear', // clear, rain, fog, night
        intensity: 0,
        transition: 0
    };

        this.createRainSystem();
        this.createFogSystem();
    }
    
    createRainSystem() {
    const rainCount = 1000;
    const rainGeometry = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(rainCount * 3);
    const rainVelocities = new Float32Array(rainCount * 3);

    for (let i = 0; i < rainCount * 3; i += 3) {
        rainPositions[i] = (Math.random() - 0.5) * 1000;
        rainPositions[i + 1] = Math.random() * 100 + 50;
        rainPositions[i + 2] = (Math.random() - 0.5) * 1000;

        rainVelocities[i] = (Math.random() - 0.5) * 2;
        rainVelocities[i + 1] = -Math.random() * 20 - 10;
        rainVelocities[i + 2] = (Math.random() - 0.5) * 2;
    }

    rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    rainGeometry.setAttribute('velocity', new THREE.BufferAttribute(rainVelocities, 3));

    const rainMaterial = new THREE.PointsMaterial({
        color: 0x88ccff,
        size: 0.2,
        transparent: true,
        opacity: 0.6
    });

    this.rainSystem = new THREE.Points(rainGeometry, rainMaterial);
    this.rainSystem.visible = false;
        this.scene.add(this.rainSystem);
    }
    
    createFogSystem() {
        this.fogSystem = new THREE.Fog(0x888888, 50, 300);
    }
    
    updateWeather(deltaTime, elapsedTime) {
    // Change weather randomly
    if (Math.random() < 0.001) { // 0.1% chance per frame
        const weatherTypes = ['clear', 'rain', 'fog'];
        this.weather.type = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        this.weather.transition = 0;
        console.log(`Weather changing to: ${this.weather.type}`);
    }

    // Update weather transition
    this.weather.transition = Math.min(1, this.weather.transition + deltaTime * 0.5);

    switch (this.weather.type) {
        case 'rain':
            this.updateRain(deltaTime);
            this.rainSystem.visible = true;
            this.scene.fog.near = 100;
            this.scene.fog.far = 400;
            break;

        case 'fog':
            this.rainSystem.visible = false;
            this.scene.fog.near = 20;
            this.scene.fog.far = 200;
            break;

        default: // clear
            this.rainSystem.visible = false;
            this.scene.fog.near = 100;
            this.scene.fog.far = 800;
            break;
    }
    }
    
    updateRain(deltaTime) {
    const positions = this.rainSystem.geometry.attributes.position.array;
    const velocities = this.rainSystem.geometry.attributes.velocity.array;

    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i] * deltaTime;
        positions[i + 1] += velocities[i + 1] * deltaTime;
        positions[i + 2] += velocities[i + 2] * deltaTime;

        // Reset rain drops that hit the ground
        if (positions[i + 1] < 0) {
            positions[i] = (Math.random() - 0.5) * 1000;
            positions[i + 1] = Math.random() * 50 + 100;
            positions[i + 2] = (Math.random() - 0.5) * 1000;
        }
    }

    this.rainSystem.geometry.attributes.position.needsUpdate = true;
    }
    
    createNeonSigns() {
    const signTexts = ['HOTEL', 'BAR', 'SHOP', 'CAFE', 'CLUB'];
    const neonColors = [0xff0080, 0x00ff80, 0x8000ff, 0xff8000, 0x0080ff];

    for (let i = 0; i < 15; i++) {
        let x, z;
        do {
            x = (Math.random() - 0.5) * 600;
            z = (Math.random() - 0.5) * 600;
        } while (Math.abs(x) < 60 || Math.abs(z) < 60);

        const color = neonColors[Math.floor(Math.random() * neonColors.length)];

        // Create neon sign
        const signGeometry = new THREE.PlaneGeometry(12, 4);
        const signMaterial = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.6,
            transparent: true,
            opacity: 0.9
        });

        const sign = new THREE.Mesh(signGeometry, signMaterial);
        sign.position.set(x, 15 + Math.random() * 10, z);
        sign.rotation.y = Math.random() * Math.PI * 2;

        this.scene.add(sign);

        // Add to animated objects for flickering
        this.animatedObjects.push({
            type: 'neonSign',
            material: signMaterial,
            timer: 0
        });

        // Add point light for neon glow
        const neonLight = new THREE.PointLight(color, 2, 30);
        neonLight.position.copy(sign.position);
        this.scene.add(neonLight);
    }
    }
    
    createAdvancedVehicles() {
    const vehicleTypes = [
        { color: 0xff0000, type: 'sports' },
        { color: 0x0000ff, type: 'sedan' },
        { color: 0x00ff00, type: 'suv' },
        { color: 0xffff00, type: 'taxi' },
        { color: 0xff00ff, type: 'police' }
    ];

    for (let i = 0; i < 30; i++) {
        const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
        const vehicle = this.createAdvancedVehicle(vehicleType.color, vehicleType.type);

        // Position on roads with proper lanes
        if (Math.random() > 0.5) {
            vehicle.position.set(
                (Math.random() - 0.5) * 900,
                1,
                Math.random() > 0.5 ? 7 : -7 // Different lanes
            );
            vehicle.userData.direction = new THREE.Vector3(Math.random() > 0.5 ? 1 : -1, 0, 0);
        } else {
            vehicle.position.set(
                Math.random() > 0.5 ? 7 : -7,
                1,
                (Math.random() - 0.5) * 900
            );
            vehicle.userData.direction = new THREE.Vector3(0, 0, Math.random() > 0.5 ? 1 : -1);
            vehicle.rotation.y = Math.PI / 2;
        }

        vehicle.userData.speed = 5 + Math.random() * 10;
        vehicle.userData.type = vehicleType.type;

        this.scene.add(vehicle);
        this.vehicles.push(vehicle);
    }
    }
    
    createAdvancedVehicle(color, type) {
    const vehicleGroup = new THREE.Group();

    // Different vehicle shapes based on type
    let bodyDimensions, roofDimensions;

    switch (type) {
        case 'sports':
            bodyDimensions = [4.5, 1.2, 8];
            roofDimensions = [3, 0.8, 3];
            break;
        case 'suv':
            bodyDimensions = [5, 2, 9];
            roofDimensions = [4, 1.2, 5];
            break;
        case 'taxi':
            bodyDimensions = [4.2, 1.5, 7.5];
            roofDimensions = [3.5, 1, 4];
            break;
        default: // sedan
            bodyDimensions = [4, 1.5, 8];
            roofDimensions = [3, 1, 4];
    }

    // Car body with metallic material
    const bodyGeometry = new THREE.BoxGeometry(...bodyDimensions);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.8,
        roughness: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1;
    body.castShadow = true;
    vehicleGroup.add(body);

    // Car roof
    const roofGeometry = new THREE.BoxGeometry(...roofDimensions);
    const roof = new THREE.Mesh(roofGeometry, bodyMaterial);
    roof.position.set(0, 2, -1);
    roof.castShadow = true;
    vehicleGroup.add(roof);

    // Enhanced wheels with rims
    const wheelGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.4, 12);
    const wheelMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.8
    });

    const rimGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.45, 8);
    const rimMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.9,
        roughness: 0.1
    });

    const wheelPositions = [
        [-2, 0.6, 3],
        [2, 0.6, 3],
        [-2, 0.6, -3],
        [2, 0.6, -3]
    ];

    wheelPositions.forEach(pos => {
        const wheelGroup = new THREE.Group();

        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheelGroup.add(wheel);

        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        rim.rotation.z = Math.PI / 2;
        wheelGroup.add(rim);

        wheelGroup.position.set(...pos);
        wheelGroup.castShadow = true;
        vehicleGroup.add(wheelGroup);
    });

    // Add headlights
    const headlightGeometry = new THREE.SphereGeometry(0.3);
    const headlightMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffcc,
        emissive: 0xffffcc,
        emissiveIntensity: 0.5
    });

        [-1.5, 1.5].forEach(x => {
            const headlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
            headlight.position.set(x, 1.2, bodyDimensions[2] / 2 + 0.2);
            vehicleGroup.add(headlight);
        });

        // Add taillights
        const taillightMaterial = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x440000,
            emissiveIntensity: 0.3
        });

        [-1.2, 1.2].forEach(x => {
            const taillight = new THREE.Mesh(headlightGeometry, taillightMaterial);
            taillight.position.set(x, 1.2, -bodyDimensions[2] / 2 - 0.2);
            vehicleGroup.add(taillight);
        });

        return vehicleGroup;
    }
}