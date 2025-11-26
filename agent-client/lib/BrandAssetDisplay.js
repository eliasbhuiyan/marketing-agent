"use client"
import React from "react";
import { useBrandData } from "./hooks/useBrandData";
import Image from "next/image";
// pass the image link to parent component if click on the image
const BrandAssetDisplay = ({ onSelectAsset }) => {
  const { brandData, loading: brandLoading } = useBrandData();
  // if click on the image pass the image link to parent component
  const handleSelectAsset = (asset) => {
    onSelectAsset(asset);
  };

  // if (brandLoading) {
  //   return (
  //     <div>
  //       <div></div>
  //     </div>
  //   );
  // }

  return (
    <div className={`grid gap-2 ${brandData?.assets?.length > 3 ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {brandData?.assets?.length === 0 ? (
        <p>Add brand assets for easy to use</p>
      ) : (
        brandData?.assets.map((asset, index) => (
          <div onClick={() => handleSelectAsset(asset)} key={asset} className="border p-2 rounded w-fit h-fit cursor-pointer group">
            <Image width={100} height={100} src={asset} blurDataURL={asset} alt={`Brand Asset ${index + 1}`} className="group-hover:scale-105" />
          </div>
        ))
      )}
    </div>
  );
};

export default BrandAssetDisplay;
