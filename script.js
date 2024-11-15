// Hancel Fernando 
// Creamos las variables que almacenan los numeros introducidos por el usuario
// una variable tipo, que almacena el tipo de la operacion selecciona por el usuario
// y una variable resultado que guarda la operacion realizada
let num1, num2, tipo, resultado
// Una variable de tipo array que almacenara un historial de operaciones y resultados
let historial = [""]

// Prototipo obOperacion que guardara todos los datos de una operacion, num1, num2, tipo de operacion y el resultado
// ademas de un metodo toStringOp() que devuelve un string con la operacion dependiendo del tipo que sea esta.
function obOperacion(pnum1, pnum2, ptipo, presultado){
    this.num1 = pnum1
    this.num2 = pnum2
    this.tipo = ptipo
    this.resultado = presultado

    this.toStringOp = () =>{
        let resultadoToString = ""
        if(!(tipo == "rc"))
            resultadoToString =`${this.num1} ${this.tipo} ${this.num2} = ${this.resultado}`
        else
            resultadoToString = `√${this.num1} = ${this.resultado}`

        return resultadoToString
    }
}

// Funcion de suma
function suma(num1, num2){
    return num1 + num2
}

// Funcion de resta
function resta(num1, num2){
    return num1 - num2

}

// Funcion de multiplicacion
function multiplicacion(num1, num2){
    return num1 * num2
}

// Funcion de division
function division(num1, num2){
    return num1 / num2
}

// Funcion raiz cruadrada de un numero
function raizCuadrada(num){
    return Math.sqrt(num)
}

// Funcion que pide por parametro los dos numeros introducidos por el usuario y el tipo de operacion a realizar
// dependiendo de la tipo de operacion que el usuario haya elegido se realiza una operacion u otra
function operacion(num1, num2, tipo){
    let resultadoOp

    switch (tipo) {
        case "+":
            resultadoOp = suma(num1, num2)
            break;
        case "-":
            resultadoOp = resta(num1, num2)
            break;
        case "*":
            resultadoOp = multiplicacion(num1, num2)
            break;
        case "/":
            resultadoOp = division(num1, num2)
            break;
        case "rc":
            resultadoOp = raizCuadrada(num1)
            break;
    }

    return resultadoOp
}

// Funcion que capta lo que hay almacenado en el localStorage del usuario y los guarda en el array historial, ordenamos el array,
// comprobamos si esta vacio o no, de estas vacio se muestra un mensaje o se muestra el historial de operaciones
function mostrarHistorial(){
    for (let i = 0; i < localStorage.length; i++) {
        historial[i] = localStorage.key(i) + "-" + localStorage.getItem(localStorage.key(i))
    }

    historial = historial.sort()

    console.log("-- Historial operaciones --");
    if (historial.length == 0) {
        console.log("No hay operaciones en el historial.")   
    } 
    else {
        historial.forEach((op) => {
            console.log(op.substring(op.indexOf("-") + 1))
        })
    }
}

// Funcion que valida un numero pasado por parametro, si ese numero es numero se comprueba si su valor es "Infinity" de ser 
// asi se muestra un mensaje indicando de que no es posible dividir entre cero. Si el valor introducido no es un numero
// se devuelve un mensaje indicando de que el valor introducido debe de ser numerico.
function validarInput(num){
    let mensaje

    if (!isNaN(num)) {
        if (num == Infinity)
            mensaje = "No es posible dividir entre cero"
    } else {
        mensaje = "El valor introducido debe de ser numerico"
    }

    return mensaje
}

