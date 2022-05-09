import React from "react";
import { firebase } from "./firebase";

function App() {
  const [tareas, setTareas] = React.useState([]);
  const [tarea, setTarea] = React.useState("");
  const [recompensa, setRecompensa] = React.useState("");
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState("");

  const obtenerDatos = async () => {
    try {
      const db = firebase.firestore();
      const data = await db.collection("Tareas").orderBy("name", "asc").get();
      const arrayData = await data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(arrayData);
      setTareas(arrayData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const agregar = async (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("Escriba la tarea");
      return;
    }
    if (!recompensa.trim()) {
      console.log("Escriba la recompensa");
      return;
    }

    try {
      const db = firebase.firestore();
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now(),
        Recompensa: recompensa,
      };
      const data = await db.collection("Tareas").add(nuevaTarea);

      //Metodo meh, solo esta simulando pudiendo volver a llamar la obtención de datos para mas precisión
      /*setTareas([
        ...tareas,
        {...nuevaTarea, id:data.id}
      ])*/
      obtenerDatos();

      setTarea("");
      setRecompensa("");
    } catch (error) {
      console.log(error);
    }

    console.log(tarea);
  };

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("Tareas").doc(id).delete();

      //Metodo meh, solo esta simulando pudiendo volver a llamar la obtención de datos para mas precisión
      /*const arrayFiltrado = tareas.filter(item =>item.id !== id);
      setTareas(arrayFiltrado);*/

      obtenerDatos();
    } catch (error) {
      console.log(error);
    }
  };

  const activarEdicion = (item) => {
    setModoEdicion(true);
    setTarea(item.name);
    setRecompensa(item.Recompensa);
    setId(item.id);
  };

  const editar = async (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("Escriba la tarea");
      return;
    }
    if (!recompensa.trim()) {
      console.log("Escriba la recompensa");
      return;
    }

    try {
      const db = firebase.firestore();
      await db.collection("Tareas").doc(id).update({
        name: tarea,
        Recompensa: recompensa,
      });
      //Metodo meh, solo esta simulando pudiendo volver a llamar la obtención de datos para mas precisión
      /*const arrayEditado = tareas.map(item =>(
      item.id === id ?{id:item.id, fecha:item.fecha, name: tarea, Recompensa: recompensa}: item));
      setTareas(arrayEditado);*/

      obtenerDatos();

      setModoEdicion(false);
      setTarea('');
      setRecompensa('');
      setId('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center text-primary">CRUD mediante FIREBASE</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {tareas.map((item) => (
              <li className="list-group-item" key={item.id}>
                {item.name}- ${item.Recompensa}
                <button
                  className="btn btn-danger btn-sm float-end"
                  onClick={() => eliminar(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm float-end mx-2"
                  onClick={() => activarEdicion(item)}
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-success">
            {modoEdicion ? "Editar tarea" : "Agregar tarea"}
          </h3>
          <form
            className="d-grid gap-2"
            onSubmit={modoEdicion ? editar : agregar}
          >
            <input
              type="text"
              placeholder="Ingrese la tarea"
              className="form-control mb-2"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            <input
              type="number"
              placeholder="Ingrese la cantidad de recompensa"
              className="form-control mb-2"
              onChange={(e) => setRecompensa(e.target.value)}
              value={recompensa}
            />
            <button
              className={modoEdicion ? "btn btn-warning" : "btn btn-dark"}
              type="submit"
            >
              {modoEdicion ? "Editar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
