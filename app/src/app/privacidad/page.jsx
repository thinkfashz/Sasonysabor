import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'Privacidad y uso de datos',
  description: 'Conoce qué datos usa Sazón y Sabor para gestionar pedidos, coordinar despacho o retiro y confirmar compras por WhatsApp.',
  alternates: { canonical: '/privacidad' },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="PRIVACIDAD Y CONSENTIMIENTO"
      title="Cómo usamos los datos de tu pedido"
      intro="Pedimos únicamente la información necesaria para preparar, coordinar y confirmar tu compra. La app no exige crear una cuenta para navegar por el catálogo."
    >
      <section>
        <h2>1. Datos que puedes entregarnos</h2>
        <p>Al realizar un pedido puedes proporcionar nombre, teléfono, productos seleccionados, cantidades, extras, notas del pedido y forma de confirmación. Si eliges despacho también podemos solicitar dirección, comuna y una referencia para facilitar la entrega.</p>
      </section>
      <section>
        <h2>2. Para qué los usamos</h2>
        <p>Usamos esos datos para preparar el pedido, contactar al cliente, coordinar retiro o despacho, informar disponibilidad y tiempos, solicitar o verificar los antecedentes necesarios para una transferencia y resolver incidencias relacionadas con la compra.</p>
      </section>
      <section>
        <h2>3. WhatsApp, Instagram y servicios externos</h2>
        <p>Cuando eliges confirmar por WhatsApp, la aplicación prepara un mensaje con el resumen que tú decides enviar. Al abrir WhatsApp o Instagram pasas a un servicio externo sujeto también a sus propias políticas de privacidad.</p>
      </section>
      <section>
        <h2>4. Almacenamiento del navegador</h2>
        <p>La experiencia utiliza almacenamiento local o de sesión del navegador para recordar estados necesarios del flujo, por ejemplo el consentimiento y el regreso desde WhatsApp. Este almacenamiento ayuda a mantener la continuidad de la compra y puede eliminarse desde la configuración del navegador.</p>
      </section>
      <section>
        <h2>5. Consentimiento y control</h2>
        <p>Antes de continuar con un pedido se muestra un aviso de consentimiento. Puedes revisar estas condiciones antes de enviar tus datos. Si quieres corregir información o pedir que no se siga usando para una gestión pendiente, contáctanos directamente por los canales indicados en esta página, sin perjuicio de las obligaciones legales que correspondan.</p>
      </section>
      <section>
        <h2>6. Seguridad y minimización</h2>
        <p>Procuramos limitar la información solicitada a lo necesario para el pedido. No debes enviar contraseñas, claves bancarias ni datos sensibles por el formulario o por WhatsApp.</p>
      </section>
    </LegalPage>
  );
}
