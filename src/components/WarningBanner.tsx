import React from 'react';

const WarningBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-black py-3 px-4">
      <div className="container mx-auto">
        <p className="text-center text-base md:text-lg font-medium">
          ⚠️ Attention : Ce site n'est pas le site officiel. Il est réalisé dans le cadre d'un projet de formation en création de site.
        </p>
      </div>
    </div>
  );
};

export default WarningBanner;