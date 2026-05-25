import ResourceManager from "@/components/admin/ResourceManager";

const ServicesAdmin = () => (
  <ResourceManager
    title="Services"
    table="services"
    displayField="title"
    fields={[
      { name: "title", label: "Title" },
      { name: "slug", label: "Slug" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image_url", label: "Image", type: "image" },
      { name: "order_index", label: "Order", type: "number" },
    ]}
  />
);
export default ServicesAdmin;
