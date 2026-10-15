export const THEME_KEY = "tema";

/** Script inline no <head>: aplica o tema salvo antes da primeira pintura (evita flash). */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}`;
