const admin = (req, res) => {
  res.render('property/admin', {
    page: 'Mis Propiedades',
    navBar: true
  });
};

const create = (req, res) => {
  res.render('property/create', {
    page: 'Crear Propiedad',
    navBar: true
  });
};

export { admin, create };
