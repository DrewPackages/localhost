export type DappMarketplaceDescription = {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  categories: Array<string>;
  installed?: boolean;
};
