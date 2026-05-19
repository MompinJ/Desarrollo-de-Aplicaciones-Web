const campo = document.getElementById("passes");
const icono = document.getElementById("eye-icon");

const ICONO_VISIBLE = "🙉";
const ICONO_OCULTO = "👁️";

function alternarVisibilidad() {
  const oculto = campo.type === "password";
  campo.type = oculto ? "text" : "password";
  icono.textContent = oculto ? ICONO_VISIBLE : ICONO_OCULTO;
}

icono.addEventListener("click", alternarVisibilidad);
