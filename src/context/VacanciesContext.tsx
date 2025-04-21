import { fetchCoins } from 'api/fetchVacancies';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
/* import { AssetItemModel } from 'types/AssetItemModel';
import { PortfolioCoinsId } from 'types/PortfolioCoinsIdModel'; */
/* import { LocalStorageService } from 'utils/localStorage'; */

export interface CoinsContextType {
  /* assets: AssetItemModel[]; // api main assets
  loading: boolean; // loader
  error: string | null; // error */
  
}

export const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

/* const PORTFOLIOITEMS_KEY = 'portfolioItems'; */

export const CoinsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // state of main table assets
  const [assets, setAssets] = useState<[]>([]);
  // loader and error states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // state of portfolioCoinsId ({id, amoint}), needed for localstorage
  /* const [portfolioCoinsId, setPortfolioCoinsId] = useState<PortfolioCoinsId[]>(
    () => LocalStorageService.getItem<PortfolioCoinsId[]>(PORTFOLIOITEMS_KEY) || [],
  );
 */
  /* 
  // useEffect controls localstorage state changes
  useEffect(() => {
    LocalStorageService.setItem(PORTFOLIOITEMS_KEY, portfolioCoinsId);
    LocalStorageService.setItem(INITIAL_PORTFOLIO_PRICE_KEY, initialPortfolioPrice);
  }, [portfolioCoinsId, initialPortfolioPrice]); */

  // func to getting coins from the api
  const refeshCoins = () => {
    /* fetchCoins({ setAssets, setLoading, setError }); */
  };

  // getting coins from the api when the page loads
  useEffect(() => {
    setLoading(false);
    setError(null);
    refeshCoins();
  }, []);

  return (
    <CoinsContext.Provider
      value={{
        assets,
        loading,
        error,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
};
