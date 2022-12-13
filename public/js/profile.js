const createFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const price = document.querySelector('#price').value.trim();
  
    if (name && description && price) {
      const response = await fetch(`/api/bids`, {
        method: 'POST',
        body: JSON.stringify({ name, description, price }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
        alert('post created');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  if(document.querySelector('.create-form') != null) {
    document
    .querySelector('.create-form')
    .addEventListener('submit', createFormHandler);
  }
  
  
  