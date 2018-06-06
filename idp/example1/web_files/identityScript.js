function createNewIdentity() {
  document.getElementById('createNewIdentity').disabled = true;
  document.getElementById('createNewIdentity').innerHTML = 'Creating...';
  let namespace = document.getElementById('namespace').value;
  let identifier = document.getElementById('identifier').value;
  fetch('/identity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      namespace,
      identifier,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then(({request_id , exist}) => {
      if (request_id) {
        if(!exist) {
          alert('Identity created');
          window.location = '/home/' + namespace + '/' + identifier;
        }
        else {
          alert('Please consent to request: ' + request_id);
          document.getElementById('createNewIdentity').innerHTML = 'Wait for consent...';
          //open eventlistener wait for redirected
        }
      } else {
        alert('Cannot create identity');
        document.getElementById('createNewIdentity').disabled = false;
        document.getElementById('createNewIdentity').innerHTML = 'Create';
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Cannot create identity');
      document.getElementById('createNewIdentity').disabled = false;
      document.getElementById('createNewIdentity').innerHTML = 'Create';
    });
}
window.onload = function() {
  document
    .getElementById('createNewIdentity')
    .addEventListener('click', createNewIdentity);
};
