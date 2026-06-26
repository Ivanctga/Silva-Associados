// 1. Atualizar ano automaticamente no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Efeito visual no Header ao rolar a página
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }
});

// 3. Máscara para o campo de Telefone/WhatsApp
const phoneInput = document.getElementById('telefone');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}

// 4. Simulação de Envio do Formulário de Contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o recarregamento da página
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        // Estado de "Carregando"
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando solicitação...';
        btn.disabled = true;
        btn.style.opacity = '0.8';
        
        // Simula um delay de processamento (API fictícia)
        setTimeout(() => {
            // Mostra mensagem de sucesso
            document.getElementById('form-success').style.display = 'block';
            
            // Reseta o formulário
            this.reset();
            
            // Volta o botão ao estado normal
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.opacity = '1';
            
            // Oculta a mensagem de sucesso após 5 segundos
            setTimeout(() => {
                document.getElementById('form-success').style.display = 'none';
            }, 5000);
        }, 1500); // 1.5 segundos de simulação
    });
}

// 5. Animação de Scroll (Revelar elementos conforme rola a página)
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100; // Distância antes de revelar

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Executa a função no scroll da janela
window.addEventListener("scroll", reveal);
// Dispara a função logo ao carregar a página (com um pequeno delay) para revelar o topo
setTimeout(reveal, 100);

// 6. Menu Mobile Toggle
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        // Alternar ícone (hambúrguer / X)
        const icon = menuToggle.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });
}

// 7. Scroll to Top e WhatsApp Flutuante
const scrollToTopBtn = document.getElementById('scrollToTop');
const whatsappBtn = document.querySelector('.whatsapp-float');

// Mostrar/ocultar botões dependendo do scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if(scrollToTopBtn) scrollToTopBtn.classList.add('show');
        if(whatsappBtn) whatsappBtn.classList.add('show');
    } else {
        if(scrollToTopBtn) scrollToTopBtn.classList.remove('show');
        if(whatsappBtn) whatsappBtn.classList.remove('show');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 8. Destaque do Menu Ativo no Scroll (Smart Navigation)
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        // Compensar a altura do header fixo (aprox. 80px) + margem de erro
        const sectionTop = section.offsetTop - 100;
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current) && current !== "") {
            link.classList.add("active");
        }
    });
});
