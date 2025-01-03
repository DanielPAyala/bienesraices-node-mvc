import { Dropzone } from 'dropzone';

Dropzone.options.addImage = {
  dictDefaultMessage: 'Sube aquí tus imágenes',
  acceptedFiles: 'image/jpeg,image/png,image/jpg',
  maxFilesize: 1,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
  dictRemoveFile: 'Eliminar',
  dictMaxFilesExceeded: 'Solo puedes subir una imagen'
};
