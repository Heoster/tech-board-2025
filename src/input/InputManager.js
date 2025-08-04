export class InputManager {
    constructor() {
        this.keys = {};
        this.keysPressed = {}; // For single press detection
        this.mouse = {
            x: 0,
            y: 0,
            buttons: {},
            wheel: 0
        };
        
        this.gamepadIndex = -1;
        this.gamepad = null;
        
        this.setupEventListeners();
        this.checkGamepad();
    }
    
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (event) => {
            if (!this.keys[event.code]) {
                this.keysPressed[event.code] = true;
            }
            this.keys[event.code] = true;
        });
        
        document.addEventListener('keyup', (event) => {
            this.keys[event.code] = false;
            this.keysPressed[event.code] = false;
        });
        
        // Mouse events
        document.addEventListener('mousedown', (event) => {
            this.mouse.buttons[event.button] = true;
        });
        
        document.addEventListener('mouseup', (event) => {
            this.mouse.buttons[event.button] = false;
        });
        
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        });
        
        // Mouse wheel
        document.addEventListener('wheel', (event) => {
            this.mouse.wheel = event.deltaY;
            event.preventDefault();
        });
        
        // Gamepad events
        window.addEventListener('gamepadconnected', (event) => {
            this.gamepadIndex = event.gamepad.index;
            console.log('Gamepad connected:', event.gamepad.id);
        });
        
        window.addEventListener('gamepaddisconnected', (event) => {
            if (event.gamepad.index === this.gamepadIndex) {
                this.gamepadIndex = -1;
                this.gamepad = null;
            }
        });
        
        // Prevent context menu
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
        
        // Prevent default behavior for game keys
        document.addEventListener('keydown', (event) => {
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
                event.preventDefault();
            }
        });
    }
    
    isKeyPressed(keyCode) {
        return !!this.keys[keyCode];
    }
    
    isMouseButtonPressed(button) {
        return !!this.mouse.buttons[button];
    }
    
    getMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }
    
    checkGamepad() {
        if (this.gamepadIndex >= 0) {
            const gamepads = navigator.getGamepads();
            this.gamepad = gamepads[this.gamepadIndex];
        }
        requestAnimationFrame(() => this.checkGamepad());
    }
    
    isKeyJustPressed(keyCode) {
        const result = this.keysPressed[keyCode];
        this.keysPressed[keyCode] = false; // Reset after checking
        return !!result;
    }
    
    getGamepadAxis(axisIndex) {
        if (this.gamepad && this.gamepad.axes[axisIndex] !== undefined) {
            const value = this.gamepad.axes[axisIndex];
            // Apply deadzone
            return Math.abs(value) > 0.1 ? value : 0;
        }
        return 0;
    }
    
    isGamepadButtonPressed(buttonIndex) {
        if (this.gamepad && this.gamepad.buttons[buttonIndex]) {
            return this.gamepad.buttons[buttonIndex].pressed;
        }
        return false;
    }
    
    getMouseWheel() {
        const wheel = this.mouse.wheel;
        this.mouse.wheel = 0; // Reset after reading
        return wheel;
    }
}