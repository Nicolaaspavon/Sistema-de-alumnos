lista_alumnos = [];

function crearObjetoAlumno(
  nombreAlu,
  apellidoAlu,
  Nota1Alu,
  Nota2Alu,
  Nota3Alu
) {
  (this.nombreAlu = nombreAlu),
    (this.apellidoAlu = apellidoAlu),
    (this.Nota1Alu = Nota1Alu),
    (this.Nota2Alu = Nota2Alu),
    (this.Nota3Alu = Nota3Alu);
}

boton_carga.addEventListener("click", function () {
  let nombre = document.getElementById("nombre");
  let apellido = document.getElementById("apellido");
  let nota_1 = document.getElementById("nota_1");
  let nota_2 = document.getElementById("nota_2");
  let nota_3 = document.getElementById("nota_3");
  Alumno = new crearObjetoAlumno(
    nombre.value,
    apellido.value,
    nota_1.value,
    nota_2.value,
    nota_3.value
  );
  newFunction();
  swal({
    title: "Carga exitosa",
    text: "Se ha creado un nuevo alumno",
    icon: "success",
    button: "Ok",
  });
});

function newFunction() {
  lista_alumnos.push(Alumno);
  console.log(lista_alumnos);
  Guardar_transaccion(lista_alumnos);
}

boton_mostrar.addEventListener("click", function () {
  let padre = document.getElementById("impresion");
  let lista = document.createElement("li");
  lista.innerHTML =
    Alumno.nombreAlu +
    " " +
    Alumno.apellidoAlu +
    " " +
    Alumno.Nota1Alu +
    " " +
    Alumno.Nota2Alu +
    " " +
    Alumno.Nota3Alu +
    " " +
    `<button class="borrar">Borrar alumno</button>`;
  padre.append(lista);

  //capturar los botones borrar
  let botones_borrar = document.querySelectorAll(".borrar");

  for (let boton of botones_borrar) {
    boton.addEventListener("click", borrar_elemento);
  }
});

function borrar_elemento(e) /*e es el objeto evento*/ {
  let hijo = e.target; //target me avisa a donde ocurre el evento
  let padre = hijo.parentNode; //Busque el nodo padre para poder eliminarlo
  padre.remove();
  swal({
    title: "Esta seguro que desea eliminar el participante?",
    text: "una vez eliminado no podras recuperar los datos!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("El alumno se elimino correctamente", {
        icon: "success",
      });
    } else {
      swal("Su alumno no se elimino");
    }
  });
}

function Guardar_transaccion() {
  //convertir mi arreglo a JSON
  let arreglo_JSON = JSON.stringify(lista_alumnos);
  //guardo en formato JSON en el local storage
  localStorage.setItem("Alumno", arreglo_JSON);
  //en un arreglo transaccion, ingresar la clave del local storage
  arreglo_Transaccion = JSON.parse(localStorage.getItem("Alumno"));
  //guardar en el nuevo arreglo, mi arreglo de alumnos
  arreglo_Transaccion.push(arreglo_JSON);
}

//Ingreso de la appi
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5844bac791mshb90ca9654268ddbp1c8021jsn4ac1d568b0f2",
    "X-RapidAPI-Host": "countries-cities.p.rapidapi.com",
  },
};

fetch(
  "https://countries-cities.p.rapidapi.com/location/country/list?format=json",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response));
