export interface BusinessNicheUIText {

    branchTaglineFallback: string;
    branchDescriptionFallback: string;

    whatsappInquiryMessage: string;

    bookingCtaTitle: string;
    bookingCtaSubtitle: string;

    customerNotesPlaceholder: string;

    customerNotesTitle: string;
    customerNotesSubtitle: string;

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

        customerNotesTitle:
            'Información adicional',

        customerNotesSubtitle:
            'Si lo deseas, comparte cualquier detalle que nos ayude a brindarte una mejor experiencia.',

        customerNotesPlaceholder:
            'Ej. Tengo piel sensible, prefiero productos sin fragancia, deseo un maquillaje natural...',
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

        customerNotesTitle:
            'Información adicional',

        customerNotesSubtitle:
            'Cuéntanos cualquier preferencia para preparar mejor tu cita.',

        customerNotesPlaceholder:
            'Ej. Quiero un desvanecido medio, conservar la barba, mostraré una foto de referencia...',
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

        customerNotesTitle:
            'Información adicional',

        customerNotesSubtitle:
            'Comparte cualquier detalle que nos ayude a ofrecerte un mejor resultado.',

        customerNotesPlaceholder:
            'Ej. Quiero conservar el largo, tengo el cabello teñido, deseo un cambio de look...',
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

        customerNotesTitle:
            'Información adicional',

        customerNotesSubtitle:
            'Si tienes alguna idea o preferencia, cuéntanos antes de tu cita.',

        customerNotesPlaceholder:
            'Ej. Quiero diseño francés, color nude, retiro de gel previo, inspiración de Pinterest...',
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

        customerNotesTitle:
            'Información adicional',

        customerNotesSubtitle:
            'Si deseas, puedes compartir información relevante antes de la sesión.',

        customerNotesPlaceholder:
            'Ej. Es mi primera consulta, me gustaría tratar ansiedad, tengo disponibilidad limitada...',
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

        customerNotesTitle:
            'Información adicional',

        customerNotesSubtitle:
            'Comparte cualquier información que pueda ser útil antes de tu consulta.',

        customerNotesPlaceholder:
            'Ej. Motivo de consulta, síntomas, medicamentos actuales o estudios recientes...',
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

        customerNotesTitle:
        'Información adicional',

        customerNotesSubtitle:
        'Comparte cualquier dato que pueda ayudarnos a atenderte mejor.',

        customerNotesPlaceholder:
        'Ej. Dolor en una muela, tratamiento previo, alergia a anestesia, sensibilidad dental...',
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

        customerNotesTitle:
        'Información adicional',

        customerNotesSubtitle:
        'Cuéntanos un poco sobre tu objetivo o situación actual.',

        customerNotesPlaceholder:
        'Ej. Quiero bajar de peso, aumentar masa muscular, tengo alergias o intolerancias alimentarias...',
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

        customerNotesTitle:
        'Información adicional',

        customerNotesSubtitle:
        'Si lo deseas, comparte información que pueda ayudarnos a prepararnos para tu sesión.',

        customerNotesPlaceholder:
        'Ej. Es mi primera sesión, estoy en rehabilitación, tengo una lesión reciente...',
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

        customerNotesTitle:
        'Información adicional',

        customerNotesSubtitle:
        'Cuéntanos cualquier preferencia para que disfrutes una mejor experiencia.',

        customerNotesPlaceholder:
        'Ej. Prefiero presión suave, tengo una lesión, estoy embarazada o deseo enfocarme en espalda...',
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

        customerNotesTitle:
        'Información adicional',

        customerNotesSubtitle:
        'Comparte cualquier información que nos ayude a personalizar tu entrenamiento.',

        customerNotesPlaceholder:
        'Ej. Busco bajar de peso, ganar músculo, tengo una lesión de rodilla o poca experiencia...',
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

        customerNotesTitle:
        'Información adicional',

        customerNotesSubtitle:
        'Si lo deseas, cuéntanos qué esperas aprender o mejorar.',

        customerNotesPlaceholder:
        'Ej. Soy principiante, quiero prepararme para un examen o reforzar un tema específico...',
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

        customerNotesTitle:
        'Información adicional',

        customerNotesSubtitle:
        'Comparte brevemente el tema que deseas abordar durante la asesoría.',

        customerNotesPlaceholder:
        'Ej. Necesito asesoría para mi empresa, resolver dudas fiscales o mejorar mis procesos...',
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

        customerNotesTitle:
        'Información adicional',

        customerNotesSubtitle:
        'Cuéntanos cuál es el objetivo que te gustaría trabajar.',

        customerNotesPlaceholder:
        'Ej. Quiero mejorar mi liderazgo, desarrollar hábitos o definir mis metas personales...',
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

        customerNotesTitle:
        'Información adicional',

        customerNotesSubtitle:
        'Cuéntanos cualquier detalle importante sobre tu mascota.',

        customerNotesPlaceholder:
        'Ej. Es nervioso con el secador, tiene alergias, requiere cuidado especial, prefiere que no le corten las uñas...',
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

        customerNotesTitle:
        'Información adicional',

        customerNotesSubtitle:
        'Comparte cualquier detalle que nos ayude a preparar mejor tu sesión.',

        customerNotesPlaceholder:
        'Ej. Tengo una idea de diseño, será mi primer tatuaje, llevaré una referencia o deseo cubrir otro tatuaje...',
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

        customerNotesTitle:
        'Información adicional',

        customerNotesSubtitle:
        'Si lo deseas, comparte cualquier información relevante antes de tu cita.',

        customerNotesPlaceholder:
        '¿Hay algo que debamos saber antes de atenderte?',
    }

};