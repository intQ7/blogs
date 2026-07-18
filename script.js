/* ==================== 导航栏滚动效果 ==================== */
const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // 导航栏背景
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // 回到顶部按钮
  if (scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// 回到顶部
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==================== 移动端菜单切换 ==================== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// 点击导航链接后关闭菜单
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

/* ==================== 高亮当前导航项 ==================== */
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNav);

/* ==================== 数字递增动画 (IntersectionObserver) ==================== */
const statNumbers = document.querySelectorAll('.stat-number');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateNumber(entry.target, target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(num => observer.observe(num));

function animateNumber(el, target) {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + (target > 10 ? '+' : '');
  }, 25);
}

/* ==================== 技能条动画 ==================== */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0%';
      setTimeout(() => {
        entry.target.style.width = width;
      }, 200);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => {
  const w = fill.style.width;
  fill.style.width = '0%';
  fill.dataset.width = w;
  skillObserver.observe(fill);
});

/* ==================== 表单提交（演示） ==================== */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> 已发送！';
    btn.style.background = '#10b981';
    btn.style.borderColor = '#10b981';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
      contactForm.reset();
    }, 2000);
  }, 1500);
});

/* ==================== 页面加载动画 ==================== */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

/* ==================== 主题切换 ==================== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');
const html = document.documentElement;

if (themeToggle && themeIcon) {
  // 读取 localStorage，默认浅色
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'light') {
    html.classList.add('light');
    themeIcon.className = 'fas fa-sun';
  } else {
    html.classList.remove('light');
    themeIcon.className = 'fas fa-moon';
  }

  themeToggle.addEventListener('click', () => {
    html.classList.toggle('light');
    const isLight = html.classList.contains('light');
    themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}
