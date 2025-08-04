export class UI {
    constructor() {
        this.healthElement = document.getElementById('health');
        this.speedElement = document.getElementById('speed');
        this.positionElement = document.getElementById('position');
        
        this.createEnhancedUI();
    }
    
    createEnhancedUI() {
        console.log('Creating enhanced UI with stamina bars and time display...');
        
        // Create stamina bar
        const staminaContainer = document.createElement('div');
        staminaContainer.innerHTML = 'Stamina: <span id="stamina">100</span>';
        staminaContainer.style.color = '#00ccff';
        document.getElementById('ui').appendChild(staminaContainer);
        this.staminaElement = document.getElementById('stamina');
        
        // Create time display
        const timeContainer = document.createElement('div');
        timeContainer.innerHTML = 'Time: <span id="timeOfDay">12:00</span>';
        document.getElementById('ui').appendChild(timeContainer);
        this.timeElement = document.getElementById('timeOfDay');
        
        // Create status indicators
        const statusContainer = document.createElement('div');
        statusContainer.innerHTML = 'Status: <span id="status">Normal</span>';
        document.getElementById('ui').appendChild(statusContainer);
        this.statusElement = document.getElementById('status');
        
        // Create weather display
        const weatherContainer = document.createElement('div');
        weatherContainer.innerHTML = 'Weather: <span id="weather">Clear</span>';
        document.getElementById('ui').appendChild(weatherContainer);
        this.weatherElement = document.getElementById('weather');
        
        // Create FPS counter
        const fpsContainer = document.createElement('div');
        fpsContainer.innerHTML = 'FPS: <span id="fps">60</span>';
        document.getElementById('ui').appendChild(fpsContainer);
        this.fpsElement = document.getElementById('fps');
        
        // Create health bar
        this.createHealthBar();
        this.createStaminaBar();
    }
    
    createHealthBar() {
        const healthBarContainer = document.createElement('div');
        healthBarContainer.style.cssText = `
            position: absolute;
            bottom: 80px;
            left: 20px;
            width: 200px;
            height: 20px;
            background: rgba(0,0,0,0.5);
            border: 2px solid #fff;
        `;
        
        const healthBar = document.createElement('div');
        healthBar.id = 'healthBar';
        healthBar.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #ff0000, #ffff00, #00ff00);
            transition: width 0.3s ease;
        `;
        
        healthBarContainer.appendChild(healthBar);
        document.getElementById('gameContainer').appendChild(healthBarContainer);
        this.healthBar = healthBar;
    }
    
    createStaminaBar() {
        const staminaBarContainer = document.createElement('div');
        staminaBarContainer.style.cssText = `
            position: absolute;
            bottom: 50px;
            left: 20px;
            width: 200px;
            height: 15px;
            background: rgba(0,0,0,0.5);
            border: 2px solid #fff;
        `;
        
        const staminaBar = document.createElement('div');
        staminaBar.id = 'staminaBar';
        staminaBar.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #0066ff, #00ccff);
            transition: width 0.3s ease;
        `;
        
        staminaBarContainer.appendChild(staminaBar);
        document.getElementById('gameContainer').appendChild(staminaBarContainer);
        this.staminaBar = staminaBar;
    }

    update(player, timeOfDay, weather, fps) {
        // Update text elements
        if (this.healthElement) {
            this.healthElement.textContent = Math.round(player.getHealth());
        }

        if (this.speedElement) {
            this.speedElement.textContent = player.getSpeed();
        }

        if (this.positionElement) {
            const pos = player.getPosition();
            this.positionElement.textContent = `${Math.round(pos.x)}, ${Math.round(pos.y)}, ${Math.round(pos.z)}`;
        }
        
        if (this.staminaElement) {
            this.staminaElement.textContent = player.getStamina();
        }
        
        // Update time display with day/night indicator
        if (this.timeElement && timeOfDay !== undefined) {
            const hours = Math.floor(timeOfDay * 24);
            const minutes = Math.floor((timeOfDay * 24 - hours) * 60);
            const period = hours < 6 || hours > 20 ? '🌙' : hours < 18 ? '☀️' : '🌅';
            this.timeElement.textContent = `${period} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
        
        // Update weather display
        if (this.weatherElement && weather) {
            const weatherIcons = {
                clear: '☀️ Clear',
                rain: '🌧️ Rain',
                fog: '🌫️ Fog',
                night: '🌙 Night'
            };
            this.weatherElement.textContent = weatherIcons[weather] || weather;
        }
        
        // Update FPS
        if (this.fpsElement && fps !== undefined) {
            this.fpsElement.textContent = Math.round(fps);
            this.fpsElement.style.color = fps > 45 ? '#00ff00' : fps > 30 ? '#ffff00' : '#ff0000';
        }
        
        // Update status with more detail
        if (this.statusElement) {
            let status = 'Normal';
            let statusColor = '#ffffff';
            
            if (player.health < 30) {
                status = '💔 Critical';
                statusColor = '#ff0000';
            } else if (player.stamina < 20) {
                status = '😤 Exhausted';
                statusColor = '#ffaa00';
            } else if (player.isRunning) {
                status = '🏃 Running';
                statusColor = '#00ff00';
            } else if (player.isCrouching) {
                status = '🦆 Crouching';
                statusColor = '#00aaff';
            } else if (!player.isGrounded) {
                status = '🚀 Airborne';
                statusColor = '#ff00ff';
            }
            
            this.statusElement.textContent = status;
            this.statusElement.style.color = statusColor;
        }
        
        // Update health bar with pulsing effect when low
        if (this.healthBar) {
            const healthPercent = (player.getHealth() / player.maxHealth) * 100;
            this.healthBar.style.width = healthPercent + '%';
            
            if (healthPercent < 25) {
                const pulse = Math.sin(Date.now() * 0.01) * 0.3 + 0.7;
                this.healthBar.style.opacity = pulse;
                this.healthBar.style.background = 'linear-gradient(90deg, #ff0000, #ff4444)';
            } else {
                this.healthBar.style.opacity = 1;
                this.healthBar.style.background = 'linear-gradient(90deg, #ff0000, #ffff00, #00ff00)';
            }
        }
        
        // Update stamina bar with enhanced visuals
        if (this.staminaBar) {
            const staminaPercent = (player.getStamina() / player.getMaxStamina()) * 100;
            this.staminaBar.style.width = staminaPercent + '%';
            
            // Change color and add effects based on stamina level
            if (staminaPercent < 25) {
                this.staminaBar.style.background = 'linear-gradient(90deg, #ff0000, #ff6600)';
                const pulse = Math.sin(Date.now() * 0.02) * 0.2 + 0.8;
                this.staminaBar.style.opacity = pulse;
            } else if (staminaPercent < 50) {
                this.staminaBar.style.background = 'linear-gradient(90deg, #ff6600, #ffff00)';
                this.staminaBar.style.opacity = 1;
            } else {
                this.staminaBar.style.background = 'linear-gradient(90deg, #0066ff, #00ccff)';
                this.staminaBar.style.opacity = 1;
            }
        }
    }
}