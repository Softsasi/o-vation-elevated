import ResourceManager from "@/components/admin/ResourceManager";

const ExperiencesAdmin = () => (
  <ResourceManager
    title="Experiences"
    table="experiences"
    displayField="title"
    fields={[
      { name: "title", label: "Title" },
      { name: "category", label: "Category" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image_url", label: "Image", type: "image" },
      { name: "order_index", label: "Order", type: "number" },
    ]}
  />
);
export default ExperiencesAdmin;
