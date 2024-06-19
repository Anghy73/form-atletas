import pages from "../views/index.js";

const app =  document.getElementById('app')

const router = (path) => {
  console.log(path);

  app.innerHTML = ''

  switch (path) {
    case '':
      return app.innerHTML = pages.inicio()
    case '#registro':
      return app.innerHTML = pages.registro()
    case '#atletas':
      return app.innerHTML = pages.atletas()
    case '#editar':
      return app.innerHTML = pages.editar()
    default:
      return app.innerHTML = pages.notFound()
  }
}

export default router