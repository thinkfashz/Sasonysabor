import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'Términos de compra y uso | Sazón y Sabor',
  description: 'Condiciones para pedidos, promociones, retiro, despacho, WhatsApp y transferencia en Sazón y Sabor.',
  alternates: { canonical: '/terminos' },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="TÉRMINOS DE COMPRA"
      title="Condiciones para realizar un pedido"
      intro="Estas condiciones buscan que el proceso sea claro antes de confirmar una compra. La visita al catálogo por sí sola no genera una obligación de compra."
    >
      <section>
        <h2>1. Formación y confirmación del pedido</h2>
        <p>El cliente selecciona productos, entrega los datos necesarios y revisa el resumen antes de confirmar. Un pedido enviado por la web o preparado para WhatsApp queda sujeto a confirmación de disponibilidad por parte de Sazón y Sabor. El local puede comunicar ajustes de stock, tiempo de preparación o despacho antes de aceptar definitivamente el pedido.</p>
      </section>
      <section>
        <h2>2. Precios y promociones</h2>
        <p>Se aplican los precios y promociones visibles al momento del pedido, salvo errores manifiestos que deban corregirse antes de la confirmación. Las promociones pueden tener stock, horario o vigencia limitada y no necesariamente son acumulables entre sí.</p>
      </section>
      <section>
        <h2>3. Retiro y despacho</h2>
        <p>En retiro, el cliente debe esperar la confirmación del local antes de dirigirse al punto de entrega. En despacho, la dirección debe ser correcta y accesible; el costo y tiempo estimado se informan o confirman antes de completar la gestión cuando corresponda.</p>
      </section>
      <section>
        <h2>4. WhatsApp y transferencia</h2>
        <p>La aplicación puede abrir WhatsApp con un resumen prellenado. El cliente decide si lo envía. Cuando se selecciona transferencia, los datos bancarios se coordinan por el canal oficial; la aplicación no inventa ni muestra cuentas bancarias que no hayan sido proporcionadas por Sazón y Sabor.</p>
      </section>
      <section>
        <h2>5. Exactitud de los datos</h2>
        <p>El cliente es responsable de revisar nombre, teléfono, dirección, productos, cantidades, extras y notas antes de confirmar. Si detectas un error, avisa lo antes posible para intentar corregirlo antes de iniciar la preparación.</p>
      </section>
      <section>
        <h2>6. Disponibilidad y tiempos</h2>
        <p>Los tiempos mostrados o comunicados son estimados y pueden variar por demanda, disponibilidad de ingredientes, clima, tránsito u otras circunstancias operativas. Cualquier cambio relevante debe ser informado al cliente.</p>
      </section>
      <section>
        <h2>7. Derechos del consumidor</h2>
        <p>Nada de estas condiciones pretende limitar los derechos irrenunciables que correspondan al consumidor conforme a la normativa chilena aplicable. Cuando exista una discrepancia entre estas condiciones y una norma imperativa, prevalece la norma.</p>
      </section>
    </LegalPage>
  );
}
