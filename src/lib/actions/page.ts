"использовать сервер";
import { db } from "@/lib/дб";
import { auth } from "@клерк/nextjs/сервер";
import { Page } from "@prisma/клиент";
import { revalidateTag, unstable_cache } from "next/cache";
type SiteProps = {
  title: string;
  subdomain: string;
};
export async function createSite({ title, subdomain }: SiteProps) {
  const { userId } = await auth();
  if (!userId) return { success: false, msg: "Пользователь не вошел в систему" };
  const existingSite = await db.page.findFirst({
    where: { subdomain: subdomain },
  });
  if (existingSite) {
    return { success: false, msg: "Субдомен уже используется" };
  }
  try {
    const site = await db.page.create({
      data: { userId: userId, title: title, subdomain: subdomain },
    });
    return { success: true, site: site };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
    };
  }
}
type UpsertProps = Partial<Page>;
export async function upsertSite({
  id,
  title,
  subdomain,
  previewImage,
  content,
  visible,
}: UpsertProps) {
  const { userId } = await auth();
  if (!userId) return { success: false, msg: "Пользователь не вошел в систему" };
  const site = await db.page.update({
    where: { id: id, userId: userId },
    data: {
      id: id,
      title: title,
      subdomain: subdomain,
      previewImage: previewImage,
      content: content,
      visible: visible,
    },
  });
  revalidateTag(site.subdomain);
  return { success: true, site: site };
}
export async function deleteSite(siteId: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, msg: "Пользователь не вошел в систему" };
  try {
    const response = await db.page.delete({
      where: {
        id: siteId,
        userId: userId,
      },
    });
    revalidateTag(response.subdomain);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
    };
  }
}
export async function getSiteDetails(siteId: string) {
  try {
    const res = await db.page.findUnique({ where: { id: siteId } });
    if (!res) {
      throw new Error("Ошибка базы данных");
    }
    return { success: true, content: res.content };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
    };
  }
}
export const getSiteByDomain = async (subdomainName: string) => {
  try {
    const response = await unstable_cache(
      async () => {
        const response = await db.page.findUnique({
          where: {
            subdomain: subdomainName,
          },
        });
        return response;
      },
      [subdomainName],
      {
        revalidate: 900,
        tags: [subdomainName],
      }
    )();
    if (!response) {
      return { success: false, msg: "Сайт не найден" };
    }
    if (!response.visible) {
      const session = await auth();
      if (!(session.userId === response.userId))
        return {
          success: true,
          msg: "The requested site is private (for now), come back later!",
          private: true,
        };
      return { success: true, site: response };
    }
    return { success: true, site: response };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
    };
  }
};