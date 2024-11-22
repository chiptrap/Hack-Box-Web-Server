document.addEventListener('DOMContentLoaded', () => {
    // Create a button
    const button = document.createElement('button');
    button.textContent = 'Click Me!';

    // Add an event listener to the button
    button.addEventListener('click', () => {
        alert('Button clicked!');
    });

    // Append the button to the body
    document.body.appendChild(button);
});
