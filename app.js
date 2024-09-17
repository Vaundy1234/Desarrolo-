const firebaseConfig = {
    apiKey: "AIzaSyAXZFsuFFBLJX_JqoRy120Q0fluFsiElZE",
    authDomain: "proyectochupetin.firebaseapp.com",
    projectId: "proyectochupetin",
    storageBucket: "proyectochupetin.appspot.com",
    messagingSenderId: "107144840455",
    appId: "1:107144840455:web:a6d6a546064f0efad8f1a2",
    measurementId: "G-EKGCDJREKK"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Fires´tore and get a reference to the service
const db = firebase.firestore();

//Agregar documentos
function guardar(){
	var nombre = document.getElementById('nombre').value;
	var apellido= document.getElementById('apellido').value;
	var fecha = document.getElementById('fecha').value;
  db.collection("users").add({
    first: nombre,
    last: apellido,
    born: fecha
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    var nombre = document.getElementById('nombre').value='';
	  var apellido= document.getElementById('apellido').value='';
	  var fecha = document.getElementById('fecha').value='';
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
  tabla.innerHTML =``;
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().first}`);
      tabla.innerHTML += `
      <tr>
      <th scope="row">${doc.id}</th>
      <td>${doc.data().first}</td>
      <td>${doc.data().last}</td>
      <td>${doc.data().born}</td>
      <td><button class="btn btn-danger" onclick=eliminar('${doc.id}')>Eliminar</button></td>
      <td><button class="btn btn-warning" onclick=editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')>Editar</button></td>
      </tr> `        
  });
});

//borrar documentos
function eliminar(id){
  db.collection("users").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

//editar documentos
function editar(id,nombre,apellido,fecha){
  document.getElementById('nombre').value=nombre
  document.getElementById('apellido').value=apellido
  document.getElementById('fecha').value=fecha
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Editar'

  boton.onclick = function(){
    var washingtonRef = db.collection("users").doc(id);
    
    var nombre = document.getElementById('nombre').value
    var apellido = document.getElementById('apellido').value
    var fecha = document.getElementById('fecha').value

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
      first: nombre,
      last: apellido,
      born: fecha
    })
    .then(() => {
        console.log("Document successfully updated!");
        boton.innerHTML = 'Guardar'
        var nombre = document.getElementById('nombre').value='';
	      var apellido= document.getElementById('apellido').value='';
	      var fecha = document.getElementById('fecha').value=''
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }
}