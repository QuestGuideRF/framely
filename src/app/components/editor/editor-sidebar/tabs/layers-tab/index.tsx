import { useEditor } from "@/app/providers/editor-provider";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
type LayerItemProps = {
  element: any;
  depth?: number;
};
const LayerItem = ({ element, depth = 0 }: LayerItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { dispatch, state } = useEditor();
  const hasChildren =
    Array.isArray(element.content) && element.content.length > 0;
  const isSelected = state.editor.selectedElement.id === element.id;
  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state.editor.selectedElement.id === element.id) {
      setIsExpanded(!isExpanded);
    }
    dispatch({
      type: "CHANGE_SELECTED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  return (
    <div>
      <div
        className={cn(
          "flex items-center зазор-2 p-2 hover:bg-muted/50 округленный-lg переполнение группы курсора-указателя-y-auto",
          isSelected && "bg-muted"
        )}
        style={{ paddingLeft: `${depth * 12 + 4} пикселей` }}
        onClick={handleSelect}
      >
        {hasChildren ? (
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <ChevronDown className="ч-4 ж-4" />
            ) : (
              <ChevronRight className="ч-4 ж-4" />
            )}
          </button>
        ) : (
          <div className="w-4" />
        )}
        <span className={"text-sm flex-1 усечь непрозрачность перехода"}>
          {element.name}
        </span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {element.content.map((child: any) => (
            <LayerItem key={child.id} element={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
const LayersTab = () => {
  const { state } = useEditor();
  const rootElement = state.editor.elements[0];
  return (
    <div className="p-2">
      <LayerItem element={rootElement} />
    </div>
  );
};
export default LayersTab;