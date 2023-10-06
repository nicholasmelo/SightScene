const modal = document.getElementById('myModal');


function openModal() {
    modal.classList.remove('hidden');
  };

  function closeModal() {
    modal.classList.add('hidden');
  };

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
