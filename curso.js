//js da navbar lateral
  document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});


const cursos = {
  "jszero": {
    capa: "assets/jsdozero.webp",
    titulo: "JavaScript do Zero",
    professor: "com Pedro Alemar",
    descricao: "Aprenda JavaScript de forma prática e divertida, desde os conceitos básicos até interatividade com DOM.",
    tags: ["JavaScript", "Lógica", "Web"],
    aulas: [
      { titulo: "Introdução ao JavaScript", tipo: "video", link: "#" },
      { titulo: "Variáveis e Tipos de Dados", tipo: "pdf", link: "materiais/js_variaveis.pdf" },
      { titulo: "Funções e Eventos", tipo: "zip", link: "materiais/eventos_funcoes.zip" },
      { titulo: "Manipulando o DOM", tipo: "video", link: "#" }
    ]
  },

  // você pode adicionar outros cursos aqui
};

const urlParams = new URLSearchParams(window.location.search);
const cursoId = urlParams.get("id");
const curso = cursos[cursoId];

if (curso) {
  document.getElementById("curso-thumb").src = curso.capa;
  document.getElementById("curso-titulo").textContent = curso.titulo;
  document.getElementById("curso-professor").textContent = curso.professor;
  document.getElementById("curso-descricao").textContent = curso.descricao;

  const tagsEl = document.getElementById("curso-tags");
  curso.tags.forEach(tag => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    tagsEl.appendChild(span);
  });

  const aulasEl = document.getElementById("lista-aulas");
  curso.aulas.forEach((aula, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="aula-titulo">${i + 1}. ${aula.titulo}</span>
      ${aula.tipo === "video" ? `<a class="aula-link" href="${aula.link}">▶️ Assistir</a>` : ""}
      ${aula.tipo === "pdf" ? `<a class="aula-link" href="${aula.link}" download>📄 PDF</a>` : ""}
      ${aula.tipo === "zip" ? `<a class="aula-link" href="${aula.link}" download>📦 Arquivo</a>` : ""}
    `;
    aulasEl.appendChild(li);
  });
} else {
  document.querySelector(".curso-container").innerHTML = `<p>Curso não encontrado.</p>`;
}