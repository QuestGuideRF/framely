import { SidebarTrigger } from "@/компоненты/ui/боковая панель";
import NewSiteModal from "./new-site-modal";
import { db } from "@/lib/дб";
import { auth } from "@клерк/nextjs/сервер";
import PageItem from "./site-item";
async function SiteList() {
  const { userId } = await auth();
  const sites = await db.page.findMany({
    where: { userId: userId || "" },
    orderBy: { updatedAt: "desc" },
  });
  return (
    <div className="ж-полный р-6">
      <SidebarTrigger className="ш-12 ч-12 мб-4" />
      <div className="Контейнер Flex Flex-Col Items-Center MX-Auto">
        <div className="flex flex-col w-full max-w-4xl space-y-8">
          <div className="Гибкое выравнивание элементов по центру между">
            <h1 className="шрифт text-3xl-жирный">Sites</h1>
            <NewSiteModal />
          </div>
          <div className="сетка Grid-cols-1 разрыв-4">
            {sites.length >= 1 ? (
              sites.map((site) => <PageItem key={site.id} site={site} />)
            ) : (
              <p className="mt-4 текстовый центр с отключенным текстом на переднем плане">
                It&apos;s pretty empty in here, create a site to get started.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SiteList;