import { getData, save, remove, userValid, update, getDocumento } from "./firebase.js";
import router from "./router/index.routes.js";

document.addEventListener("DOMContentLoaded", () => {
  router(window.location.hash);
  main();

  const links = document.querySelectorAll(".header__link");

  addClassLink();

  window.addEventListener("hashchange", () => {
    addClassLink();
    router(window.location.hash);
    main();
  });

  function removeClassLinks() {
    links.forEach((link) => {
      link.classList.remove("active");
    });
  }

  function addClassLink() {
    const hash = window.location.hash;
    removeClassLinks();

    if (hash === "") {
      links[0].classList.add("active");
    }
    if (hash === "#registro") {
      links[1].classList.add("active");
    }
    if (hash === "#atletas") {
      links[2].classList.add("active");
    }
  }
});

let id = 0

async function main() {
  if (window.location.hash === "#registro") {
    validationsInputsBlur();
    // if (fono.value.length >= 9) {
    //   return fono.value += ''
    // }

    // const fono = document.getElementById('telefono')

    // function soloNumeros (e) {
    //   if(e.keyCode >= 48 && e.keyCode <= 57) return true
    //   return false
    // }

    // fono.addEventListener('keypress', (e) => {
    //   if (soloNumeros(e)) {
    //     fono.value += e.key
    //   } else {
    //   }
    // })

    const limpiar = document.getElementById("btnLimpiar");
    limpiar.addEventListener("click", () => {
      clear();
    });

    const guardar = document.getElementById("btnGuardar");
    guardar.addEventListener("click", async (e) => {
      e.preventDefault();
      validationsInputsSave()
      
      if (document.querySelectorAll(".is-invalid").length == 0) {
        const form = document.getElementById("form");
        const {
          run,
          nombre,
          apellido,
          nacimiento,
          genero,
          pais,
          categoria,
          email,
          telefono,
          direccion,
        } = Object.fromEntries(new FormData(form));

        const atleta = {
          run,
          nombre,
          apellido,
          nacimiento,
          genero,
          pais,
          categoria,
          email,
          telefono,
          direccion,
        };

        if (id == 0) {
          const verificado = await userValid(atleta.run)
          if (verificado) {
            save(atleta)
          } else {
            Swal.fire('El usuario ya existe','','error')
          }
        }
        clear()
      }
    });
  }

  if (window.location.hash === '#atletas') {
    showData()
  }

  function showData () {
    getData((datos) => {
      let card = '';
      datos.forEach((atleta) => {
        const item = atleta.data();
        card += `
          <div class="card">
            <h3 class="card__title">${item.nombre} ~ ${item.apellido}</h3>
            <div class="card__group">
              <div>
                <p>Run: <span>${item.run}</span></p>
                <p>Nacimiento: <span>${item.nacimiento}</span></p>
                <p>Genero: <span>${item.genero}</span></p>
                <p>Nacionalidad: <span>${item.pais}</span></p>
              </div>
              <div>
                <p>Categoria: <span>${item.categoria}</span></p>
                <p>Email: <span>${item.email}</span></p>
                <p>Telefono: <span>${item.telefono}</span></p>
                <p>Direccion: <span>${item.direccion}</span></p>
              </div>
            </div>
            <div class="card__buttons">
              <button class="card__button" name="editar" id="${atleta.id}">Editar</button>
              <button class="card__button" name="borrar" id="${atleta.id}">Eliminar</button>
            </div>
          </div>
        `;
      });

      document.getElementById('cards').innerHTML = card;

      const btnsDelete = document.getElementsByName('borrar')
      btnsDelete.forEach(btn => {
        btn.addEventListener('click', (e) => {
          Swal.fire({
            title: "¿Estás seguro de eliminar el registro?",
            text: "No podrás revertir los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Eliminar"
          }).then((result) => {
            if (result.isConfirmed) {

              remove(btn.id)
              Swal.fire({
                  title: "Eliminado!",
                  text: "Su regostro ha sido eliminado",
                  icon: "success"
              })
            }
          })
        })
      })

      const btnsEditar = document.getElementsByName('editar')
      btnsEditar.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          router('#editar')
          window.location.hash = '#editar'

          const doc = await getDocumento(btn.id)
          const atleta = doc.data()

          validationsInputsBlur();

          const buttons = document.querySelector('.form__buttons')
          buttons.innerHTML = `
            <button class="form__button" type="button" id="btnLimpiarE">Limpiar</button>
            <button class="form__button btnEditarE" type="submit" id="${doc.id}">Guardar</button>
          `

          document.getElementById('run').value = atleta.run
          document.getElementById('nombre').value = atleta.nombre
          document.getElementById('apellido').value = atleta.apellido
          document.getElementById('nacimiento').value = atleta.nacimiento
          const genero = document.getElementById('genero').value = atleta.genero
          const input = document.querySelector(`.${genero}`)
          input.setAttribute('checked','checked');
          document.getElementById('pais').value = atleta.pais
          document.getElementById('categoria').value = atleta.categoria
          document.getElementById('email').value = atleta.email
          document.getElementById('telefono').value = atleta.telefono
          document.getElementById('direccion').value = atleta.direccion

          const limpiar = document.getElementById('btnLimpiarE')
          limpiar.addEventListener('click', () => {
            clear()
          })

          const editar = document.querySelector('.btnEditarE')
          editar.addEventListener('click', async (e) => {
            e.preventDefault()
            validationsInputsSave()
      
            if (document.querySelectorAll(".is-invalid").length == 0) {
              const form = document.getElementById("formEdit");
              const {
                run,
                nombre,
                apellido,
                nacimiento,
                genero,
                pais,
                categoria,
                email,
                telefono,
                direccion,
              } = Object.fromEntries(new FormData(form));
            
              const atleta = {
                run,
                nombre,
                apellido,
                nacimiento,
                genero,
                pais,
                categoria,
                email,
                telefono,
                direccion,
                };
              update(doc.id, atleta)
            }
            
            router('#atletas')
            window.location.hash = '#atletas'
          })
        })
      })
    })
  }

  function validationsInputsSave() {
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
      const id = input.getAttribute("id");
      verificar(id);
    });
  }

  function validationsInputsBlur() {
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
      input.addEventListener("blur", (e) => {
        const id = e.target.getAttribute("id");
        verificar(id);
      });
    });
  }

  function clear() {
    document.querySelector(".form").reset();
    document.querySelectorAll("input").forEach((input) => {
      input.classList.remove("is-invalid");
      input.classList.remove("is-valid");
      document.getElementById(`e-${input.name}`).innerHTML = "";
    });
    const inputsG = document.querySelectorAll('#genero')
    inputsG.forEach(input => {
      input.removeAttribute('checked')
    })
  }

  function verificar(id) {
    const input = document.getElementById(id);
    const div = document.getElementById(`e-${id}`);

    input.classList.remove("is-invalid");

    if (input.value.trim() == "") {
      input.classList.add("is-invalid");
      div.innerHTML = `<span>El campo es obligatorio</span>`;
    } else {

      input.classList.add("is-valid");
      div.innerHTML = "";

      if (id == "run") {
        if (!validaRun(input.value.trim())) {
          input.classList.add("is-invalid");
          div.innerHTML = "<span>El run no es válido</span>";
        }
      }

      if (id == "email") {
        if (validarEmail(input.value)) {
          input.classList.add("is-invalid");
          div.innerHTML = "<span>El Email no es válido</span>";
        }
      }

      if (id == "telefono") {
        if (input.value.length < 9) {
          input.classList.add("is-invalid");
          div.innerHTML = "<span>El Telefono no es válido</span>";
        }
      }

      if (id == "nacimiento") {
        const fecha = new Date();
        const anoActual = fecha.getFullYear();
        const nacimiento = new Date(input.value);
        const nacimientoAno = nacimiento.getFullYear();
        const resta = anoActual - nacimientoAno;

        if (resta <= 14) {
          input.classList.add("is-invalid");
          div.innerHTML = "Mínimo 15 años";
        }
      }

      if (id == "genero") {
        const inputs = document.querySelectorAll(".genero");
        let countChecked = 0;
        const div = document.getElementById("e-genero");
        let value = "";

        inputs.forEach((input) => {
          if (input.checked) {
            countChecked += 1;
          }
        });

        if (countChecked >= 2) {
          div.classList.add('is-invalid')
          div.innerHTML = "<span>Seleccione solo un campo</span>";
          value = "";
        }

        if (countChecked == 0) {
          div.classList.add('is-invalid')
          div.innerHTML = "<span>Seleccione un campo</span>";
          value = "";
        }

        if (input.checked && countChecked == 1) {
          div.classList.remove('is-invalid')
          value = "masculino";
        }

        if (!input.checked && countChecked == 1) {
          div.classList.remove('is-invalid')
          value = "femenino";
        }
      }
    }
  }
}

const validaRun = (run) => {
  const Fn = {
    validaRut: function (rutCompleto) {
      rutCompleto = rutCompleto.replace("‐", "-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
      let tmp = rutCompleto.split("-");
      let digv = tmp[1];
      let rut = tmp[0];
      if (digv == "K") digv = "k";

      return Fn.dv(rut) == digv;
    },
    dv: function (T) {
      let M = 0,
        S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      return S ? S - 1 : "k";
    },
  };
  return Fn.validaRut(run);
};

const validarEmail = (email) => {
  const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
  if (!formato.test(email)) return true;
};