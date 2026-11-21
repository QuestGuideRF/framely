import { useEditor } from "@/app/providers/editor-provider";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/comComponents/ui/аккордеон";
import { ColorPicker } from "@/компоненты/ui/выбор цвета";
import { Input } from "@/компоненты/ui/вход";
import React from "react";
type Props = {
  handleOnChange: (e: any) => void;
  handleSelectChange: (value: string, property: string) => void;
};
function StrokeSettings({ handleOnChange }: Props) {
  const { state } = useEditor();
  return (
    <AccordionItem value="Stroke" className="px-2 py-0 граница-y-[1px]">
      <AccordionTrigger className="!no-подчеркивание">Stroke</AccordionTrigger>
      <AccordionContent className="гибкий гибкий кол px-1 зазор-4">
        <div>
          <p className="mb-2 отключенный текст на переднем плане">Border Width</p>
          <Input
            id="borderWidth"
            placeholder="0px"
            value={state.editor.selectedElement.styles.borderWidth || ""}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <p className="mb-2 отключенный текст на переднем плане">Border Color</p>
          <div className="гибкий зазор-2">
            <ColorPicker
              onChange={(color: string) => {
                const e = { target: { id: "borderColor", value: color } };
                handleOnChange(e);
              }}
              id="borderColor"
              value={state.editor.selectedElement.styles.borderColor || "#фффф"}
            />
          </div>
        </div>
        <div>
          <p className="mb-2 отключенный текст на переднем плане">Border Radius</p>
          <Input
            id="borderRadius"
            placeholder="0px"
            value={state.editor.selectedElement.styles.borderRadius || ""}
            onChange={handleOnChange}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
export default StrokeSettings;