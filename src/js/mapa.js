(function () {
  const lat = document.querySelector('#lat').value || 20.67444163271174;
  const lng = document.querySelector('#lng').value || -103.38739216304566;
  const mapa = L.map('mapa').setView([lat, lng], 16);
  let marker;

  const geocodeService = L.esri.Geocoding.geocodeService();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  // Crear un pin personalizado
  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true
  }).addTo(mapa);

  // Detectar el movimiento del pin
  marker.on('moveend', function (e) {
    marker = e.target;
    const position = marker.getLatLng();
    mapa.panTo(new L.LatLng(position.lat, position.lng));

    geocodeService
      .reverse()
      .latlng(position, 16)
      .run(function (error, result) {
        marker.bindPopup(result.address.LongLabel).openPopup();
        document.querySelector('.street').textContent = result?.address?.Address ?? '';
        document.querySelector('#street').value = result?.address?.Address ?? '';
        document.querySelector('#lat').value = result?.latlng?.lat ?? '';
        document.querySelector('#lng').value = result?.latlng?.lng ?? '';
      });
  });
})();
