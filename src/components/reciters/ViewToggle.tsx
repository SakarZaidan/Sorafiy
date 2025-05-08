import * as React from "react";
import { Button } from "@/components/ui/button"; // Assuming ShadCN UI path

interface ViewToggleProps {
  currentView: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant={currentView === "grid" ? "default" : "outline"}
        onClick={() => onViewChange("grid")}
      >
        {/* Replace with Grid Icon */}
        Grid
      </Button>
      <Button
        variant={currentView === "list" ? "default" : "outline"}
        onClick={() => onViewChange("list")}
      >
        {/* Replace with List Icon */}
        List
      </Button>
    </div>
  );
};

export default ViewToggle;
