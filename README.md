# Reto #2 — Sistema de Gestión de Notas

Sistema web interactivo desarrollado en HTML, CSS y JavaScript para gestionar las notas de los alumnos de un curso, calcular promedios, clasificar resultados y presentar un ranking final.

---

## Estructura de carpetas

```
Reto_#2/
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
└── README.md
```

---

## Descripción de archivos

| Archivo | Descripción |
|---|---|
| `index.html` | Estructura principal de la página: formulario de ingreso y sección de resultados |
| `css/style.css` | Estilos visuales del sistema: tarjetas, botones, badges, ranking y mensajes de error |
| `js/script.js` | Lógica completa del sistema: validaciones, cálculos, ordenamiento y renderizado de resultados |
| `README.md` | Documentación del proyecto |

---

## Funcionalidades

### Entrada de datos
- Formulario HTML para ingresar el nombre y las notas de cada alumno
- Soporta hasta **10 alumnos** por curso
- Validación en tiempo real al hacer clic en "Agregar Alumno" o presionar **Enter**

### Validaciones implementadas
- El nombre no puede estar vacío
- El nombre solo puede contener letras (incluyendo tildes, ñ y ü), sin números ni símbolos
- Las notas deben ser valores numéricos entre **0 y 100**
- No se permite ingresar el mismo alumno dos veces (validación por nombre)
- Marcado visual en rojo de los campos con error

### Cálculos
- Promedio individual de cada alumno
- Promedio del curso por cada certamen (C1, C2, C3)
- Promedio general del curso
- Conteo de alumnos **aprobados** (promedio ≥ 55) y **reprobados** (promedio < 55)

### Presentación de resultados
- Tarjeta por alumno con nombre, notas y promedio final
- Color verde para aprobados, rojo para reprobados
- Sección de estadísticas generales del curso
- Ranking ordenado de mayor a menor promedio con medallas para los primeros 3 lugares

---

## Estructuras de datos utilizadas

```javascript
// Arreglo unidimensional para nombres (largo máximo: 10)
let nombres = [];  // ["Carlos", "Juan", ...]

// Matriz para notas (10 filas x 3 columnas)
let notas = [];    // [[78, 98, 74], [34, 50, 24], ...]
```

---

## Funciones principales

| Función | Descripción |
|---|---|
| `validarEntradas()` | Valida nombre y notas antes de agregar un alumno |
| `agregarAlumno()` | Captura los datos del formulario y los almacena |
| `calcularPromedioAlumno()` | Calcula el promedio de un alumno usando `reduce` |
| `calcularPromedioCertamen()` | Calcula el promedio del curso en un certamen específico |
| `calcularPromedioGeneral()` | Calcula el promedio general del curso |
| `ordenarPorPromedio()` | Ordena los alumnos de mayor a menor promedio (algoritmo burbuja) |
| `mostrarResultados()` | Construye y renderiza el HTML con todos los resultados |
| `mostrarError()` | Muestra el mensaje de error y marca los campos en rojo |
| `ocultarError()` | Oculta el mensaje de error |
| `limpiarFormulario()` | Limpia los campos del formulario tras agregar un alumno |
| `limpiarEstilosError()` | Remueve los estilos de error de los inputs |

---

## Cómo ejecutar el proyecto

1. Clona o descarga el repositorio en tu computador
2. Abre la carpeta `Reto_#2` en **Visual Studio Code**
3. Instala la extensión **Live Server** si no la tienes
4. Haz clic derecho sobre `index.html`
5. Selecciona **"Open with Live Server"**
6. El proyecto abrirá en `http://127.0.0.1:5500`

> **Importante:** No abrir el archivo `index.html` directamente desde el explorador de archivos, ya que el navegador bloqueará la carga del JavaScript por restricciones de seguridad.

---

## Criterios de aprobación

| Criterio | Valor |
|---|---|
| Promedio aprobación | ≥ 55 puntos |
| Promedio reprobación | < 55 puntos |
| Nota mínima por certamen | 0 |
| Nota máxima por certamen | 100 |
| Máximo de alumnos | 10 |

---

## Tecnologías utilizadas

- **HTML5** — Estructura y formulario
- **CSS3** — Diseño visual con gradientes, tarjetas y badges
- **JavaScript** — Lógica, validaciones, funciones de orden superior (`map`, `filter`, `reduce`)
