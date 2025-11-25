import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string; // Breve descripción o una frase
}

const team: TeamMember[] = [
  {
    name: "Alexis Davila M",
    role: "Product Owner & Front-end Developer",
    image: "/avatar-de-perfil.png",
    description: "Impulsando la inteligencia artificial para un diagnóstico temprano."
  },
  {
    name: "Azariel Gonzales Rivera",
    role: "Data Scientist",
    image: "/avatar-de-perfil.png",
    description: "Transformando datos complejos en información clave para la salud."
  },
  {
    name: "Bruno Medina Agnini",
    role: "Data Scientist & UI/UX Designer",
    image: "/avatar-de-perfil.png",
    description: "Creando interfaces intuitivas y accesibles para todos."
  },
  {
    name: "Sebastian Timana Mendoza",
    role: "Data Engineer",
    image: "/avatar-de-perfil.png",
    description: "Diseñando experiencias que priorizan al usuario en cada interacción."
  }
];

const page= () => {
  return (
    <section className="bg-aiyuda-gradient py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado Principal */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Sobre <span className="text-[#18D2D5]">AIyuda</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            En AIyuda, estamos comprometidos con la misión de transformar la detección temprana de enfermedades mediante la fusión de la inteligencia artificial y la salud.
            Nuestra plataforma utiliza modelos avanzados de Machine Learning para analizar imágenes radiográficas, ofreciendo una herramienta de apoyo valiosa para profesionales médicos.
          </p>
        </div>

        {/* Sección de la Misión / Visión (Opcional, pero bueno para contexto) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-20 lg:mb-28 items-center">
          <div className="text-gray-800">
            <h3 className="text-4xl font-bold text-[#18D2D5] mb-6">Nuestra Misión</h3>
            <p className="text-lg leading-relaxed">
              Capacitar a los profesionales de la salud con tecnología predictiva precisa, haciendo los diagnósticos más rápidos y accesibles. Creemos firmemente que la innovación puede salvar vidas, y cada línea de código en AIyuda se escribe con ese propósito.
            </p>
          </div>
          <div className="relative h-64 sm:h-80 md:h-96 rounded-xl shadow-lg overflow-hidden">
            {/* Imagen ilustrativa para la misión */}
            <img
              src="https://7t.ai/wp-content/uploads/2023/10/ai-in-healthcare-1200x600.jpg" // Asegúrate de tener una imagen atractiva aquí
              alt="Misión de AIyuda: IA en la medicina"
              className="hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>

        {/* Sección del Equipo */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-10">Conoce a Nuestro <span className="text-purple-600">Equipo</span></h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            Somos un grupo apasionado de innovadores, desarrolladores y diseñadores unidos por la visión de un futuro más saludable gracias a la tecnología.
          </p>
        </div>

        {/* Grid de Miembros del Equipo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 text-center group"
            >
              <div className="relative w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden border-4 border-indigo-200 group-hover:border-indigo-400 transition-colors duration-300">
                <Image
                  src={member.image}
                  alt={`Foto de ${member.name}`}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                {member.name}
              </h4>
              <p className="text-[#18D2D5] font-medium text-lg mb-3">
                {member.role}
              </p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default page
