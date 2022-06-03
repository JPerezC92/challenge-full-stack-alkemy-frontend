import { ReactElement } from "react";
import { MovementsLayout } from "src/modules/movements/components/MovementsLayout";
import { MainLayout } from "src/modules/shared/components/MainLayout";

export default function OperationsPage(): ReactElement {
  return <>OperationsPage</>;
}

OperationsPage.getLayout = function (page: React.ReactElement) {
  return (
    <>
      <MainLayout>
        <MovementsLayout>{page}</MovementsLayout>
      </MainLayout>
    </>
  );
};