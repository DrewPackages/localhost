import { List } from "antd";
import { DappMarketplaceDescription } from "entities/dapp";
import { DappsList, getMarketplacePage } from "features/marketplace";
import {
  selectDappsPage,
  selectIsMarketplacePageLoading,
} from "features/marketplace/model/slice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "shared/model/hooks";

export default function MarketplacePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMarketplacePage({ pageNum: 0, pageSize: 15 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedPage] = useState(0);

  const selectDapp = useCallback(
    (dapp: DappMarketplaceDescription) => {
      navigate(`/dapp/${dapp.id}`, {
        state: {
          back: {
            backUrl: "/",
          },
          isSidebarHidden: true
        },
      });
    },
    [navigate]
  );

  const page = useAppSelector(selectDappsPage(selectedPage));
  const isLoading = useAppSelector(selectIsMarketplacePageLoading);

  const categories = useMemo(() => {
    if (page) {
      const categories = new Set(page.flatMap((item) => item.categories));

      return Array.from(
        new Map(
          Array.from(categories).map((c) => [
            c,
            page.filter((item) => item.categories.includes(c)),
          ])
        ).entries()
      );
    }
  }, [page]);

  return (
    <List
      split={false}
      itemLayout="vertical"
      loading={isLoading}
      dataSource={categories}
      className="first-of-type:mb-2 first-of-type:pl-10"
      renderItem={([category, items], index) => (
        <List.Item key={index}>
          <DappsList
            page={items}
            title={category}
            onDappClick={selectDapp}
          />
        </List.Item>
      )}
    />
  );
}
