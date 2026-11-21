"использовать клиент";
import { useEditor } from "@/app/providers/editor-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/comComponents/ui/аккордеон";
import { Input } from "@/компоненты/ui/вход";
import TypographySettings from "./typography-settings";
import AppearanceSettings from "./appearance-settings";
import { Textarea } from "@/компоненты/ui/textarea";
import TransformSettings from "./transform-settings";
import StrokeSettings from "./stroke-settings";
import { categoriesWithCustomSettings } from "@/lib/константы";
const SettingsTab = () => {
  const { state, dispatch } = useEditor();
  const handleCustomValuesChange = (e: any) => {
    const settingProperty = e.target.id;
    const value = e.target.value;
    const styleObject = { [settingProperty]: value };
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };
  const handleOnChange = (e: any) => {
    const styleSettings = e.target.id;
    const value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };
  const handleSelectChange = (value: string, property: string) => {
    const styleObject = {
      [property]: value,
    };
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={[
        "Custom",
        "Transform",
        "Appearance",
        "Typography",
        "Stroke",
      ]}
    >
      <AccordionItem
        value="Custom"
        className="px-2 py-0"
        hidden={
          !categoriesWithCustomSettings.includes(
            state.editor.selectedElement.category,
          )
        }
      >
        <AccordionTrigger className="!no-подчеркнуть заглавную букву">
          {state.editor.selectedElement.category === "Text"
            ? "Text"
            : state.editor.selectedElement.type}
        </AccordionTrigger>
        <AccordionContent className="px-1">
          {(() => {
            if (Array.isArray(state.editor.selectedElement.content))
              return null;
            switch (state.editor.selectedElement.category) {
              case "Link":
                return (
                  <div className="гибкий флекс-col зазор-2">
                    <p className="text-muted-foreground">Link Path</p>
                    <Input
                      id="href"
                      placeholder="https:www.framely.site/editor"
                      onChange={handleCustomValuesChange}
                      value={state.editor.selectedElement.content.href}
                    />
                  </div>
                );
              case "Text":
                return (
                  <div className="гибкий флекс-col зазор-2">
                    <p className="text-muted-foreground">Content</p>
                    <Textarea
                      id="innerText"
                      placeholder="Введите текст..."
                      onChange={handleCustomValuesChange}
                      value={state.editor.selectedElement.content.innerText}
                    />
                  </div>
                );
              case "Basic":
                switch (state.editor.selectedElement.type) {
                  case "image":
                    return (
                      <div className="сетка сетка-строки-2 разрыв-2">
                        <div className="гибкий флекс-col зазор-2">
                          <p className="text-muted-foreground">Image Url</p>
                          <Input
                            id="imageUrl"
                            placeholder="Введите URL..."
                            onChange={handleCustomValuesChange}
                            value={
                              state.editor.selectedElement.content.imageUrl
                            }
                          />
                        </div>
                        <div className="гибкий флекс-col зазор-2">
                          <p className="text-muted-foreground">Alt Text</p>
                          <Input
                            id="altText"
                            placeholder="Введите альтернативный текст..."
                            onChange={handleCustomValuesChange}
                            value={state.editor.selectedElement.content.altText}
                          />
                        </div>
                      </div>
                    );
                  default:
                    return null;
                }
              default:
                return null;
            }
          })()}
        </AccordionContent>
      </AccordionItem>
      <TransformSettings
        handleOnChange={handleOnChange}
        handleSelectChange={handleSelectChange}
      />
      <AppearanceSettings
        handleOnChange={handleOnChange}
        handleSelectChange={handleSelectChange}
      />
      <TypographySettings
        handleOnChange={handleOnChange}
        handleSelectChange={handleSelectChange}
      />
      <StrokeSettings
        handleOnChange={handleOnChange}
        handleSelectChange={handleSelectChange}
      />
    </Accordion>
  );
};
export default SettingsTab;