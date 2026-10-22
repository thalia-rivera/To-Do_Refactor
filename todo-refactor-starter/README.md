# ToDo Refactor Starter

Proyecto inicial para **ToDo Refactor Lab**: refactorización, pruebas unitarias y Pair Programming.

## Inicio

```bash
npm install
npm test
```

Durante el desarrollo:

```bash
npm run test:watch
```

La primera prueba está preparada para fallar: es el punto de partida de la **Misión 2** y del ciclo **RED → GREEN → REFACTOR**.

## Estructura

- `src/legacy.js`: código funcional simple para analizar antes de cambiar.
- `src/taskService.js`: lógica de dominio que completarás misión por misión.
- `src/app.js`: interfaz inicial; en la Misión 9 deberá delegar la lógica a `taskService.js`.
- `tests/taskService.test.js`: suite incremental de pruebas unitarias con Vitest.

## Misión 0 · Antes de modificar código

Responde aquí:

1. ¿Dónde almacenarías ahora el estado `completada` de una tarea?

 Cada una de las tareas esta guardada dentro de un array y eso no es tan escalable, una posible opcion seria crear un array para el estado de las tareas pero tampoco seria tan viable porque tendrian que enlazarse cada tarea con un elemnto que represente su estado en el otro array de estado, nosotros proponemos que cada una de las tareas sea un objeto que tenga sus propios atributos, entre ella el estado donde podemos determinar si fue completada o no.

2. ¿Qué ocurriría si mañana cada tarea necesita prioridad, fecha o responsable?

Justamente, para que cada tarea pueda tener ese tipo de atributos de forma idependiente y el diseño de construccion sea mas claro, es mejor que cada una de las tareas sea un objeto para que se pueda modificar con sus propias caracteristicas.

3. ¿Qué parte del código representa datos y qué parte representa interfaz?

La primer parte representa datos donde esta let tareas porque es la construcción del array en donde se guardan las tareas.
En el siguiente bloque es donde esta mezclado ya que la función mostrarTareas() contiene dos lineas que modifican al DOM por que es la forma en la que se vera la lista de tareas definida del html, y la sieguiente linea vuelven a ser datos porque es un ciclo for que recorre el array tareas y otra ves aparece la linea lista.innerHTML += `<li>${tareas[i]}</li>`; que tambien pertene al DOM.
Con esta construcción no se puede probar el recorrido de las tareas de forma unitaria sin un navegador.

4. ¿Qué comportamiento debemos conservar durante el refactor?

Que se muestren todas las tareas, tambien que se respete el orden en el que estan. Esto creemos se debe conservar porque es importante para identificar el orden original en el que se agregaron.

### Tres comportamientos observables que NO deben cambiar

1. Que las tareas se muestren en el orden en el que fueron agregadas.
2. Si se vuelve a mostrar la lista de tareas, que no se dupliquen.
3. Que las tareas se muestren con su descripción completa tal como fueron agregadas.

## Registro RED → GREEN → REFACTOR

Documenta al menos una iteración:

- **RED:** ¿qué prueba escribiste y por qué falló?
- **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?
- **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?

## Pair Programming

Registra por misión quién fue **Driver** y quién **Navigator**. Intercambien roles con frecuencia y no hagan commit hasta que ambos puedan explicar el código y la prueba.
