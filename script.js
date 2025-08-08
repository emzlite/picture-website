document.addEventListener('DOMContentLoaded', () => {
    // Select all links with the 'data-trackable' attribute
    const trackableLinks = document.querySelectorAll('[data-trackable]');

    trackableLinks.forEach(link => {
        link.addEventListener('click', () => {
            const linkId = link.id;
            const destination = link.href;

            // This is the data we will send to our logging service
            const logData = {
                clicked_element_id: linkId,
                destination_url: destination,
                timestamp: new Date().toISOString()
            };

            // Send the data to our backend function
            // The URL '/.netlify/functions/track-click' is special for Netlify
            fetch('/.netlify/functions/track-click', {
                method: 'POST',
                body: JSON.stringify(logData),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => console.log('Log successful:', data))
            .catch(error => console.error('Error logging click:', error));
        });
    });
});