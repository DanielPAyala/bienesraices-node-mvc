const admin = (req, res) => {
  res.render('property/admin', {
    page: 'Mis Propiedades',
    navBar: true
  });
};

export { admin };
