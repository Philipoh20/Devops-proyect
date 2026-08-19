public class Panda {
    // Atributos (Variables de instancia)
    private String nombre;
    private int edad;
    private double peso;

    // Constructor
    public Panda(String nombre, int edad, double peso) {
        this.nombre = nombre;
        this.edad = edad;
        this.peso = peso;
    }

    // Métodos (Comportamientos)
    public void comerBambu() {
        System.out.println(nombre + " está comiendo delicioso bambú. ¡Qué rico!");
        this.peso += 0.5; // Comer aumenta su peso
    }

    public void dormir() {
        System.out.println(nombre + " se ha quedado dormido en una rama.");
    }

    public void mostrarInformacion() {
        System.out.println("--- Datos del Panda ---");
        System.out.println("Nombre: " + nombre);
        System.out.println("Edad: " + edad + " años");
        System.out.println("Peso: " + peso + " kg");
    }

    // Getters y Setters (Para acceder y modificar los datos de forma segura)
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public int getEdad() { return edad; }
    public void setEdad(int edad) { this.edad = edad; }

    public double getPeso() { return peso; }
    public void setPeso(double peso) { this.peso = peso; }
}
