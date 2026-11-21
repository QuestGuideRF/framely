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
function AppearanceSettings({ handleOnChange }: Props) {
  const { state } = useEditor();
  return (
    <AccordionItem value="Appearance" className="px-2 py-0 граница-y-[1px]">
      <AccordionTrigger className="!no-подчеркивание">Appearance</AccordionTrigger>
      <AccordionContent className="гибкий гибкий кол px-1 зазор-4">
        <div className="w-full">
          <p className="mb-2 отключенный текст на переднем плане">Fill Color</p>
          <div className="гибкое пространство-x-2">
            <ColorPicker
              onChange={(color: string) => {
                const e = { target: { id: "backgroundColor", value: color } };
                handleOnChange(e);
              }}
              id="backgroundColor"
              value={
                state.editor.selectedElement.styles.backgroundColor || "#фффф"
              }
            />
            <Input
              id="backgroundCOlor"
              type="text"
              maxLength={7}
              value={
                state.editor.selectedElement.styles.backgroundColor || "#фффф"
              }
              onChange={handleOnChange}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
export default AppearanceSettings;