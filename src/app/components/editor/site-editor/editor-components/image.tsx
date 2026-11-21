"использовать клиент";
import { EditorElement } from "@/app/providers/editor-provider";
import ElementWrapper from "./element-wrapper";
import Image from "next/image";
import { AspectRatio } from "@/comComponents/ui/соотношение сторон";
type Props = {
  element: EditorElement;
};
function ImageElement({ element }: Props) {
  if (Array.isArray(element.content)) {
    return null;
  }
  const width = element.styles?.width
    ? parseInt(element.styles.width as string)
    : 250;
  const height = element.styles?.height
    ? parseInt(element.styles.height as string)
    : 140;
  const hasCustomSize = element.styles?.width || element.styles?.height;
  return (
    <ElementWrapper element={element} className="!w-подходит !h-подходит">
      <div style={{ width, height }} className="мин-ш-[250 пикселей]">
        <AspectRatio
          ratio={16 / 9}
          className="bg-muted rounded-lg относительный переход-все"
        >
          {element.content.imageUrl?.trim() && (
            <Image
              src={element.content.imageUrl}
              alt={
                element.content.altText ||
                "Изображение загружено через конструктор сайтов Framely"
              }
              className="object-cover"
              style={element.styles}
              fill={!hasCustomSize}
              width={hasCustomSize ? width : undefined}
              height={hasCustomSize ? height : undefined}
            />
          )}
        </AspectRatio>
      </div>
    </ElementWrapper>
  );
}
export default ImageElement;