const home = (req, res) => {
  res.render('home', {
    page: 'Inicio'
  });
};

const category = (req, res) => {};

const noFound = (req, res) => {};

const searcher = (req, res) => {};

export { home, category, noFound, searcher };
