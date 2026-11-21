"использовать клиент";
import { forwardRef, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/компоненты/ui/кнопка";
import { Button } from "@/компоненты/ui/кнопка";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/компоненты/ui/popover";
import { useForwardedRef } from "@/lib/форвард-ref";
interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}
const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);
    const parsedValue = useMemo(() => {
      return value || "#FFFFFF";
    }, [value]);
    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className={cn("блок мин-w-9", className)}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
            size="icon"
            style={{
              backgroundColor: parsedValue,
            }}
            variant="outline"
          >
            <div />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <HexColorPicker color={parsedValue} onChange={onChange} />
        </PopoverContent>
      </Popover>
    );
  }
);
ColorPicker.displayName = "ColorPicker";
export { ColorPicker };