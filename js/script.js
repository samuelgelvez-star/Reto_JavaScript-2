console.log('script cargado')
// ESTRUCTURAS DE DATOS PRINCIPALES

let nombres = [];
let notas = [];

const MAX_ALUMNOS = 10;
const NOTA_MIN = 0;
const NOTA_MAX = 100;
const NOTA_APROBACION = 55;


// FUNCIÓN: Validar entradas del formulario

function validarEntradas(nombre, c1, c2, c3) {
    if (!nombre.trim()) {
        return "&#9888; El nombre no puede estar vacio.";
    }

    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (!soloLetras.test(nombre.trim())) {
        return "&#9888; El nombre solo puede contener letras, no numeros ni simbolos.";
    }

    const notasArr = [c1, c2, c3];
    const nombres_cert = ["Certamen 1", "Certamen 2", "Certamen 3"];

    for (let i = 0; i < notasArr.length; i++) {
        if (isNaN(notasArr[i]) || notasArr[i] === "") {
            return "&#9888; " + nombres_cert[i] + " debe ser un numero.";
        }
        const nota = Number(notasArr[i]);
        if (nota < NOTA_MIN || nota > NOTA_MAX) {
            return "&#9888; " + nombres_cert[i] + ": la nota debe estar entre " + NOTA_MIN + " y " + NOTA_MAX + ".";
        }
    }

    const nombreLimpio = nombre.trim().toLowerCase();
    for (let i = 0; i < nombres.length; i++) {
        if (nombres[i].toLowerCase() === nombreLimpio) {
            return "&#9888; El alumno \"" + nombre.trim() + "\" ya fue ingresado.";
        }
    }

    return null;
}


// FUNCIÓN: Agregar alumno

function agregarAlumno() {
    const inputNombre = document.getElementById("nombre");
    const inputC1 = document.getElementById("c1");
    const inputC2 = document.getElementById("c2");
    const inputC3 = document.getElementById("c3");

    const nombre = inputNombre.value;
    const c1 = inputC1.value;
    const c2 = inputC2.value;
    const c3 = inputC3.value;

    limpiarEstilosError();

    const error = validarEntradas(nombre, c1, c2, c3);
    if (error) {
        mostrarError(error, inputNombre, inputC1, inputC2, inputC3);
        return;
    }

    nombres.push(nombre.trim());
    notas.push([Number(c1), Number(c2), Number(c3)]);

    limpiarFormulario();
    ocultarError();

    document.getElementById("btn-calcular").disabled = false;

    if (nombres.length >= MAX_ALUMNOS) {
        document.getElementById("btn-agregar").disabled = true;
        document.getElementById("btn-agregar").textContent = "&#10003; Maximo de alumnos alcanzado";
    }
}

// FUNCIÓN: Calcular promedio de un alumno (orden superior)
function calcularPromedioAlumno(notasAlumno) {
    const suma = notasAlumno.reduce((acc, nota) => acc + nota, 0);
    return suma / notasAlumno.length;
}

// FUNCIÓN: Calcular promedio de un certamen específico
function calcularPromedioCertamen(indiceCertamen) {
    const suma = notas.reduce((acc, fila) => acc + fila[indiceCertamen], 0);
    return suma / notas.length;
}

// FUNCIÓN: Calcular promedio general del curso
function calcularPromedioGeneral(promediosAlumnos) {
    return promediosAlumnos.reduce((acc, p) => acc + p, 0) / promediosAlumnos.length;
}

// FUNCIÓN: Ordenar alumnos por promedio (burbuja) — BUG CORREGIDO
function ordenarPorPromedio(promedios) {
    let indices = nombres.map((_, i) => i); // CORRECCIÓN: (_, i) en lugar de (i)

    for (let i = 0; i < indices.length - 1; i++) {
        for (let j = 0; j < indices.length - 1 - i; j++) {
            if (promedios[indices[j]] < promedios[indices[j + 1]]) {
                let temp = indices[j];
                indices[j] = indices[j + 1];
                indices[j + 1] = temp;
            }
        }
    }

    return indices;
}

