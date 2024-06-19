const editar = () => {
  return `
    <form class="form" id="formEdit" >
      <h3 class="form__title">Actualización de Atleta</h3>
      <div class="form__content">
        <div>
          <div class="form__group">
            <label for="run">Run</label>
            <input
              type="text"
              id="run"
              name="run"
              maxlength="11"
              placeholder="12345678-9"
            >
            <div id="e-run"></div>
          </div>
          <div class="form__group">
            <label for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Juan"
            >
            <div id="e-nombre"></div>
          </div>
          <div class="form__group">
            <label for="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Perez"
            >
            <div id="e-apellido"></div>
          </div>
          <div class="form__group">
            <label for="nacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              id="nacimiento"
              name="nacimiento"
            >
            <div id="e-nacimiento"></div>
          </div>
          <div class="form__group">
            <h3>Genero</h3>
            <div class="form__genero">
              <div class="form__container">
                <label>Masculino</label>
                <input
                  class="genero masculino"
                  type="checkbox"
                  id="genero"
                  name="genero"
                  value="masculino"
                  >
              </div>
              <div class="form__container">
                <label>Femenino</label>
                <input
                  class="genero femenino"
                  type="checkbox"
                  id="genero"
                  name="genero"
                  value="femenino"
                >
              </div>
            </div>
            <div id="e-genero"></div>
          </div>
        </div>
        <div>
          <div class="form__group">
            <label for="pais">Pais</label>
            <input
              type="text"
              id="pais"
              name="pais"
              placeholder="Chile"
            >
            <div id="e-pais"></div>
          </div>
          <div class="form__group">
            <label for="categoria">Categoria</label>
            <select name="categoria" id="categoria">
              <option value="velocidad">Velocidad</option>
              <option value="media">Media Distacia</option>
              <option value="larga">Media Distacia</option>
              <option value="vallas">Vallas</option>
              <option value="obstaculos">Obstáculos</option>
              <option value="milla">Milla</option>
              <option value="relevos">Relevos</option>
              <option value="marcha">Marcha</option>
            </select>
            <div id="e-categoria"></div>
          </div>
          <div class="form__group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="JuanPerez@gmail.com"
            >
            <div id="e-email"></div>
          </div>
          <div class="form__group">
            <label for="telefono">Telefono</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              maxlength="9"
              onkeypress="return soloNumeros(event)"
              placeholder="123456789"
            >
            <div id="e-telefono"></div>
          </div>
          <div class="form__group">
            <label for="direccion">Dirección</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              placeholder="Los Bulnes 576"
            >
            <div id="e-direccion"></div>
          </div>
        </div>
      </div>
      <div class="form__buttons">
      </div>
    </form>
  `
}

export default editar