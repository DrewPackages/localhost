import { List } from "antd";
import { DappRow, DappRowSkeleton } from "entities/dapp";
import {
  getDeploymentsPage,
  selectCurrentPage,
  selectCurrentPageSize,
  selectDeployementsPage,
  selectTotalItemsCount,
} from "entities/deployments";
import { setPage } from "entities/deployments/model/slice";
import { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "shared/model/hooks";
import service from "localhostService";
import { useNavigate } from "react-router-dom";

export const DeploymentsList: FC = () => {
  const dispatch = useAppDispatch();

  const page = useAppSelector(selectCurrentPage);
  const pageSize = useAppSelector(selectCurrentPageSize);

  const totalItems = useAppSelector(selectTotalItemsCount);
  const pageData = useAppSelector(selectDeployementsPage(page));

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDeploymentsPage({ page, pageSize }));

    const interval = setInterval(
      () => dispatch(getDeploymentsPage({ page, pageSize })),
      10_000
    );

    return () => clearInterval(interval);
  }, [page, pageSize, dispatch]);

  const onDeleteClick = useCallback(
    async (dappId: string) => {
      await service.deployer.deleteDeployment(dappId);
      dispatch(getDeploymentsPage({ page, pageSize }));
    },
    [dispatch, page, pageSize]
  );

  const onPauseClick = useCallback(
    async (dappId: string) => {
      await service.deployer.stopDeployment(dappId);
      dispatch(getDeploymentsPage({ page, pageSize }));
    },
    [dispatch, page, pageSize]
  );

  const onStartClick = useCallback(
    async (dappId: string) => {
      await service.deployer.startDeployment(dappId);
      dispatch(getDeploymentsPage({ page, pageSize }));
    },
    [dispatch, page, pageSize]
  );

  const onOpenClick = useCallback(
    async (dappId: string) => {
      navigate(`/dapp/${dappId}`, {
        state: {
          back: {
            navigateBack: true,
          },
          isSidebarHidden: true,
        },
      });
    },
    [navigate]
  );

  if (pageData === "loading" || pageData == null) {
    return (
      <List
        dataSource={new Array(10).fill(0)}
        renderItem={() => (
          <List.Item>
            <DappRowSkeleton active={pageData === "loading"} />
          </List.Item>
        )}
      />
    );
  }

  return (
    <List
      pagination={
        totalItems != null
          ? {
              total: totalItems,
              pageSize,
              align: "center",
              onChange(page) {
                dispatch(setPage(page - 1));
              },
            }
          : undefined
      }
      dataSource={pageData}
      renderItem={({ categories, containers, id, logoUrl, name }, i) => (
        <List.Item key={`${page}-${i}`} className="flex justify-center">
          <DappRow
            id={id}
            name={name}
            categories={categories}
            logoUrl={logoUrl}
            onDeleteClick={onDeleteClick}
            onPauseClick={onPauseClick}
            onStartClick={onStartClick}
            onOpenClick={onOpenClick}
            state={
              containers.some((c) => c.status === "not-found")
                ? "deleted"
                : containers.some((c) => c.status === "paused")
                ? "paused"
                : "running"
            }
          />
        </List.Item>
      )}
    />
  );
};
