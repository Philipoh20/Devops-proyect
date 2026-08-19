class Perro {
	static razasConocidas = [
		"Labrador",
		"Pastor alemán",
		"Golden retriever",
		"Bulldog",
		"Beagle",
		"Chihuahua",
		"Poodle",
		"Mestizo"
	];

	constructor({
		nombre,
		raza = "Mestizo",
		edad = 0,
		peso = 1,
		color = "Desconocido",
		energia = 70,
		vacunado = false
	} = {}) {
		if (!nombre || typeof nombre !== "string") {
			throw new Error("El perro debe tener un nombre válido.");
		}

		this.nombre = nombre.trim();
		this.raza = raza;
		this.edad = this.validarNumero(edad, 0, 30, "edad");
		this.peso = this.validarNumero(peso, 0.1, 150, "peso");
		this.color = color;
		this.energia = this.validarNumero(energia, 0, 100, "energía");
		this.vacunado = Boolean(vacunado);
		this.hambre = 30;
		this.sed = 20;
		this.felicidad = 80;
		this.salud = 100;
		this.historial = [];
		this.habilidades = new Set(["obediencia básica"]);
		this.registrarEvento("El perro fue creado");
	}

	validarNumero(valor, minimo, maximo, campo) {
		const numero = Number(valor);
		if (!Number.isFinite(numero) || numero < minimo || numero > maximo) {
			throw new Error(`La ${campo} debe estar entre ${minimo} y ${maximo}.`);
		}
		return numero;
	}

	registrarEvento(descripcion) {
		this.historial.push({
			fecha: new Date().toISOString(),
			descripcion
		});
	}

	alimentar(cantidad = 20) {
		const porcion = this.validarNumero(cantidad, 1, 100, "porción");
		this.hambre = Math.max(0, this.hambre - porcion);
		this.sed = Math.min(100, this.sed + porcion / 4);
		this.felicidad = Math.min(100, this.felicidad + 5);
		this.registrarEvento(`Comió ${porcion} unidades de alimento`);
		return `${this.nombre} ha comido y ahora tiene ${this.hambre}% de hambre.`;
	}

	beber(cantidad = 20) {
		const agua = this.validarNumero(cantidad, 1, 100, "cantidad de agua");
		this.sed = Math.max(0, this.sed - agua);
		this.registrarEvento(`Bebió ${agua} unidades de agua`);
		return `${this.nombre} bebió agua.`;
	}

	pasear(minutos = 30) {
		const tiempo = this.validarNumero(minutos, 1, 240, "duración del paseo");
		const consumo = Math.min(35, tiempo / 4);
		this.energia = Math.max(0, this.energia - consumo);
		this.hambre = Math.min(100, this.hambre + tiempo / 8);
		this.sed = Math.min(100, this.sed + tiempo / 6);
		this.felicidad = Math.min(100, this.felicidad + 15);
		this.registrarEvento(`Salió a pasear durante ${tiempo} minutos`);
		return `${this.nombre} disfrutó su paseo.`;
	}

	dormir(horas = 8) {
		const descanso = this.validarNumero(horas, 1, 24, "horas de sueño");
		this.energia = Math.min(100, this.energia + descanso * 8);
		this.salud = Math.min(100, this.salud + 2);
		this.registrarEvento(`Durmió durante ${descanso} horas`);
		return `${this.nombre} descansó correctamente.`;
	}

	jugar(juego = "buscar la pelota", minutos = 15) {
		const tiempo = this.validarNumero(minutos, 1, 120, "duración del juego");
		if (this.energia < 10) return `${this.nombre} está demasiado cansado para jugar.`;
		this.energia = Math.max(0, this.energia - tiempo / 5);
		this.felicidad = Math.min(100, this.felicidad + 20);
		this.hambre = Math.min(100, this.hambre + tiempo / 10);
		this.registrarEvento(`Jugó a ${juego} durante ${tiempo} minutos`);
		return `${this.nombre} jugó a ${juego} y está feliz.`;
	}

	entrenar(habilidad) {
		if (typeof habilidad !== "string" || !habilidad.trim()) {
			throw new Error("Indica una habilidad válida.");
		}
		const nuevaHabilidad = habilidad.trim().toLowerCase();
		this.habilidades.add(nuevaHabilidad);
		this.energia = Math.max(0, this.energia - 10);
		this.felicidad = Math.min(100, this.felicidad + 8);
		this.registrarEvento(`Aprendió la habilidad: ${nuevaHabilidad}`);
		return `${this.nombre} aprendió ${nuevaHabilidad}.`;
	}

	vacunar() {
		this.vacunado = true;
		this.salud = Math.min(100, this.salud + 5);
		this.registrarEvento("Recibió sus vacunas");
		return `${this.nombre} está vacunado.`;
	}

	revisarSalud() {
		if (this.hambre > 85 || this.sed > 85) this.salud -= 5;
		if (this.energia < 10) this.salud -= 2;
		this.salud = Math.max(0, Math.min(100, this.salud));
		this.registrarEvento(`Revisión de salud: ${this.salud}%`);
		return this.salud;
	}

	cumplirAnios() {
		this.edad += 1;
		this.salud = Math.max(0, this.salud - 3);
		this.registrarEvento(`Cumplió ${this.edad} años`);
	}

	obtenerEstado() {
		return {
			nombre: this.nombre,
			raza: this.raza,
			edad: this.edad,
			peso: this.peso,
			color: this.color,
			energia: Math.round(this.energia),
			hambre: Math.round(this.hambre),
			sed: Math.round(this.sed),
			felicidad: Math.round(this.felicidad),
			salud: Math.round(this.salud),
			vacunado: this.vacunado,
			habilidades: [...this.habilidades]
		};
	}

	emitirSonido() {
		return `${this.nombre} dice: ¡Guau, guau!`;
	}

	toJSON() {
		return this.obtenerEstado();
	}
}

module.exports = Perro;
