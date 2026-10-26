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

## Misión 8: obtenerResumen

- Devuelve `{ total, pendientes, terminadas }`.
- Versión elegida: reutiliza `obtenerPendientes` y `obtenerTerminadas`.
  - Comunica mejor la intención y si cambia la regla de "pendiente", solo se cambia en un lugar.
  - Hace más trabajo (recorre la colección dos veces), pero para una lista de tareas el costo es insignificante.
- Versión alternativa: calcula directamente con un solo `filter()`. Es más eficiente, pero duplica la regla de qué es una tarea terminada.
- Casos de prueba: colección mixta, vacía, todas pendientes y la invariante total = pendientes + terminadas.
## Misión 9: integración con la interfaz

- `app.js` actúa como adaptador: lee eventos, llama a funciones de `taskService.js`, reasigna el estado y llama a `render()`.
- Se eliminaron `push`, `splice` y cualquier regla sobre tareas dentro de `app.js`.
- El filtro se resuelve con un objeto que asocia cada vista con una función de dominio.
- Eliminar y cambiar estado usan el `id` de la tarea, no su posición.
- Esta misión no lleva pruebas Vitest; se verificó manualmente:

| Escenario | Resultado |
|---|---|
| Alta válida | OK |
| Alta inválida | OK |
| Cambio de estado | OK |
| Filtro | OK |
| Eliminar | OK |





                           



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

     Misión 3: agregarTarea

- **RED:** ¿qué prueba escribiste y por qué falló?
Escribimos tres pruebas para `agregarTarea`: que la nueva tarea quede al final, que la colección tenga un elemento más y que el array original no se modifique. Fallaron porque la función aún tenía el `throw new Error("Misión 3 pendiente")`, que interrumpió la ejecución antes de que la prueba pudiera comparar el resultado.

- **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?
Reemplazamos el `throw` por un spread que copia la colección y agrega la tarea nueva:

      export function agregarTarea(tareas, nuevaTarea) {
        return [...tareas, nuevaTarea];
      }

  Resultado: todas las pruebas en verde.

- **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?
No hizo falta refactorizar: la función tiene una sola línea y nombres claros. Elegimos spread en lugar de `push` para no mutar el array recibido, y la prueba "no modifica el array original" protege esa decisión. Volvimos a correr las pruebas para confirmarlo.

Misión 5: obtenerPendientes y obtenerTerminadas

- **RED:** ¿qué prueba escribiste y por qué falló?
Escribimos pruebas para ambas funciones con tres casos: colección mixta, ninguna coincidencia y colección vacía. Fallaron porque las funciones todavía lanzaban un `throw new Error`, así que la prueba nunca pudo comparar el resultado.

- **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?
Reemplazamos los `throw` por un `filter()` en cada función:

      export function obtenerPendientes(tareas) {
        return tareas.filter(t => !t.completada);
      }

  `obtenerTerminadas` es igual, sin la negación. Resultado: todas las pruebas en verde.

- **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?
No cambiamos código, pero revisamos si `filter()` era la herramienta correcta. Lo es, porque selecciona un subconjunto sin transformar los elementos, y cuando no hay coincidencias devuelve `[]` y no `undefined`. Volvimos a correr las pruebas para confirmarlo.


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

Misión 8: obtenerResumen

- **RED:** ¿qué prueba escribiste y por qué falló?
Escribimos pruebas para `obtenerResumen` con una colección mixta, una vacía (que debe devolver ceros), una con todas pendientes y una que verifica que `total = pendientes + terminadas`. Fallaron porque la función aún tenía el `throw new Error("Misión 8 pendiente")`.

- **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?
Implementamos el resumen reutilizando funciones ya probadas:

      export function obtenerResumen(tareas) {
        return {
          total: tareas.length,
          pendientes: obtenerPendientes(tareas).length,
          terminadas: obtenerTerminadas(tareas).length
        };
      }

  Resultado: todas las pruebas en verde.

- **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?
Comparamos esta versión con una que calcula todo en un solo `filter()`. Nos quedamos con la que reutiliza funciones porque comunica mejor la intención y la regla de "pendiente" vive en un solo lugar. Hace más trabajo, pero con una lista de tareas el costo es insignificante.

    MISION 09
## Misión 10: Refactor final protegido por pruebas

Antes de empezar el refactor corrimos `npm test` y todas las pruebas estaban en verde. Los cambios de `taskService.js` los comprobamos con la suite después de cada modificación. Los de `app.js` los comprobamos a mano, porque la interfaz no está cubierta por Vitest.

### Cambios en `taskService.js`

