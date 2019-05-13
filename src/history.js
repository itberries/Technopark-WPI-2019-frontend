import Popup from 'sweetalert2';

function getConfirmation(message, callback) {
  Popup.fire({
    title: 'Подтверждение',
    text: message,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#777',
    confirmButtonText: 'Покинуть',
    cancelButtonText: 'Отменить',
  }).then((result) => {
    if (result.value) {
      callback(true);
    } else {
      callback(false);
    }
  });
}

export default getConfirmation;
