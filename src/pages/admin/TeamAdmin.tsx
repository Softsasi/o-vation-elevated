import ResourceManager from "@/components/admin/ResourceManager";

const TeamAdmin = () => (
  <ResourceManager
    title="Team"
    table="team_members"
    displayField="name"
    fields={[
      { name: "name", label: "Name" },
      { name: "role", label: "Role" },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "photo_url", label: "Photo", type: "image" },
      { name: "order_index", label: "Order", type: "number" },
    ]}
  />
);
export default TeamAdmin;
