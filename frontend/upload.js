const API_URL = process.env.API_URL || 'http://localhost:5001';

document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch(`${API_URL}/api/songs/upload`, {
            method: 'POST',
            body: formData,
        });
        
        if (response.ok) {
            alert('Song uploaded successfully!');
            window.location.reload();
        } else {
            alert('Failed to upload song.');
        }
    } catch (error) {
        console.error('Error uploading song:', error);
        alert('Error uploading song.');
    }
});