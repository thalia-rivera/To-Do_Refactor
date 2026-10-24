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

## Misión 1: De string a objeto

Ahora cada tarea es un objeto con `id`, `titulo` y `completada`.

- **Dominio (pertenece a la tarea):** `id`, `titulo`, `completada`. Describen qué es la tarea y en qué estado está.
- **Interfaz (no pertenece a la tarea):** si está seleccionada, si se está editando, el color o estilo con que se muestra. Dependen de cómo se presenta, no de qué es la tarea.

Ventaja del cambio: el modelo puede crecer (prioridad, fecha, responsable) sin arrays paralelos ni variables dispersas.

## Misión 3: agregarTarea

- `agregarTarea(tareas, nuevaTarea)` recibe la colección y devuelve una colección nueva con la tarea al final.
- Usa spread (`[...tareas, nuevaTarea]`) en lugar de `push` para no modificar el array original.
- Pruebas: caso normal, un elemento más y "no modifica el original".
- Si modificara el array recibido, la prueba de "no modifica el original" fallaría.

## Misión 5: obtenerPendientes y obtenerTerminadas

- Ambas usan `filter()` porque la intención es seleccionar un subconjunto sin transformar los elementos.
- `obtenerPendientes` conserva las tareas con `completada === false`; `obtenerTerminadas`, las de `completada === true`.
- Casos de prueba: colección mixta, ninguna coincidencia y colección vacía.
- Cuando no hay coincidencias, `filter()` devuelve un arreglo vacío (`[]`), no `undefined`.
- `filter()` devuelve un array nuevo, por eso la colección original no se modifica.

                           



### Tres comportamientos observables que NO deben cambiar

1. Que las tareas se muestren en el orden en el que fueron agregadas.
2. Si se vuelve a mostrar la lista de tareas, que no se dupliquen.
3. Que las tareas se muestren con su descripción completa tal como fueron agregadas.

## Registro RED → GREEN → REFACTOR

Documenta al menos una iteración:

    MISIÓN 02
- **RED:** ¿qué prueba escribiste y por qué falló?

    Escribimos la prueba "crearTarea" para proteger que una tarea nueva siempre se cree con el id y título recibidos y en estado pendiente, fallo porque aun no esta implementada la función y contenía un throw new Error que interrumpió la ejecución antes de que la prueba pudiera comparar el resultado.

- **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?
    Solamente agregamos la linea para devolver valores return { id, titulo, completada: false }; en vez de la linea de throw

- **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?
    La sintaxis ya que el nombre de la variable y el valor esperado era el mismo asi que solo lo dejamos indicado una vez, no era necesario duplicarlo. 

    MISIÓN 07
- **RED:** ¿qué prueba escribiste y por qué falló?
Escribimos pruebas para `eliminarTarea`, entre ellas "elimina la tarea con un id existente", que espera que `eliminarTarea(tareas, 2)` devuelva solo las tareas 1 y 3. Falló porque la función aún contenía el throw new Error, que interrumpió la ejecución antes de que la prueba pudiera comparar el resultado.

 **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?

 Reemplazamos el `throw` por un `filter()` que conserva todas las tareas excepto la del id indicado:
    export function eliminarTarea(tareas, id) {
         return tareas.filter(t => t.id !== id);
        }
Resultado: todas las pruebas en verde.

 **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?
Para esta mision consideramos que no hacia falta refcatorizar algo, asi que lo dejamos asi, pero volvimos a probar 
para asegurarnos que la prueba era correcta.
    

## Pair Programming
**Roles misión 0:** Driver: Thalia · Navigator: Sugey
**Roles misión 1:** Driver: Sugey · Navigator: Thalia
**Roles misión 2:** Driver: Thalia · Navigator: Sugey
**Roles mision 3:** Driver: Sugey · Navigator: Thalia
**Roles mision 4:** Driver: Thalia· Navigator: Sugey
**Roles mision 5:** Driver: Sugey · Navigator: Thalia
**Roles mision 6:** Driver: Thalia· Navigator: Sugey
**Roles mision 7:** Driver: Thalia· Navigator: Sugey


## Incidencias------------------------------
## Nota sobre la numeración de Pull Requests

Los números de los Pull Requests no coinciden con los números de las misiones.
GitHub numera juntos todos los Pull Requests del repositorio en el orden en que
se crean, y no reutiliza números, aunque el PR se borre o se corrija.

| Pull Request | Misión |
|---|---|
| #1 | Misión 0 |
| #2 | Misión 1 |
| #3 | Misión 2 |
| #4 | Misión 3 (incorrecto: se fusionó hacia `main`) |
| #5 | Misión 3 (rehecho hacia `develop`) |

### Qué pasó

Al crear el PR de la Misión 3, la base quedó en `main` en lugar de `develop`
(GitHub propone `main` por defecto). Como `feature/mision-3` salió de `develop`,
el merge llevó a `main` todo el historial de las Misiones 0 a 3.

### Cómo se corrigió

1. Se creó una rama de respaldo (`respaldo-develop`) para no perder trabajo.
2. Se regresaron `develop` (a la Misión 2) y `main` (a la estructura inicial)
   con `git reset --hard` y `git push --force-with-lease`.
3. Se rescató el commit de la Misión 3 con `git cherry-pick`, conservando sus
   roles y el `Co-authored-by`.
4. Se abrió un nuevo PR (#5) con base `develop`, y se fusionó correctamente.

### Qué aprendimos

- Antes de crear un PR hay que verificar siempre que la **base sea `develop`**.
- Conviene crear una rama de respaldo antes de reescribir historia.
- La rama principal debe recibir el trabajo solo al final del proyecto.
- Por eso el PR de la Misión 4 es el #6, y así sucesivamente: el desfase es
  consecuencia del PR #4 incorrecto y no afecta el historial de commits.

