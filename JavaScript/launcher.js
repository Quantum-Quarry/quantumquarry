document.addEventListener('DOMContentLoaded', function() {
    const shortcutContainer = document.getElementById('shortcut-container');
    const addShortcutButton = document.getElementById('add-shortcut');

    // Load shortcuts from localStorage
    loadShortcuts();

    // Event listener for adding a shortcut
    addShortcutButton.addEventListener('click', function() {
        const name = prompt('Enter the name of the shortcut:');
        const url = prompt('Enter the URL of the shortcut:');
        if (name && url) {
            addShortcut(name, url);
            saveShortcuts();
        } else {
            alert('Name and URL are required to add a shortcut.');
        }
    });

    // Function to load shortcuts from localStorage
    function loadShortcuts() {
        const shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
        shortcuts.forEach(shortcut => {
            createShortcutElement(shortcut.name, shortcut.url);
        });
    }

    // Function to save shortcuts to localStorage
    function saveShortcuts() {
        const shortcuts = Array.from(shortcutContainer.children).map(shortcut => {
            return {
                name: shortcut.dataset.name,
                url: shortcut.dataset.url
            };
        });
        localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
    }

    // Function to create a shortcut element
    function createShortcutElement(name, url) {
        const shortcutElement = document.createElement('a');
        shortcutElement.href = url;
        shortcutElement.textContent = name;
        shortcutElement.classList.add('shortcut');
        shortcutElement.dataset.name = name;
        shortcutElement.dataset.url = url;

        // Event listener for removing a shortcut
        shortcutElement.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            if (confirm(`Are you sure you want to remove ${name}?`)) {
                shortcutContainer.removeChild(shortcutElement);
                saveShortcuts();
            }
        });

        shortcutContainer.appendChild(shortcutElement);
    }

    // Function to add a shortcut
    function addShortcut(name, url) {
        createShortcutElement(name, url);
    }
});
