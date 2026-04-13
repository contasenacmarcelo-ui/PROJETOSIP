// cliente.js — abre uma "telinha" preta com nome e e-mail do usuário
(function () {
    const btnProfile = document.getElementById('btn-profile');
    const modal = document.getElementById('profileModal');
    const closeBtn = document.getElementById('profileClose');
    const nameEl = document.getElementById('profileName');
    const emailEl = document.getElementById('profileEmail');

    function abrirModal() {
        // tentar obter usuário logado
        let user = null;
        try {
            user = JSON.parse(localStorage.getItem('loggedInUser'));
        } catch (e) {
            console.error('Erro lendo loggedInUser:', e);
        }

        // se não houver loggedInUser, tentar pegar primeiro usuário salvo (fallback)
        if (!user) {
            try {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                if (users && users.length > 0) {
                    user = users[0];
                }
            } catch (e) {
                console.error('Erro lendo users:', e);
            }
        }

        if (user) {
            nameEl.textContent = user.name || '--';
            emailEl.textContent = user.email || '--';
        } else {
            nameEl.textContent = '--';
            emailEl.textContent = '--';
        }

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    }

    function fecharModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }

    if (btnProfile) {
        btnProfile.addEventListener('click', function (e) {
            e.preventDefault();
            abrirModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            fecharModal();
        });
    }

    // fechar ao clicar fora do conteúdo
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) fecharModal();
        });
    }
})();
