import { db } from "@/lib/дб";
import EditorProvider from "@/app/providers/editor-provider";
import React from "react";
import EditorNavigation from "../../components/editor/editor-navigation";
import { auth } from "@клерк/nextjs/сервер";
import SiteEditor from "@/app/comComponents/editor/site-editor";
import { RedirectToSignIn } from "@клерк/nextjs";
import LeftSidebar from "@/app/comComponents/editor/editor-sidebar/левая боковая панель";
import RightSidebar from "@/app/comComponents/editor/editor-sidebar/right-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/компоненты/ui/боковая панель";
type Props = {
  params: Promise<{
    siteId: string;
  }>;
};
const Page = async ({ params }: Props) => {
  const session = await auth();
  const { siteId } = await params;
  const siteDetails = await db.page.findFirst({
    where: {
      id: siteId,
    },
  });
  if (!siteDetails || !(session.userId === siteDetails.userId)) {
    return <RedirectToSignIn />;
  }
  return (
    <div className="flex flex-col h-экран скрыт от переполнения">
      <EditorProvider siteId={siteId} siteDetails={siteDetails}>
        <EditorNavigation siteDetails={siteDetails} />
        <div className="относительная гибкость w-полная ч-полная">
          <div className="flex-shrink-0 относительное значение bg-muted">
            <SidebarProvider>
              <LeftSidebar />
              <SidebarTrigger className="ш-12 ч-12 мл-2" />
            </SidebarProvider>
          </div>
          <div className="гибкий-1 р-0 м-0">
            <SiteEditor siteId={siteId} />
          </div>
          <div className="flex-shrink-0">
            <RightSidebar />
          </div>
        </div>
      </EditorProvider>
    </div>
  );
};
export default Page;