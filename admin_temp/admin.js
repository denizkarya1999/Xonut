document.addEventListener('DOMContentLoaded', () => {
    const donutForm = document.getElementById('donutForm');

    donutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Retrieve form data
        const formData = new FormData(donutForm);
        const donutData = {};
        formData.forEach((value, key) => {
            donutData[key] = value;
        });

        // Perform CRUD operation (Create/Update)
        const response = await fetch('/api/donuts', {
            method: 'POST', // Use 'PUT' for updating
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donutData),
        });

        // Handle the response accordingly
        if (response.ok) {
            // Donut created/updated successfully
            console.log('Donut created/updated successfully');
            // You may want to redirect the user or update the UI
        } else {
            // Handle errors
            console.error('Error creating/updating donut:', response.statusText);
        }
    });
});