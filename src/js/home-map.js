(function () {
  const lat = 20.67444163271174;
  const lng = -103.38739216304566;
  const map = L.map('home-map').setView([lat, lng], 16);

  let markers = new L.FeatureGroup().addTo(map);

  let properties = [];

  // Filters
  const filters = {
    category: '',
    price: ''
  };

  const categoriesSelect = document.querySelector('#categories');
  const pricesSelect = document.querySelector('#prices');

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  //
  categoriesSelect.addEventListener('change', (event) => {
    filters.category = +event.target.value;
    filterProperties();
  });

  pricesSelect.addEventListener('change', (event) => {
    filters.price = +event.target.value;
    filterProperties();
  });

  const getProperties = async () => {
    try {
      const url = '/api/properties';
      const response = await fetch(url);
      properties = await response.json();

      showProperties(properties);
    } catch (error) {
      console.error(error);
    }
  };

  const showProperties = (properties) => {
    // Limpiar los markers
    markers.clearLayers();

    properties.forEach((property) => {
      const marker = new L.marker([property.lat, property.lng], {
        autoPan: true
      }).addTo(map).bindPopup(`
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

  const filterProperties = () => {
    const result = properties
      .filter((property) =>
        filters.category ? property.categoryId === filters.category : property
      )
      .filter((property) =>
        filters.price ? property.priceId === filters.price : property
      );

    showProperties(result);
  };

  getProperties();
})();