// Funcion principal que realiza todo el proceso de calculo
function calculadora(){
    let condicion = true // Se crea una variable booleana a true para comprobar las condiciones de los do while
    
    do {
        // captamos en la variable tipo la opcion elegida por el usuario
        tipo = prompt("Calculadora\n"+
            "Seleccione la operacion que desea realizar (debe de escribir el caracter mostrado entre corchetes):\n"+
            "suma[+], resta[-], multiplicacion[*], division[/], raiz cuadrada[rc]\n" +
            "Tambien puede ver el historial de operaciones escribiendo:\n" +
            "[historial]\n" +
            "Para salir de la calculadora escriba:\n" +
            "[salir]"
        
        )
    
        // si la opcion elegida por el usuario es una de las mostradas en el if entra
        if (tipo == "+" || tipo == "-" || tipo == "*" || tipo == "/" || tipo == "rc"){
            // Mientras que el valor introducido en tipo no sea rc (raiz cuadrada) se accede a este if
            if (!(tipo == "rc")) {
                // Entramos en un bucle do while en el que comprobamos los valores del usuario
                do {
                    num1 = parseFloat(prompt("Introduzca el primer numero."))
                    
                    // si la funcion v validarInput(num) devuelve algo se entiende de que hay un error
                    // con el valor introducido por el usuario por lo que se saca esa mensaje por 
                    // un alert para informar al usuario
                    if (!validarInput(num1) == "")
                        alert(validarInput(num1))
                
                // Mientras que el metodo validarInput(num) devuelve algo el bucle se repetira, si no devuelve nada
                // sale del bucle
                } while (!validarInput(num1) == "");
                
                do {
                    num2 = parseFloat(prompt("Introduzca el segundo numero."))
                    
                    if (!validarInput(num2) == "")
                        alert(validarInput(num2))
            
                } while (!validarInput(num2) == "");
                
                // utilizamos el metodo operacion operacion(num1, num2, tipo) para realizar la operacion del usuario
                // y guardamos el valor devuelto por el metodo en para variable resultado
                resultado = operacion(num1, num2, tipo)
            
                // si el metodo validarInput(resultado) devuelve un mensaje significa que el usuario esta intentando dividir
                // entre cero por lo que se le indicara en un mensaje por un alert en el que no es posible dividir entre cero
                if (!validarInput(resultado) == ""){
                    alert(validarInput(resultado))
                }
                // de no ser asi entra en este else
                else {
                    // crearemos un objeto de tipo obOperacion en el que le pasamos los datos introducidos por el usuario
                    let resulOpe = new obOperacion(num1, num2, tipo, resultado)
            
                    // sacamos por consola la operacion junto con el resultado utilizando el metodo toStringOp() del objeto
                    console.log(resulOpe.toStringOp())
    
                    // agregamos al array el objeto
                    historial.push(resulOpe)
                    // creamos una objeto de tipo fecha
                    let fecha = new Date()
                    // el cual utilizaremos para darle una key a la operacio que agregaremos al localStorage junto con el 
                    // toStringOp() del objeto resulOpe
                    localStorage.setItem(fecha.toLocaleString(), resulOpe.toStringOp())
                }
            }
            // si el tipo es rc (raiz cuadrada)
            else {
                // comprobaremos el valor introducido por el usuario
                do {
                    num1 = parseFloat(prompt("Introduzca un numero (no puede ser negativo)."))
                    
                    if (!validarInput(num1) == "")
                        alert(validarInput(num1))
                    // si el valor es menor de 0 le indicaremos un mensaje
                    else if (num1 < 0)
                        alert("No es posible hacer la raiz cuadrada de un numero negativo.")
                    // si no saldemos del bucle
                    else
                        condicion = false
        
                } while (condicion);
                // reutilizaremos al variable condicion igualandola a true
                condicion = true

                // guardaremos en variable resultado el valor devuelto por el metodo operacion()
                resultado = operacion(num1, 0, tipo)
        
                // crearemos un objeto de tipo obOperacion en el que le pasamos los datos introducidos por el usuario
                let resulOpe = new obOperacion(num1, num2, tipo, resultado)
        
                // sacamos por consola la operacion junto con el resultado utilizando el metodo toStringOp() del objeto
                console.log(resulOpe.toStringOp())

                // agregamos al array el objeto
                historial.push(resulOpe)
                // creamos una objeto de tipo fecha
                let fecha = new Date()
                // el cual utilizaremos para darle una key a la operacio que agregaremos al localStorage junto con el 
                // toStringOp() del objeto resulOpe
                localStorage.setItem(fecha.toLocaleString(), resulOpe.toStringOp())
            }
        }
        // si la opcion elegida por el usuario es historial
        else if (tipo == "historial"){
            // se utiliza el metdo mostrarHistorial() el cual lista el historial de operaciones
            mostrarHistorial()
            // y se iguala la condicion booleana a false para que salga de la calculadora 
            condicion = false
        }
        // si la opcion elegida por el usuario es salir
        else if (tipo == "salir"){
            // se iguala la condicion booleana a false para salir del programa
            condicion = false
        }
        // de no ser ninguna de las anteriores se entendera que el valor introducido en la variable tipo
        // no concuerda con ninguno de los valores mostrador por lo que se muestra un alert indicando
        // de que el operador es invalido
        else {
            alert("Operador invalido")
        }
    
    } while (condicion);
}

// "Ejecutamos" el programa
calculadora()

