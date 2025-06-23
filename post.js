//js da navbar lateral
  document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

  // Trigger para ativar/desativar botão postar baseado no conteúdo
  function triggerInput(textarea) {
    const btn = textarea.closest("section, .modal-content").querySelector(".post-btn");
    if (!btn) return;
    btn.disabled = textarea.value.trim().length === 0;
    if (!btn.disabled) btn.classList.add("enabled");
    else btn.classList.remove("enabled");
  }

  // Novos posts no feed
  const feedContainer = document.querySelector(".feed-container");

  // Para gerar IDs únicos simples
  function generateId() {
    return Math.floor(Math.random() * 1000000);
  }

  // Renderizar post (em HTML) - para adicionar novo post no feed
  function renderPost(post) {
    const postEl = document.createElement("article");
    postEl.className = "post";
    postEl.dataset.postId = post.id;

document.addEventListener("input", function (e) {
  if (e.target.tagName === "TEXTAREA") {
    e.target.style.height = "auto"; // reset
    e.target.style.height = e.target.scrollHeight + "px"; // aplica o novo
  }
});

    // Header do post
    const header = document.createElement("div");
    header.className = "post-header";

    const userInfo = document.createElement("div");
    userInfo.className = "user-info";
    const avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = post.avatar;
    avatar.alt = `Avatar do ${post.name}`;
    userInfo.appendChild(avatar);

    const nameUsername = document.createElement("div");
    nameUsername.className = "name-username";
    const nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.textContent = post.name;
    const userAndTime = document.createElement("span");
    userAndTime.className = "username-time";
    userAndTime.textContent = `@${post.username} • ${post.timeAgo}`;
    nameUsername.appendChild(nameSpan);
    nameUsername.appendChild(userAndTime);

    userInfo.appendChild(nameUsername);

    // Tags
    const tagsDiv = document.createElement("div");
    tagsDiv.className = "tags";
    tagsDiv.setAttribute("aria-label", "Tags do post");
    post.tags.forEach(tag => {
      const tagSpan = document.createElement("span");
      tagSpan.textContent = `#${tag}`;
      tagsDiv.appendChild(tagSpan);
    });

    header.appendChild(userInfo);
    header.appendChild(tagsDiv);

    postEl.appendChild(header);

    // Conteúdo do post
    const contentDiv = document.createElement("div");
    contentDiv.className = "post-content";
    const p = document.createElement("p");
    p.textContent = post.content;
    contentDiv.appendChild(p);
    postEl.appendChild(contentDiv);

    // Anexos
    if (post.attachments && post.attachments.length > 0) {
      const attachmentsDiv = document.createElement("div");
      attachmentsDiv.className = "attachments";
      post.attachments.forEach(att => {
        if (att.type === "image") {
          const img = document.createElement("img");
          img.className = "attachment-img";
          img.src = att.url;
          img.alt = att.alt || "Imagem anexa";
          attachmentsDiv.appendChild(img);
        } else if (att.type === "file") {
          const a = document.createElement("a");
          a.href = att.url;
          a.download = att.filename || "";
          a.className = "attachment-file-link";
          a.textContent = `📄 ${att.filename || "Arquivo"}`;
          attachmentsDiv.appendChild(a);
        }
      });
      postEl.appendChild(attachmentsDiv);
    }

    // Ações: comentários, likes, share
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "post-actions";

    const commentBtn = document.createElement("button");
    commentBtn.className = "comment-btn";
    commentBtn.setAttribute("aria-expanded", "false");
    commentBtn.setAttribute("aria-controls", `comments-${post.id}`);
    commentBtn.setAttribute("aria-label", "Comentários");
    commentBtn.innerHTML = `<i class="fa-regular fa-message"></i> <span class="comment-count">${post.comments.length}</span>`;

    const likeBtn = document.createElement("button");
    likeBtn.className = "like-btn";
    likeBtn.setAttribute("aria-pressed", "false");
    likeBtn.setAttribute("aria-label", "Curtir");
    likeBtn.innerHTML = `<i class="fa-regular fa-heart"> <span class="like-count">${post.likes}</span>`;

    const shareBtn = document.createElement("button");
    shareBtn.className = "share-btn";
    shareBtn.setAttribute("aria-label", "Compartilhar post");
    shareBtn.innerHTML = `<i class="fa-regular fa-reply"></i>`;

    actionsDiv.appendChild(commentBtn);
    actionsDiv.appendChild(likeBtn);
    actionsDiv.appendChild(shareBtn);

    postEl.appendChild(actionsDiv);

    // Seção de comentários (inicialmente escondida)
    const commentsSection = document.createElement("section");
    commentsSection.className = "comments-section";
    commentsSection.id = `comments-${post.id}`;
    commentsSection.setAttribute("aria-label", `Comentários do post ${post.id}`);
    commentsSection.setAttribute("role", "region");
    commentsSection.style.display = "none";

    // Renderiza os comentários
    post.comments.forEach(c => {
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";
      commentDiv.textContent = c;
      commentsSection.appendChild(commentDiv);
    });

    // Input para adicionar novo comentário
    const commentInputContainer = document.createElement("div");
    commentInputContainer.className = "comment-input-container";
    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.className = "comment-input";
    commentInput.placeholder = "Escreva um comentário...";
    commentInput.setAttribute("aria-label", "Escrever comentário");

    const commentSendBtn = document.createElement("button");
    commentSendBtn.className = "comment-send-btn";
    commentSendBtn.textContent = "Enviar";
    commentSendBtn.disabled = true;

    commentInputContainer.appendChild(commentInput);
    commentInputContainer.appendChild(commentSendBtn);
    commentsSection.appendChild(commentInputContainer);

    postEl.appendChild(commentsSection);

    // EVENTOS de botões

    // Mostrar/esconder comentários
    commentBtn.addEventListener("click", () => {
      const expanded = commentBtn.getAttribute("aria-expanded") === "true";
      commentBtn.setAttribute("aria-expanded", String(!expanded));
      if (expanded) {
        commentsSection.style.display = "none";
      } else {
        commentsSection.style.display = "flex";
      }
    });

    // Habilitar botão enviar comentário só se input tem texto
    commentInput.addEventListener("input", () => {
      commentSendBtn.disabled = commentInput.value.trim().length === 0;
    });

    // Enviar comentário (add ao post e atualizar contagem e tela)
    commentSendBtn.addEventListener("click", () => {
      const text = commentInput.value.trim();
      if (!text) return;

      post.comments.push(text);
      // Atualiza UI
      const newCommentDiv = document.createElement("div");
      newCommentDiv.className = "comment";
      newCommentDiv.textContent = text;
      commentsSection.insertBefore(newCommentDiv, commentInputContainer);

      commentInput.value = "";
      commentSendBtn.disabled = true;

      // Atualiza contador no botão
      commentBtn.querySelector(".comment-count").textContent = post.comments.length;
    });

    // Curtir/descurtir
   document.querySelectorAll(".like-btn").forEach((likeBtn) => {
  likeBtn.addEventListener("click", () => {
    const icon = likeBtn.querySelector("i");
    const countSpan = likeBtn.querySelector(".like-count");

    let liked = likeBtn.classList.contains("liked");
    let currentLikes = parseInt(countSpan.textContent) || 0;

    if (liked) {
      currentLikes--;
      likeBtn.classList.remove("liked");
      likeBtn.setAttribute("aria-pressed", "false");
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
      icon.style.color = ""; // remove a cor vermelha
    } else {
      currentLikes++;
      likeBtn.classList.add("liked");
      likeBtn.setAttribute("aria-pressed", "true");
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
      icon.style.color = "red"; // deixa o coração vermelho
    }

    countSpan.textContent = currentLikes;
  });
});

    // Compartilhar (simples: copia o texto do post para clipboard)
    shareBtn.addEventListener("click", () => {
      const textToCopy = `${post.name} (@${post.username}): ${post.content}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert("copiado para área de transferência!");
      });
    });

    return postEl;
  }

  // POSTS INICIAIS
  let posts = [
    {
      id: 1,
      name: "Guanabara",
      username: "curso_em_video",
      avatar: "https://i.pravatar.cc/48?u=pedro",
      timeAgo: "2h",
      tags: ["HTML", "Ajuda"],
      content: "Galera, alguém sabe como centralizar uma div no CSS usando Flexbox? 😭",
      attachments: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?auto=format&fit=crop&w=400&q=80",
          alt: "Imagem anexa",
        },
        {
          type: "file",
          url: "#",
          filename: "flexbox_tutorial.pdf",
        },
      ],
      likes: 10,
      comments: [
        "Eu também estou tentando entender isso!",
        "Flexbox é a melhor coisa para isso.",
        "Olha essa dica: https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
      ],
    },
    {
      id: 2,
      name: "Ribas",
      username: "di.ribas",
      avatar: "assets/ribas.webp",
      timeAgo: "3h",
      tags: ["Iniciante em Front-End", "Futebolistico"],
      content:
        "Eu não sei usar uma div 😭😭\nRecentemente entrei nesse mundo e estou apanhando pra entender a usar uma div",
      attachments: [
        {
          type: "image",
          url: "https://tenor.com/embed.js",
          alt: "meme",
        },
      ],
      likes: 5,
      comments: ["Vai dar certo! É questão de treino 😎", "Você vai pegar o jeito rápido!"],
    },
  ];

  // Renderiza posts iniciais
  function renderAllPosts() {
    // Remove posts atuais (exceto novo post )
    const postsOnPage = document.querySelectorAll("article.post");
    postsOnPage.forEach(p => p.remove());

    // Render posts
    posts.forEach(post => {
      const postElement = renderPost(post);
      feedContainer.appendChild(postElement);
    });
  }
  renderAllPosts();

  // Lógica botão de postar fixo no topo
  const postTextarea = document.getElementById("post-textarea");
  const postSubmitBtn = document.getElementById("post-submit-btn");
  const fileInput = document.getElementById("file-input");
  const attachmentsPreview = document.querySelector(".attachments-preview");

  postTextarea.addEventListener("input", () => triggerInput(postTextarea));

  // Upload arquivos (fixed)
  let fixedAttachments = [];
  fileInput.addEventListener("change", e => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        fixedAttachments.push({ type: "image", url, file });
      } else {
        fixedAttachments.push({ type: "file", filename: file.name, file });
      }
    });
    renderAttachmentsPreview(fixedAttachments, attachmentsPreview);
    triggerInput(postTextarea);
    fileInput.value = "";
  });

  // Renderiza anexos preview
  function renderAttachmentsPreview(list, container) {
    container.innerHTML = "";
    list.forEach((att, idx) => {
      if (att.type === "image") {
        const div = document.createElement("div");
        div.className = "attachment-thumb";
        const img = document.createElement("img");
        img.src = att.url;
        img.alt = "Anexo imagem";
        div.appendChild(img);

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "×";
        removeBtn.title = "Remover anexo";
        removeBtn.addEventListener("click", () => {
          fixedAttachments.splice(idx, 1);
          renderAttachmentsPreview(fixedAttachments, container);
        });
        div.appendChild(removeBtn);
        container.appendChild(div);
      } else {
        const div = document.createElement("div");
        div.className = "attachment-file";
        div.textContent = att.filename;

        const removeBtnFile = document.createElement("button");
        removeBtnFile.className = "remove-btn-file";
        removeBtnFile.textContent = "×";
        removeBtnFile.title = "Remover anexo";
        removeBtnFile.addEventListener("click", () => {
          fixedAttachments.splice(idx, 1);
          renderAttachmentsPreview(fixedAttachments, container);
        });
        div.appendChild(removeBtnFile);
        container.appendChild(div);
      }
    });
  }

  // Postar fixo no topo (add novo post)
  postSubmitBtn.addEventListener("click", () => {
    const content = postTextarea.value.trim();
    if (!content) return;

    const newPost = {
      id: generateId(),
      name: "Arrascaeta",
      username: "@arrasca.confeiteiro",
      avatar: "assets/OIP.webp",
      timeAgo: "Agora",
      tags: [], // Pode permitir a pessoa adicionar depois, ou ignorar
      content,
      attachments: fixedAttachments.map(att => {
        if (att.type === "image") return { type: "image", url: att.url, alt: "Anexo imagem" };
        else return { type: "file", url: "#", filename: att.filename };
      }),
      likes: 0,
      comments: [],
    };
    posts.unshift(newPost);

    // Limpa editor fixo
    postTextarea.value = "";
    fixedAttachments = [];
    renderAttachmentsPreview(fixedAttachments, attachmentsPreview);
    triggerInput(postTextarea);

    // Atualiza feed
    renderAllPosts();
  });

  // ======================== POPUP MODAL NOVO POST ==========================

  const modal = document.getElementById("modal-new-post");
  const openPopupBtn = document.getElementById("open-new-post-popup");
  const modalCloseBtn = modal.querySelector(".modal-close-btn");
  const popupTextarea = document.getElementById("popup-post-textarea");
  const popupSubmitBtn = document.getElementById("popup-post-submit-btn");
  const popupFileInput = document.getElementById("popup-file-input");
  const popupAttachmentsPreview = document.getElementById("popup-attachments-preview");

  let popupAttachments = [];

  // Abrir popup
  openPopupBtn.addEventListener("click", () => {
    modal.classList.add("active");
    popupTextarea.focus();
  });

  // Fechar popup
  modalCloseBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    resetPopup();
  });

  // Fechar clicando fora do conteúdo
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      resetPopup();
    }
  });

  // Toolbar popup
  modal.querySelectorAll(".editor-toolbar button").forEach(btn => {
    btn.addEventListener("click", () => {
      execCommand(btn.dataset.command);
    });
  });

  // Trigger botão postar popup
  popupTextarea.addEventListener("input", () => {
    popupSubmitBtn.disabled = popupTextarea.value.trim().length === 0;
    if (!popupSubmitBtn.disabled) popupSubmitBtn.classList.add("enabled");
    else popupSubmitBtn.classList.remove("enabled");
  });

  // Upload arquivos popup
  popupFileInput.addEventListener("change", e => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        popupAttachments.push({ type: "image", url, file });
      } else {
        popupAttachments.push({ type: "file", filename: file.name, file });
      }
    });
    renderAttachmentsPreview(popupAttachments, popupAttachmentsPreview);
    popupTextarea.dispatchEvent(new Event("input"));
    popupFileInput.value = "";
  });

  // Postar popup
  popupSubmitBtn.addEventListener("click", () => {
    const content = popupTextarea.value.trim();
    if (!content) return;

    const newPost = {
      id: generateId(),
      name: "Arrascaeta",
      username: "arrasca.confeiteiro",
      avatar: "assets/OIP.webp",
      timeAgo: "Agora",
      tags: [],
      content,
      attachments: popupAttachments.map(att => {
        if (att.type === "image") return { type: "image", url: att.url, alt: "Anexo imagem" };
        else return { type: "file", url: "#", filename: att.filename };
      }),
      likes: 0,
      comments: [],
    };
    posts.unshift(newPost);

    renderAllPosts();

    modal.classList.remove("active");
    resetPopup();
  });

  // Resetar popup
  function resetPopup() {
    popupTextarea.value = "";
    popupAttachments = [];
    renderAttachmentsPreview(popupAttachments, popupAttachmentsPreview);
    popupSubmitBtn.disabled = true;
    popupSubmitBtn.classList.remove("enabled");
  }



  