// FUNCIÓN: Mostrar resultados en el DOM
function mostrarResultados() {
    const contenedor = document.getElementById("contenido-resultados");
    const divResultados = document.getElementById("resultados");

    const promediosAlumnos = notas.map(notasAlumno =>
        calcularPromedioAlumno(notasAlumno)
    );

    const promC1 = calcularPromedioCertamen(0);
    const promC2 = calcularPromedioCertamen(1);
    const promC3 = calcularPromedioCertamen(2);

    const promGeneral = calcularPromedioGeneral(promediosAlumnos);

    const aprobados = promediosAlumnos.filter(p => p >= NOTA_APROBACION).length;
    const reprobados = promediosAlumnos.filter(p => p < NOTA_APROBACION).length;

    const indicesOrdenados = ordenarPorPromedio(promediosAlumnos);

    let html = "";

    // -- Detalle por alumno --
    html += '<div class="seccion-titulo">&#127891; Detalle por Alumno</div>';

    for (let i = 0; i < nombres.length; i++) {
        const prom = promediosAlumnos[i];
        const aprobado = prom >= NOTA_APROBACION;
        const claseCard = aprobado ? "aprobado" : "reprobado";
        const clasePromedio = aprobado ? "promedio-aprobado" : "promedio-reprobado";
        const icono = aprobado ? "&#10003;" : "&#10007;";

        html += `
      <div class="alumno-card ${claseCard}">
        <div class="alumno-nombre">${icono} Nombre ${i + 1}: ${nombres[i]}</div>
        <div class="alumno-notas">
          <span class="nota-badge">C1: ${notas[i][0]}</span>
          <span class="nota-badge">C2: ${notas[i][1]}</span>
          <span class="nota-badge">C3: ${notas[i][2]}</span>
        </div>
        <div class="alumno-promedio ${clasePromedio}">
          Promedio: ${prom.toFixed(2)}
        </div>
      </div>
    `;
    }

    // -- Estadísticas del curso --
    html += `
    <div class="estadisticas">
      <h3>&#128200; Estadisticas del Curso</h3>
      <div class="stat-row">
        <span>Promedio del curso C1:</span>
        <span class="stat-value">${promC1.toFixed(2)}</span>
      </div>
      <div class="stat-row">
        <span>Promedio del curso C2:</span>
        <span class="stat-value">${promC2.toFixed(2)}</span>
      </div>
      <div class="stat-row">
        <span>Promedio del curso C3:</span>
        <span class="stat-value">${promC3.toFixed(2)}</span>
      </div>
      <div class="stat-row">
        <span>Promedio Final del Curso:</span>
        <span class="stat-value">${promGeneral.toFixed(2)}</span>
      </div>
      <div class="stat-row">
        <span>Aprobados:</span>
        <span class="aprobados-badge">${aprobados}</span>
      </div>
      <div class="stat-row">
        <span>Reprobados:</span>
        <span class="reprobados-badge">${reprobados}</span>
      </div>
    </div>
  `;

    // -- Ranking --
    html += `
    <div class="ranking-section">
      <div class="seccion-titulo">&#127942; Ranking por Promedio</div>
  `;

    for (let pos = 0; pos < indicesOrdenados.length; pos++) {
        const idx = indicesOrdenados[pos];
        const prom = promediosAlumnos[idx];
        const aprobado = prom >= NOTA_APROBACION;
        const clasePos =
            pos === 0 ? "pos-1" :
                pos === 1 ? "pos-2" :
                    pos === 2 ? "pos-3" : "pos-otro";
        const clasePromedio = aprobado ? "promedio-aprobado" : "promedio-reprobado";

        const medalla =
            pos === 0 ? "&#129351;" :
                pos === 1 ? "&#129352;" :
                    pos === 2 ? "&#129353;" : (pos + 1);

        html += `
      <div class="ranking-item">
        <div class="ranking-pos ${clasePos}">${medalla}</div>
        <div class="ranking-nombre">${nombres[idx]}</div>
        <div class="ranking-prom ${clasePromedio}">${prom.toFixed(2)}</div>
      </div>
    `;
    }

    html += `</div>`;

    contenedor.innerHTML = html;
    divResultados.classList.remove("oculto");
    divResultados.scrollIntoView({ behavior: "smooth" });
}

// FUNCIONES AUXILIARES DE UI
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("c1").value = "";
    document.getElementById("c2").value = "";
    document.getElementById("c3").value = "";
    document.getElementById("nombre").focus();
}

function mostrarError(mensaje, ...inputs) {
    const div = document.getElementById("mensaje-error");
    div.innerHTML = mensaje;
    div.classList.remove("oculto");
    inputs.forEach(input => input.classList.add("input-error"));
}

function ocultarError() {
    document.getElementById("mensaje-error").classList.add("oculto");
}

function limpiarEstilosError() {
    ["nombre", "c1", "c2", "c3"].forEach(id => {
        document.getElementById(id).classList.remove("input-error");
    });
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") agregarAlumno();
});