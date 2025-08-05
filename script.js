// Datos de los ramos organizados por semestres y requisitos
const malla = [
  {
    semestre: "1° Semestre",
    ramos: [
      "Historia de la Psicología",
      "Psicología General",
      "Fundamentos biológicos del comportamiento",
      "Sociedad, Sexualidades y Géneros",
      "Filosofía y Psicología",
      "Curso de Inglés General I",
    ]
  },
  {
    semestre: "2° Semestre",
    ramos: [
      "Introducción a la Ciencia de Datos",
      "Procesos Psicológicos",
      "Sociedad, Políticas Públicas y Salud Mental",
      "Transformaciones Socioculturales",
      "Curso de Inglés General II",
      "Curso de Formación General"
    ]
  },
  {
    semestre: "3° Semestre",
    ramos: [
      "Investigación I",
      "Psicología de la Comunicación",
      "Neurociencia y Neuropsicología",
      "Ciclo vital I: Infancia, Adolescencia y Juventud",
      "Psicología Social I",
      "Curso de Inglés General III",
      "Desarrollo de carrera I"
    ]
  },
  {
    semestre: "4° Semestre",
    ramos: [
      "Investigación II",
      "Psicología de la Personalidad",
      "Corrientes Principales de la Psicología: Psicoanálisis",
      "Ciclo vital II: Adultez y Vejez",
      "Psicología Social II",
      "Corrientes Principales de la Psicología: Cognitivo",
      "Desarrollo de carrera II",
      "Curso de Formación General"
    ]
  },
  {
    semestre: "5° Semestre",
    ramos: [
      "Investigación III",
      "Psicopatología y Psiquiatría: Infancia y adolescencia",
      "Corrientes principales de la Psicología: Sistémica",
      "Psicodiagnóstico Infanto-juvenil",
      "Psicología de la Salud",
      "Corrientes principales de la Psicología: Humanismo",
      "Desarrollo de carrera III",
      "Curso de Formación General"
    ]
  },
  {
    semestre: "6° Semestre",
    ramos: [
      "Investigación IV",
      "Psicopatología y Psiquiatría: Adultez y vejez",
      "Psicología Social Comunitaria",
      "Psicodiagnóstico en Adultez y Vejez",
      "Psicología del Trabajo",
      "Desarrollo de carrera IV",
      "Curso de Formación General"
    ]
  },
  {
    semestre: "7° Semestre",
    ramos: [
      "Psicología Educacional",
      "Psicología Jurídica",
      "Psicología Clínica",
      "Diseño y evaluación de proyectos",
      "Psicología de las organizaciones y RR.HH",
      "Desarrollo de carrera V",
      "Curso de Formación General"
    ]
  },
  {
    semestre: "8° Semestre",
    ramos: [
      "Taller de Intervención Clínica I",
      "Taller de Intervención Psicosocial I",
      "Estrategias de trabajo grupal",
      "Electivo de profundización I",
      "Curso de Formación General"
    ]
  },
  {
    semestre: "9° Semestre",
    ramos: [
      "Taller de Intervención Clínica II",
      "Taller de Intervención Psicosocial II",
      "Electivo de profundización II"
    ]
  },
  {
    semestre: "10° Semestre",
    ramos: [
      "Práctica Profesional",
      "Electivo de profundización III"
    ]
  }
];

// Mapa de requisitos
const requisitos = {
  "Curso de Inglés General II": ["Curso de Inglés General I"],
  "Curso de Inglés General III": ["Curso de Inglés General I", "Curso de Inglés General II"],
  "Investigación I": ["Introducción a la Ciencia de Datos"],
  "Investigación II": ["Introducción a la Ciencia de Datos", "Investigación I"],
  "Investigación III": ["Introducción a la Ciencia de Datos", "Investigación I", "Investigación II"],
  "Investigación IV": ["Introducción a la Ciencia de Datos", "Investigación I", "Investigación II", "Investigación III"],
  "Desarrollo de carrera II": ["Desarrollo de carrera I"],
  "Desarrollo de carrera III": ["Desarrollo de carrera I", "Desarrollo de carrera II"],
  "Desarrollo de carrera IV": ["Desarrollo de carrera I", "Desarrollo de carrera II", "Desarrollo de carrera III"],
  "Desarrollo de carrera V": ["Desarrollo de carrera I", "Desarrollo de carrera II", "Desarrollo de carrera III", "Desarrollo de carrera IV"],
  "Neurociencia y Neuropsicología": ["Fundamentos biológicos del comportamiento"],
  "Ciclo vital II: Adultez y Vejez": ["Ciclo vital I: Infancia, Adolescencia y Juventud"],
  "Psicología Social II": ["Psicología Social I"],
  "Psicopatología y Psiquiatría: Infancia y adolescencia": ["Psicología de la Personalidad"],
  "Psicopatología y Psiquiatría: Adultez y vejez": ["Psicología de la Personalidad"],
  "Psicodiagnóstico en Adultez y Vejez": ["Psicodiagnóstico Infanto-juvenil"],
  "Psicología de las organizaciones y RR.HH": ["Psicología del Trabajo"],
  "Taller de Intervención Clínica II": ["Taller de Intervención Clínica I"],
  "Taller de Intervención Psicosocial II": ["Taller de Intervención Psicosocial I"]
};

const aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  malla.forEach(({ semestre, ramos }) => {
    const columna = document.createElement("div");
    columna.classList.add("semestre");

    const titulo = document.createElement("h3");
    titulo.textContent = semestre;
    columna.appendChild(titulo);

    ramos.forEach(ramo => {
      const div = document.createElement("div");
      div.textContent = ramo;
      div.classList.add("ramo");

      if (aprobados.includes(ramo)) {
        div.classList.add("aprobado");
      } else if (!cumpleRequisitos(ramo)) {
        div.classList.add("bloqueado");
      }

      div.addEventListener("click", () => toggleRamo(ramo, div));
      columna.appendChild(div);
    });

    contenedor.appendChild(columna);
  });
}

function cumpleRequisitos(ramo) {
  const reqs = requisitos[ramo] || [];
  return reqs.every(r => aprobados.includes(r));
}

function toggleRamo(ramo, div) {
  if (!aprobados.includes(ramo)) {
    if (!cumpleRequisitos(ramo)) {
      const faltan = requisitos[ramo].filter(r => !aprobados.includes(r));
      mostrarModal(`No puedes aprobar "${ramo}" aún. Requiere: ${faltan.join(", ")}`);
      return;
    }
    aprobados.push(ramo);
  } else {
    // Eliminar ramo aprobado y todos los que dependan de él
    removerRamoYDependientes(ramo);
  }

  localStorage.setItem("aprobados", JSON.stringify(aprobados));
  crearMalla();
}

function removerRamoYDependientes(ramo) {
  const cola = [ramo];
  while (cola.length) {
    const actual = cola.pop();
    const index = aprobados.indexOf(actual);
    if (index > -1) aprobados.splice(index, 1);

    for (const [clave, reqs] of Object.entries(requisitos)) {
      if (reqs.includes(actual) && aprobados.includes(clave)) {
        cola.push(clave);
      }
    }
  }
}

// Modal
function mostrarModal(mensaje) {
  const modal = document.getElementById("modal");
  document.getElementById("mensajeModal").textContent = mensaje;
  modal.style.display = "block";
}

document.getElementById("cerrarModal").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

window.onclick = event => {
  const modal = document.getElementById("modal");
  if (event.target === modal) modal.style.display = "none";
};

// Iniciar
crearMalla();

