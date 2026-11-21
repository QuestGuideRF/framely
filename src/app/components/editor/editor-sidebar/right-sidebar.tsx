"использовать клиент";
import { useEditor } from "@/app/providers/editor-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
} from "@/компоненты/ui/боковая панель";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/реагировать-вкладки";
import SettingsTab from "./tabs/settings-tab";
import { Settings, Paintbrush } from "lucide-react";
import Link from "next/link";
const RightSidebar = () => {
  const { state } = useEditor();
  if (state.editor.previewMode) return null;
  return (
    <SidebarProvider open={state.editor.selectedElement.type !== null}>
      <Sidebar
        side="right"
        className={`mt-[65px] ${
          state.editor.selectedElement.type === null ? "translate-x-full" : ""
        }`}
      >
        <SidebarContent>
          <Tabs defaultValue="settings" className="flex-col flex-1">
            <SidebarGroup className="гибкий разрыв-4 p-2 граница-b граница-граница">
              <TabsList className="Гибкие элементы-центр оправдания-начать разрыв-4 bg-прозрачный">
                <TabsTrigger
                  value="settings"
                  className="w-auto h-10 p-0 data-[state=active]:bg-muted rounded-md hover:bg-muted/50 flex items-centergap-2 px-4 цвета перехода"
                >
                  <Settings className="ш-4 ч-4" />
                  <span className="text-xs">Settings</span>
                </TabsTrigger>
                <TabsTrigger
                  value="css"
                  className="w-auto h-10 p-0 data-[state=active]:bg-muted rounded-md flex items-centergap-2 px-4 hover:bg-muted/50 переходных цветов"
                >
                  <Paintbrush className="ш-4 ч-4" />
                  <span className="text-xs">Editor</span>
                </TabsTrigger>
              </TabsList>
            </SidebarGroup>
            <SidebarGroup className="flex-1">
              <TabsContent value="settings" className="h-full">
                <SidebarGroupLabel className="px-4 py-2">
                  Settings
                </SidebarGroupLabel>
                <SidebarGroupContent className="px-2 max-h-[calc(100vh-160px)] overflow-y-auto">
                  <SettingsTab />
                </SidebarGroupContent>
              </TabsContent>
              <TabsContent value="css" className="h-full">
                <SidebarGroupLabel className="px-4 py-2">
                  CSS Editor
                </SidebarGroupLabel>
                <SidebarGroupContent className="p-4">
                  Whoops, this feature hasn&apos;t been built yet. Come back
                  later or{" "}
                  <Link
                    href="https://dub.sh/framely"
                    className="text-blue-500 при наведении: подчеркнуть"
                  >
                    build it yourself.
                  </Link>{" "}
                  ;)
                </SidebarGroupContent>
              </TabsContent>
            </SidebarGroup>
          </Tabs>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};
export default RightSidebar;