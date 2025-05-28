// Demo user credentials for testing
const users = {
    'admin': 'admin123',
    'user@demo.com': 'password',
    'test': 'test123',
    'demo': 'demo123'
};

// Global variables for DOM elements
let loginForm, loginInput, passwordInput, submitButton, buttonText;
let loginError, passwordError, successMessage;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    createParticles();
    showDemoCredentials();
});

// Initialize DOM elements
function initializeElements() {
    loginForm = document.getElementById('loginForm');
    loginInput = document.getElementById('Login');
    passwordInput = document.getElementById('Password');
    submitButton = document.getElementById('submitButton');
    buttonText = document.getElementById('buttonText');
    loginError = document.getElementById('loginError');
    passwordError = document.getElementById('passwordError');
    successMessage = document.getElementById('successMessage');
}

// Setup all event listeners
function setupEventListeners() {
    // Form submission
    loginForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time input validation
    loginInput.addEventListener('input', function() {
        clearInputError(this, loginError);
    });
    
    passwordInput.addEventListener('input', function() {
        clearInputError(this, passwordError);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Window load event for additional setup
    window.addEventListener('load', function() {
        console.log('Login system initialized successfully!');
    });
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const username = loginInput.value.trim();
    const password = passwordInput.value;
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate inputs
    if (!validateInputs(username, password)) {
        return;
    }
    
    // Show loading state
    showLoading(true);
    
    try {
        // Simulate server request delay
        await simulateServerDelay(2000);
        
        // Check credentials
        if (authenticateUser(username, password)) {
            handleSuccessfulLogin(username);
        } else {
            handleFailedLogin();
        }
    } catch (error) {
        console.error('Login error:', error);
        handleLoginError();
    }
}

// Simulate server delay
function simulateServerDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Authenticate user credentials
function authenticateUser(username, password) {
    return users[username] === password;
}

// Handle successful login
function handleSuccessfulLogin(username) {
    showSuccess('Login successful! Welcome back!');
    
    setTimeout(() => {
        alert(`Welcome ${username}! You are now logged in.`);
        resetForm();
        createCelebrationEffect();
    }, 1500);
}

// Handle failed login
function handleFailedLogin() {
    showError(passwordError, 'Invalid username or password');
    shakeForm();
    showLoading(false);
}

// Handle login error
function handleLoginError() {
    showError(passwordError, 'Login failed. Please try again.');
    showLoading(false);
}

// Input validation function
function validateInputs(username, password) {
    let isValid = true;
    
    // Validate username
    if (!username) {
        showError(loginError, 'Username is required');
        addErrorClass(loginInput);
        isValid = false;
    } else if (username.length < 3) {
        showError(loginError, 'Username must be at least 3 characters');
        addErrorClass(loginInput);
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showError(passwordError, 'Password is required');
        addErrorClass(passwordInput);
        isValid = false;
    } else if (password.length < 6) {
        showError(passwordError, 'Password must be at least 6 characters');
        addErrorClass(passwordInput);
        isValid = false;
    }
    
    return isValid;
}

// Show error message
function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

// Add error class to input
function addErrorClass(input) {
    input.classList.add('error');
}

// Clear error from specific input
function clearInputError(input, errorElement) {
    if (input.classList.contains('error')) {
        input.classList.remove('error');
        errorElement.classList.remove('show');
    }
}

// Clear all errors
function clearAllErrors() {
    loginError.classList.remove('show');
    passwordError.classList.remove('show');
    successMessage.classList.remove('show');
    loginInput.classList.remove('error');
    passwordInput.classList.remove('error');
}

// Show loading state
function showLoading(isLoading) {
    if (isLoading) {
        submitButton.classList.add('loading');
        buttonText.textContent = 'Logging In...';
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove('loading');
        buttonText.textContent = 'Submit';
        submitButton.disabled = false;
    }
}

// Show success message
function showSuccess(message) {
    showLoading(false);
    successMessage.textContent = message;
    successMessage.classList.add('show');
}

// Reset form to initial state
function resetForm() {
    loginForm.reset();
    clearAllErrors();
    showLoading(false);
}

// Shake form animation for errors
function shakeForm() {
    const container = document.querySelector('.input-container');
    container.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        container.style.animation = '';
    }, 500);
}

// Forgot password handler
function handleForgotPassword(e) {
    e.preventDefault();
    
    const demoInfo = `Password reset functionality would be implemented here.

Demo accounts:
• admin / admin123
• user@demo.com / password
• test / test123
• demo / demo123`;
    
    alert(demoInfo);
}

// Create floating particles effect
function createParticles() {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Randomize particle properties
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        document.body.appendChild(particle);
    }
}

// Celebration effect for successful login
function createCelebrationEffect() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        
        // Style the confetti
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '0.8';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 5000);
    }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape key to clear form
    if (e.key === 'Escape') {
        resetForm();
    }
}

// Show demo credentials in console
function showDemoCredentials() {
    console.log('🔐 Demo Login Credentials:');
    console.log('• admin / admin123');
    console.log('• user@demo.com / password');
    console.log('• test / test123');
    console.log('• demo / demo123');
    console.log('');
    console.log('💡 Keyboard Shortcuts:');
    console.log('• Ctrl/Cmd + Enter: Submit form');
    console.log('• Escape: Clear form');
}

// Utility function to add user (for potential expansion)
function addUser(username, password) {
    if (username && password) {
        users[username] = password;
        console.log(`User ${username} added successfully`);
        return true;
    }
    return false;
}

// Utility function to remove user (for potential expansion)
function removeUser(username) {
    if (users[username]) {
        delete users[username];
        console.log(`User ${username} removed successfully`);
        return true;
    }
    return false;
}

// Export functions for potential module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        authenticateUser,
        validateInputs,
        addUser,
        removeUser
    };
}