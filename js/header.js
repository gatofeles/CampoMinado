const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function defineTheme(){

  const currentTheme = localStorage.getItem('theme');

  if (currentTheme == 'dark') {
    document.body.classList.toggle('dark');
  } else if (currentTheme == 'light') {
    document.body.classList.toggle('light');
  }
}

function changeTheme(){

  let theme;

  if (document.body.classList[0] === 'light') {

    document.body.classList.remove('light');
    document.body.classList.add('dark');
    theme = 'dark';
  } else {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    theme = 'light';
  }

  localStorage.setItem('theme', theme);
}