| Problema que encontramos | Qué cambiamos | Evidencia |
|---|---|---|
| Había comentarios `TODO` que decían que faltaba trabajo que ya estaba hecho, y el encabezado hablaba de "completar las funciones misión por misión" | Quitamos los `TODO` y dejamos un encabezado que explica para qué sirve el archivo | `npm test` en verde |
| El mismo concepto se llamaba `t` en unas funciones y `tarea` en otras | Lo dejamos como `tarea` en `buscarTarea`, `obtenerPendientes`, `obtenerTerminadas` y `eliminarTarea` | `npm test` en verde |
| `obtenerResumen` repetía la regla de "terminada" y calculaba los pendientes restando (`total - terminadas`) | Ahora usa `obtenerPendientes()` y `obtenerTerminadas()` | `npm test` en verde |
| `cambiarEstado` tenía la sangría desigual y espacios sobrantes | Le dimos el mismo formato que a las demás funciones | `npm test` en verde |

El cambio más importante fue el de `obtenerResumen`:

```js
// Antes
export function obtenerResumen(tareas) {
  const terminadas = tareas.filter(t => t.completada).length;
  return {
    total: tareas.length,
    pendientes: tareas.length - terminadas,
    terminadas
  };
}

// Después
export function obtenerResumen(tareas) {
  return {
    total: tareas.length,
    pendientes: obtenerPendientes(tareas).length,
    terminadas: obtenerTerminadas(tareas).length
  };
}
```

Con este cambio la regla de qué es una tarea terminada queda escrita en un solo lugar, y reutilizamos funciones que ya tienen sus propias pruebas.

### Cambios en `app.js`

| Problema que encontramos | Qué cambiamos | Evidencia |
|---|---|---|
| El comentario del encabezado Lo reemplazamos por una descripción de lo que hace el archivo | La aplicación carga y funciona igual |
| Las variables del DOM estaban en inglés (`form`, `input`, `list`, `message`, `summary`, `filterButtons`) y las del dominio en español | Las pasamos a español (`formulario`, `campoTitulo`, `lista`, `mensaje`, `resumen`, `botonesFiltro`) usando el renombrado de VS Code, sin tocar los selectores del HTML | Consola sin errores y cinco escenarios manuales correctos |
| `button` y `b` nombraban el mismo tipo de objeto sin decir qué papel tenía cada uno | Los renombramos a `botonPulsado` y `boton` | Escenario de filtro probado a mano |
| `toggle` y `eliminar` mezclaban idiomas y no dejaban claro que eran ids | Les pusimos alias: `idParaCambiar` e `idParaEliminar` | Completar, reabrir y eliminar probados a mano |
| `li` y `coleccion` eran nombres muy genéricos | `li` ahora es `elemento`, y el parámetro de `vistas` pasó de `coleccion` a `tareas` para ser consistente con `taskService.js` | Cinco escenarios manuales correctos |

**Verificación manual de `app.js`:** probamos alta válida, alta inválida, cambio de estado, filtro y eliminar. También revisamos que la consola del navegador no mostrara errores y que al hacer clic fuera de un botón no pasara nada. Esta evidencia es manual y no la cubre Vitest.

### Cambios que consideramos y descartamos

- **Separar el `submit` en `registrarTarea()` y `limpiarFormulario()`:** el manejador tiene unas diez líneas y se lee en orden, así que no justificaba agregar dos funciones. Además, esas funciones modifican variables del módulo y dependen del DOM, por lo que no se podrían probar con pruebas unitarias.
- **Extraer `limpiarMensaje()`:** la línea solo se repite dos veces y la función no se leería mejor que la asignación directa.
- **Convertir `"todas"`, `"pendientes"` y `"terminadas"` en constantes:** esos valores también están en `index.html` (`data-filter`), así que una constante en JavaScript no quitaría la duplicación.
- **Tocar `agregarTarea`, `eliminarTarea`, `vistas`, `crearItem` y `render()`:** cada una tiene una sola responsabilidad y su intención se entiende bien.

### Conclusión

Refactorizamos solo lo que pudimos justificar. Los cambios de `taskService.js` quedaron protegidos por la suite de pruebas y los de `app.js` por la verificación manual de los escenarios de integración. El comportamiento de la aplicación se conservó.
    

## Pair Programming
**Roles misión 0:** Driver: Thalia · Navigator: Sugey
**Roles misión 1:** Driver: Sugey · Navigator: Thalia
**Roles misión 2:** Driver: Thalia · Navigator: Sugey
**Roles mision 3:** Driver: Sugey · Navigator: Thalia
**Roles mision 4:** Driver: Thalia· Navigator: Sugey
**Roles mision 5:** Driver: Sugey · Navigator: Thalia
**Roles mision 6:** Driver: Thalia· Navigator: Sugey
**Roles mision 7:** Driver: Thalia· Navigator: Sugey
**Roles mision 8:** Driver: Sugey · Navigator: Thalia
**Roles mision 9:** Driver: Sugey · Navigator: Thalia
**Roles mision 10:** Driver: Thalia· Navigator: Sugey
**Roles misión 11:** Driver: Sugey · Navigator: Thalia

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

