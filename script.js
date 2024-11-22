// Display an alert when the page loads
window.onload = function () {
    alert('Welcome to my website!');
};

// Function to change the text of a paragraph
function changeText() {
    document.getElementById('dynamic-text').innerText = 'You clicked the button!';
}

// Function to display the current date and time
function displayDateTime() {
    const now = new Date();
    document.getElementById('datetime').innerText = now.toLocaleString();
}
