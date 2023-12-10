//Registro de usuarios
function registrar_usuario() {
    //Funcion para registrar (se dene conectar al servidor ya que no permite escribir en JSON sin Backend)

    var nombre_usuario = document.getElementById('nombre_completo').value;
    var edad_usuario = document.getElementById('edad').value;
    var correo_usuario = document.getElementById('email').value;
    var comuna_usuario = document.getElementById('comuna').value;
    var password_usuario = document.getElementById('contraseña_ingreso').value;
    let dateObj = new Date();
    let mes_usuario = dateObj.getUTCMonth() + 1;
    let dia_usuario = dateObj.getUTCDate();
    let año_usuario = dateObj.getUTCFullYear();

    var fechaingreso_usuario = dia + "/" + mes + "/" + año

    const data = fs.readFileSync('usuarios.json');

    const jsonData = JSON.parse(data);

    jsonData.push({
        nombre: nombre_usuario,
        edad: edad_usuario,
        correo: correo_usuario,
        password: password_usuario,
        fecha_creacion: fechaingreso_usuario,
        comuna: comuna_usuario,
        mes_creacion: mes_usuario,
        año_creacion: año_usuario
    })

    const jsonString = JSON.stringify(jsonData);

    fs.writeFileSync('usuarios.json', jsonString, 'utf-8', (err) => {
        if (err) throw err;
        console.log('Datos de usuario registrados');
    });
};