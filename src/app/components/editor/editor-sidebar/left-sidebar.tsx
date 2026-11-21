"использовать клиент";
import { useEditor } from "@/app/providers/editor-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
  useSidebar,
} from "@/компоненты/ui/боковая панель";
import { Tabs, TabsContent } from "@radix-ui/реагировать-вкладки";
import ComponentsTab from "./tabs/components-tab";
import { Layers, PlusIcon, SidebarOpenIcon } from "lucide-react";
import TabList from "./tabs/index";
import LayersTab from "./tabs/layers-tab";
const LeftSidebar = () => {
  const { state } = useEditor();
  const { open, setOpen } = useSidebar();
  if (state.editor.previewMode) return null;
  return (
    <Sidebar side="left" className="мт-[65px]">
      <SidebarContent>
        <Tabs defaultValue="components" className="гибкий w-полный">
          <SidebarGroup className="гибкая термоусадка-0 w-16">
            <TabList
              tabs={[
                {
                  value: "components",
                  icon: <PlusIcon className="ш-4 ч-4" />,
                },
                {
                  value: "layers",
                  icon: <Layers className="ш-4 ч-4" />,
                },
              ]}
            />
          </SidebarGroup>
          <SidebarSeparator className="w-[1px] h-экран" />
          <SidebarGroup
            className={`w-полная длительность перехода-непрозрачности-200 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <TabsContent value="components">
              <SidebarGroupLabel>Components</SidebarGroupLabel>
              {}
              <SidebarGroupContent className="p-0 max-h-[calc(100vh-95px)] переполнение-y-авто">
                <ComponentsTab />
              </SidebarGroupContent>
            </TabsContent>
            <TabsContent value="layers">
              <SidebarGroupLabel>Layers</SidebarGroupLabel>
              <SidebarGroupContent className="p-0 max-h-[calc(100vh-95px)] переполнение-y-авто">
                <LayersTab />
              </SidebarGroupContent>
            </TabsContent>
          </SidebarGroup>
          {!open && (
            <SidebarGroupAction>
              <SidebarOpenIcon
                className="text-muted-foreground"
                onClick={() => {
                  setOpen(!open);
                }}
              />
            </SidebarGroupAction>
          )}
        </Tabs>
      </SidebarContent>
    </Sidebar>
  );
};
export default LeftSidebar;