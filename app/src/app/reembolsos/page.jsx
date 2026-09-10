import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'Cambios, cancelaciones y reembolsos | Sazón y Sabor',
  description: 'Política de cambios, cancelaciones y reembolsos para alimentos preparados y pedidos de Sazón y Sabor.',
  alternates: { canonical: '/reembolsos' },
};

export default function RefundPage() {
  return (
    <LegalPage
      eyebrow="CAMBIOS Y REEMBOLSOS"
      title="Política para alimentos preparados"
      intro="Nuestros pedidos contienen alimentos perecibles y, en muchos casos, se preparan especialmente para cada cliente. Por eso distinguimos entre un cambio de opinión y un problema real con el pedido."
    >
      <section>
        <h2>1. Cancelación antes de preparar</h2>
        <p>Si necesitas cancelar o corregir un pedido, comunícate de inmediato por WhatsApp. Si la preparación todavía no ha comenzado, intentaremos detener o modificar el pedido según disponibilidad y estado de la operación.</p>
      </section>
      <section>
        <h2>2. Una vez iniciada la preparación</h2>
        <p>Por tratarse de alimentos preparados, perecibles y/o personalizados, no se realizan reembolsos por mero arrepentimiento o cambio de opinión una vez que la preparación del pedido ya fue iniciada, en la medida permitida por la normativa aplicable y siempre que esta condición haya sido informada previamente.</p>
      </section>
      <section>
        <h2>3. Casos que sí revisamos</h2>
        <p>La regla anterior no elimina tus derechos cuando existe un incumplimiento. Si recibes un producto distinto al confirmado, incompleto, en condiciones inadecuadas, con un cobro incorrecto, o si el pedido confirmado no se entrega por una causa atribuible al proveedor, contáctanos lo antes posible. Revisaremos el caso y aplicaremos la solución que corresponda, que puede incluir reposición, corrección o devolución de dinero según la situación y la ley.</p>
      </section>
      <section>
        <h2>4. Pedidos no retirados o dirección incorrecta</h2>
        <p>Si el pedido ya fue preparado y el cliente no se presenta a retirarlo, no puede ser contactado o proporciona una dirección incorrecta que impide la entrega, se revisará el caso considerando que el alimento ya fue elaborado y puede perder su aptitud para una nueva venta.</p>
      </section>
      <section>
        <h2>5. Cómo reportar un problema</h2>
        <p>Escríbenos por el WhatsApp oficial indicando tu nombre, detalle del pedido, hora aproximada y una descripción clara del problema. Cuando sea útil, puedes adjuntar una fotografía del producto recibido. No compartas claves, contraseñas ni datos bancarios sensibles.</p>
      </section>
      <section>
        <h2>6. Derechos legales</h2>
        <p>Esta política no pretende excluir ni limitar derechos irrenunciables del consumidor. Los productos perecibles pueden estar sujetos a reglas especiales respecto del retracto, pero ello no elimina las obligaciones del proveedor de respetar lo ofrecido, el precio, la calidad, la seguridad y las demás garantías que correspondan.</p>
      </section>
    </LegalPage>
  );
}
