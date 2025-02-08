(function () {
  const lat = 20.67444163271174;
  const lng = -103.38739216304566;
  const map = L.map('home-map').setView([lat, lng], 16);

  let markers = new L.FeatureGroup().addTo(map);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const getProperties = async () => {
    try {
      const url = '/api/properties';
      const response = await fetch(url);
      const properties = await response.json();

      showProperties(properties);
    } catch (error) {
      console.error(error);
    }
  };

  const showProperties = (properties) => {
    properties.forEach((property) => {
      const marker = new L.marker([property.lat, property.lng], {
        autoPan: true
      })
        .addTo(map)
        .bindPopup(`
          <p class="text-indigo-600 font-bold">${property.category.name}</p>
          <h1 class="text-xl font-extrabold uppercase my-5">${property.title}</h1>
          <img src="/uploads/${property.image}" alt="Propiedad ${property.title}" />
          <p class="text-gray-600 font-bold">${property.price.price}</p>
          <p class="text-gray-600 font-bold">${property.street}</p>
          <a href="/property/${property.id}" class="bg-indigo-600 block p-2 text-center font-bold text-white">Ver propiedad</a>
          `);
      markers.addLayer(marker);
    });
  };

  getProperties();
})();
