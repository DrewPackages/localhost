import { List, Typography } from "antd";
import { DappIcon, DappMarketplaceDescription } from "entities/dapp";

interface DappsListProps {
  title?: string;
  page: Array<DappMarketplaceDescription>;
  onDappClick?: (dapp: DappMarketplaceDescription) => void;
}

export const DappsList = ({ title, page, onDappClick }: DappsListProps) => {
  return (
    <List
      split={false}
      header={<Typography.Text strong>{title}</Typography.Text>}
      grid={{ column: 8, gutter: 16 }}
      dataSource={page}
      className="pt-3"
      renderItem={(dapp, i) => (
        <List.Item key={i}>
          <DappIcon
            imageUrl={dapp.logoUrl}
            name={dapp.name}
            onClick={() => onDappClick?.(dapp)}
          />
        </List.Item>
      )}
    />
  );
};
