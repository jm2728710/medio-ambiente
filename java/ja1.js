function render(html) {
    document.getElementById("app").innerHTML = html;
}
//1
function clasificarAQI() {
    render(`
        <h2>Calidad del Aire (AQI)</h2>
        <input id="aqi" type="number" placeholder="Ingrese AQI">
        <button onclick="procesarAQI()">Clasificar</button>
        <div class="output" id="out"></div>
    `);
}

function procesarAQI() {
    const aqi = parseInt(document.getElementById("aqi").value);
    let categoria = "";
    if (aqi <= 50) categoria = "Bueno";
    else if (aqi <= 100) categoria = "Moderado";
    else if (aqi <= 150) categoria = "Dañino para grupos sensibles";
    else if (aqi <= 200) categoria = "Dañino";
    else if (aqi <= 300) categoria = "Muy dañino";
    else categoria = "Peligroso";

    document.getElementById("out").innerHTML = `<b>AQI:</b> ${aqi}<br><b>Clasificación:</b> ${categoria}`;
}
//2
function registrarRuido() {
    render(`
        <h2>Registro de Ruido Ambiental</h2>
        <input id="cantidad" type="number" placeholder="Cantidad de mediciones">
        <button onclick="procesarRuido()">Registrar</button>
        <div class="output" id="out"></div>
    `);
}

function procesarRuido() {
    const n = parseInt(document.getElementById("cantidad").value);
    let niveles = [];
    for (let i = 0; i < n; i++) {
        let valor = parseFloat(prompt(`Ingrese nivel de ruido #${i + 1} en dB:`));
        if (!isNaN(valor)) niveles.push(valor);
    }
    const promedio = niveles.reduce((a,b)=>a+b,0)/niveles.length;
    document.getElementById("out").innerHTML = `<b>Niveles:</b> ${niveles.join(", ")} dB<br><b>Promedio:</b> ${promedio.toFixed(2)} dB`;
}
//3
let temperaturas = [];
function contarFocos() {
    temperaturas = [];
    render(`
        <h2>Focos de Calor</h2>
        <input id="temp" type="number" placeholder="Ingrese temperatura">
        <button onclick="agregarTemperatura()">Agregar</button>
        <div class="output" id="out"></div>
    `);
}

function agregarTemperatura() {
    const temp = parseFloat(document.getElementById("temp").value);
    if (temp === 0) {
        let focos = temperaturas.filter(t=>t>45).length;
        const promedio = temperaturas.reduce((a,b)=>a+b,0)/temperaturas.length;
        document.getElementById("out").innerHTML = `<b>Total ingresadas:</b> ${temperaturas.length}<br><b>Focos >45°C:</b> ${focos}<br><b>Promedio:</b> ${promedio.toFixed(2)}°C`;
        return;
    }
    if (!isNaN(temp)) temperaturas.push(temp);
    document.getElementById("temp").value = "";
}
//4
function clasificarResiduo() {
    render(`
        <h2>Tipo de Residuo</h2>
        <input id="residuo" type="number" placeholder="Código 1-4">
        <button onclick="procesarResiduo()">Clasificar</button>
        <div class="output" id="out"></div>
    `);
}

function procesarResiduo() {
    const c = parseInt(document.getElementById("residuo").value);
    let tipo = "";
    switch(c){
        case 1: tipo="Orgánico"; break;
        case 2: tipo="Plástico"; break;
        case 3: tipo="Papel/Cartón"; break;
        case 4: tipo="Vidrio"; break;
        default: tipo="Código inválido";
    }
    document.getElementById("out").innerHTML = `<b>Tipo de residuo:</b> ${tipo}`;
}
//5
let nivelesRio = [];
function monitorearRio() {
    nivelesRio = [];
    render(`
        <h2>Monitoreo del Río</h2>
        <input id="nivel" type="number" placeholder="Nivel en metros">
        <button onclick="agregarNivel()">Agregar</button>
        <div class="output" id="out"></div>
    `);
}

function agregarNivel() {
    let nivel = parseFloat(document.getElementById("nivel").value);
    if (isNaN(nivel)) return;
    let continuar = "";
    do {
        nivelesRio.push(nivel);
        if(nivel>3) alert("¡Alerta! Nivel del río supera 3 m.");
        continuar = prompt("¿Desea registrar otro nivel? (si/no)").toLowerCase();
        if(continuar==="si") nivel = parseFloat(prompt("Ingrese nivel en metros:"));
    } while(continuar==="si");

    const detalles = nivelesRio.map(n=>`${n} m`).join(", ");
    const promedio = nivelesRio.reduce((a,b)=>a+b,0)/nivelesRio.length;
    document.getElementById("out").innerHTML = `<b>Niveles:</b> ${detalles}<br><b>Promedio:</b> ${promedio.toFixed(2)} m`;
}
function cargar(opcion){
    if(opcion==="aqi") clasificarAQI();
    if(opcion==="ruido") registrarRuido();
    if(opcion==="focos") contarFocos();
    if(opcion==="residuo") clasificarResiduo();
    if(opcion==="rio") monitorearRio();
}
