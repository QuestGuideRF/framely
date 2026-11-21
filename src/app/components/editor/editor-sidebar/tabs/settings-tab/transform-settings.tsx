import { useEditor } from "@/app/providers/editor-provider";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/comComponents/ui/аккордеон";
import { Input } from "@/компоненты/ui/вход";
import React from "react";
type Props = {
  handleOnChange: (e: any) => void;
  handleSelectChange: (value: string, property: string) => void;
};
function TransformSettings({ handleOnChange }: Props) {
  const { state } = useEditor();
  return (
    <AccordionItem value="Transform" className="px-2 py-0 граница-y-[1px]">
      <AccordionTrigger className="!no-подчеркивание">Transform</AccordionTrigger>
      <AccordionContent className="гибкий гибкий кол px-1 зазор-4">
        <div className="сетка Grid-cols-2 разрыв-4">
          <div>
            <p className="mb-2 отключенный текст на переднем плане">Width</p>
            <Input
              id="width"
              placeholder="100%"
              value={state.editor.selectedElement.styles.width || ""}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <p className="mb-2 отключенный текст на переднем плане">Height</p>
            <Input
              id="height"
              placeholder="auto"
              value={state.editor.selectedElement.styles.height || ""}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <p className="mb-2 отключенный текст на переднем плане">Margin</p>
          <div className="сетка Grid-cols-2 разрыв-2">
            <Input
              id="marginTop"
              placeholder="Top"
              value={state.editor.selectedElement.styles.marginTop || ""}
              onChange={handleOnChange}
            />
            <Input
              id="marginBottom"
              placeholder="Bottom"
              value={state.editor.selectedElement.styles.marginBottom || ""}
              onChange={handleOnChange}
            />
            <Input
              id="marginLeft"
              placeholder="Left"
              value={state.editor.selectedElement.styles.marginLeft || ""}
              onChange={handleOnChange}
            />
            <Input
              id="marginRight"
              placeholder="Right"
              value={state.editor.selectedElement.styles.marginRight || ""}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <p className="mb-2 отключенный текст на переднем плане">Padding</p>
          <div className="сетка Grid-cols-2 разрыв-2">
            <Input
              id="paddingTop"
              placeholder="Top"
              value={state.editor.selectedElement.styles.paddingTop || ""}
              onChange={handleOnChange}
            />{" "}
            <Input
              id="paddingBottom"
              placeholder="Bottom"
              value={state.editor.selectedElement.styles.paddingBottom || ""}
              onChange={handleOnChange}
            />
            <Input
              id="paddingLeft"
              placeholder="Left"
              value={state.editor.selectedElement.styles.paddingLeft || ""}
              onChange={handleOnChange}
            />
            <Input
              id="paddingRight"
              placeholder="Right"
              value={state.editor.selectedElement.styles.paddingRight || ""}
              onChange={handleOnChange}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
export default TransformSettings;