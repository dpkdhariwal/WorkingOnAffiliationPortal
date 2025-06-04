import { useState } from "react";
import Form from "react-bootstrap/Form";

const CategorizedCheckboxList = ({ step }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const items = [
    {
      category: "Machinery",
      options: [
        { label: "Excavator", value: "1" },
        { label: "Bulldozer", value: "2" },
      ],
    },
    {
      category: "Tools",
      options: [
        { label: "Hammer", value: "3" },
        { label: "Screwdriver", value: "4" },
      ],
    },
    {
      category: "Equipment",
      options: [
        { label: "Safety Helmet", value: "5" },
        { label: "Gloves", value: "6" },
      ],
    },
  ];

  const handleCheck = (e) => {
    const { value, checked } = e.target;
    setSelectedItems((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const filteredItems = items
    .map((group) => ({
      ...group,
      options: group.options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((group) => group.options.length > 0);

  return (
    <Form.Group controlId="machinerySelect">
      <Form.Label>Select Machinery/Tools/Equipment for kkkk</Form.Label>

      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-2"
      />

      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #ced4da",
          padding: "10px",
          borderRadius: "0.375rem",
        }}
      >
        {filteredItems.length === 0 && (
          <div className="text-muted">No matches found.</div>
        )}

        {filteredItems.map((group, index) => (
          <div key={index}>
            <strong>{group.category}</strong>
            {group.options.map((option) => (
              <Form.Check
                key={option.value}
                type="checkbox"
                label={option.label}
                name="equipment"
                value={option.value}
                onChange={handleCheck}
                checked={selectedItems.includes(option.value)}
              />
            ))}
            <hr />
          </div>
        ))}
      </div>

      {/* Custom validation message */}
      {selectedItems.length != 6 && (
        <div className="text-danger mt-2">Fill One by One or check all</div>
      )}
    </Form.Group>
  );
};

export default CategorizedCheckboxList;
