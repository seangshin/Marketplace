const createFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const price = document.querySelector('#price').value.trim();
    const expiration_date = document.querySelector('#expDate').value.trim();
  
    if (name && description && price && expiration_date) {
      const response = await fetch(`/api/bids`, {
        method: 'POST',
        body: JSON.stringify({ name, description, price, expiration_date }),
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
    } else {
      alert('Please complete all fields.');
    }
  };
  
  if(document.querySelector('.create-form') != null) {
    document
    .querySelector('.create-form')
    .addEventListener('submit', createFormHandler);
  }
  
  
  