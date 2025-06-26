//js da navbar lateral
  document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});


//js do ngc de pesquisar e filtrar os cursos
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const filterSelect = document.getElementById("filterSelect");
  const allCourses = document.querySelectorAll(".courses-grid .course-card");

  function filtrarCursos() {
    const termo = searchInput.value.toLowerCase();
    const filtro = filterSelect.value.toLowerCase();

    allCourses.forEach(card => {
      const titulo = card.dataset.title.toLowerCase();
      const tags = card.dataset.tags.toLowerCase();

      const correspondeBusca = titulo.includes(termo) || tags.includes(termo);
      const correspondeFiltro = filtro === "" || tags.includes(filtro);

      if (correspondeBusca && correspondeFiltro) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }




  
  searchInput.addEventListener("input", filtrarCursos);
  filterSelect.addEventListener("change", filtrarCursos);
});
//variaveisdo modal
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("courseModal");
  const closeBtn = modal.querySelector(".close-btn");
  const modalTitle = document.getElementById("modalTitle");
  const modalInstructor = document.getElementById("modalInstructor");
  const modalDesc = document.getElementById("modalDesc");
  const modalTags = document.getElementById("modalTags");
  const modalThumb = document.querySelector(".modal-thumb");
  const modalActionBtn = document.getElementById("modalActionBtn");

//js do modal
  // abre modal e preenche dados
  document.querySelectorAll(".course-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".course-card");
      modalTitle.textContent = card.querySelector(".course-title").textContent;
      modalInstructor.textContent = card.querySelector(".course-instructor").textContent;
      modalThumb.src = card.querySelector(".course-thumb").src;
      modalThumb.alt = card.querySelector(".course-thumb").alt;
document.getElementById('modal-course-description').textContent = curso.descricao;

      // descrição fixa ou pode vir do dataset
      modalDesc.textContent = "Aqui vai a descrição detalhada do curso, você pode expandir essa área para conter texto, vídeos e outros recursos.";

      // limpar tags antigas e botar nova
      modalTags.innerHTML = "";
      card.querySelectorAll(".course-tags span").forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag.textContent;
        modalTags.appendChild(span);
      });

      // arruma o texto (acessr ou comprar)
      modalActionBtn.textContent = btn.textContent.includes("Acessar") ? "Acessar Curso" : "Comprar Curso";

      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden"; // trava scroll fundo
    });
  });

  // fecha o modal
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto"; // libera scroll fundo
  });

  // fecha modal quando clica pra fora
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalThumb = modal.querySelector(".modal-thumb");
  const modalTitle = modal.querySelector(".modal-title");
  const modalInstructor = modal.querySelector(".modal-instructor");
  const modalTags = modal.querySelector(".modal-tags");
  const modalActionBtn = modal.querySelector(".modal-action-btn");
  const closeModalBtn = modal.querySelector(".close-btn");

  const courseBtns = document.querySelectorAll(".course-btn");

  courseBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".course-card");
      const tipo = btn.dataset.tipo;

      // Pega dados do card
      modalThumb.src = card.querySelector(".course-thumb").src;
      modalTitle.textContent = card.querySelector(".course-title").textContent;
      modalInstructor.textContent = card.querySelector(".course-instructor").textContent;

      // Tags
      const tags = Array.from(card.querySelectorAll(".course-tags span")).map(span => span.textContent);
      modalTags.innerHTML = "";
      tags.forEach(tag => {
        const tagEl = document.createElement("span");
        tagEl.textContent = tag;
        modalTags.appendChild(tagEl);
      });

      // Botão do modal
      if (tipo === "meu") {
        modalActionBtn.textContent = "Acessar Curso";
        modalActionBtn.onclick = () => {
          const cursoId = modalTitle.textContent.toLowerCase().replace(/\s+/g, '-');
          window.location.href = `curso.html?id=${encodeURIComponent(cursoId)}`;
        };
      } else {
        modalActionBtn.textContent = "Comprar curso";
        modalActionBtn.onclick = () => {
          alert("o processo de compra ainda não foi implementado");
        };
      }

      modal.style.display = "flex";
    });
  });

  // Fechar modal
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});
