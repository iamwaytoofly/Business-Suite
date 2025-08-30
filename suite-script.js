// Business Startup Suite JavaScript

// Global variables
let currentApp = 'dashboard';
let userData = {
    llcFormation: {
        progress: 0,
        state: '',
        llcName: '',
        completed: false
    },
    einApplication: {
        progress: 0,
        ein: '',
        completed: false
    },
    bankAccount: {
        progress: 0,
        bankSelected: '',
        completed: false
    },
    licenses: {
        progress: 0,
        checkedLicenses: [],
        completed: false
    }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set up navigation
    setupNavigation();
    
    // Load user data from localStorage if available
    loadUserData();
    
    // Update progress indicators
    updateProgressIndicators();
});

// Set up navigation between apps
function setupNavigation() {
    // Navigation menu links
    const navLinks = document.querySelectorAll('.app-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.getAttribute('data-app');
            switchToApp(appName);
        });
    });
    
    // Dashboard app card links
    const appCardLinks = document.querySelectorAll('.app-card .btn');
    appCardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.getAttribute('data-app');
            switchToApp(appName);
        });
    });
    
    // Dashboard progress start buttons
    const startButtons = document.querySelectorAll('.start-btn');
    startButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.getAttribute('data-app');
            switchToApp(appName);
        });
    });
    
    // Back to dashboard buttons
    const backButtons = document.querySelectorAll('.coming-soon .btn');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.getAttribute('data-app');
            switchToApp(appName);
        });
    });
}

// Switch between apps
function switchToApp(appName) {
    // Hide all app sections
    const appSections = document.querySelectorAll('.app-section');
    appSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected app section
    const selectedApp = document.getElementById(appName);
    if (selectedApp) {
        selectedApp.classList.add('active');
    }
    
    // Update navigation menu
    const navItems = document.querySelectorAll('.app-nav li');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.querySelector(`a[data-app="${appName}"]`)) {
            item.classList.add('active');
        }
    });
    
    // Update current app
    currentApp = appName;
    
    // Handle special case for each app
    if (appName === 'llc-formation') {
        setupLLCApp();
    } else if (appName === 'ein-application') {
        setupEINApp();
    } else if (appName === 'bank-account') {
        setupBankApp();
    } else if (appName === 'licenses') {
        setupLicensesApp();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Set up LLC Formation app
function setupLLCApp() {
    // Set up communication with the iframe
    setupIframeCommunication();
}

// Set up EIN Application app
function setupEINApp() {
    // Set up communication with the iframe
    setupIframeCommunication();
}

// Set up Bank Account app
function setupBankApp() {
    // Set up communication with the iframe
    setupIframeCommunication();
}

// Set up Licenses & Permits app
function setupLicensesApp() {
    // Set up communication with the iframe
    setupIframeCommunication();
}

// Create LLC app HTML file
function createLLCAppFile() {
    // This is a placeholder - in a real implementation, we would check if the file exists
    // and create it if needed. For this demo, we'll assume the file already exists.
    console.log('LLC app file check completed');
}

// Set up communication with the iframe
function setupIframeCommunication() {
    // Listen for messages from app iframes
    window.addEventListener('message', function(event) {
        // Make sure the message is from our iframe
        if (event.origin !== window.location.origin) return;
        
        // Process the message
        const message = event.data;
        
        // LLC Formation App messages
        if (message.type === 'progress-update') {
            // Update LLC formation progress
            userData.llcFormation.progress = message.progress;
            updateProgressIndicators();
            saveUserData();
        } else if (message.type === 'llc-data') {
            // Save LLC data
            userData.llcFormation.state = message.state;
            userData.llcFormation.llcName = message.llcName;
            saveUserData();
        } else if (message.type === 'llc-complete') {
            // Mark LLC formation as complete
            userData.llcFormation.completed = true;
            userData.llcFormation.progress = 100;
            updateProgressIndicators();
            saveUserData();
        }
        
        // EIN Application App messages
        else if (message.type === 'ein-progress-update') {
            // Update EIN application progress
            userData.einApplication.progress = message.progress;
            updateProgressIndicators();
            saveUserData();
        } else if (message.type === 'ein-data') {
            // Save EIN data
            userData.einApplication.businessName = message.businessName;
            userData.einApplication.businessType = message.businessType;
            saveUserData();
        } else if (message.type === 'ein-complete') {
            // Mark EIN application as complete
            userData.einApplication.completed = true;
            userData.einApplication.progress = 100;
            userData.einApplication.ein = message.ein;
            updateProgressIndicators();
            saveUserData();
        }
        
        // Bank Account App messages
        else if (message.type === 'bank-progress-update') {
            // Update bank account progress
            userData.bankAccount.progress = message.progress;
            updateProgressIndicators();
            saveUserData();
        } else if (message.type === 'bank-data') {
            // Save bank data
            userData.bankAccount.bankSelected = message.bankSelected;
            userData.bankAccount.accountType = message.accountType;
            saveUserData();
        } else if (message.type === 'bank-complete') {
            // Mark bank account setup as complete
            userData.bankAccount.completed = true;
            userData.bankAccount.progress = 100;
            updateProgressIndicators();
            saveUserData();
        }
        
        // Licenses & Permits App messages
        else if (message.type === 'licenses-progress-update') {
            // Update licenses progress
            userData.licenses.progress = message.progress;
            updateProgressIndicators();
            saveUserData();
        } else if (message.type === 'licenses-data') {
            // Save licenses data
            userData.licenses.location = message.location;
            userData.licenses.businessType = message.businessType;
            userData.licenses.checkedLicenses = message.checkedLicenses;
            saveUserData();
        } else if (message.type === 'licenses-complete') {
            // Mark licenses check as complete
            userData.licenses.completed = true;
            userData.licenses.progress = 100;
            updateProgressIndicators();
            saveUserData();
        }
        
        // Return to dashboard message
        else if (message.type === 'return-to-dashboard') {
            switchToApp('dashboard');
        }
    });
}

// Update progress indicators
function updateProgressIndicators() {
    // Update LLC Formation progress
    updateProgressBar('llc-formation', userData.llcFormation.progress);
    
    // Update EIN Application progress
    updateProgressBar('ein-application', userData.einApplication.progress);
    
    // Update Bank Account progress
    updateProgressBar('bank-account', userData.bankAccount.progress);
    
    // Update Licenses & Permits progress
    updateProgressBar('licenses', userData.licenses.progress);
}

// Update a specific progress bar
function updateProgressBar(appName, progress) {
    const progressBar = document.querySelector(`.progress-item:has(a[data-app="${appName}"]) .progress`);
    const progressPercent = document.querySelector(`.progress-item:has(a[data-app="${appName}"]) .progress-percent`);
    
    if (progressBar && progressPercent) {
        progressBar.style.width = `${progress}%`;
        progressPercent.textContent = `${progress}%`;
    }
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('businessStartupData', JSON.stringify(userData));
}

// Load user data from localStorage
function loadUserData() {
    const savedData = localStorage.getItem('businessStartupData');
    if (savedData) {
        userData = JSON.parse(savedData);
    }
}

// This function was removed as all app files already exist