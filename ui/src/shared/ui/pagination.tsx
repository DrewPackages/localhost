import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Row, Space, Typography } from "antd";
import { ReactNode } from "react";

interface PaginationProps {
  onNextPageClick?: () => void;
  onPrevPageClick?: () => void;
  onPageClick?: (pageNum: number) => void;
  selectedPage: number;
  totalPages: number;
}

enum PaginationContent {
  none,
  exactPage,
  ellipsisEnd,
  ellipsisStart,
  ellipsisBoth,
}

const MAX_PAGES_BUTTONS = 10;

function getPaginationContentType(
  selectedPage: number,
  totalPages: number
): PaginationContent {
  const endsWithEllipsis = totalPages - selectedPage >= MAX_PAGES_BUTTONS;
  const startsWithEllipsis = selectedPage >= MAX_PAGES_BUTTONS;
  if (totalPages <= 1) {
    return PaginationContent.none;
  } else if (endsWithEllipsis && startsWithEllipsis) {
    return PaginationContent.ellipsisBoth;
  } else if (endsWithEllipsis && !startsWithEllipsis) {
    return PaginationContent.ellipsisEnd;
  } else if (!endsWithEllipsis && startsWithEllipsis) {
    return PaginationContent.ellipsisStart;
  }
  return PaginationContent.exactPage;
}

function mapContentFromType({
  onPageClick,
  selectedPage,
  totalPages,
  contentType,
}: Pick<PaginationProps, "onPageClick" | "selectedPage" | "totalPages"> & {
  contentType: PaginationContent;
}): Array<ReactNode> {
  if (contentType === PaginationContent.none) {
    return [];
  }

  const content = new Array(Math.min(totalPages, MAX_PAGES_BUTTONS))
    .fill(0)
    .map((_, i) => {
      return (
        <Button
          key={`page-${i}`}
          size="small"
          onClick={onPageClick?.bind(null, i)}
          type={selectedPage === i ? "primary" : "text"}
        >
          {i + 1}
        </Button>
      );
    });

  if (contentType === PaginationContent.exactPage) {
    return content;
  }

  if (
    contentType === PaginationContent.ellipsisStart ||
    contentType === PaginationContent.ellipsisBoth
  ) {
    content[1] = <Typography.Text>...</Typography.Text>;
    content[0] = (
      <Button
        key={`page-0`}
        size="small"
        onClick={onPageClick?.bind(null, 0)}
        type={selectedPage === 0 ? "primary" : "text"}
      >
        1
      </Button>
    );
  }

  if (
    contentType === PaginationContent.ellipsisEnd ||
    contentType === PaginationContent.ellipsisBoth
  ) {
    content[content.length - 2] = <Typography.Text>...</Typography.Text>;
    content[content.length - 1] = (
      <Button
        key={`page-${totalPages}`}
        size="small"
        onClick={onPageClick?.bind(null, totalPages)}
        type={selectedPage === totalPages ? "primary" : "text"}
      >
        {totalPages + 1}
      </Button>
    );
  }

  for (let i = 0; i < MAX_PAGES_BUTTONS - 4; i++) {
    content[i + 2] = (
      <Button
        key={`page-${selectedPage + i}`}
        size="small"
        onClick={onPageClick?.bind(null, selectedPage + i)}
        type={selectedPage === selectedPage + i ? "primary" : "text"}
      >
        {selectedPage + i + 1}
      </Button>
    );
  }

  return content;
}

export function Pagination({
  onNextPageClick,
  onPrevPageClick,
  onPageClick,
  selectedPage,
  totalPages,
}: PaginationProps) {
  const contentType = getPaginationContentType(selectedPage, totalPages);

  if (contentType === PaginationContent.none) {
    return <></>;
  }

  return (
    <Row justify="center">
      <Space align="center">
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={onPrevPageClick}
          disabled={0 === selectedPage}
        />
        {mapContentFromType({
          onPageClick,
          selectedPage,
          totalPages,
          contentType,
        })}
        <Button
          type="text"
          icon={<RightOutlined />}
          onClick={onNextPageClick}
          disabled={totalPages - 1 === selectedPage}
        />
      </Space>
    </Row>
  );
}
