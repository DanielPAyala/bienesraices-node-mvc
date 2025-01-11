import { Dropzone } from 'dropzone';

const token = document.querySelector('meta[name="csrf-token"]').content;

Dropzone.options.addImage = {
  dictDefaultMessage: 'Sube aquí tus imágenes',
  acceptedFiles: 'image/jpeg,image/png,image/jpg',
  maxFilesize: 1,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
  dictRemoveFile: 'Eliminar',
  dictMaxFilesExceeded: 'Solo puedes subir una imagen',
  headers: {
    'X-CSRF-Token': token
  },
  paramName: 'image',
  init: function () {
    const dropzone = this;
    const btnSubmit = document.querySelector('#btnSubmit');

    btnSubmit.addEventListener('click', function () {
      dropzone.processQueue();
    });

    dropzone.on('queuecomplete', function () {
      if (dropzone.getActiveFiles().length === 0) {
        window.location.href = '/my-properties';
      }
    });
  }
};
