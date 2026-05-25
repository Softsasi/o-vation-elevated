import ResourceManager from "@/components/admin/ResourceManager";

const TestimonialsAdmin = () => (
  <ResourceManager
    title="Testimonials"
    table="testimonials"
    displayField="author"
    fields={[
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "author", label: "Author" },
      { name: "author_role", label: "Author role" },
      { name: "order_index", label: "Order", type: "number" },
    ]}
  />
);
export default TestimonialsAdmin;
