import { Dropzone } from 'dropzone';
import { header } from 'express-validator';

const token = document.querySelector('meta[name="csrf-token"]').content;

Dropzone.options.addImage = {
  dictDefaultMessage: 'Sube aquí tus imágenes',
  acceptedFiles: 'image/jpeg,image/png,image/jpg',
  maxFilesize: 1,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: true,
  addRemoveLinks: true,
  dictRemoveFile: 'Eliminar',
  dictMaxFilesExceeded: 'Solo puedes subir una imagen',
  headers: {
    'X-CSRF-Token': token
  },
};
