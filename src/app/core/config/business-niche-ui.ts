export interface BusinessNicheUIText {

    branchTaglineFallback: string;
    branchDescriptionFallback: string;
    
    whatsappInquiryMessage: string;

    bookingCtaTitle: string;
    bookingCtaSubtitle: string;

}

export type BusinessNiche =

    | 'beauty'
    | 'barbershop'
    | 'hair_salon'
    | 'nails'
    | 'psychology'
    | 'medical'
    | 'dentist'
    | 'nutrition'
    | 'therapy'
    | 'spa'
    | 'fitness'
    | 'education'
    | 'consulting'
    | 'coaching'
    | 'pet_grooming'
    | 'tattoo'
    | 'other';


export const BUSINESS_NICHE_UI:
    Record<BusinessNiche, BusinessNicheUIText> = {

    beauty: {
        branchTaglineFallback:
            'Espacios dedicados a resaltar tu belleza y bienestar',

        branchDescriptionFallback:
            'Tratamientos y servicios profesionales diseñados para ayudarte a sentirte y verte increíble.',

        whatsappInquiryMessage:
            'Hola, me gustaría conocer más sobre sus tratamientos y servicios de belleza.',

        bookingCtaTitle:
            'Reserva tu próxima sesión de belleza',

        bookingCtaSubtitle:
            'Selecciona tu tratamiento, horario y confirma tu cita.',
    },

    barbershop: {
        branchTaglineFallback:
            'Tu próximo corte y estilo comienzan aquí',

        branchDescriptionFallback:
            'Experiencias de barbería pensadas para quienes valoran el estilo, detalle y cuidado personal.',

        whatsappInquiryMessage:
            'Hola, me gustaría agendar o conocer más sobre sus servicios de barbería.',

        bookingCtaTitle:
            'Reserva tu próximo corte',

        bookingCtaSubtitle:
            'Selecciona servicio, fecha y horario.',
    },

    hair_salon: {
        branchTaglineFallback:
            'Expertos en estilo, color y cuidado de tu cabello',

        branchDescriptionFallback:
            'Servicios profesionales enfocados en transformar, cuidar y resaltar tu estilo personal.',

        whatsappInquiryMessage:
            'Hola, me gustaría conocer más sobre sus servicios de estilismo, color y cuidado capilar.',

        bookingCtaTitle:
            'Agenda tu próxima cita de estilismo',

        bookingCtaSubtitle:
            'Elige el servicio ideal y reserva en minutos.',
    },

    nails: {
        branchTaglineFallback:
            'Diseño, cuidado y estilo profesional para tus uñas',

        branchDescriptionFallback:
            'Espacios creados para ofrecerte experiencias de cuidado, detalle y expresión personal.',

        whatsappInquiryMessage:
            'Hola, me gustaría recibir información sobre sus servicios de manicure, diseño y cuidado de uñas.',

        bookingCtaTitle:
            'Reserva tu próxima sesión de uñas',

        bookingCtaSubtitle:
            'Selecciona tu servicio favorito y agenda fácilmente.',
    },

    psychology: {
        branchTaglineFallback:
            'Espacios diseñados para acompañar tu bienestar emocional',

        branchDescriptionFallback:
            'Acompañamiento profesional enfocado en ayudarte a construir equilibrio, bienestar y crecimiento personal.',

        whatsappInquiryMessage:
            'Hola, me interesa recibir información sobre sus servicios de acompañamiento psicológico.',

        bookingCtaTitle:
            'Agenda tu próxima sesión',

        bookingCtaSubtitle:
            'Selecciona horario disponible y reserva tu espacio.',
    },

    medical: {
        branchTaglineFallback:
            'Atención médica profesional enfocada en tu bienestar',

        branchDescriptionFallback:
            'Servicios de salud diseñados para brindarte atención profesional, cercana y de confianza.',

        whatsappInquiryMessage:
            'Hola, me gustaría recibir información sobre sus servicios médicos y disponibilidad.',

        bookingCtaTitle:
            'Programa tu consulta médica',

        bookingCtaSubtitle:
            'Selecciona fecha disponible y agenda tu consulta.',
    },

    dentist: {
        branchTaglineFallback:
            'Cuidamos tu sonrisa con atención profesional y cercana',

        branchDescriptionFallback:
            'Tratamientos dentales enfocados en salud, prevención y bienestar integral para cada paciente.',

        whatsappInquiryMessage:
            'Hola, me gustaría conocer más sobre sus tratamientos dentales y disponibilidad.',

        bookingCtaTitle:
            'Agenda tu consulta dental',

        bookingCtaSubtitle:
            'Selecciona tratamiento o valoración y reserva tu cita.',
    },

    nutrition: {
        branchTaglineFallback:
            'Acompañamiento profesional hacia una vida más saludable',

        branchDescriptionFallback:
            'Planes y asesoría especializada orientados a mejorar tu alimentación y calidad de vida.',

        whatsappInquiryMessage:
            'Hola, me interesa conocer más sobre sus servicios de nutrición y asesoría alimenticia.',

        bookingCtaTitle:
            'Comienza tu plan de bienestar',

        bookingCtaSubtitle:
            'Reserva tu consulta nutricional en pocos pasos.',
    },

    therapy: {
        branchTaglineFallback:
            'Espacios diseñados para acompañar tu proceso de recuperación',

        branchDescriptionFallback:
            'Atención terapéutica enfocada en mejorar tu bienestar físico, emocional o proceso de rehabilitación.',

        whatsappInquiryMessage:
            'Hola, me gustaría recibir información sobre sus servicios terapéuticos y disponibilidad.',

        bookingCtaTitle:
            'Agenda tu próxima sesión terapéutica',

        bookingCtaSubtitle:
            'Selecciona horario disponible y reserva tu sesión.',
    },

    spa: {
        branchTaglineFallback:
            'Momentos de descanso, equilibrio y bienestar para ti',

        branchDescriptionFallback:
            'Experiencias diseñadas para ayudarte a desconectar, relajarte y recuperar tu bienestar integral.',

        whatsappInquiryMessage:
            'Hola, me gustaría conocer más sobre sus experiencias de relajación y tratamientos disponibles.',

        bookingCtaTitle:
            'Reserva tu momento de bienestar',

        bookingCtaSubtitle:
            'Selecciona tu experiencia y agenda tu sesión.',
    },

    fitness: {
        branchTaglineFallback:
            'Espacios creados para ayudarte a alcanzar tus objetivos',

        branchDescriptionFallback:
            'Entrenamiento, disciplina y acompañamiento profesional enfocados en tu desarrollo físico y bienestar.',

        whatsappInquiryMessage:
            'Hola, me interesa conocer sus programas de entrenamiento y disponibilidad.',

        bookingCtaTitle:
            'Programa tu entrenamiento',

        bookingCtaSubtitle:
            'Reserva tu sesión y comienza a avanzar hacia tu meta.',
    },

    education: {
        branchTaglineFallback:
            'Aprendizaje y crecimiento en un espacio diseñado para avanzar',

        branchDescriptionFallback:
            'Procesos de aprendizaje diseñados para desarrollar habilidades, conocimiento y crecimiento continuo.',

        whatsappInquiryMessage:
            'Hola, me interesa conocer más sobre sus programas de aprendizaje y servicios educativos.',

        bookingCtaTitle:
            'Reserva tu espacio de aprendizaje',

        bookingCtaSubtitle:
            'Selecciona curso o sesión y agenda fácilmente.',
    },

    consulting: {
        branchTaglineFallback:
            'Asesoría profesional enfocada en ayudarte a tomar mejores decisiones',

        branchDescriptionFallback:
            'Servicios especializados orientados a brindarte claridad, estrategia y acompañamiento profesional.',

        whatsappInquiryMessage:
            'Hola, me gustaría recibir información sobre sus servicios de consultoría y asesoría profesional.',

        bookingCtaTitle:
            'Agenda tu sesión de consultoría',

        bookingCtaSubtitle:
            'Selecciona horario y reserva tu asesoría profesional.',
    },

    coaching: {
        branchTaglineFallback:
            'Un espacio diseñado para impulsar tu crecimiento personal y profesional',

        branchDescriptionFallback:
            'Procesos personalizados orientados a ayudarte a desarrollar tu máximo potencial y avanzar con claridad.',

        whatsappInquiryMessage:
            'Hola, me interesa conocer más sobre sus procesos de coaching y acompañamiento personalizado.',

        bookingCtaTitle:
            'Da el siguiente paso en tu crecimiento',

        bookingCtaSubtitle:
            'Reserva tu sesión y comienza tu proceso de transformación.',
    },

    pet_grooming: {
        branchTaglineFallback:
            'Cuidado, higiene y bienestar para tu compañero favorito',

        branchDescriptionFallback:
            'Servicios especializados enfocados en el cuidado, comodidad e higiene de tu mascota.',

        whatsappInquiryMessage:
            'Hola, me gustaría recibir información sobre sus servicios de cuidado, estética e higiene para mascotas.',

        bookingCtaTitle:
            'Agenda el cuidado de tu mascota',

        bookingCtaSubtitle:
            'Selecciona servicio y reserva la próxima visita.',
    },

    tattoo: {
        branchTaglineFallback:
            'Espacios creativos donde tus ideas toman forma',

        branchDescriptionFallback:
            'Arte, creatividad y técnica profesional para convertir tus ideas en piezas únicas y personales.',

        whatsappInquiryMessage:
            'Hola, me gustaría conocer más sobre sus trabajos y agendar una cita de tatuaje.',

        bookingCtaTitle:
            'Reserva tu próxima sesión de tatuaje',

        bookingCtaSubtitle:
            'Agenda tu cita y comienza a convertir tu idea en arte.',
    },

    other: {
        branchTaglineFallback:
            'Un espacio preparado para brindarte atención profesional',

        branchDescriptionFallback:
            'Servicios profesionales diseñados para ofrecerte una experiencia confiable, cómoda y personalizada.',

        whatsappInquiryMessage:
            'Hola, me gustaría conocer más sobre sus servicios y disponibilidad.',

        bookingCtaTitle:
            'Agenda tu próxima cita',

        bookingCtaSubtitle:
            'Selecciona servicio, horario y confirma tu reserva.',
    }

};