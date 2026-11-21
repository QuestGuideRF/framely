import { TabsList, TabsTrigger } from "@/компоненты/ui/вкладки";
import { ReactNode } from "react";
interface TabListProps {
  tabs: {
    value: string;
    icon: ReactNode;
  }[];
}
const TabList = ({ tabs }: TabListProps) => {
  return (
    <TabsList className="flex flex-col items-center w-16 скрытое переполнение bg-прозрачный зазор-4 выравнивание равномерно h-подгонка">
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          className="w-10 h-10 p-0 данные-[state=active]:bg-muted"
        >
          {tab.icon}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
export default TabList;