"использовать клиент";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteSite } from "@/lib/действия/страница";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/comComponents/ui/выпадающее меню";
import { Button } from "@/компоненты/ui/кнопка";
import { MoreHorizontal, Globe, Clock, ExternalLink } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import { Page } from "@prisma/клиент";
import { Card, CardContent, CardHeader } from "@/компоненты/ui/карта";
import Link from "next/link";
import { getLink } from "@/lib/getLink";
function PageItem({ site }: { site: Page }) {
  const router = useRouter();
  const handleDelete = async (siteId: string) => {
    const result = await deleteSite(siteId);
    if (result.success) {
      toast.success("Success", { description: "Сайт успешно удален" });
    } else {
      toast.error("Error", { description: "Не удалось удалить сайт" });
    }
    router.refresh();
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between разрыв-4 группа пробелов-y-0">
        <div className="flex-1">
          <Link
            href={getLink({ subdomain: "editor", pathName: site.id })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <div className="гибкие элементы-центральный зазор-2">
              <h2 className="text-xl font-semibold transition-colors group-hover:text-primary">
                {site.title}
              </h2>
              <ExternalLink className="w-4 h-4 непрозрачность-0 переход-непрозрачность группа-hover: непрозрачность-50" />
            </div>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 при наведении:bg-accent/50"
            >
              <MoreHorizontal className="ш-5 ч-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem
              className="гибкий элемент-центр разрыв-2 текст-разрушительный"
              onClick={() => handleDelete(site.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm зазор-x-6 зазор-y-2 sm:gap-y-0 text-muted-foreground">
          <div className="гибкая группа элементов-центра разрыв-2 при наведении курсора: указатель курсора">
            <Globe className="flex-shrink-0 w-4 h-4 mt-1 group-hover:text-primary" />
            <Link
              href={getLink({ subdomain: site.subdomain })}
              target="_blank"
              rel="noopener noreferrer"
              className="group-hover:text-primary"
            >
              {site.subdomain}.framely.site
            </Link>
          </div>
          <div className="гибкие элементы-центральный зазор-2">
            <Clock className="flex-shrink-0 w-4 h-4 mt-1" />
            <span>Updated {formatTimeAgo(Number(site.updatedAt))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default PageItem;